'use client'

import { useCallback, useEffect, useState } from 'react'
import { FixedSidebar } from '@/components/FixedSidebar'
import { IOrdinance } from '../src/types/IOrdinance'
import { Intro } from '@/components/Intro'
import { Timeline } from '@/components/Timeline'
import { Ordinance } from '@/components/Ordinance'

type AvatarsProps = {
  onSelectAvatar: (index: number) => void
  selectedAvatar: number | null
}

// LEFT SIDE OF PAGE
const Avatars: React.FC<AvatarsProps> = ({
  onSelectAvatar,
  selectedAvatar,
}) => {
  const [clickedAvatar, setClickedAvatar] = useState<number | null>(null)

  const handleAvatarClick = (index: number) => {
    setClickedAvatar(index)
    onSelectAvatar(index)

    setTimeout(() => setClickedAvatar(null), 500)
  }

  return (
    <div className="flex flex-row justify-center space-x-6 pt-4">
      {[0, 1, 2, 3].map((index) => (
        <img
          key={index}
          src={`/images/avatar${index + 1}.jpeg`}
          alt={`Avatar ${index + 1}`}
          className={`avatar ${selectedAvatar === index ? 'avatar-selected' : ''
            } ${clickedAvatar === index ? 'pulsate-bck' : ''}`}
          onClick={() => handleAvatarClick(index)}
        />
      ))}
    </div>
  )
}

type FeedPageProps = {
  ordinances: IOrdinance[]
  onAvatarClick: (index: number) => void
  selectedAvatar: number | null
}

export const FeedPage: React.FC<FeedPageProps> = ({
  ordinances,
  onAvatarClick,
  selectedAvatar,
}) => {
  const defaultOrdinance: Partial<IOrdinance> = {
    acc_affordable_housing_development_score: 0,
    acc_tenant_protections_score: 0,
    acc_homelessness_and_supportive_housing_score: 0,
    acc_faster_permitting_process_and_bureaucracy_score: 0,
    acc_land_use_and_zoning_reform: 0,
  }
  const [currentOrdinance, setCurrentOrdinance] = useState<IOrdinance>(
    ordinances[0] ?? defaultOrdinance,
  )

  const scrollToBottom = () => {
    window.scrollTo({
      left: 0,
      top: document.body.scrollHeight,
      behavior: 'smooth',
    })
  }

  const [fadeIn, setFadeIn] = useState(false)

  useEffect(() => {
    if (ordinances.length > 0) {
      setTimeout(() => setFadeIn(true), 100)
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

  const handleSelectAvatar = (avatarIndex: number) => {
    onAvatarClick(avatarIndex)
  }

  return (
    <>
      <FixedSidebar
        main={
          <>
            <Avatars
              onSelectAvatar={handleSelectAvatar}
              selectedAvatar={selectedAvatar}
            />
            <Intro avatarIndex={selectedAvatar ?? 0} />
          </>
        }
        currentOrdinance={currentOrdinance}
        scrollToBottom={scrollToBottom}
      />

      <div className={`relative flex-auto ${fadeIn ? 'fade-in' : ''}`}>
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
        {!fadeIn && <div>Loading...</div>}
      </div>
    </>
  )
}