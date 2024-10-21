// eslint-disable-next-line no-unused-vars
import Chart from 'chart.js/auto'
import { Line } from 'react-chartjs-2'

function LineChart() {
  const labels = [
    '0 - 2',
    '2 - 4',
    '4 - 6',
    '6 - 8',
    '8 - 10',
    '10 - 12',
    '12 -14',
    '14 - 16',
    '16 - 18',
    '18 - 20',
    '20 - 22',
    '22 - 24',
  ]
  function randomData() {
    var rndData = []
    for (var i = 0; i < 12; i++) {
      rndData.push(Math.random() + 5)
    }
    return rndData
  }

  const lineTension = 0
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Forbruk',
        backgroundColor: '#c29bde80',
        data: randomData(),
        fill: 'start',
        tension: lineTension,
        borderWidth: 0,
        radius: 0,
      },
      {
        label: 'Nettleie',
        data: randomData(),
        borderWidth: 0,
        radius: 0,
        backgroundColor: '#ee449180',
        fill: 'start',
        tension: lineTension,
      },
      {
        label: 'Pris',
        data: randomData(),
        borderWidth: 0,
        radius: 0,
        backgroundColor: '#ff3f4080',
        fill: 'start',
        tension: lineTension,
      },
    ],
  }

  const options = {
    scales: {
      x: { display: false },
      y: { beginAtZero: true, display: false },
    },

    plugins: {
      filler: {
        propagate: true,
      },
    },
  }

  return (
    <div>
      <Line
        data={data}
        options={options}
      />
    </div>
  )
}

export default LineChart
