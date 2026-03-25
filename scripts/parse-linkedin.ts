#!/usr/bin/env tsx
/**
 * LinkedIn Data Export Parser
 *
 * This script parses a LinkedIn data export ZIP file and generates
 * a clean profile.json file for the portfolio website.
 *
 * Usage: npx tsx scripts/parse-linkedin.ts linkedin-export.zip
 *    or: npm run parse-linkedin linkedin-export.zip
 */

import * as fs from 'fs';
import * as path from 'path';
import AdmZip from 'adm-zip';
import { parse } from 'csv-parse/sync';

interface Profile {
  name: string;
  headline: string;
  subheadline: string;
  location: string;
  about: string;
  profileUrl: string;
  githubUrl: string;
  email: string;
  stats: { label: string; value: string }[];
  experience: Experience[];
  education: Education[];
  skills: Record<string, string[]>;
  projects: Project[];
}

interface Experience {
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string[];
}

interface Education {
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
}

interface Project {
  name: string;
  description: string;
  tech: string[];
  github: string;
  live: string;
}

function parseCSV(buffer: Buffer): Record<string, string>[] {
  const content = buffer.toString('utf-8');
  const records = parse(content, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  });
  return records as Record<string, string>[];
}

function extractName(profileData: Record<string, string>[]): string {
  if (profileData.length === 0) return 'Your Name';
  const record = profileData[0];
  const firstName = record['First Name'] || record['firstName'] || '';
  const lastName = record['Last Name'] || record['lastName'] || '';
  return `${firstName} ${lastName}`.trim() || 'Your Name';
}

function extractHeadline(profileData: Record<string, string>[]): string {
  if (profileData.length === 0) return 'Software Engineer';
  const record = profileData[0];
  return record['Headline'] || record['headline'] || 'Software Engineer';
}

function extractLocation(profileData: Record<string, string>[]): string {
  if (profileData.length === 0) return '';
  const record = profileData[0];
  return record['Country'] || record['country'] || record['City'] || record['city'] || '';
}

function extractAbout(profileData: Record<string, string>[]): string {
  if (profileData.length === 0) return '';
  const record = profileData[0];
  return record['Summary'] || record['summary'] || record['About'] || record['about'] || '';
}

function parseExperience(positionsData: Record<string, string>[]): Experience[] {
  return positionsData.map((record) => ({
    company: record['Company Name'] || record['companyName'] || '',
    role: record['Title'] || record['title'] || '',
    startDate: record['Start Date'] || record['startDate'] || '',
    endDate: record['End Date'] || record['endDate'] || 'Present',
    description: record['Description'] || record['description']
      ? [record['Description'] || record['description']]
      : [],
  }));
}

function parseEducation(educationData: Record<string, string>[]): Education[] {
  return educationData.map((record) => ({
    institution: record['School Name'] || record['schoolName'] || '',
    degree: `${record['Degree Name'] || record['degreeName'] || ''} - ${record['Field of Study'] || record['fieldOfStudy'] || ''}`.trim(),
    startDate: record['Start Date'] || record['startDate'] || '',
    endDate: record['End Date'] || record['endDate'] || '',
  }));
}

function parseSkills(skillsData: Record<string, string>[]): Record<string, string[]> {
  const skillsByCategory: Record<string, string[]> = {
    'Skills': [],
  };

  skillsData.forEach((record) => {
    const skill = record['Name'] || record['name'] || '';
    if (skill) {
      skillsByCategory['Skills'].push(skill);
    }
  });

  return skillsByCategory;
}

async function parseLinkedInExport(zipPath: string): Promise<void> {
  const outputPath = path.join(process.cwd(), 'src', 'data', 'profile.json');

  console.log(`📂 Reading LinkedIn export: ${zipPath}`);

  if (!fs.existsSync(zipPath)) {
    console.error(`❌ File not found: ${zipPath}`);
    console.error(`\n💡 Make sure the file path is correct.`);
    console.error(`   Example: npx tsx scripts/parse-linkedin.ts ~/Downloads/LinkedIn-Export.zip`);
    process.exit(1);
  }

  const zip = new AdmZip(zipPath);
  const zipEntries = zip.getEntries();

  let profileData: Record<string, string>[] = [];
  let positionsData: Record<string, string>[] = [];
  let educationData: Record<string, string>[] = [];
  let skillsData: Record<string, string>[] = [];

  zipEntries.forEach((entry) => {
    const entryName = entry.entryName.toLowerCase();

    if (entryName.includes('profile.csv')) {
      profileData = parseCSV(entry.getData());
      console.log(`✓ Parsed profile.csv (${profileData.length} records)`);
    } else if (entryName.includes('position.csv') || entryName.includes('positions.csv')) {
      positionsData = parseCSV(entry.getData());
      console.log(`✓ Parsed positions.csv (${positionsData.length} records)`);
    } else if (entryName.includes('education.csv')) {
      educationData = parseCSV(entry.getData());
      console.log(`✓ Parsed education.csv (${educationData.length} records)`);
    } else if (entryName.includes('skill.csv') || entryName.includes('skills.csv')) {
      skillsData = parseCSV(entry.getData());
      console.log(`✓ Parsed skills.csv (${skillsData.length} records)`);
    }
  });

  if (profileData.length === 0 && positionsData.length === 0 && educationData.length === 0) {
    console.error(`❌ No LinkedIn data found in the ZIP file.`);
    console.error(`\n💡 Make sure this is a valid LinkedIn data export.`);
    console.error(`   The ZIP should contain CSV files like: profile.csv, positions.csv, education.csv`);
    process.exit(1);
  }

  const experience = parseExperience(positionsData);

  const profile: Profile = {
    name: extractName(profileData),
    headline: extractHeadline(profileData),
    subheadline: 'Building scalable systems and clean experiences.',
    location: extractLocation(profileData),
    about: extractAbout(profileData) || 'Passionate software engineer dedicated to building innovative solutions.',
    profileUrl: '',
    githubUrl: '',
    email: '',
    stats: [
      { label: 'Years coding', value: experience.length > 0 ? `${Math.max(...experience.map(e => {
        const startYear = parseInt(e.startDate.split(' ').pop() || '0');
        return new Date().getFullYear() - startYear;
      }))}+` : '0+' },
      { label: 'Companies', value: experience.length.toString() },
      { label: 'Projects shipped', value: '0+' },
    ],
    experience: experience,
    education: parseEducation(educationData),
    skills: parseSkills(skillsData),
    projects: [],
  };

  // Ensure output directory exists
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write profile.json
  fs.writeFileSync(outputPath, JSON.stringify(profile, null, 2));
  console.log(`\n✅ Profile data written to: ${outputPath}`);
  console.log(`\n📊 Summary:`);
  console.log(`   Name: ${profile.name}`);
  console.log(`   Headline: ${profile.headline}`);
  console.log(`   Location: ${profile.location || 'Not specified'}`);
  console.log(`   Experience: ${profile.experience.length} positions`);
  console.log(`   Education: ${profile.education.length} entries`);
  console.log(`   Skills: ${Object.values(profile.skills).flat().length} total`);

  console.log(`\n📝 Next steps:`);
  console.log(`   1. Open src/data/profile.json and add:`);
  console.log(`      • Your LinkedIn profile URL (profileUrl)`);
  console.log(`      • Your GitHub URL (githubUrl)`);
  console.log(`      • Your email (email)`);
  console.log(`      • Project details (projects array)`);
  console.log(`      • Customize stats values`);
  console.log(`   2. Run: npm run dev`);
}

// Main execution
const zipPath = process.argv[2];

if (!zipPath) {
  console.error('❌ Please provide the path to your LinkedIn export ZIP file');
  console.error('');
  console.error('📝 Usage:');
  console.error('   npx tsx scripts/parse-linkedin.ts <path-to-linkedin-export.zip>');
  console.error('   npm run parse-linkedin <path-to-linkedin-export.zip>');
  console.error('');
  console.error('📥 To download your LinkedIn data:');
  console.error('   1. Go to LinkedIn → Settings & Privacy');
  console.error('   2. Click "Data privacy" → "Get a copy of your data"');
  console.error('   3. Select "Download larger data archive"');
  console.error('   4. Wait for the email with your download link (can take 10+ minutes)');
  console.error('   5. Download and extract the ZIP file');
  console.error('');
  console.error('💡 Example:');
  console.error('   npx tsx scripts/parse-linkedin.ts ~/Downloads/LinkedIn-Export.zip');
  process.exit(1);
}

parseLinkedInExport(zipPath).catch((error) => {
  console.error('❌ Error parsing LinkedIn export:', error);
  process.exit(1);
});
