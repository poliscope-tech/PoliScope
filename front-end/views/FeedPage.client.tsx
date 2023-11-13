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
  // This URL will need to be updated to reflect your actual API endpoints
  const url = `${process.env.SUPABASE_URL}/rest/v1/llm_results?avatar=${avatarId}`
  const options = {
    headers: {
      'Content-Type': 'application/json',
      apikey: process.env.SUPABASE_KEY,
    },
  }

  const response = await fetch(url, options)
  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.statusText}`)
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
      {/* Repeat for other avatars */}
      {/* ... */}
    </div>
  )
}

export const FeedPage = ({ initialOrdinances }) => {
  // Provide an initial empty array as a fallback if initialOrdinances is undefined
  const [ordinances, setOrdinances] = useState(initialOrdinances || [])
  // Use the first item of the ordinances array or a fallback empty object
  const [currentOrdinance, setCurrentOrdinance] = useState(ordinances[0] || {})
  const [activeIndex, setActiveIndex] = useState(0)

  const handleAvatarClick = useCallback(async (avatarId) => {
    try {
      const newData = await fetchData(avatarId)
      setOrdinances(newData)
      setCurrentOrdinance(newData[0])
      setActiveIndex(0) // Reset to the first item if necessary
    } catch (error) {
      console.error(error)
      // Handle error state appropriately
    }
  }, [])

  // Load data for Avatar1 initially
  useEffect(() => {
    handleAvatarClick('avatar1')
  }, [handleAvatarClick])

  const handleScroll = useCallback(() => {
    const position = window.pageYOffset
    const newIndex = Math.round(position / 300)
    if (activeIndex !== newIndex && ordinances[newIndex]) {
      setActiveIndex(newIndex)
      setCurrentOrdinance(ordinances[newIndex])
    }
  }, [activeIndex, ordinances])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])
  // Ensure that ordinances have data before attempting to map over them
  const ordinanceElements =
    ordinances.length > 0 ? (
      ordinances.map((ordinance, index) => (
        <Ordinance
          key={ordinance.ID}
          ordinance={ordinance}
          isActive={index === activeIndex}
        />
      ))
    ) : (
      <div>No data available</div> // Or some other placeholder content
    )

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
        <main className="">{ordinanceElements}</main>
      </div>
    </>
  )
}
