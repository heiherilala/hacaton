import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { FormulaireAplication } from '.';
import { getCurrentUser } from '../hoooks';


interface props {
  function: ()=>{};
}

const Alert: React.FC<props> = (props) => {
  return (
    <>
        <Modal show={true} onHide={()=>{props.function()}}>
          <Modal.Header closeButton>
            <Modal.Title>Erreur</Modal.Title>
          </Modal.Header>
          <Modal.Body className='formulaire_candidat_info'>
          <div className='col-6'>
            Votre Mot de passe ou Nom d'utilisateur est erroné
          </div>
            

          </Modal.Body>
          <button className={"btn_envoie btn_type2 "} onClick={()=>{props.function()}}>
                  {"OK".toUpperCase()}
          </button>
        </Modal>

    </>
  );
}

export default Alert;