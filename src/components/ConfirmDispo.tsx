import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


interface props {
  joboffer: any;
  finish: ()=>void;
  function:()=>void;
}

const ConfirmDispo: React.FC<props> = (props) => {

  return (
    <>
      <Modal show={true} onHide={props.finish}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation des changements</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3> <span className='entete_text'>reference : </span>{props.joboffer.reference}</h3>
          <p><span className='entete_text'>post : </span>{props.joboffer.post}</p>
          <p><span className='entete_text'>company : </span> {props.joboffer.company}</p>
          <p><span className='entete_text'>contract : </span>{props.joboffer.contract} Pages</p>
          <p><span className='entete_text'>profile : </span> {props.joboffer.profile}</p>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className='custom_color_refuse' onClick={props.finish}>
            Annuler
          </Button> 
          <Button variant="primary" className='custom_color_accept' onClick={props.function}>
            Accepter
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ConfirmDispo;