import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Spinner from 'react-bootstrap/esm/Spinner';
import { backgroundColor } from '../constants';


const Load = (FinishLoading:()=>void) => {

    return(
        <>
            <div className="realBackground">
                <button className={"custom_color_3"}  onClick={()=>{FinishLoading()}}>
                <span className="spinner-border spinner-border-sm marge"></span>
                  {"  "}Chargement en cours
                </button>
            </div>

        </>
    )

};

export default Load;