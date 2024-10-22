import './App.css'
import ForbruksGraf from './ForbruksGrapf'
import Tidslinje from './Tidslinje'
import ForbruksGrid from './ForbuksGrid'
import AktivitetsGrid from './AktivitetsGrid'

function App() {
  return (
    <>
      <div className={'main-wrapper'}>
        <ForbruksGraf />
        <Tidslinje />
        <ForbruksGrid />
        <AktivitetsGrid />
      </div>
    </>
  )
}

export default App
