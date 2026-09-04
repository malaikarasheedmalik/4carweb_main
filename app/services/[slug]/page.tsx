import { notFound } from 'next/navigation';
import { services, getServiceBySlug } from '@/lib/data';
import { ServiceDetail } from './service-detail';

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export default function ServiceDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const service = getServiceBySlug(params.slug);
  if (!service) notFound();
  return <ServiceDetail service={service} />;
}
