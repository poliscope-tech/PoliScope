'use client'

import React, { useCallback, useState } from 'react'
import { IOrdinance } from '@/types'
import { SlideOutMenu } from '../components/SlideOutMenu'
import { HamburgerIcon } from '../components/HamburgerIcon'
import { FeedPage } from '../../views/FeedPage'

async function fetchData(avatarEndpoint: string) {
  const options = {
    headers: {
      'Content-Type': 'application/json',
      apikey: process.env.NEXT_PUBLIC_SUPABASE_KEY!,
    },
  }

  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}${avatarEndpoint}`
  console.log('Fetching data from URL:', url)

  try {
    const res = await fetch(url, options)
    if (!res.ok) {
      console.error('Failed to fetch data:', res.status, res.statusText, 'URL:', url)
      throw new Error('Failed to fetch data')
    }
    return res.json()
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}

const scrollToTop = () => {
  window.scrollTo({
    left: 0,
    top: 0,
    behavior: 'smooth',
  })
}

const scrollToBottom = () => {
  window.scrollTo({
    left: 0,
    top: document.body.scrollHeight,
    behavior: 'smooth',
  })
}

// Function to augment data and reset cumulative scores for the new avatar
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
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = useCallback(() => {
    setMenuOpen(!menuOpen)
  }, [menuOpen])

  const handleAvatarClick = useCallback(async (avatarIndex: number) => {
    setSelectedAvatar(avatarIndex) // Update the selected avatar state

    // Define the correct endpoint based on avatar selection
    let endpoint = ''
    switch (avatarIndex) {
      case 0:
        endpoint = 'rest/v1/Dean_Preston-H'
        break
      case 1:
        endpoint = 'rest/v1/Aaron_Peskin-H'
        break
      case 2:
        endpoint = 'rest/v1/Myrna_Melgar-H'
        break
      case 3:
        endpoint = 'rest/v1/Hillary_Ronen-H'
        break
    }

    if (endpoint) {
      const rawData = await fetchData(endpoint)
      const augmentedData = augmentData(rawData) // Reset cumulative scores on new avatar
      setData(augmentedData)
    }

    scrollToTop() // Scroll to the top after avatar data is loaded
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