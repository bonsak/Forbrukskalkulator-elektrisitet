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

  return (
    <GrafWrapper>
      <ResponsiveLine
        data={[stroemForbruk]}
        lineWidth={0}
        areaOpacity={1}
        maxValue={6.6}
        colors={[`${COLORS.clr_red}`, '#ee4590', `${COLORS.clr_red}`]}
        margin={{ top: 50, right: 25, bottom: 0, left: 0 }}
        isInteractive={false}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
          min: '.05',
          // max: '20',
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
        axisRight={false}
        // axisRight={{
        //   tickSize: 0,
        //   tickPadding: 0,
        //   tickRotation: 0,
        //   legend: '',
        //   legendOffset: -44,
        //   legendPosition: 'left',
        //   truncateTickAt: 0,
        // }}
        axisBottom={true}
        axisLeft={false}
        enableGridX={false}
        enableGridY={false}
        enablePoints={false}
        enableArea={true}
        enableCrosshair={false}
        layers={[
          CustomBakgrunn,
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

const GrafWrapper = styled.div`
  border-radius: 40px 40px 0 0;
  background: ${COLORS.clr_mintlight};
  /* box-shadow: rgba(0, 0, 0, 0.1) 4px 4px 6px 0px; */
  height: 400px;
  width: 885px;
  overflow-x: hidden;
  overflow-y: hidden;
  margin-top: 2rem;
`

export default ForbruksGraf
