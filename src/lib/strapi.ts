import axios from "axios";
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

const client = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
    ...(API_TOKEN ? { Authorization: `Bearer ${API_TOKEN}` } : {}),
  },
});

async function fetchSingle<T>(
  endpoint: string,
  params?: object
): Promise<T | null> {
  try {
    const { data } = await client.get<StrapiResponse<T>>(endpoint, { params });
    if (!data.data) return null;
    const raw = data.data as StrapiData<T>;
    return raw.attributes;
  } catch {
    return null;
  }
}

async function fetchCollection<T>(
  endpoint: string,
  params?: object
): Promise<(T & { id: number })[]> {
  try {
    const { data } = await client.get<StrapiResponse<T>>(endpoint, { params });
    if (!data.data) return [];
    const raw = data.data as StrapiData<T>[];
    return raw.map((item) => ({ id: item.id, ...item.attributes }));
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
    sort: "category:asc,level:desc",
    "pagination[pageSize]": 100,
  });

export const getExperiences = () =>
  fetchCollection<ExperienceData>("/experiences", {
    sort: "startDate:desc",
    "pagination[pageSize]": 100,
  });

export const getProjects = () =>
  fetchCollection<ProjectData>("/projects", {
    populate: "*",
    sort: "featured:desc",
    "pagination[pageSize]": 100,
  });

export const getContactInfo = () =>
  fetchSingle<ContactInfoData>("/contact-info");

export const getStrapiMedia = (url: string | null | undefined): string => {
  if (!url) return "/placeholder.jpg";
  if (url.startsWith("http")) return url;
  return `${BASE_URL}${url}`;
};
