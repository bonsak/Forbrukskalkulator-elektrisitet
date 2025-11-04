import { ResponsiveLine } from '@nivo/line'
import { linearGradientDef } from '@nivo/core'
import styled from 'styled-components'
import { COLORS } from '@utils/constants'
import { line, curveBasis } from 'd3-shape'
import { useDagensPriserStore } from '@stores/dagensPriserStore'
import { useStroemForbrukStore } from '@stores/stroemForbrukStore'

function HovedGraf() {
  //
  const stroemForbruk = useStroemForbrukStore((state) => state.stroemForbruk); 
  const priser = useDagensPriserStore((state) => state.priser); 
  //
  const CustomLayer = ({ xScale, yScale }: { xScale: any; yScale: any }) => {
    if (!priser || !priser.data || priser.data.length === 0) return null;

    const scaleFactor = 6667
    const validData = priser.data.filter(
      (d) => typeof d.x === 'number' && 
             !isNaN(d.x) && 
             typeof d.y === 'number' && 
             !isNaN(d.y)
    );

    if (validData.length === 0) return null;

    const pathGenerator = line<[number, number]>()
      .x(([x]) => xScale(x))
      .y(([, y]) => yScale(y * scaleFactor))
      .curve(curveBasis);

    const points = validData.map(d => [d.x, d.y] as [number, number]);
    const pathData = pathGenerator(points);

    if (!pathData) return null;

    return (
      <g>
        <path
          d={pathData}
          fill="none"
          opacity={0.25}
          stroke={COLORS.clr_darkmintgreen}
          strokeWidth={5}
        />
      </g>
    );
  };

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
          min: 0.05,
          max: 20000,
          stacked: false,
          reverse: false,
        }}
        curve='stepAfter'
        axisTop={null}
        axisBottom={null}
        axisLeft={null}
        axisRight={null}
        enableGridX={true}
        enableGridY={true}
        gridYValues={[5000, 10000, 15000, 20000]}
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

export default HovedGraf
