import './AktivitetsGrid.css'
import Icons from '../utils/Aktiviterer'


function AktivitetsGrid(){

    console.log(typeof Icons)
// const kolonner = []
//   for(var i = 0; i<=11 ;i ++){
//     kolonner.push(i * 2)
//   }
    return(
        <div className={'aktivitets-wrapper'}>
            <img className={'aktivitets-slot'} src='./icons/dusj.svg' />
            <img className={'aktivitets-slot'} src='./icons/elbil.svg' />
            <img className={'aktivitets-slot'} src='./icons/forbruk.svg' />
            <img className={'aktivitets-slot'} src='./icons/kaffetrakter.svg' />
            <img className={'aktivitets-slot'} src='./icons/oppvarming.svg' />
            <img className={'aktivitets-slot'} src='./icons/oppvaskmaskin.svg' />
            <img className={'aktivitets-slot'} src='./icons/stekeovn-plate.svg' />
            <img className={'aktivitets-slot'} src='./icons/vaskemaskin.svg' />
        </div>
    )
}
export default AktivitetsGrid