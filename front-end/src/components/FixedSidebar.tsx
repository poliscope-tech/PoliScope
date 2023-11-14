import React, { useRef } from 'react'
import { IOrdinance } from '@/types'
import { Glow } from './Glow'
import { StarField } from './StarField'
import { Bar } from 'react-chartjs-2'
import { CategoryScale, Chart, registerables } from 'chart.js'
import { Avatars } from './Avatars'

Chart.register(CategoryScale)
Chart.register(...registerables)

type Avatars2Props = {
  onScrollToBottom: () => void
}

const Avatars2: React.FC<Avatars2Props> = ({ onScrollToBottom }) => {
  return (
    <div className="mt-4 flex justify-center">
      <div className="flex space-x-6 p-4 shadow-lg">
        <button
          onClick={onScrollToBottom}
          className="scroll-to-bottom-button"
          aria-label="Scroll to bottom"
        >
          ↓
        </button>
      </div>
    </div>
  )
}

type BarChartProps = {
  ordinance: IOrdinance
  onScrollToBottom: () => void
}

const BarChart = ({ ordinance, onScrollToBottom }: BarChartProps) => {
  const chartRef = useRef()
  const data = {
    labels: ['Housing', 'Tenant', 'Homelessness', 'Faster Permits', 'Zoning'],
    datasets: [
      {
        label: 'Score',
        data: [
          ordinance.acc_affordable_housing_development_score,
          ordinance.acc_tenant_protections_score,
          ordinance.acc_homelessness_and_supportive_housing_score,
          ordinance.acc_faster_permitting_process_and_bureaucracy_score,
          ordinance.acc_land_use_and_zoning_reform,
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

  const options = {
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          font: {
            size: 14, // Adjust this value to increase the font size
          },
        },
      },
      y: {
        ticks: {
          // Include y-axis tick configuration if needed
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          font: {
            size: 14, // Adjust this value to increase the font size of the legend labels
          },
        },
      },
    },
    // ... any other options you have set
  }

  return (
    <div
      style={{ position: 'relative', height: '350px' }}
      className="bar-chart-container"
    >
      <div style={{ display: 'flex', height: '100%' }}>
        <div style={{ flexGrow: 1 }}>
          {' '}
          {/* Flex grow will push the button to the right */}
          <Bar ref={chartRef} data={data} options={options} />
        </div>

        <div style={{ alignSelf: 'center', marginLeft: '130px' }}>
          {' '}
          {/* Adjust marginLeft for more space */}
          <button
            onClick={onScrollToBottom}
            className="scroll-to-bottom-button"
            aria-label="Scroll to bottom"
          >
            ↓
          </button>
        </div>
      </div>
    </div>
  )
}

type FixedSidebarProps = {
  main: React.ReactNode
  currentOrdinance: IOrdinance
  footer?: React.ReactNode
  scrollToBottom: () => void
}

export function FixedSidebar({
  main,
  currentOrdinance,
  footer,
  scrollToBottom,
}: FixedSidebarProps) {
  return (
    <div className="fixed-sidebar-container relative flex-none overflow-hidden px-6 lg:pointer-events-none lg:fixed lg:inset-0 lg:z-40 lg:flex lg:px-0">
      <Glow />
      <Avatars />
      <div className="relative flex w-full lg:pointer-events-auto lg:mr-[calc(max(2rem,50%-38rem)+40rem)] lg:min-w-[32rem] lg:overflow-y-auto lg:overflow-x-hidden lg:pl-[max(4rem,calc(50%-38rem))]">
        <div className="mx-auto max-w-lg lg:mx-0 lg:flex lg:w-96 lg:max-w-none lg:flex-col lg:before:flex-1">
          <div className="pb-4 pt-4 sm:pb-8 sm:pt-8 lg:py-4">
            <div className="relative">
              <StarField className="-right-44 top-14" />
              {main}
            </div>
            <div className="mt-4">
              <BarChart
                ordinance={currentOrdinance}
                onScrollToBottom={scrollToBottom}
              />
            </div>
          </div>
          <div className="flex flex-1 items-end justify-center pb-4 lg:justify-start lg:pb-6">
            {footer}
          </div>
        </div>
      </div>
    </div>
  )
}
