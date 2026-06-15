import Image from 'next/image'
import Link from 'next/link'
import { panellists, panellistsIntro, speakerProfiles, type Panellist } from '@/content/site'
import { img } from '@/lib/img'
import FadeIn from '@/components/FadeIn'

function PanellistCard({ slug, name, role, organisation, image, aspectClass = 'aspect-[11/16]' }: Panellist & { aspectClass?: string }) {
  const hasBio = !!speakerProfiles[slug]?.bio

  return (
    <Link href={`/?panel=speaker&id=${slug}`} scroll={false} className="group flex flex-col">
      {/* Image */}
      <div className="relative mb-4 flex-shrink-0 w-full sm:w-[70%]">
        {hasBio && (
          <div className="absolute bottom-0 right-0 z-10 w-6 h-6 bg-[#8D844E] flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M9 18l6-6-6-6" stroke="#1E1E1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        )}
        <div
          className={`w-full overflow-hidden transition-opacity duration-200 group-hover:opacity-80 ${aspectClass}`}
          style={{ backgroundColor: '#EEECEA' }}
        >
          {image ? (
            <Image
              src={img(image)}
              alt={name}
              width={550}
              height={800}
              className="w-full h-full object-cover"
              style={{ filter: 'grayscale(100%) sepia(50%) hue-rotate(5deg) saturate(60%) brightness(90%)' }}
            />
          ) : (
            <div className="w-full h-full" aria-hidden="true" />
          )}
        </div>
      </div>

      <p className="font-semibold leading-snug text-bbd-black" style={{ fontSize: '18px' }}>
        {name}
      </p>
      <p className="mt-1 text-bbd-black text-pretty" style={{ fontSize: '14px', maxWidth: '90%' }}>
        {role}{organisation ? `, ${organisation}` : ''}
      </p>
    </Link>
  )
}

export default function Panellists() {
  return (
    <section
      id="panellists"
      className="section-y pb-12 sm:pb-32"
      aria-labelledby="panellists-heading"
    >
      <div className="page-grid items-start">
        {/* Left: intro — sticks while grid scrolls */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3 lg:sticky" style={{ top: '76px', alignSelf: 'start' }}>
          <FadeIn>
            <h2
              id="panellists-heading"
              className="font-semibold text-bbd-black leading-none"
              style={{ fontSize: 'clamp(2rem, 3.5vw, 2.875rem)' }}
            >
              Panellists
            </h2>
          </FadeIn>
          <FadeIn delay={80}>
            <p
              className="mt-4 text-bbd-black leading-relaxed"
              style={{ fontSize: '18px', maxWidth: '40ch' }}
            >
              {panellistsIntro}
            </p>
          </FadeIn>
          <FadeIn delay={140}>
            <Link
              href="/?panel=agenda"
              scroll={false}
              className="group inline-flex items-center gap-2 mt-6 underline decoration-1 underline-offset-[0.15em] hover:decoration-2 transition-all duration-200 ease-out text-bbd-black"
              style={{ fontSize: '18px' }}
            >
              View Agenda
            </Link>
          </FadeIn>
        </div>

        {/* Right: cards */}
        <div className="col-span-1 md:col-span-2 lg:col-span-4 xl:col-span-3 mt-10 lg:mt-0">

          <ul
            className="grid grid-cols-2 sm:grid-cols-3 gap-x-5 gap-y-12 list-none m-0 p-0"
            role="list"
          >
            {panellists.map((person, i) => (
              <li key={person.id}>
                <FadeIn delay={i * 40}>
                  <PanellistCard {...person} />
                </FadeIn>
              </li>
            ))}
          </ul>

        </div>
      </div>
    </section>
  )
}
