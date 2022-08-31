import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { FormulaireAplication } from '.';


interface props {
  item: any;
}

const ConfirmAplication: React.FC<props> = (props) => {
  const [activFrom, setActivFrom] = useState(false)




  return (
    <>
      <div>
        <div>
          <h3> <span className='entete_text'></span>{props.item.domain.name}</h3>
          <p><span className='entete_text'>Poste : </span>{props.item.post}</p>
          <p><span className='entete_text'>Profil : </span> {props.item.profile}</p>
          <p><span className='entete_text'>Lieu d'exécution : </span>{props.item.location}</p>
        </div>
        <div>
          <button className='custom_color_accept' onClick={()=>{setActivFrom(true)}}>
            Voir l'annonce
          </button>
        </div>
      </div>
      {activFrom?<>
        <Modal show={true} onHide={()=>{setActivFrom(false)}}>
          <Modal.Header closeButton>
            <Modal.Title>POSTULER A UNE OFFRE D'EMPLOI</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h3> <span className='entete_text'></span>{props.item.domain.name}</h3>
            <p><span className='entete_text'>company : </span> {props.item.company}</p>
            <p><span className='entete_text'>Poste : </span>{props.item.post}</p>
            <p><span className='entete_text'>Profil : </span> {props.item.profile}</p>
            <p><span className='entete_text'>description : </span> {props.item.description}</p>
            <p><span className='entete_text'>Lieu d'exécution : </span>{props.item.location}</p>
          </Modal.Body>
          
          <FormulaireAplication item={props.item} fermetur={()=>{setActivFrom(false)}} />
        </Modal>
      </>:<></>}
    </>
  );
}

export default ConfirmAplication;