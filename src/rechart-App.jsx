
import './App.css'
// import LineChart from './components/LineChart'
// import Icon from './utils/Aktiviterer'
import { AreaChart } from 'recharts'
import { XAxis } from 'recharts'
import { YAxis } from 'recharts'
import { CartesianGrid } from 'recharts'
import { Tooltip } from 'chart.js'
import { Area } from 'recharts'

function App() {
  const data = [
    {
      name: 'Page A',
      pris: 4000,
      nettleie: 2400,
      forbruk: 1600,
      amt: 2400,
    },
    {
      name: 'Page B',
      pris: 3000,
      nettleie: 1398,
      forbruk: 1200,
      amt: 2210,
    },
    {
      name: 'Page C',
      pris: 2000,
      nettleie: 9800,
      forbruk: 2200,
      amt: 2290,
    },
    {
      name: 'Page D',
      pris: 2780,
      nettleie: 3908,
      forbruk: 3500,
      amt: 2000,
    },
    {
      name: 'Page E',
      pris: 1890,
      nettleie: 4800,
      forbruk: 900,
      amt: 2181,
    },
    {
      name: 'Page F',
      pris: 2390,
      nettleie: 3800,
      forbruk: 3100,
      amt: 2500,
    },
    {
      name: 'Page G',
      pris: 3490,
      nettleie: 4300,
      forbruk: 1100,
      amt: 2100,
    },
  ]

  return (
    <>
      {/* <div>
        <LineChart></LineChart>
        <Icon icon={'Dusj'} />
      </div> */}
      <AreaChart
        width={730}
        height={250}
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient
            id='colorForbruk'
            x1='0'
            y1='0'
            x2='0'
            y2='1'
          >
            <stop
              offset='5%'
              stopColor='#      function App() {'
              stopOpacity={0.8}
            />
            <stop
              offset='95%'
              stopColor='#c29bde'
              stopOpacity={0}
            />
          </linearGradient>
          <linearGradient
            id='colorNettleie'
            x1='0'
            y1='0'
            x2='0'
            y2='1'
          >
            <stop
              offset='5%'
              stopColor='#ee4590'
              stopOpacity={0.8}
            />
            <stop
              offset='95%'
              stopColor='#ee4590'
              stopOpacity={0}
            />
          </linearGradient>
          <linearGradient
            id='colorPris'
            x1='0'
            y1='0'
            x2='0'
            y2='1'
          >
            <stop
              offset='5%'
              stopColor='#c29bde'
              stopOpacity={0.8}
            />
            <stop
              offset='95%'
              stopColor='#c29bde'
              stopOpacity={0}
            />
          </linearGradient>
        </defs>
        <XAxis dataKey='name' />
        <YAxis />
        <CartesianGrid strokeDasharray='3 3' />
        <Tooltip />
        <Area
          type='monotone'
          dataKey='forbruk'
          stroke='#8884d8'
          fillOpacity={1}
          fill='url(#colorForbruk)'
          animationEasing='ease-in-out'
        />
        <Area
          type='monotone'
          dataKey='nettleie'
          stroke='#82ca9d'
          fillOpacity={1}
          fill='url(#colorNettleie)'
          animationEasing='ease-in-out'
        />
        <Area
          type='monotone'
          dataKey='pris'
          stroke='#82ca9d'
          fillOpacity={1}
          fill='url(#colorPris)'
          animationEasing='ease-in-out'
        />
      </AreaChart>
    </>
  )
}

export default App
