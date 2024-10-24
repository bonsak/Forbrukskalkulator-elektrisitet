import { ResponsiveLine } from '@nivo/line'
import { linearGradientDef } from '@nivo/core'
import styled from 'styled-components'
import useForbukStore from '../stores/useForbruk'

function ForbruksGraf() {
  const { forbruk, pris, nettleie, updateValue } = useForbukStore()

  const AreaLayer = ({ innerWidth, innerHeight }) => {
    return (
      <>
        <path
          d={`M${innerWidth} 0 L${innerWidth} ${innerHeight} L0 ${innerHeight} L0 0 Z`}
          fill='#e9e9e9'
          fillOpacity={1}
        />
      </>
    )
  }

  return (
    <GrafWrapper>
      <ResponsiveLine
        data={[forbruk, pris, nettleie]}
        lineWidth={1}
        areaOpacity={1}
        maxValue={6.6}
        colors={['#c29bde', '#ee4590', '#ff3f40']}
        isInteractive={false}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
          min: '.05',
          max: '20',
          // stacked: false,
          // reverse: false,
        }}
        // yFormat=" >-.2f"
        curve='basis'
        axisTop={null}
        axisRight={null}
        axisBottom={true}
        axisLeft={false}
        enableGridX={true}
        enableGridY={true}
        enablePoints={false}
        // pointSize={10}
        // pointColor={{ theme: 'background' }}
        // pointBorderWidth={2}
        // pointBorderColor={{ from: 'serieColor' }}
        // pointLabel="data.yFormatted"
        // pointLabelYOffset={-12}
        enableArea={true}
        enableCrosshair={false}
        // useMesh={true}
        // legends={[
        //     {
        //         anchor: 'right',
        //         direction: 'column',
        //         justify: false,
        //         translateX: 100,
        //         translateY: 0,
        //         itemsSpacing: 0,
        //         itemDirection: 'left-to-right',
        //         itemWidth: 80,
        //         itemHeight: 20,
        //         itemOpacity: 0.75,
        //         symbolSize: 12,
        //         symbolShape: 'circle',
        //         symbolBorderColor: 'rgba(0, 0, 0, .5)',
        //         effects: [
        //             {
        //                 on: 'hover',
        //                 style: {
        //                     itemBackground: 'rgba(0, 0, 0, .03)',
        //                     itemOpacity: 1
        //                 }
        //             }
        //         ]
        //     }
        // ]}
        layers={[
          AreaLayer,
          'grid',
          'markers',
          'areas',
          'lines',
          'slices',
          'axes',
          'points',
          'legends',
        ]}
        defs={[
          linearGradientDef('gradientA', [
            { offset: 0, color: 'inherit' },
            { offset: 100, color: 'inherit', opacity: 0 },
          ]),
        ]}
        fill={[
          {
            id: 'gradientA',
            match: { id: 'pris' },
          },
          {
            id: 'gradientA',
            match: { id: 'nettleie' },
          },
          {
            id: 'gradientA',
            match: { id: 'forbruk' },
          },
        ]}
      />
    </GrafWrapper>
  )
}

const GrafWrapper = styled.div`
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.1) 4px 4px 6px 0px;
  height: 400px;
  width: 885px;
  overflow-x: hidden;
  overflow-y: hidden;
  margin-top: 2rem;
`

export default ForbruksGraf
