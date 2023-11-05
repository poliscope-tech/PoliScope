// src/app/FeedPage.client.tsx
import React, { useState } from 'react'
import { Layout } from '@/components/Layout'
import llmResults from '../../data/llm-results.json' // make sure the path is correct
import { Article } from '@/components/mdx'
import BarGraph from '@/components/BarGraph' // Make sure to create and import this component

export default function FeedPage() {
  // State to keep track of the currently active bill
  const [activeBill, setActiveBill] = useState(llmResults[0])

  return (
    <Layout>
      {/* Display the BarGraph for the active bill */}
      <BarGraph bill={activeBill} />

      {/* List of articles that when clicked, set the active bill */}
      {llmResults.map((result) => (
        <div
          key={result.id}
          onClick={() => setActiveBill(result)}
          style={{ cursor: 'pointer' }}
        >
          <Article
            id={result.id.toString()}
            date={new Date(result['action-date'])}
          >
            <h2>{result.title}</h2>
            <p>{result['meeting body']}</p>
          </Article>
        </div>
      ))}
    </Layout>
  )
}
