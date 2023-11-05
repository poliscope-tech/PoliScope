import { IOrdinance } from '@/types'
import { FeedPage } from '../../views/FeedPage'

async function getData() {
  const options = {
    headers: {
      'Content-Type': 'application/json',
      apikey: process.env.SUPABASE_KEY!,
    },
  }

  const url = process.env.SUPABASE_URL! + '/rest/v1/llm_results'
  const res = await fetch(url, options)

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function Page() {
  const data = await getData()
  const augmentedData = data.map((_in: IOrdinance) => {
    return {
      ..._in,
      affordable_housing_development_score:
        _in.affordable_housing_development_score,
      tenant_protections_score: _in.tenant_protections_score,
      homelessness_and_supportive_housing_score:
        _in.homelessness_and_supportive_housing_score,
      faster_permitting_process_and_bureaucracy_score:
        _in.faster_permitting_process_and_bureaucracy_score,
      land_use_and_zoning_reform: _in.land_use_and_zoning_reform,
    }
  })
  return <FeedPage ordinances={augmentedData} />
}
