#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const crypto = require('crypto');
const chalk = require('chalk');
const boxen = require('boxen');
const Table = require('cli-table3');
const yaml = require('js-yaml');
const moment = require('moment');

// Configuration
const CONFIG = {
  dataDir: path.join(process.env.HOME, '.openclaw', 'workspace', 'projects', 'decision-journal', 'data'),
  templatesDir: path.join(process.env.HOME, '.openclaw', 'workspace', 'projects', 'decision-journal', 'templates'),
  defaultTemplate: 'standard.yaml',
  entryPrefix: 'decision_',
  reviewFrequency: 90, // days
};

// Ensure directories exist
if (!fs.existsSync(CONFIG.dataDir)) {
  fs.mkdirSync(CONFIG.dataDir, { recursive: true });
}

if (!fs.existsSync(CONFIG.templatesDir)) {
  fs.mkdirSync(CONFIG.templatesDir, { recursive: true });
  // Create default template if it doesn't exist
  createDefaultTemplate();
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Main function
async function main() {
  const args = process.argv.slice(2);
  const command = args[0] || 'help';

  switch(command) {
    case 'new':
      await newEntry();
      break;
    case 'list':
      await listEntries();
      break;
    case 'view':
      await viewEntry(args[1]);
      break;
    case 'search':
      await searchEntries(args.slice(1).join(' '));
      break;
    case 'review':
      await reviewEntries();
      break;
    case 'stats':
      await showStats();
      break;
    case 'domains':
      await showDomains();
      break;
    case 'template':
      if (args[1] === 'list') {
        listTemplates();
      } else if (args[1] === 'view') {
        viewTemplate(args[2] || CONFIG.defaultTemplate);
      } else if (args[1] === 'create') {
        createTemplate(args[2]);
      } else {
        console.log('Invalid template command. Use: template list|view|create');
      }
      break;
    case 'help':
    default:
      showHelp();
      break;
  }
  rl.close();
}

// Create default template
function createDefaultTemplate() {
  const templateContent = `# Standard Decision Journal Template
metadata:
  version: 1.0
  type: standard
  description: Default template for decision journaling

fields:
  - name: title
    prompt: Decision title
    type: string
    required: true
  
  - name: domain
    prompt: Domain (DB, TLH, RG, Personal, AI, Other)
    type: select
    options:
      - DonorBureau
      - TLH
      - Rational Ground
      - Personal
      - AI
      - Other
    required: true
  
  - name: decision_type
    prompt: Type of decision
    type: select
    options:
      - Strategic
      - Tactical
      - Creative
      - Financial
      - Technical
      - People
      - Process
    required: true
  
  - name: context
    prompt: Situation context (what's happening that requires a decision?)
    type: text
    required: true
  
  - name: options
    prompt: Options considered (list all alternatives)
    type: text
    required: true
  
  - name: choice
    prompt: Decision made (what you're actually doing)
    type: text
    required: true
  
  - name: rationale
    prompt: Reasoning (why this choice over others)
    type: text
    required: true
  
  - name: assumptions
    prompt: Key assumptions (what must be true for this to work)
    type: text
    required: true
  
  - name: risks
    prompt: Risks and mitigations
    type: text
    required: true
  
  - name: success_criteria
    prompt: How will you know if this worked? (measurable outcomes)
    type: text
    required: true
  
  - name: review_date
    prompt: When to review this decision (YYYY-MM-DD)
    type: date
    default_days_ahead: 90
    required: true
  
  - name: stakeholders
    prompt: Who's affected by this decision?
    type: text
    required: false
  
  - name: emotional_state
    prompt: Your emotional state while making this decision (1-10)
    type: number
    min: 1
    max: 10
    required: true
    
  - name: confidence
    prompt: Confidence level (1-10)
    type: number
    min: 1
    max: 10
    required: true
  
  - name: notes
    prompt: Additional notes or context
    type: text
    required: false
`;

  fs.writeFileSync(
    path.join(CONFIG.templatesDir, CONFIG.defaultTemplate),
    templateContent
  );
}

// Helper to ask questions
async function ask(question, options = null) {
  return new Promise((resolve) => {
    if (options) {
      console.log(chalk.yellow(question));
      options.forEach((option, index) => {
        console.log(`${index + 1}. ${option}`);
      });
      console.log(chalk.gray('Enter number: '));
      
      rl.question('', (answer) => {
        const num = parseInt(answer);
        if (num && num > 0 && num <= options.length) {
          resolve(options[num - 1]);
        } else {
          resolve(answer); // fallback to raw input if not a valid option
        }
      });
    } else {
      rl.question(chalk.yellow(question) + ' ', (answer) => {
        resolve(answer);
      });
    }
  });
}

// Create a new decision entry
async function newEntry() {
  console.log(boxen(chalk.bold('New Decision Entry'), {padding: 1, borderColor: 'green'}));
  
  // Load template
  const templateName = CONFIG.defaultTemplate;
  const templatePath = path.join(CONFIG.templatesDir, templateName);
  
  if (!fs.existsSync(templatePath)) {
    console.error(chalk.red(`Template ${templateName} not found`));
    return;
  }
  
  const template = yaml.load(fs.readFileSync(templatePath, 'utf8'));
  const entry = {
    metadata: {
      id: generateId(),
      created_at: moment().format(),
      template: templateName,
    },
    data: {}
  };
  
  // Fill out the template fields
  for (const field of template.fields) {
    let value;
    
    if (field.type === 'select' && field.options) {
      value = await ask(field.prompt, field.options);
    } else if (field.type === 'number') {
      let validInput = false;
      while (!validInput) {
        value = await ask(field.prompt);
        const num = parseInt(value);
        if (isNaN(num)) {
          console.log(chalk.red('Please enter a number'));
        } else if (field.min !== undefined && num < field.min) {
          console.log(chalk.red(`Value must be at least ${field.min}`));
        } else if (field.max !== undefined && num > field.max) {
          console.log(chalk.red(`Value must be at most ${field.max}`));
        } else {
          validInput = true;
          value = num;
        }
      }
    } else if (field.type === 'date') {
      if (field.default_days_ahead) {
        const defaultDate = moment().add(field.default_days_ahead, 'days').format('YYYY-MM-DD');
        value = await ask(`${field.prompt} (default: ${defaultDate})`);
        if (!value) value = defaultDate;
      } else {
        value = await ask(field.prompt);
      }
    } else if (field.type === 'text') {
      console.log(chalk.yellow(field.prompt));
      console.log(chalk.gray('(Type your response, then press Ctrl+D on a new line to finish)'));
      value = await getMultiLineInput();
    } else {
      value = await ask(field.prompt);
    }
    
    if (field.required && !value) {
      console.log(chalk.red(`${field.name} is required. Please provide a value.`));
      // Ask again for required fields
      field.type === 'text' ? 
        console.log(chalk.yellow(field.prompt)) : 
        value = await ask(field.prompt);
      if (field.type === 'text') {
        console.log(chalk.gray('(Type your response, then press Ctrl+D on a new line to finish)'));
        value = await getMultiLineInput();
      }
    }
    
    entry.data[field.name] = value;
  }
  
  // Save entry
  const fileName = `${CONFIG.entryPrefix}${entry.metadata.id}.json`;
  fs.writeFileSync(
    path.join(CONFIG.dataDir, fileName),
    JSON.stringify(entry, null, 2)
  );
  
  console.log(chalk.green(`\nDecision "${entry.data.title}" saved successfully!`));
  console.log(chalk.blue(`ID: ${entry.metadata.id}`));
}

// Helper for multiline input
async function getMultiLineInput() {
  return new Promise((resolve) => {
    let lines = [];
    
    const originalPrompt = rl.getPrompt();
    rl.setPrompt('> ');
    rl.prompt();
    
    const onLine = (line) => {
      if (line.trim() === '.done' || line.trim() === 'EOF') {
        cleanup();
        resolve(lines.join('\n'));
      } else {
        lines.push(line);
        rl.prompt();
      }
    };
    
    const onClose = () => {
      cleanup();
      resolve(lines.join('\n'));
    };
    
    const cleanup = () => {
      rl.off('line', onLine);
      rl.off('close', onClose);
      rl.setPrompt(originalPrompt);
    };
    
    rl.on('line', onLine);
    rl.on('close', onClose);
  });
}

// List all entries
async function listEntries() {
  const files = fs.readdirSync(CONFIG.dataDir)
    .filter(file => file.startsWith(CONFIG.entryPrefix) && file.endsWith('.json'));
    
  if (files.length === 0) {
    console.log(chalk.yellow('No decision entries found.'));
    return;
  }
  
  const entries = files.map(file => {
    const data = JSON.parse(fs.readFileSync(path.join(CONFIG.dataDir, file), 'utf8'));
    return {
      id: data.metadata.id,
      title: data.data.title,
      domain: data.data.domain,
      decision_type: data.data.decision_type,
      created_at: moment(data.metadata.created_at).format('YYYY-MM-DD'),
      review_date: data.data.review_date,
      confidence: data.data.confidence
    };
  }).sort((a, b) => moment(b.created_at).unix() - moment(a.created_at).unix());
  
  const table = new Table({
    head: ['ID', 'Title', 'Domain', 'Type', 'Created', 'Review Date', 'Confidence'],
    colWidths: [8, 30, 12, 12, 10, 12, 10]
  });
  
  entries.forEach(entry => {
    // Color code based on review date
    const reviewDate = moment(entry.review_date);
    const now = moment();
    let reviewDateStr = entry.review_date;
    
    if (reviewDate.isBefore(now)) {
      reviewDateStr = chalk.red(entry.review_date);
    } else if (reviewDate.isBefore(now.add(14, 'days'))) {
      reviewDateStr = chalk.yellow(entry.review_date);
    }
    
    table.push([
      entry.id.substring(0, 7),
      entry.title.length > 28 ? entry.title.substring(0, 25) + '...' : entry.title,
      entry.domain,
      entry.decision_type,
      entry.created_at,
      reviewDateStr,
      getConfidenceColor(entry.confidence)
    ]);
  });
  
  console.log(boxen(chalk.bold(`Decision Journal (${entries.length} entries)`), {padding: 1, borderColor: 'blue'}));
  console.log(table.toString());
  console.log(chalk.gray('\nUse "view [ID]" to see details of a specific entry'));
}

// Helper to colorize confidence levels
function getConfidenceColor(confidence) {
  const num = parseInt(confidence);
  if (num <= 3) return chalk.red(confidence);
  if (num <= 6) return chalk.yellow(confidence);
  return chalk.green(confidence);
}

// View a specific entry
async function viewEntry(id) {
  if (!id) {
    console.log(chalk.red('Please provide an entry ID'));
    return;
  }
  
  // Find the file with this ID prefix
  const files = fs.readdirSync(CONFIG.dataDir)
    .filter(file => file.startsWith(`${CONFIG.entryPrefix}${id}`));
    
  if (files.length === 0) {
    console.log(chalk.red(`No entry found with ID: ${id}`));
    return;
  }
  
  const filePath = path.join(CONFIG.dataDir, files[0]);
  const entry = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  console.log(boxen(chalk.bold(entry.data.title), {padding: 1, borderColor: 'blue'}));
  
  // Metadata section
  const metaTable = new Table();
  metaTable.push(
    {'ID': entry.metadata.id},
    {'Created': moment(entry.metadata.created_at).format('YYYY-MM-DD HH:mm:ss')},
    {'Domain': entry.data.domain},
    {'Type': entry.data.decision_type},
    {'Review Date': entry.data.review_date},
    {'Confidence': getConfidenceColor(entry.data.confidence)},
    {'Emotional State': entry.data.emotional_state}
  );
  console.log(metaTable.toString());
  
  // Main content
  console.log(chalk.blue('\n=== Context ==='));
  console.log(entry.data.context);
  
  console.log(chalk.blue('\n=== Options Considered ==='));
  console.log(entry.data.options);
  
  console.log(chalk.blue('\n=== Decision ==='));
  console.log(entry.data.choice);
  
  console.log(chalk.blue('\n=== Rationale ==='));
  console.log(entry.data.rationale);
  
  console.log(chalk.blue('\n=== Assumptions ==='));
  console.log(entry.data.assumptions);
  
  console.log(chalk.blue('\n=== Risks ==='));
  console.log(entry.data.risks);
  
  console.log(chalk.blue('\n=== Success Criteria ==='));
  console.log(entry.data.success_criteria);
  
  if (entry.data.stakeholders) {
    console.log(chalk.blue('\n=== Stakeholders ==='));
    console.log(entry.data.stakeholders);
  }
  
  if (entry.data.notes) {
    console.log(chalk.blue('\n=== Additional Notes ==='));
    console.log(entry.data.notes);
  }
}

// Search entries
async function searchEntries(query) {
  if (!query) {
    console.log(chalk.red('Please provide a search term'));
    return;
  }
  
  const files = fs.readdirSync(CONFIG.dataDir)
    .filter(file => file.startsWith(CONFIG.entryPrefix) && file.endsWith('.json'));
    
  if (files.length === 0) {
    console.log(chalk.yellow('No decision entries found.'));
    return;
  }
  
  const matches = [];
  const searchTermLower = query.toLowerCase();
  
  files.forEach(file => {
    const data = JSON.parse(fs.readFileSync(path.join(CONFIG.dataDir, file), 'utf8'));
    let matched = false;
    let matchedFields = [];
    
    // Search through all fields
    Object.entries(data.data).forEach(([key, value]) => {
      if (typeof value === 'string' && value.toLowerCase().includes(searchTermLower)) {
        matched = true;
        matchedFields.push(key);
      }
    });
    
    if (matched) {
      matches.push({
        id: data.metadata.id,
        title: data.data.title,
        domain: data.data.domain,
        fields: matchedFields.join(', '),
        created_at: moment(data.metadata.created_at).format('YYYY-MM-DD')
      });
    }
  });
  
  if (matches.length === 0) {
    console.log(chalk.yellow(`No matches found for "${query}"`));
    return;
  }
  
  const table = new Table({
    head: ['ID', 'Title', 'Domain', 'Matched Fields', 'Created'],
    colWidths: [8, 30, 12, 25, 10]
  });
  
  matches.forEach(match => {
    table.push([
      match.id.substring(0, 7),
      match.title.length > 28 ? match.title.substring(0, 25) + '...' : match.title,
      match.domain,
      match.fields,
      match.created_at
    ]);
  });
  
  console.log(boxen(chalk.bold(`Search Results: "${query}" (${matches.length} matches)`), {padding: 1, borderColor: 'yellow'}));
  console.log(table.toString());
  console.log(chalk.gray('\nUse "view [ID]" to see details of a specific entry'));
}

// Review entries due for review
async function reviewEntries() {
  const files = fs.readdirSync(CONFIG.dataDir)
    .filter(file => file.startsWith(CONFIG.entryPrefix) && file.endsWith('.json'));
    
  if (files.length === 0) {
    console.log(chalk.yellow('No decision entries found.'));
    return;
  }
  
  const now = moment();
  const dueForReview = [];
  
  files.forEach(file => {
    const data = JSON.parse(fs.readFileSync(path.join(CONFIG.dataDir, file), 'utf8'));
    const reviewDate = moment(data.data.review_date);
    
    if (reviewDate.isSameOrBefore(now)) {
      dueForReview.push({
        id: data.metadata.id,
        title: data.data.title,
        domain: data.data.domain,
        decision_type: data.data.decision_type,
        review_date: data.data.review_date,
        days_overdue: now.diff(reviewDate, 'days')
      });
    }
  });
  
  if (dueForReview.length === 0) {
    console.log(chalk.green('No entries due for review. You\'re all caught up!'));
    return;
  }
  
  const table = new Table({
    head: ['ID', 'Title', 'Domain', 'Type', 'Review Date', 'Days Overdue'],
    colWidths: [8, 30, 12, 12, 12, 12]
  });
  
  // Sort by most overdue first
  dueForReview.sort((a, b) => b.days_overdue - a.days_overdue).forEach(entry => {
    table.push([
      entry.id.substring(0, 7),
      entry.title.length > 28 ? entry.title.substring(0, 25) + '...' : entry.title,
      entry.domain,
      entry.decision_type,
      chalk.red(entry.review_date),
      chalk.red(entry.days_overdue)
    ]);
  });
  
  console.log(boxen(chalk.bold(`Decisions Due for Review (${dueForReview.length})`), {padding: 1, borderColor: 'red'}));
  console.log(table.toString());
  console.log(chalk.gray('\nUse "view [ID]" to see details and review an entry'));
}

// Show statistics about decisions
async function showStats() {
  const files = fs.readdirSync(CONFIG.dataDir)
    .filter(file => file.startsWith(CONFIG.entryPrefix) && file.endsWith('.json'));
    
  if (files.length === 0) {
    console.log(chalk.yellow('No decision entries found.'));
    return;
  }
  
  // Gather stats
  const stats = {
    total: files.length,
    byDomain: {},
    byType: {},
    byConfidence: {
      low: 0,    // 1-3
      medium: 0, // 4-7
      high: 0    // 8-10
    },
    byEmotionalState: {
      low: 0,    // 1-3
      medium: 0, // 4-7
      high: 0    // 8-10
    },
    byMonth: {},
    reviewDue: 0,
    avgConfidence: 0,
    avgEmotionalState: 0
  };
  
  files.forEach(file => {
    const data = JSON.parse(fs.readFileSync(path.join(CONFIG.dataDir, file), 'utf8'));
    
    // Domain stats
    const domain = data.data.domain || 'Unspecified';
    stats.byDomain[domain] = (stats.byDomain[domain] || 0) + 1;
    
    // Type stats
    const type = data.data.decision_type || 'Unspecified';
    stats.byType[type] = (stats.byType[type] || 0) + 1;
    
    // Confidence stats
    const confidence = parseInt(data.data.confidence || 0);
    stats.avgConfidence += confidence;
    if (confidence >= 1 && confidence <= 3) stats.byConfidence.low++;
    else if (confidence >= 4 && confidence <= 7) stats.byConfidence.medium++;
    else if (confidence >= 8 && confidence <= 10) stats.byConfidence.high++;
    
    // Emotional state stats
    const emotionalState = parseInt(data.data.emotional_state || 0);
    stats.avgEmotionalState += emotionalState;
    if (emotionalState >= 1 && emotionalState <= 3) stats.byEmotionalState.low++;
    else if (emotionalState >= 4 && emotionalState <= 7) stats.byEmotionalState.medium++;
    else if (emotionalState >= 8 && emotionalState <= 10) stats.byEmotionalState.high++;
    
    // Month stats
    const month = moment(data.metadata.created_at).format('YYYY-MM');
    stats.byMonth[month] = (stats.byMonth[month] || 0) + 1;
    
    // Review stats
    const reviewDate = moment(data.data.review_date);
    if (reviewDate.isSameOrBefore(moment())) {
      stats.reviewDue++;
    }
  });
  
  // Calculate averages
  stats.avgConfidence = (stats.avgConfidence / stats.total).toFixed(1);
  stats.avgEmotionalState = (stats.avgEmotionalState / stats.total).toFixed(1);
  
  // Display stats
  console.log(boxen(chalk.bold('Decision Journal Statistics'), {padding: 1, borderColor: 'green'}));
  
  // Summary table
  const summaryTable = new Table();
  summaryTable.push(
    {'Total Entries': stats.total},
    {'Due for Review': stats.reviewDue > 0 ? chalk.red(stats.reviewDue) : chalk.green(0)},
    {'Avg. Confidence': getConfidenceColor(stats.avgConfidence)},
    {'Avg. Emotional State': stats.avgEmotionalState}
  );
  console.log(summaryTable.toString());
  
  // Domain breakdown
  console.log(chalk.blue('\nDecisions by Domain'));
  const domainTable = new Table({
    head: ['Domain', 'Count', '%'],
    colWidths: [20, 10, 10]
  });
  
  Object.entries(stats.byDomain)
    .sort((a, b) => b[1] - a[1])
    .forEach(([domain, count]) => {
      domainTable.push([
        domain,
        count,
        `${((count / stats.total) * 100).toFixed(1)}%`
      ]);
    });
  console.log(domainTable.toString());
  
  // Type breakdown
  console.log(chalk.blue('\nDecisions by Type'));
  const typeTable = new Table({
    head: ['Type', 'Count', '%'],
    colWidths: [20, 10, 10]
  });
  
  Object.entries(stats.byType)
    .sort((a, b) => b[1] - a[1])
    .forEach(([type, count]) => {
      typeTable.push([
        type,
        count,
        `${((count / stats.total) * 100).toFixed(1)}%`
      ]);
    });
  console.log(typeTable.toString());
  
  // Confidence breakdown
  console.log(chalk.blue('\nDecisions by Confidence'));
  const confidenceTable = new Table({
    head: ['Level', 'Count', '%'],
    colWidths: [20, 10, 10]
  });
  
  confidenceTable.push(
    ['Low (1-3)', stats.byConfidence.low, `${((stats.byConfidence.low / stats.total) * 100).toFixed(1)}%`],
    ['Medium (4-7)', stats.byConfidence.medium, `${((stats.byConfidence.medium / stats.total) * 100).toFixed(1)}%`],
    ['High (8-10)', stats.byConfidence.high, `${((stats.byConfidence.high / stats.total) * 100).toFixed(1)}%`]
  );
  console.log(confidenceTable.toString());
  
  // Monthly trend
  console.log(chalk.blue('\nDecision Trend by Month'));
  const monthTable = new Table({
    head: ['Month', 'Count'],
    colWidths: [20, 10]
  });
  
  Object.entries(stats.byMonth)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .forEach(([month, count]) => {
      monthTable.push([month, count]);
    });
  console.log(monthTable.toString());
}

// Show domains
async function showDomains() {
  const files = fs.readdirSync(CONFIG.dataDir)
    .filter(file => file.startsWith(CONFIG.entryPrefix) && file.endsWith('.json'));
    
  if (files.length === 0) {
    console.log(chalk.yellow('No decision entries found.'));
    return;
  }
  
  // Extract all domains and their counts
  const domainCounts = {};
  const domainDecisions = {};
  
  files.forEach(file => {
    const data = JSON.parse(fs.readFileSync(path.join(CONFIG.dataDir, file), 'utf8'));
    const domain = data.data.domain || 'Unspecified';
    domainCounts[domain] = (domainCounts[domain] || 0) + 1;
    
    if (!domainDecisions[domain]) {
      domainDecisions[domain] = [];
    }
    
    domainDecisions[domain].push({
      id: data.metadata.id,
      title: data.data.title,
      created_at: moment(data.metadata.created_at).format('YYYY-MM-DD'),
      confidence: data.data.confidence
    });
  });
  
  // Display domains
  console.log(boxen(chalk.bold('Decision Domains'), {padding: 1, borderColor: 'magenta'}));
  
  Object.entries(domainCounts)
    .sort((a, b) => b[1] - a[1])
    .forEach(([domain, count]) => {
      console.log(chalk.blue(`\n=== ${domain} (${count} decisions) ===`));
      
      const table = new Table({
        head: ['ID', 'Title', 'Created', 'Confidence'],
        colWidths: [8, 40, 12, 10]
      });
      
      // Sort by date, newest first
      domainDecisions[domain]
        .sort((a, b) => moment(b.created_at).unix() - moment(a.created_at).unix())
        .slice(0, 5) // Show only the 5 most recent decisions
        .forEach(decision => {
          table.push([
            decision.id.substring(0, 7),
            decision.title.length > 38 ? decision.title.substring(0, 35) + '...' : decision.title,
            decision.created_at,
            getConfidenceColor(decision.confidence)
          ]);
        });
      
      console.log(table.toString());
      
      if (domainDecisions[domain].length > 5) {
        console.log(chalk.gray(`... and ${domainDecisions[domain].length - 5} more`));
      }
    });
}

// List templates
function listTemplates() {
  const templates = fs.readdirSync(CONFIG.templatesDir)
    .filter(file => file.endsWith('.yaml'));
    
  if (templates.length === 0) {
    console.log(chalk.yellow('No templates found.'));
    return;
  }
  
  console.log(boxen(chalk.bold('Available Templates'), {padding: 1, borderColor: 'cyan'}));
  
  templates.forEach(template => {
    const data = yaml.load(fs.readFileSync(path.join(CONFIG.templatesDir, template), 'utf8'));
    console.log(chalk.blue(`\n- ${template}`));
    
    if (data.metadata && data.metadata.description) {
      console.log(`  ${data.metadata.description}`);
    }
    
    if (data.fields) {
      console.log(`  ${data.fields.length} fields`);
    }
    
    if (template === CONFIG.defaultTemplate) {
      console.log(chalk.green('  (Default)'));
    }
  });
}

// View a template
function viewTemplate(templateName) {
  const templatePath = path.join(CONFIG.templatesDir, templateName);
  
  if (!fs.existsSync(templatePath)) {
    console.log(chalk.red(`Template ${templateName} not found`));
    return;
  }
  
  const template = yaml.load(fs.readFileSync(templatePath, 'utf8'));
  
  console.log(boxen(chalk.bold(`Template: ${templateName}`), {padding: 1, borderColor: 'cyan'}));
  
  if (template.metadata) {
    console.log(chalk.blue('\nMetadata:'));
    Object.entries(template.metadata).forEach(([key, value]) => {
      console.log(`${key}: ${value}`);
    });
  }
  
  if (template.fields) {
    console.log(chalk.blue('\nFields:'));
    template.fields.forEach((field, index) => {
      console.log(`\n${index + 1}. ${field.name} (${field.type})${field.required ? ' *Required' : ''}`);
      console.log(`   Prompt: ${field.prompt}`);
      
      if (field.type === 'select' && field.options) {
        console.log('   Options:');
        field.options.forEach(option => {
          console.log(`   - ${option}`);
        });
      }
      
      if (field.type === 'number') {
        if (field.min !== undefined) console.log(`   Min: ${field.min}`);
        if (field.max !== undefined) console.log(`   Max: ${field.max}`);
      }
      
      if (field.type === 'date' && field.default_days_ahead) {
        console.log(`   Default: ${field.default_days_ahead} days ahead`);
      }
    });
  }
}

// Create a new template
function createTemplate(templateName) {
  if (!templateName) {
    console.log(chalk.red('Please provide a template name (e.g., quick.yaml)'));
    return;
  }
  
  if (!templateName.endsWith('.yaml')) {
    templateName += '.yaml';
  }
  
  const templatePath = path.join(CONFIG.templatesDir, templateName);
  
  if (fs.existsSync(templatePath)) {
    console.log(chalk.red(`Template ${templateName} already exists. Please choose a different name.`));
    return;
  }
  
  const templateContent = `# ${templateName} Template
metadata:
  version: 1.0
  type: custom
  description: Custom template for decision journaling

fields:
  - name: title
    prompt: Decision title
    type: string
    required: true
  
  - name: domain
    prompt: Domain (DB, TLH, RG, Personal, AI, Other)
    type: select
    options:
      - DonorBureau
      - TLH
      - Rational Ground
      - Personal
      - AI
      - Other
    required: true
  
  - name: decision_type
    prompt: Type of decision
    type: select
    options:
      - Strategic
      - Tactical
      - Creative
      - Financial
      - Technical
      - People
      - Process
    required: true
  
  - name: context
    prompt: Situation context
    type: text
    required: true
  
  - name: choice
    prompt: Decision made
    type: text
    required: true
  
  - name: rationale
    prompt: Reasoning
    type: text
    required: true
  
  - name: review_date
    prompt: When to review this decision (YYYY-MM-DD)
    type: date
    default_days_ahead: 90
    required: true
  
  - name: confidence
    prompt: Confidence level (1-10)
    type: number
    min: 1
    max: 10
    required: true

# Add more fields as needed
`;

  fs.writeFileSync(templatePath, templateContent);
  console.log(chalk.green(`Template ${templateName} created successfully.`));
  console.log(chalk.gray(`Edit it at: ${templatePath}`));
}

// Generate unique ID
function generateId() {
  return crypto.randomBytes(4).toString('hex');
}

// Show help
function showHelp() {
  console.log(boxen(chalk.bold('Decision Journal - CLI Tool'), {padding: 1, borderColor: 'blue'}));
  
  console.log(chalk.blue('\nAvailable Commands:'));
  console.log(`
  ${chalk.yellow('new')}                      Create a new decision entry
  ${chalk.yellow('list')}                     List all decision entries
  ${chalk.yellow('view')} <id>                View a specific decision entry
  ${chalk.yellow('search')} <term>            Search entries for a term
  ${chalk.yellow('review')}                   Show entries due for review
  ${chalk.yellow('stats')}                    Show statistics about your decisions
  ${chalk.yellow('domains')}                  Show decisions grouped by domain
  ${chalk.yellow('template list')}            List available templates
  ${chalk.yellow('template view')} <name>     View template details
  ${chalk.yellow('template create')} <name>   Create a new template
  ${chalk.yellow('help')}                     Show this help
  `);
  
  console.log(chalk.blue('\nExamples:'));
  console.log(`
  $ decision-journal new
  $ decision-journal list
  $ decision-journal view ab12
  $ decision-journal search "revenue"
  $ decision-journal domains
  `);
  
  console.log(chalk.gray(`\nData directory: ${CONFIG.dataDir}`));
}

// Run the main function
main().catch(err => {
  console.error(chalk.red('Error:'), err);
  process.exit(1);
});