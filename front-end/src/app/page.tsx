'use client'

import { Layout } from '@/components/Layout'
import { Article } from '@/components/mdx'
import { Bar } from 'react-chartjs-2'
import { CategoryScale, Chart, registerables } from 'chart.js'
import { llmResults } from '../../data/llm-results'

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
      {llmResults.map((result: any) => (
        <Article id={result} date={new Date(result.actionDate)} key={result.id}>
          <h2>{result.title}</h2>
          <p>{result.meetingBody}</p>
          <BarChart result={result} />
        </Article>
      ))}
    </Layout>
  )
}
