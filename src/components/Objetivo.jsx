import ModalCadastroObjetivo from "./ModalCadastroObjetivo";
import ObjetivoEmpty from "./ObjetivoEmpty";
import { useState } from 'react';

export default function Objetivo() {
    const [ modalActive, setModalActive ] = useState(true);

    return (
        <>
            <div className="container-objetivo">
                <ModalCadastroObjetivo 
                    modalOn={modalActive}
                    closeObjetivo={() => setModalActive(!modalActive)}
                />
                <ObjetivoEmpty />
            </div>
        </>
    )
}