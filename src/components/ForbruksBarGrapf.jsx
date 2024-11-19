import PropTypes from 'prop-types'
import { ResponsiveLine, Line } from '@nivo/line'
import { linearGradientDef } from '@nivo/core'
import styled from 'styled-components'
import { COLORS } from '../utils/constants'
// import useForbukStore from '../stores/useForbruk'

function ForbruksGraf({ stroemForbruk }) {
  // console.log(COLORS.clr_red)
  const CustomBakgrunn = ({ innerWidth, innerHeight }) => {
    return (
      <>
        <path
          d={`M${innerWidth} 0 L${innerWidth} ${innerHeight} L0 ${innerHeight} L0 0 Z`}
          fill={`${COLORS.clr_mintlight}`}
          fillOpacity={1}
        />
      </>
    )
  }

  const customTheme = {
    axis: {
      right: {
        ticks: {
          text: {
            fill: `${COLORS.clr_red}`,
            fontSize: '14px',
            fontWeight: '500',
            fontFamily: 'Inter, sans-serif',
          },
          line: {
            stroke: '#c94545', // Farve på tick lines
            strokeWidth: 1, // Tykkelse på tick lines
          },
        },
      },
    },
  }

  return (
    <GrafWrapper>
      <ResponsiveLine
        // theme={customTheme}
        data={[stroemForbruk]}
        lineWidth={0}
        areaOpacity={1}
        // maxValue={6.6}
        colors={[`${COLORS.clr_red}`, '#ee4590', `${COLORS.clr_red}`]}
        // margin={{ top: 50, right: 0, bottom: 0, left: 0 }}
        isInteractive={false}
        // xScale={{
        //   type: 'point',
        //   padding: 0.2,
        //   min: '0',
        //   max: '22',
        // }}
        yScale={{
          type: 'linear',
          min: '.05',
          max: '20000',
          stacked: false,
          reverse: false,
        }}
        // yFormat=" >-.2f"
        curve='stepAfter'
        axisTop={false}
        // axisTop={{
        //   orient: 'top',
        //   tickSize: 0,
        //   tickPadding: 5,
        //   tickRotation: 0,
        //   legend: '',
        //   legendOffset: 0,
        //   truncateTickAt: 0,
        // }}
        // axisRight={false}
        // axisRight={{
        //   tickValues: [5000, 10000, 15000, 20000],
        //   renderTick: ({ x, y, value }) => (
        //     <g transform={`translate(${x},${y})`}>
        //       <text
        //         x={-10}
        //         y={1}
        //         textAnchor='end'
        //         dominantBaseline='middle'
        //         style={{
        //           marginRight: -500,
        //           fill: `${COLORS.clr_red}`,
        //           fontSize: 14,
        //           fontWeight: 'bold',
        //         }}
        //       >
        //         {value.toLocaleString()}
        //       </text>
        //     </g>
        //   ),
        // }}
        // axisRight={{
        //   tickSize: 0,
        //   tickPadding: 12,
        //   tickRotation: 0,
        //   tickValues: [5000, 10000, 15000, 20000],
        //   format: (value) => `${value.toLocaleString()}`,
        //   legend: '',
        //   legendOffset: -20,
        //   legendPosition: 'left',
        //   truncateTickAt: 0,
        // className: 'axis-right-text',
        // tickClassName: 'axis-right-tick',
        // }}

        // axisBottom={true}
        // axisLeft={false}
        // axisLeft={{
        //   renderTick: ({ x, y, value }) => (
        //     <g transform={`translate(${x},${y})`}>
        //       <text
        //         x={-10}
        //         y={0}
        //         textAnchor='end'
        //         dominantBaseline='middle'
        //         style={{
        //           fill: 'blue',
        //           fontSize: 12,
        //           fontWeight: 'normal',
        //         }}
        //       >
        //         {value}
        //       </text>
        //     </g>
        //   ),
        // }}
        enableGridX={true}
        enableGridY={true}
        gridYValues={[5000, 10000, 15000, 20000]}
        // gridYValues={[5, 10, 15, 20]}
        gridLineStyle={{
          stroke: COLORS.clr_red,
          strokeWidth: 1,
          strokeOpacity: 0.2,
        }}
        enablePoints={false}
        enableArea={true}
        enableCrosshair={false}
        layers={[
          // CustomBakgrunn,
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
            { offset: 0, color: `${COLORS.clr_red}` },
            { offset: 1000, color: `${COLORS.clr_lightred}` },
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
            match: { id: 'stroemforbruk' },
          },
        ]}
      />
    </GrafWrapper>
  )
}

ForbruksGraf.propTypes = {
  stroemForbruk: PropTypes.object.isRequired,
}

// const CustomBakgrunn = PropTypes.shape({
//   innerWidth: PropTypes.number.isRequired,
//   innerHeight: PropTypes.number.isRequired,
// })

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
