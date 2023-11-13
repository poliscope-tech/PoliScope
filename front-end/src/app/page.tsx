// page.tsx in 'app/' directory of Next.js 13+
import { IOrdinance } from '@/types'
import { FeedPage } from '../../views/FeedPage.client'

export default function Page({ data }) {
  return (
    <div className="relative z-0 pt-5">
      <FeedPage initialOrdinances={data} />
    </div>
  )
}

// Loader function for server-side data fetching
export async function loader() {
  const res = await fetch(`${process.env.SUPABASE_URL}/rest/v1/llm_results`, {
    headers: {
      'Content-Type': 'application/json',
      apikey: process.env.SUPABASE_KEY,
    },
  })

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  const data = await res.json()

  // Process and return the data
  const processedData = data.map((_in: IOrdinance) => {
    // Your data processing logic here
    return { ..._in }
  })

  return {
    props: { data: processedData }, // The returned object should have a props key
  }
}
