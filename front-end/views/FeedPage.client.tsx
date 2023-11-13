// FeedPage.client.tsx
import React, { useState, useEffect } from 'react'
import { FixedSidebar } from '@/components/FixedSidebar'
import { IOrdinance } from '@/types/IOrdinance'
import { Intro } from '@/components/Intro'
import { Timeline } from '@/components/Timeline'
import { Ordinance } from '@/components/Ordinance'

// API fetch function
async function fetchData(avatarId) {
  // Define the base URL or modify as needed based on the selected avatar
  let url = `${process.env.SUPABASE_URL}/rest/v1/` // Base URL
  switch (avatarId) {
    case 'avatar1':
      url += 'llm_results_avatar1' // Example endpoint for Avatar 1
      break
    case 'avatar2':
      url += 'llm_results_avatar2' // Example endpoint for Avatar 2
      break
    // Add cases for other avatars as necessary
  }

  const options = {
    headers: {
      'Content-Type': 'application/json',
      apikey: process.env.SUPABASE_KEY,
    },
  }

  const response = await fetch(url, options)
  if (!response.ok) {
    throw new Error(
      `Failed to fetch data for ${avatarId}: ${response.statusText}`,
    )
  }

  return response.json()
}

//LEFT SIDE OF PAGE
// Avatars component inside FeedPage.tsx
const Avatars = ({ onAvatarClick }) => {
  return (
    <div className="flex flex-row justify-center space-x-6 pt-4">
      <button onClick={() => onAvatarClick('avatar1')} className="avatar">
        <img src="/images/avatar1.jpeg" alt="Dean Preston" />
      </button>
      <button onClick={() => onAvatarClick('avatar2')} className="avatar">
        <img src="/images/avatar2.jpeg" alt="Avatar 2" />
      </button>
      <button onClick={() => onAvatarClick('avatar3')} className="avatar">
        <img src="/images/avatar3.jpeg" alt="Avatar 3" />
      </button>
      <button onClick={() => onAvatarClick('avatar4')} className="avatar">
        <img src="/images/avatar4.jpeg" alt="Avatar 4" />
      </button>
    </div>
  )
}

export const FeedPage = ({ initialOrdinances }) => {
  const [ordinances, setOrdinances] = useState(initialOrdinances)
  const [currentOrdinance, setCurrentOrdinance] = useState(initialOrdinances[0])
  const [activeIndex, setActiveIndex] = useState(0)
  const [selectedAvatar, setSelectedAvatar] = useState('avatar1') // Default to Avatar 1

  useEffect(() => {
    // Fetch data initially for Avatar 1 and whenever an avatar is selected
    const fetchInitialData = async () => {
      const newData = await fetchData(selectedAvatar)
      setOrdinances(newData)
      setCurrentOrdinance(newData[0])
    }

    fetchInitialData()
  }, [selectedAvatar])

  // Scroll event handler logic here (not provided)
  const handleScroll = () => {
    // Your scroll handling logic to update activeIndex and currentOrdinance
  }

  // Register and clean up the scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  // Integrate Avatars within the FixedSidebar through the 'main' prop
  return (
    <>
      <FixedSidebar
        main={
          <>
            <Avatars />
            <Intro />
          </>
        }
        currentOrdinance={currentOrdinance}
      />
      <div className="relative flex-auto">
        <Timeline />
        <main className="">
          {ordinances.map((ordinance, index) => (
            <Ordinance
              key={ordinance.ID}
              ordinance={ordinance}
              isActive={index === activeIndex}
            />
          ))}
        </main>
      </div>
    </>
  )
}
