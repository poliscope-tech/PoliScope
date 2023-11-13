'use client'

import { useCallback, useEffect, useState } from 'react'
import { FixedSidebar } from '@/components/FixedSidebar'
import { IOrdinance } from '../src/types/IOrdinance'
import { Intro } from '@/components/Intro'
import { Timeline } from '@/components/Timeline'
import { Ordinance } from '@/components/Ordinance'

// LEFT SIDE OF PAGE
const Avatars = ({ onSelectAvatar, selectedAvatar }) => {
  const [clickedAvatar, setClickedAvatar] = useState<number | null>(null)

  const handleAvatarClick = (index) => {
    setClickedAvatar(index)
    onSelectAvatar(index)

    // Reset the state after animation ends (500ms for the animation duration)
    setTimeout(() => setClickedAvatar(null), 500)
  }

  return (
    <div className="flex flex-row justify-center space-x-6 pt-4">
      {[0, 1, 2, 3].map((index) => (
        <img
          key={index}
          src={`/images/avatar${index + 1}.jpeg`}
          alt={`Avatar ${index + 1}`}
          className={`avatar ${
            selectedAvatar === index ? 'avatar-selected' : ''
          } ${clickedAvatar === index ? 'pulsate-bck' : ''}`}
          onClick={() => handleAvatarClick(index)}
        />
      ))}
    </div>
  )
}

export const FeedPage = ({ ordinances, onAvatarClick, selectedAvatar }) => {
  // Default ordinance with values set to "0"
  const defaultOrdinance: Partial<IOrdinance> = {
    acc_affordable_housing_development_score: 0,
    acc_tenant_protections_score: 0,
    acc_homelessness_and_supportive_housing_score: 0,
    acc_faster_permitting_process_and_bureaucracy_score: 0,
    acc_land_use_and_zoning_reform: 0,
    // Add other properties as needed with default value "0"
  }
  const [currentOrdinance, setCurrentOrdinance] = useState<IOrdinance>(
    ordinances[0] ?? defaultOrdinance,
  )

  // Function to scroll to the bottom of the page
  const scrollToBottom = () => {
    window.scrollTo({
      left: 0,
      top: document.body.scrollHeight,
      behavior: 'smooth',
    })
  }

  // New state variable for triggering the fade-in effect
  const [fadeIn, setFadeIn] = useState(false)

  useEffect(() => {
    if (ordinances.length > 0) {
      // Delay setting fadeIn to true to ensure data is ready before starting the animation
      setTimeout(() => setFadeIn(true), 100) // Adjust delay as needed
    }
  }, [ordinances])

  useEffect(() => {
    if (ordinances.length > 0) {
      setFadeIn(true) // Trigger the fade-in effect when ordinances are loaded
    }
  }, [ordinances])

  const [activeIndex, setActiveIndex] = useState(0)

  const handleScroll = useCallback(() => {
    const position = window.pageYOffset
    const newIndex = Math.round(position / 300)
    if (activeIndex !== newIndex) {
      setActiveIndex(newIndex)
      setCurrentOrdinance(ordinances[newIndex] ?? defaultOrdinance)
    }
  }, [activeIndex, ordinances])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  // Function to handle avatar click
  const handleSelectAvatar = (avatarIndex) => {
    onAvatarClick(avatarIndex)
  }
  return (
    <>
      <FixedSidebar
        main={
          <>
            <Avatars
              onSelectAvatar={onAvatarClick}
              selectedAvatar={selectedAvatar}
            />
            <Intro />
          </>
        }
        currentOrdinance={currentOrdinance}
        scrollToBottom={scrollToBottom}
      />

      <div className={`relative flex-auto ${fadeIn ? 'fade-in' : ''}`}>
        {/* Render content only when fadeIn is true */}
        {fadeIn && (
          <main className="">
            {ordinances.map((ordinance, index) => (
              <Ordinance
                key={ordinance?.ID ?? index}
                ordinance={ordinance ?? defaultOrdinance}
                isActive={index === activeIndex}
              />
            ))}
          </main>
        )}
        {!fadeIn && <div>Loading...</div>} {/* Show loading message */}
      </div>
    </>
  )
}
