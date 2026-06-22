import type { Metadata } from 'next'
import { event } from '@/content/site'
import LiveHeader from '@/components/LiveHeader'
import JotformEmbed from '@/components/JotformEmbed'

export const metadata: Metadata = {
  title: `Feedback — ${event.name} ${event.year}`,
  description: `We'd love to hear what you thought of ${event.name} ${event.year}. Share your feedback here.`,
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
