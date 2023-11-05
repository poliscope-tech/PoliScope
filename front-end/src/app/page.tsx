'use client'

import { Layout } from '@/components/Layout'
import { Article } from '@/components/mdx'
import { Bar } from 'react-chartjs-2'
import { CategoryScale, Chart, registerables } from 'chart.js'
import { llmResults } from '../../data/llm-results'

// Add this new Avatars component
const Avatars = () => {
  return (
    <div className="absolute right-0 top-0 mr-5 mt-10 flex space-x-4">
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

Chart.register(CategoryScale)
Chart.register(...registerables)

const BarChart = ({ result }: { result: any }) => {
  const data = {
    labels: ['Housing', 'Tenant', 'Homelessness', 'Faster Permits', 'Zoning'],
    datasets: [
      {
        label: 'Score',
        data: [
          result['affordable_housing_development_score'],
          result['tenant_protections_score'],
          result['homelessness_and_supportive_housing_score'],
          result['faster_permitting_process_and_bureaucracy_score'],
          result['land_use_and_zoning_reform'],
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }
  return (
    <div className="max-h-72">
      <h2>Bar Example (custom size)</h2>
      <Bar
        data={data}
        width={400}
        height={200}
        options={{
          maintainAspectRatio: false,
        }}
      />
    </div>
  )
}

export default function FeedPage() {
  return (
    <Layout>
      <Avatars /> {/* Add the Avatars component inside the Layout */}
      {llmResults.map((result: any) => (
        <Article id={result} date={new Date(result.actionDate)} key={result.id}>
          <h2>{result.summary}</h2>
          <p>{result.meetingBody}</p>
          <BarChart result={result} />
        </Article>
      ))}
    </Layout>
  )
}
