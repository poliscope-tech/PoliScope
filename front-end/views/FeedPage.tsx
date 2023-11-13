'use client'

import { useCallback, useEffect, useState } from 'react'
import { FixedSidebar } from '@/components/FixedSidebar'
import { IOrdinance } from '../src/types/IOrdinance'
import { Intro } from '@/components/Intro'
import { Timeline } from '@/components/Timeline'
import { Ordinance } from '@/components/Ordinance'

// LEFT SIDE OF PAGE
const Avatars = ({ onSelectAvatar }) => {
  return (
    <div className="flex flex-row justify-center space-x-6 pt-4">
      <img
        src="/images/avatar1.jpeg"
        alt="Avatar 1"
        className="avatar"
        onClick={() => onSelectAvatar(0)}
      />
      <img
        src="/images/avatar2.jpeg"
        alt="Avatar 2"
        className="avatar"
        onClick={() => onSelectAvatar(1)}
      />
      <img
        src="/images/avatar3.jpeg"
        alt="Avatar 3"
        className="avatar"
        onClick={() => onSelectAvatar(2)}
      />
      <img
        src="/images/avatar4.jpeg"
        alt="Avatar 4"
        className="avatar"
        onClick={() => onSelectAvatar(3)}
      />
    </div>
  )
}

export const FeedPage = ({ ordinances }: { ordinances: IOrdinance[] }) => {
  const [currentOrdinance, setCurrentOrdinance] = useState<IOrdinance>(
    ordinances[0],
  )

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

  const handleSelectAvatar = useCallback(
    (avatarIndex) => {
      console.log(`Avatar ${avatarIndex + 1} selected`) // Debugging statement
      setActiveIndex(0) // Reset active index on avatar click
      setCurrentOrdinance(ordinances[avatarIndex])
    },
    [ordinances],
  )

  return (
    <>
      <FixedSidebar
        main={
          <>
            <Avatars onSelectAvatar={handleSelectAvatar} />
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
