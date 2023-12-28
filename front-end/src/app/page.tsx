'use client'
import { IOrdinance } from '@/types'
import React, { useCallback, useState } from 'react'
import { SlideOutMenu } from '../components/SlideOutMenu'
import { HamburgerIcon } from '../components/HamburgerIcon';
import { FeedPage } from '../../views/FeedPage'

// Type annotation for the avatarEndpoint parameter
async function fetchData(avatarEndpoint: string) {
  const options = {
    headers: {
      'Content-Type': 'application/json',
      apikey: process.env.NEXT_PUBLIC_SUPABASE_KEY!,
    },
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL! + avatarEndpoint

  try {
    const res = await fetch(url, options)
    if (!res.ok) {
      console.error(
        'Failed to fetch data:',
        res.status,
        res.statusText,
        'URL:',
        url,
      )
      throw new Error('Failed to fetch data')
    }
    return res.json()
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}

const scrollToBottom = () => {
  window.scrollTo({
    left: 0,
    top: document.body.scrollHeight,
    behavior: 'smooth',
  })
}

// Function to augment data
function augmentData(rawData: IOrdinance[]) {
  const acc = {
    acc_affordable_housing_development_score: 0,
    acc_tenant_protections_score: 0,
    acc_homelessness_and_supportive_housing_score: 0,
    acc_faster_permitting_process_and_bureaucracy_score: 0,
    acc_land_use_and_zoning_reform: 0,
  }

  return rawData.map((_in: IOrdinance) => {
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
  const [data, setData] = useState<IOrdinance[]>([])
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null)
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setMenuOpen(!menuOpen);
  }, [menuOpen]);

  const handleAvatarClick = useCallback(async (avatarIndex: number) => {
    setSelectedAvatar(avatarIndex) // Update the selected avatar state

    let endpoint = ''
    switch (avatarIndex) {
      case 0:
        endpoint = '/rest/v1/llm_results' // Endpoint for avatar1
        break
      case 1:
        endpoint = '/sample/api/endpoint_for_avatar2' // Sample endpoint for avatar2
        break
      case 2:
        endpoint = '/sample/api/endpoint_for_avatar3' // Sample endpoint for avatar3
        break
      case 3:
        endpoint = '/sample/api/endpoint_for_avatar4' // Sample endpoint for avatar4
        break
      // Add more cases as needed
    }

    if (endpoint) {
      const rawData = await fetchData(endpoint)
      const augmentedData = augmentData(rawData)
      setData(augmentedData)
    }
  }, [])

  return (
    <>
      <HamburgerIcon onClick={toggleMenu} isOpen={menuOpen} />
      <SlideOutMenu isOpen={menuOpen} />
      <div className="">
        <div className="relative z-0 pt-5">
          <FeedPage
            ordinances={data}
            onAvatarClick={handleAvatarClick}
            selectedAvatar={selectedAvatar}
          />
          <button onClick={scrollToBottom} className="scroll-to-bottom-button">
            Scroll to Bottom
          </button>
        </div>
      </div>
    </>
  )
}
