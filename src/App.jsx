import './App.css'
import ForbruksGraf from './components/ForbruksGrapf'
import Tidslinje from './components/Tidslinje'
import ForbruksGrid from './components/ForbuksGrid'
import AktivitetsGrid from './components/AktivitetsGrid'

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