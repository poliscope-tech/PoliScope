import { IOrdinance } from '@/types'
import { FeedPage } from '../../views/FeedPage'

//RIGHT SIDE OF PAGE

//API SECTION
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

//END OF API CODE

const Avatars = () => {
  return (
    <div className="absolute right-40 top-0 z-50 flex items-start justify-end">
      <div className="mr-2 mt-8 flex space-x-6 p-4 shadow-lg">
        <img
          src="/images/health.png"
          alt="Healthcare Avatar"
          className="h-16 w-16 rounded-full border-2 border-white object-contain shadow-lg"
        />
        <img
          src="/images/educ.png"
          alt="Education Avatar"
          className="h-16 w-16 rounded-full border-2 border-white object-contain shadow-lg"
        />
        <img
          src="/images/house.png"
          alt="Housing Avatar"
          className="h-16 w-16 rounded-full border-2 border-white object-contain shadow-lg"
        />
        <img
          src="/images/envir.png"
          alt="Environment Avatar"
          className="h-16 w-16 rounded-full border-2 border-white object-contain shadow-lg"
        />
      </div>
    </div>
  )
}

export default async function Page() {
  const data = await getData()
  const acc: Partial<IOrdinance> = {
    acc_affordable_housing_development_score: 0,
    acc_tenant_protections_score: 0,
    acc_homelessness_and_supportive_housing_score: 0,
    acc_faster_permitting_process_and_bureaucracy_score: 0,
    acc_land_use_and_zoning_reform: 0,
  }

  const augmentedData = data.map((_in: IOrdinance) => {
    const val = {
      ..._in,
      affordable_housing_development_score:
        _in.affordable_housing_development_score,
      tenant_protections_score: _in.tenant_protections_score,
      homelessness_and_supportive_housing_score:
        _in.homelessness_and_supportive_housing_score,
      faster_permitting_process_and_bureaucracy_score:
        _in.faster_permitting_process_and_bureaucracy_score,
      land_use_and_zoning_reform: _in.land_use_and_zoning_reform,

      acc_affordable_housing_development_score:
        (acc.acc_affordable_housing_development_score! +=
          Number(_in.affordable_housing_development_score) || 0),

      acc_tenant_protections_score: (acc.acc_tenant_protections_score! +=
        Number(acc.tenant_protections_score) || 0),

      acc_homelessness_and_supportive_housing_score:
        (acc.acc_homelessness_and_supportive_housing_score! +=
          Number(_in.homelessness_and_supportive_housing_score) || 0),

      acc_faster_permitting_process_and_bureaucracy_score:
        (acc.acc_faster_permitting_process_and_bureaucracy_score! +=
          Number(_in.faster_permitting_process_and_bureaucracy_score) || 0),

      acc_land_use_and_zoning_reform: (acc.acc_land_use_and_zoning_reform! +=
        Number(_in.land_use_and_zoning_reform) || 0),
    }
    // acc.acc_land_use_and_zoning_reform = acc.acc
    return val
  })

  return (
    <>
      <div className="">
        <Avatars /> {/* Avatars with a solid background and higher z-index */}
        {/* The main content with a lower z-index to allow it to slide under the Avatars */}
        <div className="relative z-0 pt-5">
          <FeedPage ordinances={augmentedData} />
        </div>
      </div>
    </>
  )
}
