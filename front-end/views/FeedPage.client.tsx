// FeedPage.client.tsx
'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { FixedSidebar } from '@/components/FixedSidebar'
import { IOrdinance } from '@/types/IOrdinance'
import { Intro } from '@/components/Intro'
import { Timeline } from '@/components/Timeline'
import { Ordinance } from '@/components/Ordinance'

// API fetch function
async function fetchData(avatarId) {
  // Modify URL or headers as needed based on selected avatar
  // This is just a placeholder, adjust the URL as necessary.
  const url = `${process.env.SUPABASE_URL}/rest/v1/llm_results?avatar=${avatarId}`
  const options = {
    headers: {
      'Content-Type': 'application/json',
      apikey: process.env.SUPABASE_KEY,
    },
  }

  const response = await fetch(url, options)
  if (!response.ok) {
    throw new Error(
      `Failed to fetch data for avatar ${avatarId}: ${response.statusText}`,
    )
  }

  return response.json()
}

// Avatars component
const Avatars = ({ onAvatarClick }) => {
  return (
    <div className="flex flex-row justify-center space-x-6 pt-4">
      {/* Add onClick event handlers to call onAvatarClick with the respective avatar ID */}
      <img
        src="/images/avatar1.jpeg"
        alt="Dean Preston"
        className="avatar avatar-selected"
        onClick={() => onAvatarClick('avatar1')}
      />
      {/* ... other avatars with onClick handlers ... */}
    </div>
  )
}

export const FeedPage = ({ initialOrdinances }) => {
  // Initialize with a fallback if initialOrdinances is null or undefined
  const [ordinances, setOrdinances] = useState(
    initialOrdinances?.map((ord) => ({
      ...ord,
      acc_affordable_housing_development_score:
        ord.acc_affordable_housing_development_score || 0,
      // Add similar lines for other properties that need a default value of 0
    })) || [],
  )

  // Use the first item of the ordinances array or a fallback with default values
  const [currentOrdinance, setCurrentOrdinance] = useState(
    ordinances?.[0] || {
      acc_affordable_housing_development_score: 0,
      // Set defaults for other properties here
    },
  )
  const [activeIndex, setActiveIndex] = useState(0)

  // Function to handle avatar clicks and fetch data
  const handleAvatarClick = useCallback(async (avatarId) => {
    try {
      const newData = await fetchData(avatarId)
      setOrdinances(newData)
      setCurrentOrdinance(newData[0] || null)
      setActiveIndex(0) // Reset to the first item if necessary
    } catch (error) {
      console.error(error)
      // Handle error state appropriately
    }
  }, [])

  // Load data for Avatar1 initially
  useEffect(() => {
    if (!initialOrdinances || initialOrdinances.length === 0) {
      handleAvatarClick('avatar1')
    }
  }, [handleAvatarClick, initialOrdinances])

  // Scroll event handling
  const handleScroll = useCallback(() => {
    const position = window.pageYOffset
    const newIndex = Math.round(position / 300)
    if (activeIndex !== newIndex && ordinances[newIndex]) {
      setActiveIndex(newIndex)
      setCurrentOrdinance(ordinances[newIndex])
    }
  }, [activeIndex, ordinances])

  // Register and clean up the scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  // Render the ordinances if available, with null checks
  const ordinanceElements = ordinances.map((ordinance, index) => (
    <Ordinance
      key={ordinance.ID || index} // Fallback to index if ID is not available
      ordinance={ordinance}
      isActive={index === activeIndex}
    />
  ))

  return (
    <>
      <FixedSidebar
        main={
          <>
            <Avatars onAvatarClick={handleAvatarClick} />
            <Intro />
          </>
        }
        currentOrdinance={currentOrdinance}
      />
      <div className="relative flex-auto">
        <Timeline />
        <main className="">
          {ordinanceElements.length > 0 ? (
            ordinanceElements
          ) : (
            <div>No data available</div>
          )}
        </main>
      </div>
    </>
  )
}
