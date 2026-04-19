import type { StrapiMedia } from "./strapi";

export type { StrapiMedia };

export interface HeroData {
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
}

export interface AboutData {
  bio: string;
  photo: StrapiMedia;
  highlights: Array<{ label: string; value: string }>;
}

export interface SkillData {
  id?: number;
  name: string;
  category: "frontend" | "backend" | "language" | "tool" | "mobile";
  level: number;
  icon: string;
}

export interface ExperienceData {
  id?: number;
  company: string;
  role: string;
  startDate: string;
  endDate: string | null;
  description: string;
  location: string;
}

export interface ProjectData {
  id?: number;
  title: string;
  description: string;
  tags: string[];
  image: StrapiMedia;
  liveUrl: string | null;
  githubUrl: string | null;
  featured: boolean;
}

export interface ContactInfoData {
  email: string;
  phone: string;
  linkedin: string;
  github: string;
}

export interface ContactFormPayload {
  name: string;
  email: string;
  message: string;
}
