'use client'

import { FixedSidebar } from '@/components/FixedSidebar'
import { IOrdinance } from '../src/types/IOrdinance'
import { Intro } from '@/components/Intro'
import { Timeline } from '@/components/Timeline'
import { Ordinance } from '@/components/Ordinance'
import { useCallback, useEffect, useState } from 'react'

// Import the Avatars component or define it here
const Avatars = () => {
  return (
    <div className="flex space-x-4">
      <img
        src="/images/health.png" // updated image path for health
        alt="Healthcare Avatar"
        className="h-16 w-16 rounded-full border-2 border-white object-contain shadow-lg"
      />
      <img
        src="/images/educ.png" // updated image path for education
        alt="Education Avatar"
        className="h-16 w-16 rounded-full border-2 border-white object-contain shadow-lg"
      />
      <img
        src="/images/house.png" // updated image path for housing
        alt="Housing Avatar"
        className="h-16 w-16 rounded-full border-2 border-white object-contain shadow-lg"
      />
      <img
        src="/images/envir.png" // updated image path for environment
        alt="Environment Avatar"
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
