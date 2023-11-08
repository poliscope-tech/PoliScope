'use client'

import { FixedSidebar } from '@/components/FixedSidebar'
import { IOrdinance } from '../src/types/IOrdinance'
import { Intro } from '@/components/Intro'
import { Timeline } from '@/components/Timeline'
import { Ordinance } from '@/components/Ordinance'
import { useCallback, useEffect, useState } from 'react'

//LEFT SIDE OF PAGE

const Avatars = () => {
  return (
    // Use 'flex-row' for a horizontal layout, 'justify-center' to center the items horizontally,
    // 'space-x-4' to space out the avatars horizontally, and 'pt-4' for some padding at the top.
    <div className="flex flex-row justify-center space-x-4">
      <img
        src="/images/avatar1.jpeg"
        alt="Avatar 1"
        className="h-16 w-16 rounded-full border-2 border-white object-contain shadow-lg"
      />
      <img
        src="/images/avatar2.jpeg"
        alt="Avatar 2"
        className="h-16 w-16 rounded-full border-2 border-white object-contain shadow-lg"
      />
      <img
        src="/images/avatar3.jpeg"
        alt="Avatar 3"
        className="h-16 w-16 rounded-full border-2 border-white object-contain shadow-lg"
      />
      <img
        src="/images/avatar4.jpeg"
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

        <main className=" py-20  sm:py-32">
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
