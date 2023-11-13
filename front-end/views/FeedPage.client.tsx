// FeedPage.client.tsx
'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { FixedSidebar } from '@/components/FixedSidebar'
import { IOrdinance } from '@/types/IOrdinance'
import { Intro } from '@/components/Intro'
import { Timeline } from '@/components/Timeline'
import { Ordinance } from '@/components/Ordinance'

//LEFT SIDE OF PAGE
const Avatars = () => {
  return (
    <div className="flex flex-row justify-center space-x-6 pt-4">
      <img
        src="/images/avatar1.jpeg"
        alt="Dean Preston"
        className="avatar avatar-selected" // Apply selected styles to Dean Preston
      />
      <img src="/images/avatar2.jpeg" alt="Avatar 2" className="avatar" />
      <img src="/images/avatar3.jpeg" alt="Avatar 3" className="avatar" />
      <img src="/images/avatar4.jpeg" alt="Avatar 4" className="avatar" />
    </div>
  )
}

export const FeedPage = ({ initialOrdinances }) => {
  // Initialize with initialOrdinances, assuming they are never null or undefined
  const [ordinances, setOrdinances] = useState(initialOrdinances)
  const [currentOrdinance, setCurrentOrdinance] = useState(initialOrdinances[0])
  const [activeIndex, setActiveIndex] = useState(0)

  const handleScroll = useCallback(() => {
    const position = window.pageYOffset
    const newIndex = Math.round(position / 300)
    if (activeIndex !== newIndex) {
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

  // Render the ordinances if available
  const ordinanceElements = ordinances.map((ordinance, index) => (
    <Ordinance
      key={ordinance.id} // Ensure 'id' is the correct unique identifier for your data
      ordinance={ordinance}
      isActive={index === activeIndex}
    />
  ))

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
        <main className="">{ordinanceElements}</main>
      </div>
    </>
  )
}
