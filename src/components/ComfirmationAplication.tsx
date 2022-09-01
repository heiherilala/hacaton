import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { FormulaireAplication } from '.';
import { getCurrentUser } from '../hoooks';


interface props {
  item: any;
}

const ConfirmAplication: React.FC<props> = (props) => {
  const [activFrom, setActivFrom] = useState(false)
  const [myToken,setMyToken] = useState<string>()
  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      const subtitutionValue:string =  user.accessToken
      setMyToken(subtitutionValue);
    }
  }, []);


  return (
    <>
      <div>
        <div className='card_en-tete'><h3> <span className='entete_text'></span>{props.item.domain.name}</h3></div>
        
        <div className='card_body'>
            <p><span className='entete_text'>Poste : </span>{props.item.post}</p>
            <p><span className='entete_text'>Profil : </span> {props.item.profile}</p>
            <p><span className='entete_text'>Lieu : </span>{props.item.location}</p>
        </div>
        <div className='card_foot'>
          <Button className='custom_color_accept ' onClick={()=>{setActivFrom(true)}}>
              Voir l'annonce
          </Button>
        </div>
        
        
      </div>
      {activFrom?<>
        <Modal show={true} onHide={()=>{setActivFrom(false)}}>
          <Modal.Header closeButton>
            <Modal.Title>POSTULER A UNE OFFRE D'EMPLOI</Modal.Title>
          </Modal.Header>
          <Modal.Body className='formulaire_candidat_info'>
          <h3> <span className='entete_text'></span>{props.item.domain.name}</h3>
          <div className='row'>
          <div className='col-6'>
              <p><span className='entete_text'>Société : </span> {props.item.company}</p>
              <p><span className='entete_text'>Poste : </span>{props.item.post}</p>
              <p><span className='entete_text'>Lieu : </span>{props.item.location}</p>
            </div>
            <div className='col-6'>
              <p><span className='entete_text'>Profil recherché : </span> {props.item.profile}</p>
              <p><span className='entete_text'>Description : </span> {props.item.description}</p>
            </div>
          </div>
            

          </Modal.Body>
          <Modal.Body className='formulaire_candidat'>
          
            <FormulaireAplication item={props.item} fermetur={()=>{setActivFrom(false)}} token={myToken} />
          </Modal.Body>
        </Modal>
      </>:<></>}
    </>
  );
}

export default ConfirmAplication;