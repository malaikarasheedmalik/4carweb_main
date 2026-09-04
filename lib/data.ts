import data from '@/src/data/fixpoint-data.json';

export type Service = (typeof data.services)[number];
export type TeamMember = (typeof data.team)[number];
export type Testimonial = (typeof data.testimonials)[number];
export type Faq = (typeof data.faqs)[number];
export type PricingCategory = (typeof data.pricing)[number];

export const siteData = data;
export const business = data.business;
export const services = data.services;
export const team = data.team;
export const testimonials = data.testimonials;
export const faqs = data.faqs;
export const pricing = data.pricing;
export const nav = data.nav;
export const images = data.images;

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
