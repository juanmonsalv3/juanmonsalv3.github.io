/**
 * One-time migration: converts legacy Jekyll `_data/*.yml` into `data/resume.en.json`.
 * Run from repo root: node scripts/migrate-yaml-to-resume.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dataDir = path.join(root, '_data');

function readYaml(name) {
  const filePath = path.join(dataDir, name);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing ${filePath}. Restore legacy _data YAML files first.`);
  }
  return yaml.load(fs.readFileSync(filePath, 'utf8'));
}

function parseDuration(duration) {
  const cleaned = String(duration).replace(/&mdash;|—/g, '-').trim();
  const [startRaw, endRaw] = cleaned.split('-').map((s) => s.trim());
  const monthMap = {
    jan: '01',
    feb: '02',
    mar: '03',
    apr: '04',
    may: '05',
    jun: '06',
    jul: '07',
    aug: '08',
    sept: '09',
    sep: '09',
    oct: '10',
    nov: '11',
    dec: '12',
  };

  const toIso = (raw) => {
    if (!raw || /present/i.test(raw)) return undefined;
    const parts = raw.replace(',', '').trim().split(/\s+/);
    const month = monthMap[parts[0]?.slice(0, 3).toLowerCase()] ?? '01';
    const year = parts[parts.length - 1];
    return `${year}-${month}`;
  };

  return { startDate: toIso(startRaw), endDate: toIso(endRaw) };
}

function levelToLabel(level) {
  if (level >= 5) return 'Master';
  if (level >= 4) return 'Advanced';
  if (level >= 3) return 'Intermediate';
  return 'Beginner';
}

function stripHtml(text) {
  return String(text).replace(/<br\s*\/?>/gi, ' ').replace(/<[^>]+>/g, '').trim();
}

const experience = readYaml('experience.yml');
const skills = readYaml('skills.yml');
const education = readYaml('education.yml');
const interests = readYaml('interests.yml');

const resume = {
  $schema: 'https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json',
  basics: {
    name: 'Juan Monsalve',
    label: 'Frontend Developer',
    email: 'juanchomonsalve92@gmail.com',
    phone: '+57 3183776216',
    url: 'https://juanmonsalve.dev',
    summary: '',
    location: { city: 'Cartagena', region: 'Bolívar', countryCode: 'CO' },
    profiles: [
      { network: 'GitHub', username: 'juanmonsalv3', url: 'https://github.com/juanmonsalv3' },
      {
        network: 'LinkedIn',
        username: 'monsalvejuan',
        url: 'https://www.linkedin.com/in/monsalvejuan',
      },
    ],
  },
  work: experience.map((job) => {
    const { startDate, endDate } = parseDuration(job.duration);
    return {
      name: job.company,
      position: job.position,
      startDate,
      endDate,
      summary: stripHtml(job.summary),
      highlights: job.tools ?? [],
    };
  }),
  education: education.map((edu) => {
    const { startDate, endDate } = parseDuration(edu.year);
    return {
      institution: edu.uni,
      area: edu.degree,
      studyType: 'Bachelor',
      startDate,
      endDate,
    };
  }),
  skills: skills.map((skill) => ({
    name: skill.skill,
    level: levelToLabel(skill.level),
    levelNumeric: skill.level,
    keywords: [],
  })),
  interests: interests.map((item) => ({ name: item.description })),
  meta: { lastUpdated: new Date().toISOString().slice(0, 10) },
};

const outPath = path.join(root, 'data', 'resume.en.json');
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, `${JSON.stringify(resume, null, 2)}\n`);
console.log(`Wrote ${outPath}`);
