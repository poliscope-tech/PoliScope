// page.tsx in 'app/' directory of Next.js 13+
import { IOrdinance } from '@/types'
import { FeedPage } from '../../views/FeedPage.client'

// Since we're in Next.js 13 and using app directory, we don't use getServerSideProps or getStaticProps.
// Instead, we use a loader function for server-side data fetching.
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

  // Augment the data as in the working branch before returning it
  const augmentedData = data.map((_in: IOrdinance) => {
    // Add any additional processing needed here
    return {
      ..._in,
      acc_affordable_housing_development_score:
        Number(_in.affordable_housing_development_score) || 0,
      acc_tenant_protections_score: Number(_in.tenant_protections_score) || 0,
      acc_homelessness_and_supportive_housing_score:
        Number(_in.homelessness_and_supportive_housing_score) || 0,
      acc_faster_permitting_process_and_bureaucracy_score:
        Number(_in.faster_permitting_process_and_bureaucracy_score) || 0,
      acc_land_use_and_zoning_reform:
        Number(_in.land_use_and_zoning_reform) || 0,
    }
  })

  return {
    props: { initialOrdinances: augmentedData }, // Correctly pass the augmented data as 'initialOrdinances'
  }
}

// We use the default export as a page component.
export default function Page({ initialOrdinances }) {
  // Pass 'initialOrdinances' directly to 'FeedPage.client'
  return (
    <div className="relative z-0 pt-5">
      <FeedPage initialOrdinances={initialOrdinances} />
    </div>
  )
}
