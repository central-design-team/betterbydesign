import Image from 'next/image'
import { partners, partnerLogos } from '@/content/site'
import { img } from '@/lib/img'

export default function Partners() {
  return (
    <section id="partners" className="section-y" aria-labelledby="partners-heading">
      <div className="page-grid items-start">
        <div className="col-span-1 md:col-span-1 lg:col-span-3">
          <h2
            id="partners-heading"
            className="font-semibold text-bbd-black leading-none"
            style={{ fontSize: 'clamp(2rem, 3.5vw, 2.875rem)' }}
          >
            {partners.heading}
          </h2>
          <p
            className="mt-4 text-bbd-black leading-relaxed"
            style={{ fontSize: '18px', maxWidth: '48ch' }}
          >
            {partners.body}
          </p>
          <div className="mt-10 md:mt-48 flex flex-wrap sm:flex-nowrap items-center gap-8 sm:gap-6">
            {partnerLogos.map((logo) => (
              <a
                key={logo.src}
                href={logo.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex-shrink min-w-0"
                aria-label={logo.alt}
              >
                <Image
                  src={img(logo.src)}
                  alt={logo.alt}
                  width={160}
                  height={40}
                  className="w-auto object-contain transition-opacity duration-200 group-hover:opacity-40"
                  style={{ maxHeight: '2.5rem', maxWidth: '160px', width: 'auto' }}
                />
              </a>
            ))}
          </div>
        </div>

        <div className="col-span-1 md:col-span-1 lg:col-span-4" />
      </div>
    </section>
  )
}
