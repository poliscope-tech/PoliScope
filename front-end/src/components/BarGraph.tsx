import React from 'react'

type Bill = {
  affordable_housing_development_score: number
  tenant_protections_score: number
  homelessness_and_supportive_housing_score: number
  faster_permitting_process_and_bureaucracy_score: number
  land_use_and_zoning_reform: number
}

type BarGraphProps = {
  bill: Bill
}

const BarGraph: React.FC<BarGraphProps> = ({ bill }) => {
  const baseSize = 100 // Base size of 100px for each bar

  // Function to determine the size change of the bar based on the score
  const calculateSize = (score: number) => baseSize + (score > 0 ? 1 : -1) * 100 // Change in size by 100px

  return (
    <div
      style={{
        position: 'relative',
        height: '300px',
        padding: '10px',
        border: '1px solid black',
      }}
    >
      {/* Zero line */}
      <div
        style={{
          position: 'absolute',
          bottom: `${baseSize}px`, // Position at the baseSize height
          left: 0,
          right: 0,
          borderTop: '2px dotted black',
          zIndex: 1, // Ensure it's above the bars
        }}
      />
      {/* Bars */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'flex-end',
          height: '100%',
          position: 'relative',
          zIndex: 2, // Above the zero line
        }}
      >
        <div
          style={{
            height: `${calculateSize(
              bill.affordable_housing_development_score,
            )}px`,
            width: '20px',
            background: 'blue',
            color: 'white',
          }}
        />
        <div
          style={{
            height: `${calculateSize(bill.tenant_protections_score)}px`,
            width: '20px',
            background: 'green',
            color: 'white',
          }}
        />
        <div
          style={{
            height: `${calculateSize(
              bill.homelessness_and_supportive_housing_score,
            )}px`,
            width: '20px',
            background: 'red',
            color: 'white',
          }}
        />
        <div
          style={{
            height: `${calculateSize(
              bill.faster_permitting_process_and_bureaucracy_score,
            )}px`,
            width: '20px',
            background: 'purple',
            color: 'white',
          }}
        />
        <div
          style={{
            height: `${calculateSize(bill.land_use_and_zoning_reform)}px`,
            width: '20px',
            background: 'orange',
            color: 'white',
          }}
        />
      </div>
    </div>
  )
}

export default BarGraph
