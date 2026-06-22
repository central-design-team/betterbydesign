import Link from 'next/link'
import { event, getWatchLabel } from '@/content/site'
import FluidContainer from '@/components/FluidContainer'
import BlockCanvas from '@/components/BlockCanvas'

function ExternalArrow() {
  return (
    <svg
      aria-hidden="true"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className="inline-block flex-shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
    >
      <path
        d="M3 11L11 3M11 3H5M11 3V9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function DownArrow() {
  return (
    <svg
      aria-hidden="true"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className="flex-shrink-0 transition-transform duration-200 ease-out group-hover:translate-y-1"
    >
      <path
        d="M10 3v14M4 11l6 6 6-6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="flex flex-col"
      style={{ height: '100svh', paddingTop: '56px' }}
      aria-label="Conference introduction"
    >
      <div className="page-x pt-6 flex-1 min-h-[50svh]" style={{ paddingBottom: '20px' }}>
        <div className="page-grid !px-0 items-stretch h-full" style={{ fontSize: '18px' }}>

          {/* Title — first on mobile; right col on tablet; right 4 cols on desktop */}
          <FluidContainer className="order-1 sm:col-start-2 sm:row-start-1 lg:col-span-4 lg:col-start-4 lg:row-start-1 lg:-mt-6 hero-animate hero-animate-1">
            <h1>
              <p className="fluid-display text-bbd-black leading-none">{event.name}</p>
              <p className="fluid-display-light text-bbd-black leading-none">{event.year}</p>
            </h1>
          </FluidContainer>

          {/* Tagline — second on mobile; left col row 1 on tablet/desktop */}
          <div className="order-2 sm:col-start-1 sm:row-start-1 lg:col-span-3 lg:col-start-1 lg:row-start-1 mt-4 sm:mt-0 hero-animate hero-animate-2">
            <p className="font-normal text-bbd-black leading-snug">
              {event.tagline}
              <br />
              {event.subtag}
            </p>
          </div>

          {/* Tickets / Watch Live — third on mobile; left col row 2 on tablet/desktop */}
          <div className="order-3 sm:col-start-1 sm:row-start-2 lg:col-span-3 lg:col-start-1 lg:row-start-2 flex items-end hero-animate hero-animate-3">
            <Link
              href="/live"
              className="group inline-flex items-center gap-2 underline decoration-1 underline-offset-[0.15em] hover:decoration-2 transition-all duration-200 ease-out w-fit"
            >
              {event.isLive && (
                <span className="relative flex h-2 w-2 flex-shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00A432] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00A432]" />
                </span>
              )}
              {getWatchLabel()}
            </Link>
          </div>

          {/* Keynotes CTA — fourth on mobile; right col row 2 on tablet; right 4 cols row 2 on desktop */}
          <div className="order-4 sm:col-start-2 sm:row-start-2 lg:col-span-4 lg:col-start-4 lg:row-start-2 flex items-end hero-animate hero-animate-4">
            <a
              href="#keynotes"
              className="group flex items-center justify-between w-full underline decoration-1 underline-offset-[0.15em] hover:decoration-2 transition-all duration-200 ease-out mt-6 lg:mt-0"
            >
              <span>Keynotes</span>
              <DownArrow />
            </a>
          </div>

        </div>
      </div>

      {/* Canvas — capped at 50vh on mobile with auto top-margin for breathing room; fills remaining on sm+ */}
      <div id="hero-graphic" className="flex-1 max-h-[40svh] sm:max-h-none w-full overflow-hidden">
        <BlockCanvas style={{ width: '100%', height: '100%' }} />
      </div>
    </section>
  )
}
