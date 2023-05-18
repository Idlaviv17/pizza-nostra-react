import { Link } from "react-router-dom"

const Missing = () => {
    return (
        <div>
            <h1>Oops!</h1>
            <p>Página no encontrada</p>
            <div>
                <Link to="/login">Volver al login</Link>
            </div>
        </div>
    )
}

export default Missing