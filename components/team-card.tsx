'use client';

import Image from 'next/image';
import type { TeamMember } from '@/lib/data';

export function TeamCard({ member }: { member: TeamMember }) {
  return (
    <div className="team-card group h-[430px] [perspective:1200px]">
      <div className="team-card-inner relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        <div className="absolute inset-0 overflow-hidden rounded-2xl border border-beige bg-offwhite shadow-warm [backface-visibility:hidden]">
          <div className="relative h-72 overflow-hidden">
            <Image src={member.image} alt={member.imageAlt} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" />
          </div>
          <div className="p-5">
            <h3 className="font-display text-lg font-bold text-burgundy">{member.name}</h3>
            <p className="text-sm font-semibold text-terracotta">{member.role}</p>
            <p className="mt-2 text-xs text-warmgray">Hover to meet the specialist</p>
          </div>
        </div>
        <div className="absolute inset-0 flex rotate-y-180 flex-col justify-center overflow-hidden rounded-2xl border border-terracotta/30 bg-burgundy p-6 text-offwhite shadow-warm-lg [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-beige">{member.role}</p>
          <h3 className="mt-3 font-display text-2xl font-bold">{member.name}</h3>
          <p className="mt-4 text-sm leading-relaxed text-offwhite/80">{member.bio}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {member.specialties.map((specialty) => <span key={specialty} className="rounded-full bg-offwhite/10 px-3 py-1.5 text-xs text-beige">{specialty}</span>)}
          </div>
        </div>
      </div>
    </div>
  );
}
