'use client'

import { FixedSidebar } from '@/components/FixedSidebar'
import { IOrdinance } from '../src/types/IOrdinance'
import { Intro } from '@/components/Intro'
import { Timeline } from '@/components/Timeline'
import { Ordinance } from '@/components/Ordinance'
import { useCallback, useEffect, useState } from 'react'

const Avatars = () => {
  return (
    <div className="flex space-x-4">
      <img
        src="/images/avatar1.jpeg" // Correct image path for Avatar 1
        alt="Avatar 1"
        className="h-16 w-16 rounded-full border-2 border-white object-contain shadow-lg"
      />
      <img
        src="/images/avatar2.jpeg" // Correct image path for Avatar 2
        alt="Avatar 2"
        className="h-16 w-16 rounded-full border-2 border-white object-contain shadow-lg"
      />
      <img
        src="/images/avatar3.jpeg" // Correct image path for Avatar 3
        alt="Avatar 3"
        className="h-16 w-16 rounded-full border-2 border-white object-contain shadow-lg"
      />
      <img
        src="/images/avatar4.jpeg" // Correct image path for Avatar 4
        alt="Avatar 4"
        className="h-16 w-16 rounded-full border-2 border-white object-contain shadow-lg"
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

        <main className="space-y-20 py-20 sm:space-y-32 sm:py-32">
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
