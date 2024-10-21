import './Tidslinje.css'

function Tidslinje(){
    return (
        <div className="tid">
            <div className="tid-wrapper">
                <div className="natt">Natt</div>
                <div className="morgen-kveld">Morgen</div>
                <div className="dag">Dag</div>
                <div className="morgen-kveld">Kveld</div>
                <div className="natt">Natt</div>
            </div>
        </div>
    )
}
export default Tidslinje