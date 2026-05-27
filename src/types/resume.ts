export type Locale = 'en' | 'es';

export interface ResumeProfile {
  network: string;
  username?: string;
  url: string;
}

export interface ResumeBasics {
  name: string;
  label: string;
  email: string;
  phone?: string;
  url?: string;
  summary: string;
  location?: {
    city?: string;
    country?: string;
  };
  profiles?: ResumeProfile[];
}

export interface ResumeWork {
  name: string;
  position: string;
  startDate: string;
  endDate?: string;
  summary: string;
  highlights?: string[];
}

export interface ResumeEducation {
  institution: string;
  area?: string;
  studyType?: string;
  startDate?: string;
  endDate?: string;
}

export interface ResumeSkill {
  name: string;
  level?: string;
  levelNumeric?: number;
  keywords?: string[];
}

export interface ResumeInterest {
  name: string;
}

export interface Resume {
  basics: ResumeBasics;
  work: ResumeWork[];
  education: ResumeEducation[];
  skills: ResumeSkill[];
  interests: ResumeInterest[];
  meta?: Record<string, string>;
}

export interface UiStrings {
  siteTitle: string;
  siteDescription: string;
  navExperience: string;
  navSkills: string;
  navEducation: string;
  navInterests: string;
  downloadPdf: string;
  downloadPdfAria: string;
  emailAria: string;
  present: string;
  tools: string;
  themeLight: string;
  themeDark: string;
  themeSystem: string;
  themeToggleAria: string;
  languageSwitcherAria: string;
  footerRights: string;
  locationLabel: string;
  phoneLabel: string;
  githubAria: string;
  linkedinAria: string;
  websiteAria: string;
  noticeBanner: string;
  noticeBannerAria: string;
}
