import { Layout } from '@/components/Layout'
import { Ordinance } from '@/components/Ordinance'
import { IOrdinance } from '@/types'

async function getData() {
  const options = {
    headers: {
      'Content-Type': 'application/json',
      apikey: process.env.SUPABASE_KEY!,
    },
  }

  const url = process.env.SUPABASE_URL! + '/rest/v1/politicians'
  const res = await fetch(url, options)

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function FeedPage() {
  const data = await getData()
  const augmentedData = data.map((_in: IOrdinance) => {
    return {
      ..._in,
      affordable_housing_development_score: Math.random(),
      tenant_protections_score: Math.random(),
      homelessness_and_supportive_housing_score: Math.random(),
      faster_permitting_process_and_bureaucracy_score: Math.random(),
      land_use_and_zoning_reform: Math.random(),
    }
  })
  return (
    <Layout>
      {augmentedData.slice(0, 50).map((ordinance: any) => (
        <Ordinance key={ordinance.id} ordinance={ordinance} />
      ))}
    </Layout>
  )
}
