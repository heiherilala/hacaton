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
        <div>
          <h3> <span className='entete_text'></span>{props.item.domain.name}</h3>
          <p><span className='entete_text'>Poste : </span>{props.item.post}</p>
          <p><span className='entete_text'>Profil : </span> {props.item.profile}</p>
          <p><span className='entete_text'>Lieu d'exécution : </span>{props.item.location}</p>
        </div>
        <div>
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
          <Modal.Body>
            <h3> <span className='entete_text'></span>{props.item.domain.name}</h3>
            <p><span className='entete_text'>company : </span> {props.item.company}</p>
            <p><span className='entete_text'>Poste : </span>{props.item.post}</p>
            <p><span className='entete_text'>Profil : </span> {props.item.profile}</p>
            <p><span className='entete_text'>description : </span> {props.item.description}</p>
            <p><span className='entete_text'>Lieu d'exécution : </span>{props.item.location}</p>
          </Modal.Body>
          
          <FormulaireAplication item={props.item} fermetur={()=>{setActivFrom(false)}} token={myToken} />
        </Modal>
      </>:<></>}
    </>
  );
}

export default ConfirmAplication;