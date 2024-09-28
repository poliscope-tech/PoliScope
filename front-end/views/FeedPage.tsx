'use client'

import { useCallback, useEffect, useState } from 'react'
import { FixedSidebar } from '@/components/FixedSidebar'
import { IOrdinance } from '../src/types/IOrdinance'
import { Intro } from '@/components/Intro'
import { Ordinance } from '@/components/Ordinance'

type AvatarsProps = {
  onSelectAvatar: (index: number) => void
  selectedAvatar: number | null
}

// Avatars Component
const Avatars: React.FC<AvatarsProps> = ({ onSelectAvatar, selectedAvatar }) => {
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
          className={`avatar ${selectedAvatar === index ? 'avatar-selected' : ''} ${clickedAvatar === index ? 'pulsate-bck' : ''
            }`}
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
  const defaultOrdinance: IOrdinance = {
    ID: -1,
    affordable_housing_development_score: 0,
    tenant_protections_score: 0,
    homelessness_and_supportive_housing_score: 0,
    faster_permitting_process_and_bureaucracy_score: 0,
    land_use_and_zoning_reform: 0,
    acc_affordable_housing_development_score: 0,
    acc_tenant_protections_score: 0,
    acc_homelessness_and_supportive_housing_score: 0,
    acc_faster_permitting_process_and_bureaucracy_score: 0,
    acc_land_use_and_zoning_reform: 0,
    // Include other properties of IOrdinance as needed
  }

  const [currentOrdinance, setCurrentOrdinance] = useState<IOrdinance>(
    ordinances[0] ?? defaultOrdinance,
  )

  // Cumulative scores state
  const [cumulativeScores, setCumulativeScores] = useState({
    acc_affordable_housing_development_score: 0,
    acc_tenant_protections_score: 0,
    acc_homelessness_and_supportive_housing_score: 0,
    acc_faster_permitting_process_and_bureaucracy_score: 0,
    acc_land_use_and_zoning_reform: 0,
  })

  // Reset cumulative scores when a new avatar is selected
  useEffect(() => {
    setCumulativeScores({
      acc_affordable_housing_development_score: 0,
      acc_tenant_protections_score: 0,
      acc_homelessness_and_supportive_housing_score: 0,
      acc_faster_permitting_process_and_bureaucracy_score: 0,
      acc_land_use_and_zoning_reform: 0,
    })
    setActiveIndex(0)
    setCurrentOrdinance(ordinances[0] ?? defaultOrdinance)
    setLastProcessedIndex(-1)
  }, [ordinances])

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
  const [lastProcessedIndex, setLastProcessedIndex] = useState(-1)

  const handleScroll = useCallback(() => {
    const position = window.pageYOffset
    const newIndex = Math.min(
      Math.round(position / 300),
      ordinances.length - 1,
    )

    if (activeIndex !== newIndex) {
      setActiveIndex(newIndex)
      const ordinance = ordinances[newIndex] ?? defaultOrdinance
      setCurrentOrdinance(ordinance)

      // Update cumulative scores if new ordinances are scrolled into view
      if (newIndex > lastProcessedIndex) {
        const newCumulativeScores = { ...cumulativeScores }

        for (let i = lastProcessedIndex + 1; i <= newIndex; i++) {
          const ord = ordinances[i] ?? defaultOrdinance
          newCumulativeScores.acc_affordable_housing_development_score +=
            ord.affordable_housing_development_score || 0
          newCumulativeScores.acc_tenant_protections_score +=
            ord.tenant_protections_score || 0
          newCumulativeScores.acc_homelessness_and_supportive_housing_score +=
            ord.homelessness_and_supportive_housing_score || 0
          newCumulativeScores.acc_faster_permitting_process_and_bureaucracy_score +=
            ord.faster_permitting_process_and_bureaucracy_score || 0
          newCumulativeScores.acc_land_use_and_zoning_reform +=
            ord.land_use_and_zoning_reform || 0
        }

        setCumulativeScores(newCumulativeScores)
        setLastProcessedIndex(newIndex)
      }
    }
  }, [activeIndex, ordinances, cumulativeScores, lastProcessedIndex])

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
        cumulativeScores={cumulativeScores}
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