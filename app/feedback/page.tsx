import type { Metadata } from 'next'
import { event } from '@/content/site'
import LiveHeader from '@/components/LiveHeader'
import JotformEmbed from '@/components/JotformEmbed'

const title = `Feedback — ${event.name} ${event.year}`
const description = `We'd love to hear what you thought of ${event.name} ${event.year} — Ireland's public service design conference. Take a moment to share your feedback.`
const ogDescription = `Share your feedback on ${event.name} ${event.year} — Ireland's public service design conference.`
const ogImage = 'images/share-cards/idi-sharecard.png'

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    siteName: event.name,
    description: ogDescription,
    images: [{ url: ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description: ogDescription,
    images: [ogImage],
  },
}

export default function FeedbackPage() {
  return (
    <div className="min-h-screen bg-bbd-black flex flex-col text-white">
      <LiveHeader
        shareTitle={`Feedback — ${event.name} ${event.year}`}
        shareText={`Share your feedback on ${event.name} ${event.year}.`}
      />
      <main className="flex-1 flex flex-col">
        <JotformEmbed formId="261723989741066" />
      </main>
    </div>
  )
}
