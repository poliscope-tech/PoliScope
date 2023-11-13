'useClient'

//GRAPH SECTION BELOW LEFT SIDE AND INTRO.

import { IOrdinance } from '@/types'
import { Glow } from './Glow'
import { StarField } from './StarField'
import { useRef } from 'react'
import { Bar } from 'react-chartjs-2'
import { CategoryScale, Chart, registerables } from 'chart.js'

Chart.register(CategoryScale)
Chart.register(...registerables)

const Avatars2 = () => {
  return (
    <div className="mt-4 flex justify-center">
      <div className="flex space-x-6 p-4 shadow-lg">
        <img
          src="/images/health.png"
          alt="Healthcare Avatar"
          className="avatar"
        />
        <img src="/images/educ.png" alt="Education Avatar" className="avatar" />
        <img
          src="/images/house.png"
          alt="Housing"
          className="avatar avatar-selected-green" // Apply green selected styles to Housing
        />
        <img
          src="/images/envir.png"
          alt="Environment Avatar"
          className="avatar"
        />
      </div>
    </div>
  )
}

const BarChart = ({ ordinance }: { ordinance: IOrdinance }) => {
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
    <div style={{ height: '350px' }} className="bar-chart-container">
      <Bar ref={chartRef} data={data} options={options} />
      <Avatars2 />
    </div>
  )
}

export function FixedSidebar({
  main,
  currentOrdinance,
  footer,
}: {
  main: React.ReactNode
  currentOrdinance: IOrdinance
  footer?: React.ReactNode
}) {
  return (
    <div className="relative flex-none overflow-hidden px-6 lg:pointer-events-none lg:fixed lg:inset-0 lg:z-40 lg:flex lg:px-0">
      <Glow />
      <div className="relative flex w-full lg:pointer-events-auto lg:mr-[calc(max(2rem,50%-38rem)+40rem)] lg:min-w-[32rem] lg:overflow-y-auto lg:overflow-x-hidden lg:pl-[max(4rem,calc(50%-38rem))]">
        <div className="mx-auto max-w-lg lg:mx-0 lg:flex lg:w-96 lg:max-w-none lg:flex-col lg:before:flex-1">
          <div className="pb-4 pt-4 sm:pb-8 sm:pt-8 lg:py-4">
            {' '}
            {/* Reduced padding */}
            <div className="relative">
              <StarField className="-right-44 top-14" />
              {main}
            </div>
            {/* Optionally, you can add a margin-top to the BarChart directly to further adjust its position */}
            <div className="mt-4">
              {' '}
              {/* Adjust this value as needed */}
              <BarChart ordinance={currentOrdinance} />
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
