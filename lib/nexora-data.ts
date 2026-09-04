import data from '@/src/data/nexora-data.json';

export type Service = (typeof data.services)[number];
export type Job = (typeof data.jobs)[number];
export type Industry = (typeof data.industries)[number];
export type TeamMember = (typeof data.team)[number];
export type SuccessStory = (typeof data.successStories)[number];
export type BlogPost = (typeof data.blog)[number];
export type Value = (typeof data.values)[number];

export const siteData = data;
export const business = data.business;
export const nav = data.nav;
export const footerLinks = data.footerLinks;
export const images = data.images;
export const partners = data.partners;
export const services = data.services;
export const jobs = data.jobs;
export const industries = data.industries;
export const team = data.team;
export const successStories = data.successStories;
export const blog = data.blog;
export const blogCategories = data.blogCategories;
export const values = data.values;

export function getJobById(id: string): Job | undefined {
  return jobs.find((j) => j.id === id);
}
export function getBlogById(id: string): BlogPost | undefined {
  return blog.find((p) => p.id === id);
}
export function getIndustryById(id: string): Industry | undefined {
  return industries.find((i) => i.id === id);
}
export function getServiceById(id: string): Service | undefined {
  return services.find((s) => s.id === id);
}
