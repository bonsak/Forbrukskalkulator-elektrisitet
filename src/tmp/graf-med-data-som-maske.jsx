import { ResponsiveLine } from '@nivo/line'
import { useMemo } from 'react'

const data = [
  {
    id: 'serie 1',
    data: [
      { x: '2023-01-01', y: 3 },
      { x: '2023-02-01', y: 7 },
      { x: '2023-03-01', y: 12 },
      // Flere datapunkter
    ],
  },
]

// Funksjon for å lage en linje-bane basert på dataene
const generateClipPathD = (data, xScale, yScale) => {
  const path = data.map((point, i) => {
    const x = xScale(point.x)
    const y = yScale(point.y)
    return i === 0 ? `M ${x},${y}` : `L ${x},${y}`
  })
  return path.join(' ')
}

const CustomLayerWithClipPath = ({
  innerWidth,
  innerHeight,
  xScale,
  yScale,
  data,
}) => {
  // Generer path basert på dataene
  const clipPathD = useMemo(
    () => generateClipPathD(data[0].data, xScale, yScale),
    [data, xScale, yScale]
  )

  return (
    <svg
      width={innerWidth}
      height={innerHeight}
      style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
    >
      <defs>
        <clipPath id='dataClipPath'>
          <path d={clipPathD} />
        </clipPath>
      </defs>
      <rect
        x={0}
        y={0}
        width={innerWidth}
        height={innerHeight}
        fill='rgba(255, 165, 0, 0.3)'
        clipPath='url(#dataClipPath)'
        style={{ mixBlendMode: 'multiply' }}
      />
    </svg>
  )
}

const MyLineChart = () => (
  <div style={{ position: 'relative', height: 400 }}>
    <ResponsiveLine
      data={data}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: 'point' }}
      yScale={{ type: 'linear', min: 0, max: 'auto' }}
      axisLeft={{ tickValues: 10 }}
      enableArea={true} // Legg til gradientfyllet
      areaBaselineValue={0}
      colors={{ scheme: 'nivo' }}
      layers={[
        'grid',
        'markers',
        'axes',
        ({ innerWidth, innerHeight, xScale, yScale }) => (
          <CustomLayerWithClipPath
            innerWidth={innerWidth}
            innerHeight={innerHeight}
            xScale={xScale}
            yScale={yScale}
            data={data}
          />
        ),
        'lines',
        'points',
        'slices',
        'mesh',
        'legends',
      ]}
    />
  </div>
)

export default MyLineChart
