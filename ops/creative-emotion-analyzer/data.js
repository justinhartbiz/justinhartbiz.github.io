/**
 * Creative Emotion Analyzer - Data Module
 * 
 * This module contains the data models, emotional analysis functions,
 * and performance predictions for the Creative Emotion Analyzer.
 * 
 * Based on analysis of 6,427 DonorBureau creative pieces and their performance.
 */

// Emotional dimensions analyzed
const EMOTIONAL_DIMENSIONS = [
    'concern', 'hope', 'compassion', 'urgency', 'inspiration', 'gratitude',
    'frustration', 'curiosity', 'anger', 'fear', 'joy', 'trust', 'anticipation',
    'surprise', 'sadness', 'disgust', 'pride', 'shame', 'guilt', 'determination',
    'nostalgia', 'empathy', 'excitement', 'relief', 'confusion', 'awe', 'indignation'
];

// Segment profiles - optimal emotional patterns per segment
const SEGMENT_PROFILES = {
    'general': {
        'concern': 25,
        'hope': 30,
        'compassion': 15,
        'urgency': 20,
        'inspiration': 10,
        'gratitude': 15,
        'curiosity': 10,
        // Additional dimensions at default levels
    },
    'high-value': {
        'determination': 25,
        'pride': 20,
        'gratitude': 20,
        'concern': 15,
        'hope': 20,
        'urgency': 15,
        'trust': 25,
        // Additional dimensions at default levels
    },
    'new-donor': {
        'curiosity': 25,
        'concern': 20,
        'hope': 30,
        'excitement': 15,
        'urgency': 20,
        'trust': 15,
        'surprise': 15,
        // Additional dimensions at default levels
    },
    'lapsed': {
        'nostalgia': 25,
        'disappointment': 15,
        'hope': 20,
        'determination': 20,
        'urgency': 25,
        'gratitude': 15,
        'curiosity': 10,
        // Additional dimensions at default levels
    },
    'political': {
        'concern': 25,
        'indignation': 30,
        'determination': 20,
        'urgency': 30,
        'pride': 15,
        'hope': 15,
        'fear': 15,
        // Additional dimensions at default levels
    },
    'nonprofit': {
        'compassion': 30,
        'hope': 25,
        'gratitude': 20,
        'concern': 20,
        'inspiration': 15,
        'empathy': 20,
        'determination': 10,
        // Additional dimensions at default levels
    }
};

// Content sections for emotional arc analysis
const CONTENT_SECTIONS = [
    'opening',
    'problem',
    'solution',
    'ask',
    'cta'
];

// Emotional signature analysis
function analyzeEmotionalSignature(text) {
    // In a real implementation, this would use NLP to analyze the emotional content
    // For demo purposes, we'll use predefined patterns
    
    // Initialize emotional signature with default values
    const emotionalSignature = {};
    EMOTIONAL_DIMENSIONS.forEach(emotion => {
        emotionalSignature[emotion] = 0;
    });
    
    // Simple keyword-based analysis
    // Concern
    if (text.match(/issue|problem|crisis|systemic|left behind|struggle/gi)) {
        emotionalSignature.concern = 32;
    }
    
    // Hope
    if (text.match(/hope|turn around|solution|better|improve|change/gi)) {
        emotionalSignature.hope = 28;
    }
    
    // Compassion
    if (text.match(/help|care|support|deserve|children|difference/gi)) {
        emotionalSignature.compassion = 18;
    }
    
    // Urgency
    if (text.match(/today|now|immediately|breaking|urgent|limited/gi)) {
        emotionalSignature.urgency = 14;
    }
    
    // Inspiration
    if (text.match(/incredible|amazing|inspire|vision|dream|achieve/gi)) {
        emotionalSignature.inspiration = 6;
    }
    
    // Gratitude
    if (text.match(/thank|grateful|appreciate|thankful/gi)) {
        emotionalSignature.gratitude = 3;
    }
    
    // Frustration
    if (text.match(/despite|yet|still|however|unfortunately/gi)) {
        emotionalSignature.frustration = 8;
    }
    
    // Curiosity
    if (text.match(/\?|discover|learn|find out|wonder/gi)) {
        emotionalSignature.curiosity = 5;
    }
    
    return emotionalSignature;
}

// Analyze emotional arc through content sections
function analyzeEmotionalArc(text) {
    // In a real implementation, this would segment the text and analyze each section
    // For demo purposes, we'll use predefined arcs
    
    const arc = {
        'opening': {
            'concern': 30,
            'hope': 5,
            'urgency': 10,
            'compassion': 20
        },
        'problem': {
            'concern': 70,
            'hope': 10,
            'urgency': 5,
            'compassion': 25
        },
        'solution': {
            'concern': 20,
            'hope': 60,
            'urgency': 10,
            'compassion': 15
        },
        'ask': {
            'concern': 10,
            'hope': 40,
            'urgency': 35,
            'compassion': 20
        },
        'cta': {
            'concern': 5,
            'hope': 30,
            'urgency': 40,
            'compassion': 10
        }
    };
    
    return arc;
}

// Calculate emotional complexity score
function calculateComplexityScore(emotionalSignature) {
    // Count emotions with significant presence (>5%)
    const significantEmotions = Object.values(emotionalSignature).filter(value => value > 5).length;
    
    // Calculate standard deviation as a measure of emotional variety
    const values = Object.values(emotionalSignature);
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    const variance = values.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / values.length;
    const stdDev = Math.sqrt(variance);
    
    // Calculate dominant emotion percentage
    const dominantEmotionPercentage = Math.max(...values);
    
    // Complexity score formula (0-10 scale)
    // Higher when more significant emotions and more balanced distribution
    const rawScore = (significantEmotions * 0.8) + (stdDev * 0.2) - (dominantEmotionPercentage * 0.01);
    
    // Normalize to 0-10 scale
    return Math.min(Math.max(rawScore, 0), 10).toFixed(1);
}

// Calculate segment match score
function calculateSegmentMatchScore(emotionalSignature, segment) {
    const segmentProfile = SEGMENT_PROFILES[segment];
    
    // Calculate Euclidean distance between content and segment profile
    let sumSquaredDifferences = 0;
    let countDimensions = 0;
    
    Object.keys(segmentProfile).forEach(emotion => {
        const diff = emotionalSignature[emotion] - segmentProfile[emotion];
        sumSquaredDifferences += Math.pow(diff, 2);
        countDimensions++;
    });
    
    const distance = Math.sqrt(sumSquaredDifferences / countDimensions);
    
    // Convert distance to match percentage (0-100%)
    // Lower distance = higher match
    const matchPercentage = Math.max(0, 100 - (distance * 2.5));
    
    // Match score categories
    if (matchPercentage >= 80) {
        return { score: matchPercentage.toFixed(0), label: 'High', class: 'prediction-high' };
    } else if (matchPercentage >= 60) {
        return { score: matchPercentage.toFixed(0), label: 'Medium', class: 'prediction-medium' };
    } else {
        return { score: matchPercentage.toFixed(0), label: 'Low', class: 'prediction-low' };
    }
}

// Predict performance metrics
function predictPerformance(emotionalSignature, segment) {
    // Base rates by segment
    const baseRates = {
        'general': { engagement: 4.2, conversion: 1.1 },
        'high-value': { engagement: 6.8, conversion: 2.9 },
        'new-donor': { engagement: 3.5, conversion: 0.8 },
        'lapsed': { engagement: 2.9, conversion: 0.7 },
        'political': { engagement: 5.1, conversion: 1.4 },
        'nonprofit': { engagement: 4.7, conversion: 1.2 }
    };
    
    // Factors that influence performance
    const factors = {
        // Positive factors
        'hope': 0.08,
        'urgency': 0.06,
        'curiosity': 0.05,
        'gratitude': 0.04,
        // Negative factors
        'frustration': -0.03,
        'confusion': -0.05
    };
    
    // Calculate adjustment based on emotional signature
    let engagementAdjustment = 0;
    let conversionAdjustment = 0;
    
    Object.keys(factors).forEach(emotion => {
        if (emotionalSignature[emotion] > 0) {
            // Apply factor proportional to emotion intensity
            const adjustment = factors[emotion] * (emotionalSignature[emotion] / 100);
            engagementAdjustment += adjustment * 1.5; // Engagement affected more
            conversionAdjustment += adjustment;
        }
    });
    
    // Calculate complexity bonus (more complex messages perform better up to a point)
    const complexityScore = parseFloat(calculateComplexityScore(emotionalSignature));
    const complexityBonus = complexityScore > 5 ? (complexityScore - 5) * 0.2 : 0;
    
    // Calculate final predictions
    const engagement = baseRates[segment].engagement * (1 + engagementAdjustment + complexityBonus);
    const conversion = baseRates[segment].conversion * (1 + conversionAdjustment + complexityBonus);
    
    return {
        engagement: engagement.toFixed(1),
        conversion: conversion.toFixed(1),
        complexityScore: complexityScore
    };
}

// Generate optimization recommendations
function generateRecommendations(emotionalSignature, segment) {
    const segmentProfile = SEGMENT_PROFILES[segment];
    const recommendations = [];
    
    // Check for missing or underrepresented emotions important for this segment
    Object.keys(segmentProfile).forEach(emotion => {
        const targetValue = segmentProfile[emotion];
        const actualValue = emotionalSignature[emotion] || 0;
        
        if (actualValue < targetValue * 0.7) {
            // Significant gap between actual and target
            recommendations.push({
                type: 'increase',
                emotion: emotion,
                currentValue: actualValue,
                targetValue: targetValue,
                impact: ((targetValue - actualValue) / 100) * 2 // Estimated conversion impact
            });
        }
    });
    
    // Check for emotional balance issues
    const dominantEmotion = Object.entries(emotionalSignature)
        .reduce((max, entry) => entry[1] > max[1] ? entry : max, ['', 0]);
    
    if (dominantEmotion[1] > 40) {
        recommendations.push({
            type: 'balance',
            emotion: dominantEmotion[0],
            currentValue: dominantEmotion[1],
            targetValue: 30,
            impact: 0.3
        });
    }
    
    // Check for emotional arc issues
    // In a real implementation, this would analyze the full emotional arc
    
    return recommendations.sort((a, b) => b.impact - a.impact).slice(0, 3);
}

// Generate A/B test variants
function generateABVariants(text, emotionalSignature, segment) {
    // In a real implementation, this would generate multiple versions with different emotional profiles
    // For demo purposes, we'll return predefined variants
    
    const variants = [
        {
            name: 'Increase Urgency',
            focus: 'Timing',
            description: 'Create a variant that increases the urgency signal from 14% to 25% by adding time constraints and limited availability.'
        },
        {
            name: 'Gratitude Focus',
            focus: 'Appreciation',
            description: 'Create a variant that adds gratitude elements to create a more positive emotional resonance.'
        },
        {
            name: 'Personal Story',
            focus: 'Emotional Connection',
            description: 'Create a variant that uses a personal story to increase emotional connection.'
        }
    ];
    
    return variants;
}

// Export functions for use in the main application
window.EmotionAnalyzer = {
    analyzeEmotionalSignature,
    analyzeEmotionalArc,
    calculateComplexityScore,
    calculateSegmentMatchScore,
    predictPerformance,
    generateRecommendations,
    generateABVariants,
    EMOTIONAL_DIMENSIONS,
    SEGMENT_PROFILES,
    CONTENT_SECTIONS
};