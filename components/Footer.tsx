import Image from 'next/image'
import { event, social, footerDescription, partnerLogos } from '@/content/site'
import { img } from '@/lib/img'
import FluidContainer from '@/components/FluidContainer'
import FadeIn from '@/components/FadeIn'

// ─── Social icons ──────────────────────────────────────────────────────────────

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function YouTubeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
    </svg>
  )
}

const iconMap = {
  Instagram: InstagramIcon,
  LinkedIn: LinkedInIcon,
  YouTube: YouTubeIcon,
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Footer() {
  return (
    <footer id="footer" className="bg-white text-bbd-black" role="contentinfo">

      {/* Non-flush black rule */}
      <div className="page-x pt-4">
        <div className="border-t border-bbd-black" />
      </div>

      {/* Top row — description + social */}
      <div className="section-y page-grid items-start">
        {/* Left: descriptive text */}
        <div className="col-span-1 md:col-span-3 lg:col-span-3 xl:col-span-2">
          <FadeIn>
            <p className="text-bbd-black leading-relaxed" style={{ fontSize: '18px' }}>
              {footerDescription.intro}
              <a
                href={footerDescription.org1.href}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-1 underline-offset-[0.15em]"
              >
                {footerDescription.org1.label}
              </a>
              {footerDescription.mid1}
              <a
                href={footerDescription.org2.href}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-1 underline-offset-[0.15em]"
              >
                {footerDescription.org2.label}
              </a>
              {footerDescription.mid2}
              <a
                href={footerDescription.org3.href}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-1 underline-offset-[0.15em]"
              >
                {footerDescription.org3.label}
              </a>
              {footerDescription.end}
            </p>
          </FadeIn>
        </div>

        {/* Right: social icons */}
        <div className="col-span-1 md:col-span-1 lg:col-span-4 xl:col-span-5 flex justify-start md:justify-end items-start mt-4 lg:mt-0">
          <FadeIn delay={80}>
            <nav aria-label="Social media">
              <ul className="flex items-center gap-5 list-none m-0 p-0">
                {social.map(({ platform, href, label }) => {
                  const Icon = iconMap[platform]
                  return (
                    <li key={platform}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="text-bbd-black hover:opacity-50 transition-opacity duration-200 ease-out block"
                      >
                        <Icon />
                      </a>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </FadeIn>
        </div>
      </div>

      {/* Bottom row — large logotype left, partner logos bottom-right */}
      <div className="page-x pt-8 md:pt-24 pb-4 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 sm:gap-8">
        <FadeIn delay={120} className="min-w-0 flex-auto">
          <FluidContainer>
            <p className="fluid-display text-bbd-black leading-none">{event.name}</p>
            <p className="fluid-display-light text-bbd-black leading-none" style={{ marginBottom: '-0.18em' }}>{event.year}</p>
          </FluidContainer>
        </FadeIn>

        <FadeIn delay={200} className="self-end flex flex-wrap items-end gap-6">
          {partnerLogos.map((logo) => (
            <a
              key={logo.src}
              href={logo.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={logo.alt}
              className="opacity-100 hover:opacity-40 transition-opacity duration-200"
            >
              <Image
                src={img(logo.src)}
                alt={logo.alt}
                width={200}
                height={40}
                className="w-auto object-contain"
                style={{ maxHeight: '3rem', maxWidth: '200px', width: 'auto' }}
              />
            </a>
          ))}
        </FadeIn>
      </div>

    </footer>
  )
}
