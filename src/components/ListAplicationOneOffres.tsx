import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Application } from '../interfaces';
import "./style.css";

interface Props {
  dataActualisation:Application[],actualisationAllData:() => void, 
  returnAllValur:() => void, 
  setActivUpdat:React.Dispatch<React.SetStateAction<boolean>>,
}



export const ListAplicationOneOffres:React.FC<Props> = ({dataActualisation,returnAllValur,setActivUpdat,actualisationAllData})=>{



  return (

    <>
      <div className="fonds">
        <div className="whitFond">
            


        </div>
      </div>
    </>




 
  );
}


