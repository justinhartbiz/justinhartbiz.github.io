# Workspace Archaeologist - Usage Guide

This tool consists of three main components:
1. An interactive HTML dashboard (`index.html`)
2. A Python scanner script (`scan_workspace.py`)
3. A cleanup utility (`cleanup.py`)

## Getting Started

### Step 1: Scan your workspace

Run the scanner to analyze your workspace and generate the data needed for the dashboard:

```bash
# Navigate to your workspace root
cd ~/.openclaw/workspace

# Run the scanner
python ops/workspace-archaeologist/scan_workspace.py --output ops/workspace-archaeologist/workspace_scan.json
```

This will:
- Scan all files in the workspace (excluding `node_modules`, `.git`, etc.)
- Calculate file sizes, types, dates, and content hashes
- Detect duplicates and large files
- Save the results to `workspace_scan.json`

### Step 2: Open the dashboard

Open the HTML dashboard in your web browser:

```bash
open ops/workspace-archaeologist/index.html
```

You can now explore your workspace through the dashboard interface.

### Step 3: Run cleanup actions

After reviewing the dashboard, you can use the cleanup utility to implement recommendations:

```bash
# Clean up temporary files
python ops/workspace-archaeologist/cleanup.py --mode temp

# Remove duplicate files
python ops/workspace-archaeologist/cleanup.py --mode dupes --scan-file ops/workspace-archaeologist/workspace_scan.json

# Generate archive report for large, old files
python ops/workspace-archaeologist/cleanup.py --mode archive --scan-file ops/workspace-archaeologist/workspace_scan.json

# Run all cleanup operations
python ops/workspace-archaeologist/cleanup.py --mode all --scan-file ops/workspace-archaeologist/workspace_scan.json
```

Use the `--dry-run` flag to see what would happen without making changes:

```bash
python ops/workspace-archaeologist/cleanup.py --mode all --scan-file ops/workspace-archaeologist/workspace_scan.json --dry-run
```

## Regular Maintenance

For optimal workspace organization, run the Workspace Archaeologist monthly:

1. Scan your workspace
2. Review the dashboard for new insights
3. Run appropriate cleanup actions
4. Check for buried treasures to resurrect

## Setting Up Automation

You can set up a cron job to run the scan and cleanup automatically:

```bash
# Add to crontab
0 0 1 * * cd ~/.openclaw/workspace && python ops/workspace-archaeologist/scan_workspace.py --output ops/workspace-archaeologist/workspace_scan.json && python ops/workspace-archaeologist/cleanup.py --mode temp
```

This will run the scan and clean up temporary files at midnight on the first day of each month.

## Customization

You can modify the scripts to match your specific needs:

- Add additional file patterns to the temporary file cleanup
- Customize the archiving criteria
- Add specific directories to exclude from scanning

## Troubleshooting

If you encounter issues:

1. Make sure Python 3.6+ is installed
2. Check file permissions on the workspace
3. Run with `--dry-run` first to validate actions
4. Inspect the generated JSON file for any anomalies

For large workspaces, the scan may take several minutes to complete.

---

Remember, the Workspace Archaeologist is designed to help you uncover and organize your digital artifacts. Use it regularly to maintain an efficient, clean workspace.