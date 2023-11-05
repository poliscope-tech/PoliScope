'use client'

import { Layout } from '@/components/Layout'
import { Article } from '@/components/mdx'
import { Bar } from 'react-chartjs-2'
import { CategoryScale, Chart, registerables } from 'chart.js'
import { llmResults } from '../../data/llm-results'
import clsx from 'clsx'

Chart.register(CategoryScale)
Chart.register(...registerables)

function BarWrapper({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  const data = {
    labels: ['Housing', 'Tenant', 'Homelessness', 'Faster Permits', 'Zoning'],
    datasets: [
      {
        label: 'Score',
        data: props.result
          ? [
              props.result['affordable_housing_development_score'],
              props.result['tenant_protections_score'],
              props.result['homelessness_and_supportive_housing_score'],
              props.result['faster_permitting_process_and_bureaucracy_score'],
              props.result['land_use_and_zoning_reform'],
            ]
          : [],
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
    <div
      style={{ marginLeft: '50%', position: 'sticky', bottom: '0' }}
      {...props}
    >
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
  // Assume the first result is what we want to show in the sticky graph.
  const stickyResult = llmResults[0] // or another logic to determine which result to show

  return (
    <Layout>
      <BarWrapper result={stickyResult} />
      {llmResults.map((result: any) => (
        <Article id={result} date={new Date(result.actionDate)} key={result.id}>
          <div>
            <h2>{result.title}</h2>
            <p>{result.meetingBody}</p>
          </div>
        </Article>
      ))}
    </Layout>
  )
}
