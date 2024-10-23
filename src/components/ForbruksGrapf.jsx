import { ResponsiveLine } from '@nivo/line'
// import './ForbruksGraf.css'
import { linearGradientDef } from '@nivo/core'
import styled from 'styled-components'

function ForbruksGraf(isForbruk) {
  // const data = [forbruksData]

  // console.log('isForbruk', isForbruk['isForbruk'])

  // const orgData = [
  // {
  //   id: 'Forbruk',
  //   data: [
  //     {
  //       x: 0,
  //       y: 276,
  //     },
  //     {
  //       x: 1,
  //       y: 290,
  //     },
  //     {
  //       x: 2,
  //       y: 291,
  //     },
  //     {
  //       x: 3,
  //       y: 76,
  //     },
  //     {
  //       x: 4,
  //       y: 187,
  //     },
  //     {
  //       x: 5,
  //       y: 280,
  //     },
  //     {
  //       x: 6,
  //       y: 247,
  //     },
  //     {
  //       x: 7,
  //       y: 149,
  //     },
  //     {
  //       x: 8,
  //       y: 126,
  //     },
  //     {
  //       x: 9,
  //       y: 259,
  //     },
  //     {
  //       x: 10,
  //       y: 64,
  //     },
  //     {
  //       x: 11,
  //       y: 124,
  //     },
  //   ],
  // },
  // {
  //   id: 'Nettleie',
  //   data: [
  //     {
  //       x: 0,
  //       y: 154,
  //     },
  //     {
  //       x: 1,
  //       y: 248,
  //     },
  //     {
  //       x: 2,
  //       y: 213,
  //     },
  //     {
  //       x: 3,
  //       y: 99,
  //     },
  //     {
  //       x: 4,
  //       y: 106,
  //     },
  //     {
  //       x: 5,
  //       y: 9,
  //     },
  //     {
  //       x: 6,
  //       y: 193,
  //     },
  //     {
  //       x: 7,
  //       y: 61,
  //     },
  //     {
  //       x: 8,
  //       y: 41,
  //     },
  //     {
  //       x: 9,
  //       y: 6,
  //     },
  //     {
  //       x: 10,
  //       y: 170,
  //     },
  //     {
  //       x: 11,
  //       y: 111,
  //     },
  //   ],
  // },
  // {
  //   id: 'Pris',
  //   data: [
  //     {
  //       x: 0,
  //       y: 109,
  //     },
  //     {
  //       x: 1,
  //       y: 239,
  //     },
  //     {
  //       x: 2,
  //       y: 189,
  //     },
  //     {
  //       x: 3,
  //       y: 257,
  //     },
  //     {
  //       x: 4,
  //       y: 58,
  //     },
  //     {
  //       x: 5,
  //       y: 195,
  //     },
  //     {
  //       x: 6,
  //       y: 119,
  //     },
  //     {
  //       x: 7,
  //       y: 78,
  //     },
  //     {
  //       x: 8,
  //       y: 4,
  //     },
  //     {
  //       x: 9,
  //       y: 241,
  //     },
  //     {
  //       x: 10,
  //       y: 99,
  //     },
  //     {
  //       x: 11,
  //       y: 219,
  //     },
  //   ],
  // },
  // ]

  let kombinerteData = [{ id: 'Forbruk', data: isForbruk['isForbruk'] }]
  // console.log('Org', orgData)
  // console.log('Ny', kombinerteData)
  // console.log('forbruksData: ', forbruksData['forbruksData'])
  // console.log('orgData', orgData)
  // console.log(forbruksData)

  return (
    <GrafWrapper>
      <ResponsiveLine
        data={kombinerteData}
        lineWidth={1}
        areaOpacity={1}
        colors={['#c29bde', '#ee4590', '#ff3f40']}
        isInteractive={false}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
          min: 'auto',
          max: 'auto',
          stacked: true,
          reverse: false,
        }}
        // yFormat=" >-.2f"
        curve='basis'
        axisTop={null}
        axisRight={null}
        axisBottom={null}
        axisLeft={null}
        enableGridX={false}
        enableGridY={false}
        enablePoints={false}
        // pointSize={10}
        // pointColor={{ theme: 'background' }}
        // pointBorderWidth={2}
        // pointBorderColor={{ from: 'serieColor' }}
        // pointLabel="data.yFormatted"
        pointLabelYOffset={-12}
        enableArea={true}
        enableCrosshair={false}
        useMesh={true}
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

        defs={[
          linearGradientDef('gradientA', [
            { offset: 0, color: 'inherit' },
            { offset: 100, color: 'inherit', opacity: 0 },
          ]),
        ]}
        fill={[
          {
            id: 'gradientA',
            match: { id: 'Pris' },
          },
          {
            id: 'gradientA',
            match: { id: 'Nettleie' },
          },
          {
            id: 'gradientA',
            match: { id: 'Forbruk' },
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
`

export default ForbruksGraf
