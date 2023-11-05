'use client'

import { Article } from './mdx'
import { IOrdinance } from '@/types'

export const Ordinance = ({
  ordinance,
  isActive,
}: {
  ordinance: IOrdinance
  isActive: boolean
}) => {
  return (
    <div
      className={`${
        isActive && 'rounded-md border bg-gray-700'
      } h-[300px] py-10`}
    >
      <div className={'max-h-[250px] overflow-hidden'}>
        <Article
          id={ordinance['ID']}
          date={ordinance['Action Date'] || new Date()}
          key={ordinance['ID']}
        >
          <h2>{ordinance.summary}</h2>
          <p>{ordinance.Title}</p>
        </Article>
      </div>
    </div>
  )
}
