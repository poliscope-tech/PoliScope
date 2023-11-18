import React, { useCallback, useState } from 'react';
import { IOrdinance } from '@/types';
import { FeedPage } from '../../views/FeedPage';
import { Avatars } from './Avatars'; // Import Avatars component

export default function Page() {
  const [data, setData] = useState<IOrdinance[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);

  // Fetch data based on selected category and avatar index
  async function fetchData(category: string, avatarIndex: number): Promise<IOrdinance[]> {
    // Placeholder endpoints for each category and avatar
    const endpoints = {
      health: ['/api/health/avatar1', '/api/health/avatar2', '/api/health/avatar3', '/api/health/avatar4'],
      education: ['/api/education/avatar1', '/api/education/avatar2', '/api/education/avatar3', '/api/education/avatar4'],
      housing: ['/api/housing/avatar1', '/api/housing/avatar2', '/api/housing/avatar3', '/api/housing/avatar4'],
      environment: ['/api/environment/avatar1', '/api/environment/avatar2', '/api/environment/avatar3', '/api/environment/avatar4'],
    };

    const endpoint = endpoints[category][avatarIndex];
    const options = {
      headers: {
        'Content-Type': 'application/json',
        apikey: process.env.NEXT_PUBLIC_SUPABASE_KEY!,
      },
    };

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL! + endpoint;

    try {
      const res = await fetch(url, options);
      if (!res.ok) {
        throw new Error(`Failed to fetch data from ${url}`);
      }
      return await res.json();
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  const scrollToBottom = () => {
    window.scrollTo({
      left: 0,
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  };

// Function to augment data
function augmentData(rawData: IOrdinance[]) {
  const acc = {
    acc_affordable_housing_development_score: 0,
    acc_tenant_protections_score: 0,
    acc_homelessness_and_supportive_housing_score: 0,
    acc_faster_permitting_process_and_bureaucracy_score: 0,
    acc_land_use_and_zoning_reform: 0,
  }

  return rawData.map((_in: IOrdinance) => {
    return {
      ..._in,
      acc_affordable_housing_development_score:
        (acc.acc_affordable_housing_development_score +=
          Number(_in.affordable_housing_development_score) || 0),
      acc_tenant_protections_score: (acc.acc_tenant_protections_score +=
        Number(_in.tenant_protections_score) || 0),
      acc_homelessness_and_supportive_housing_score:
        (acc.acc_homelessness_and_supportive_housing_score +=
          Number(_in.homelessness_and_supportive_housing_score) || 0),
      acc_faster_permitting_process_and_bureaucracy_score:
        (acc.acc_faster_permitting_process_and_bureaucracy_score +=
          Number(_in.faster_permitting_process_and_bureaucracy_score) || 0),
      acc_land_use_and_zoning_reform: (acc.acc_land_use_and_zoning_reform +=
        Number(_in.land_use_and_zoning_reform) || 0),
    }
  })
}

export default function Page() {
  const [data, setData] = useState<IOrdinance[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null)

   // Handle avatar click
   const handleAvatarClick = useCallback(async (avatarIndex: number) => {
    if (selectedCategory && avatarIndex != null) {
      const rawData = await fetchData(selectedCategory, avatarIndex);
      const augmentedData = augmentData(rawData);
      setData(augmentedData);
      setSelectedAvatar(avatarIndex);
    }
  }, [selectedCategory]);

  return (
    <>
      <div className="">
        <div className="relative z-0 pt-5">
          {/* Pass the onSelectCategory function to Avatars */}
          <Avatars onSelectCategory={setSelectedCategory} />
          <FeedPage
            ordinances={data}
            onAvatarClick={handleAvatarClick}
            selectedAvatar={selectedAvatar}
          />
          <button onClick={scrollToBottom} className="scroll-to-bottom-button">
            Scroll to Bottom
          </button>
        </div>
      </div>
    </>
  );
}