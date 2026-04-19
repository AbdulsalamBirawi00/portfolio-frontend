import type { StrapiResponse, StrapiData } from "@/types/strapi";
import type {
  HeroData,
  AboutData,
  SkillData,
  ExperienceData,
  ProjectData,
  ContactInfoData,
} from "@/types";

const BASE_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";
const API_TOKEN = process.env.STRAPI_API_TOKEN ?? "";

const defaultHeaders: HeadersInit = {
  "Content-Type": "application/json",
  ...(API_TOKEN ? { Authorization: `Bearer ${API_TOKEN}` } : {}),
};

function buildUrl(endpoint: string, params?: Record<string, string | number>): string {
  const url = new URL(`${BASE_URL}/api${endpoint}`);
  if (params) {
    Object.entries(params).forEach(([k, v]) =>
      url.searchParams.set(k, String(v))
    );
  }
  return url.toString();
}

async function fetchSingle<T>(
  endpoint: string,
  params?: Record<string, string | number>
): Promise<T | null> {
  try {
    const res = await fetch(buildUrl(endpoint, params), {
      headers: defaultHeaders,
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const json: StrapiResponse<T> = await res.json();
    if (!json.data) return null;
    return (json.data as StrapiData<T>).attributes;
  } catch {
    return null;
  }
}

async function fetchCollection<T>(
  endpoint: string,
  params?: Record<string, string | number>
): Promise<(T & { id: number })[]> {
  try {
    const res = await fetch(buildUrl(endpoint, params), {
      headers: defaultHeaders,
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const json: StrapiResponse<T> = await res.json();
    if (!json.data) return [];
    return (json.data as StrapiData<T>[]).map((item) => ({
      id: item.id,
      ...item.attributes,
    }));
  } catch {
    return [];
  }
}

export const getHero = () =>
  fetchSingle<HeroData>("/hero", { populate: "*" });

export const getAbout = () =>
  fetchSingle<AboutData>("/about", { populate: "*" });

export const getSkills = () =>
  fetchCollection<SkillData>("/skills", {
    "sort": "category:asc,level:desc",
    "pagination[pageSize]": 100,
  });

export const getExperiences = () =>
  fetchCollection<ExperienceData>("/experiences", {
    "sort": "startDate:desc",
    "pagination[pageSize]": 100,
  });

export const getProjects = () =>
  fetchCollection<ProjectData>("/projects", {
    populate: "*",
    "sort": "featured:desc",
    "pagination[pageSize]": 100,
  });

export const getContactInfo = () =>
  fetchSingle<ContactInfoData>("/contact-info");

export const getStrapiMedia = (url: string | null | undefined): string => {
  if (!url) return "/placeholder.jpg";
  if (url.startsWith("http")) return url;
  return `${BASE_URL}${url}`;
};
