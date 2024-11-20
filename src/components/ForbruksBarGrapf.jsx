import PropTypes from 'prop-types'
import { ResponsiveLine } from '@nivo/line'
import { linearGradientDef } from '@nivo/core'
import styled from 'styled-components'
import { COLORS } from '../utils/constants'
import { useEffect, useState } from 'react'
import { line, curveBasis } from 'd3-shape'

function ForbruksGraf({ stroemForbruk, priser }) {
  const [dagesStroemPris, setDagesStroemPris] = useState(null)
  const scaleFactor = 6667

  useEffect(() => {
    if (priser && priser.length > 0) {
      const stroemPrisData = {
        id: 'strømpris',
        color: COLORS.clr_darkmintgreen,
        data: priser.map((pris, index) => ({
          x: index,
          y: pris['NOK_per_kWh'] * scaleFactor,
        })),
      }
      setDagesStroemPris(stroemPrisData)
    }
  }, [priser])

  const CustomLayer = ({ xScale, yScale }) => {
    if (!dagesStroemPris) return null

    return (
      <g>
        <path
          d={line()
            .x((d) => xScale(d.x) * 1.05)
            .y((d) => yScale(d.y))
            .curve(curveBasis)(dagesStroemPris.data)}
          fill='none'
          opacity={0.25}
          stroke={COLORS.clr_darkmintgreen}
          strokeWidth={5}
        />
      </g>
    )
  }

  CustomLayer.propTypes = {
    xScale: PropTypes.func.isRequired,
    yScale: PropTypes.func.isRequired,
  }

  // console.log('dagesStroemPris:', dagesStroemPris)
  // console.log('stroemForbruk:', stroemForbruk)

  return (
    <GrafWrapper>
      <ResponsiveLine
        data={[stroemForbruk]}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        lineWidth={0}
        areaOpacity={1}
        colors={[`${COLORS.clr_red}`, '#ee4590', `${COLORS.clr_red}`]}
        isInteractive={false}
        yScale={{
          type: 'linear',
          min: '.05',
          max: '20000',
          stacked: false,
          reverse: false,
        }}
        curve='stepAfter'
        axisTop={false}
        axisBottom={false}
        axisLeft={false}
        axisRight={false}
        enableGridX={true}
        enableGridY={true}
        gridYValues={[5000, 10000, 15000, 20000]}
        gridLineStyle={{
          stroke: COLORS.clr_red,
          strokeWidth: 1,
          strokeOpacity: 0.2,
        }}
        enablePoints={false}
        enableArea={true}
        enableCrosshair={false}
        layers={[
          'grid',
          'markers',
          'axes',
          'areas',
          'lines',
          'points',
          'slices',
          'mesh',
          CustomLayer,
        ]}
        defs={[
          linearGradientDef('gradientA', [
            { offset: 0, color: `${COLORS.clr_red}` },
            { offset: 1000, color: `${COLORS.clr_lightred}` },
          ]),
          linearGradientDef('gradientB', [
            { offset: 0, color: `green` },
            { offset: 1000, color: `blue` },
          ]),
        ]}
        fill={[
          {
            id: 'gradientB',
            match: { id: 'dagesStroemPris' },
          },
          {
            id: 'gradientA',
            match: { id: 'stroemforbruk' },
          },
        ]}
      />
    </GrafWrapper>
  )
}

ForbruksGraf.propTypes = {
  stroemForbruk: PropTypes.object.isRequired,
  priser: PropTypes.arrayOf(
    PropTypes.shape({
      NOK_per_kWh: PropTypes.number.isRequired,
    })
  ).isRequired,
}

const GrafWrapper = styled.div`
  grid-area: graf;
  border-radius: 0 40px 0 0;
  background: ${COLORS.clr_mintlight};
  height: 400px;
  width: 885px;
  /* padding: 0 1rem; */
  /* margin-right: -160px; */
  /* overflow-x: hidden; */
  /* overflow-y: hidden; */
  /* margin-top: 2rem; */

  /* .axis-right-tick {
    fill: ${COLORS.clr_red};
    font-size: 14px;
    font-weight: 500;
  } */

  /* .axis-right-text {
    fill: ${COLORS.clr_red};
    font-size: 14px;
    font-weight: 500;
  } */
`

export default ForbruksGraf
