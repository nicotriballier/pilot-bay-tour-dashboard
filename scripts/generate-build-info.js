#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function generateBuildInfo() {
  try {
    // Read package.json for version
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const version = packageJson.version;

    // Get git commit hash (short)
    let gitHash = 'unknown';
    try {
      gitHash = execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim();
    } catch (error) {
      console.warn('Could not get git hash:', error.message);
    }

    // Get git branch
    let gitBranch = 'unknown';
    try {
      gitBranch = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8' }).trim();
    } catch (error) {
      console.warn('Could not get git branch:', error.message);
    }

    // Get build timestamp
    const buildDate = new Date().toISOString();
    const buildDateFormatted = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    });

    const buildInfo = {
      version,
      gitHash,
      gitBranch,
      buildDate,
      buildDateFormatted,
      nodeVersion: process.version,
      environment: process.env.NODE_ENV || 'development'
    };

    // Write to public directory so it's accessible at runtime
    const outputPath = path.join('public', 'build-info.json');
    fs.writeFileSync(outputPath, JSON.stringify(buildInfo, null, 2));

    console.log('✅ Build info generated:', buildInfo);
    
    return buildInfo;
  } catch (error) {
    console.error('❌ Error generating build info:', error);
    
    // Create fallback build info
    const fallbackInfo = {
      version: '0.1.0',
      gitHash: 'unknown',
      gitBranch: 'unknown',
      buildDate: new Date().toISOString(),
      buildDateFormatted: new Date().toLocaleDateString('en-US'),
      nodeVersion: process.version,
      environment: 'development'
    };
    
    const outputPath = path.join('public', 'build-info.json');
    fs.writeFileSync(outputPath, JSON.stringify(fallbackInfo, null, 2));
    
    return fallbackInfo;
  }
}

// Run if called directly
if (require.main === module) {
  generateBuildInfo();
}

module.exports = generateBuildInfo;
