import { ResponsiveLine } from '@nivo/line'
import './ForbruksGraf.css'
import { linearGradientDef } from '@nivo/core'

function ForbruksGraf() {

const data = [
    {
      "id": "Forbruk",
      "data": [
        {
          "x": "00 - 02",
          "y": 276
        },
        {
          "x": "02 - 04",
          "y": 290
        },
        {
          "x": "04 - 06",
          "y": 291
        },
        {
          "x": "06 - 08",
          "y": 76
        },
        {
          "x": "08 - 10",
          "y": 187
        },
        {
          "x": "10 - 12",
          "y": 280
        },
        {
          "x": "12 - 14",
          "y": 247
        },
        {
          "x": "14 - 16",
          "y": 149
        },
        {
          "x": "16 - 18",
          "y": 126
        },
        {
          "x": "18 - 20",
          "y": 259
        },
        {
          "x": "20 - 22",
          "y": 64
        },
        {
          "x": "22 - 24",
          "y": 124
        }
      ]
    },
    {
      "id": "Nettleie",
      "data": [
        {
          "x": "00 - 02",
          "y": 154
        },
        {
          "x": "02 - 04",
          "y": 248
        },
        {
          "x": "04 - 06",
          "y": 213
        },
        {
          "x": "06 - 08",
          "y": 99
        },
        {
          "x": "08 - 10",
          "y": 106
        },
        {
          "x": "10 - 12",
          "y": 9
        },
        {
          "x": "12 - 14",
          "y": 193
        },
        {
          "x": "14 - 16",
          "y": 61
        },
        {
          "x": "16 - 18",
          "y": 41
        },
        {
          "x": "18 - 20",
          "y": 6
        },
        {
          "x": "20 - 22",
          "y": 170
        },
        {
          "x": "22 - 24",
          "y": 111
        }
      ]
    },
    {
      "id": "Pris",
      "data": [
        {
          "x": "00 - 02",
          "y": 109
        },
        {
          "x": "02 - 04",
          "y": 239
        },
        {
          "x": "04 - 06",
          "y": 189
        },
        {
          "x": "06 - 08",
          "y": 257
        },
        {
          "x": "08 - 10",
          "y": 58
        },
        {
          "x": "10 - 12",
          "y": 195
        },
        {
          "x": "12 - 14",
          "y": 119
        },
        {
          "x": "14 - 16",
          "y": 78
        },
        {
          "x": "16 - 18",
          "y": 4
        },
        {
          "x": "18 - 20",
          "y": 241
        },
        {
          "x": "20 - 22",
          "y": 99
        },
        {
          "x": "22 - 24",
          "y": 219
        }
      ]
    },
  ]

    return (
      <div className='graphContainer'>
        <ResponsiveLine
            data={data}
            lineWidth={1}
            areaOpacity={1}
            colors={['#c29bde', '#ee4590','#ff3f40']}
            isInteractive={false}
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
            xScale={{ type: 'point' }}
            yScale={{
                type: 'linear',
                min: 'auto',
                max: 'auto',
                stacked: true,
                reverse: false
            }}
            // yFormat=" >-.2f"
            curve="basis"
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
                  match: {id: 'Pris'}
                },
                {
                  id: 'gradientA',
                  match: {id: 'Nettleie'}
                },
                {
                  id: 'gradientA',
                  match: {id: 'Forbruk'}
                }
              ]}
        />
</div>
    )
  }

  export default ForbruksGraf