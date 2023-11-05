import './css/BotoesRolagemHorizontal.css'
import { BsChevronLeft } from "react-icons/bs";
import { BsChevronRight } from "react-icons/bs";



export default function BotoesRolagemHorizontal() {
    return (
        <>
            <div className="container-btnRolagem">
                <button><BsChevronLeft /></button>
                <button><BsChevronRight /></button>
            </div>
        </>
    )
}