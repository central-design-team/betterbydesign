import Image from 'next/image'
import Link from 'next/link'
import { agenda, speakerProfiles, type AgendaItem } from '@/content/site'
import { img } from '@/lib/img'

// ─── Type label map ────────────────────────────────────────────────────────────
const TYPE_LABELS: Record<AgendaItem['type'], string> = {
  registration: 'Registration',
  break:        'Break',
  lunch:        'Lunch',
  welcome:      'Welcome',
  address:      'Opening Address',
  ministerial:  'Ministerial Welcome',
  keynote:      'Keynote',
  panel:        'Panel',
  closing:      'Closing Remarks',
}

const SIMPLE_TYPES     = new Set<AgendaItem['type']>(['registration', 'break', 'lunch'])
const LABEL_ONLY_TYPES = new Set<AgendaItem['type']>(['keynote', 'welcome', 'address', 'ministerial', 'closing'])

// ─── Speaker name button ───────────────────────────────────────────────────────
function SpeakerLink({ slug, showImage }: { slug: string; showImage: boolean }) {
  const profile = speakerProfiles[slug]
  if (!profile) return null
  const hasBio = !!profile.bio

  const inner = (
    <>
      {showImage && profile.image && (
        <div className="relative w-12 h-12 rounded-full overflow-hidden mb-2 flex-shrink-0" style={{ backgroundColor: '#EEECEA' }}>
          <Image
            src={img(profile.image)}
            alt={profile.name}
            fill
            className="object-cover"
            style={{ filter: 'grayscale(100%) sepia(50%) hue-rotate(5deg) saturate(60%) brightness(90%)', objectPosition: profile.avatarPosition ?? 'center' }}
            unoptimized
          />
        </div>
      )}
      <span className={`block font-semibold text-white text-[15px] md:text-[17px] leading-snug${hasBio ? ' group-hover:text-[#00A432] transition-colors duration-150' : ''}`}>
        {profile.name}
      </span>
      <span className={`block text-[12px] md:text-[13px] leading-snug mt-0.5 transition-colors duration-150 ${hasBio ? 'text-white/60 group-hover:text-white/80' : 'text-white/60'}`}>
        {profile.role}{profile.organisation ? `, ${profile.organisation}` : ''}
      </span>
    </>
  )

  if (!hasBio) return <div>{inner}</div>

  return (
    <Link href={`?panel=agenda&speaker=${slug}`} scroll={false} className="group block">
      {inner}
    </Link>
  )
}

// ─── Single agenda row ─────────────────────────────────────────────────────────
function AgendaRow({ item, showImages }: { item: AgendaItem; showImages: boolean }) {
  const isSimple     = SIMPLE_TYPES.has(item.type)
  const isPanel      = item.type === 'panel'
  const isLabelOnly  = LABEL_ONLY_TYPES.has(item.type)
  const speakerCount = item.speakers?.length ?? 0
  const useGrid      = isPanel || speakerCount >= 2

  return (
    <div className="flex items-baseline gap-5 md:gap-8 py-6 border-b border-white/10 last:border-0">
      {/* Time */}
      <div className="flex-shrink-0 text-[#00A432] tabular-nums text-[12px] font-semibold w-[42px]">
        {item.time}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {!isSimple && (
          <div className="text-[#00A432] uppercase tracking-widest mb-1.5" style={{ fontSize: '10px', fontWeight: 600 }}>
            {TYPE_LABELS[item.type]}
          </div>
        )}

        {!isLabelOnly && (
          <>
            <div className="font-semibold text-white leading-snug" style={{ fontSize: isPanel ? '20px' : '17px' }}>
              {item.title}
            </div>
            {item.subtitle && (
              <div
                className={`mt-0.5 ${isSimple ? 'text-white/60' : 'text-white'}`}
                style={{ fontSize: isPanel ? '20px' : '15px', fontWeight: 400 }}
              >
                {item.subtitle}
              </div>
            )}
          </>
        )}

        {item.moderator && speakerProfiles[item.moderator] && (
          <div className="mt-4">
            <div className="text-[#00A432] uppercase tracking-widest mb-3" style={{ fontSize: '10px', fontWeight: 600 }}>
              Moderator
            </div>
            <SpeakerLink slug={item.moderator} showImage={showImages} />
          </div>
        )}

        {item.speakers && item.speakers.length > 0 && (
          <div className={`mt-4 ${useGrid ? 'grid grid-cols-2 gap-x-6 gap-y-4' : 'flex flex-col gap-2'}`}>
            {item.speakers.map((slug) => (
              <SpeakerLink key={slug} slug={slug} showImage={showImages} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Full agenda list ──────────────────────────────────────────────────────────
export default function AgendaList({ showImages = false }: { showImages?: boolean }) {
  return (
    <div>
      {agenda.map((item, i) => (
        <AgendaRow key={i} item={item} showImages={showImages} />
      ))}
    </div>
  )
}
