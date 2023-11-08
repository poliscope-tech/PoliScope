'useClient'

import { IOrdinance } from '@/types'
import { Glow } from './Glow'
import { StarField } from './StarField'
import { useRef } from 'react'
import { Bar } from 'react-chartjs-2'
import { CategoryScale, Chart, registerables } from 'chart.js'
import { Avatars } from './Avatars'

Chart.register(CategoryScale)
Chart.register(...registerables)

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

  return (
    <>
      <div className="max-h-72">
        <Bar
          ref={chartRef}
          data={data}
          width={400}
          height={200}
          options={{
            maintainAspectRatio: false,
          }}
        />
      </div>
    </>
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
      <Avatars />
      <div className="relative flex w-full lg:pointer-events-auto lg:mr-[calc(max(2rem,50%-38rem)+40rem)] lg:min-w-[32rem] lg:overflow-y-auto lg:overflow-x-hidden lg:pl-[max(4rem,calc(50%-38rem))]">
        <div className="mx-auto max-w-lg lg:mx-0 lg:flex lg:w-96 lg:max-w-none lg:flex-col lg:before:flex-1 lg:before:pt-6">
          <div className="pb-16 pt-20 sm:pb-20 sm:pt-32 lg:py-20">
            <div className="relative">
              <StarField className="-right-44 top-14" />
              {main}
            </div>
          </div>
          <div className="flex flex-1 items-end justify-center pb-4 lg:justify-start lg:pb-6">
            {footer}
          </div>
          <BarChart ordinance={currentOrdinance} />
        </div>
      </div>
    </div>
  )
}
