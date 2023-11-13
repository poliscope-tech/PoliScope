'use client'

import React, { useCallback, useState } from 'react'
import { IOrdinance } from '@/types'
import { FeedPage } from '../../views/FeedPage'

// Function to fetch data for avatar1
async function fetchAvatar1Data() {
  const options = {
    headers: {
      'Content-Type': 'application/json',
      apikey: process.env.SUPABASE_KEY!,
    },
  }

  // URL for avatar1
  const url = process.env.SUPABASE_URL! + '/rest/v1/llm_results'

  const res = await fetch(url, options)

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

// Function to augment data
function augmentData(rawData) {
  const acc = {
    acc_affordable_housing_development_score: 0,
    acc_tenant_protections_score: 0,
    acc_homelessness_and_supportive_housing_score: 0,
    acc_faster_permitting_process_and_bureaucracy_score: 0,
    acc_land_use_and_zoning_reform: 0,
  }

  return rawData.map((_in) => {
    return {
      ..._in,
      acc_affordable_housing_development_score:
        (acc.acc_affordable_housing_development_score +=
          Number(_in.affordable_housing_development_score) || 0),
      acc_tenant_protections_score: (acc.acc_tenant_protections_score +=
        Number(_in.tenant_protections_score) || 0),
      acc_homelessness_and_supportive_housing_score:
        (acc.acc_homelessness_and_supportive_housing_score +=
          Number(_in.homelessness_and_supportive_housing_score) || 0),
      acc_faster_permitting_process_and_bureaucracy_score:
        (acc.acc_faster_permitting_process_and_bureaucracy_score +=
          Number(_in.faster_permitting_process_and_bureaucracy_score) || 0),
      acc_land_use_and_zoning_reform: (acc.acc_land_use_and_zoning_reform +=
        Number(_in.land_use_and_zoning_reform) || 0),
    }
  })
}

export default function Page() {
  const [data, setData] = useState([])

  // Handle avatar1 click
  const handleAvatar1Click = useCallback(async () => {
    const rawData = await fetchAvatar1Data()
    const augmentedData = augmentData(rawData)
    setData(augmentedData)
  }, [])

  return (
    <>
      <div className="">
        <div className="relative z-0 pt-5">
          {/* Pass the avatar1 click handler to FeedPage */}
          <FeedPage ordinances={data} onAvatarClick={handleAvatar1Click} />
        </div>
      </div>
    </>
  )
}
