// page.tsx in 'app/' directory of Next.js 13+
import { IOrdinance } from '@/types'
import { FeedPage } from '../../views/FeedPage.client'

export default function Page({ initialOrdinances }) {
  // Ensure the prop passed to FeedPage is named 'initialOrdinances'
  return (
    <div className="relative z-0 pt-5">
      <FeedPage initialOrdinances={initialOrdinances} />
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
  // You can add any data processing logic here if needed before passing it to the component
  const processedData = data.map((_in: IOrdinance) => {
    // Example data processing logic
    return { ..._in }
  })

  // The object returned here has a 'props' key that contains all the data
  // needed by the page component. Make sure the key name here matches
  // the expected prop name in the page component.
  return {
    props: { initialOrdinances: processedData }, // Ensure this matches the Page component's prop
  }
}
