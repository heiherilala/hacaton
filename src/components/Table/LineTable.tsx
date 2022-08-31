import axios from 'axios';
import { isEmptyArray } from 'formik';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { backgroundColor, APIUrl, variant } from '../../constants';
import { postPutDeletRequest } from '../../hoooks';
import { Domain } from '../../interfaces';
import ConfirmDispo from '../ConfirmDispo';
import Formulaire from '../Formulaire';
import Load from '../Loading';



interface props{
    idLine: any;
    item: any;
    actualisationAllData: () => void;
    bouttons:{name:string,method:(object:object)=>void}[]|null
    keFocus:{place: [number, number | null, number | null],funcion: (a: any) => any}[]
    takeVauleObjectByNumber:(n: [number, number | null, number | null], o: Object) => string
    dataCompose:Domain[]
    delet:boolean
  }

export const LigneList:React.FC<props> = (props) => {
    const[activPut,setActivPut]=useState<Boolean>(false)
    const idLine = props.idLine;
    const item = props.item;
    const bouttons = props.bouttons;
    const keFocus = props.keFocus;
    const takeVauleObjectByNumber = props.takeVauleObjectByNumber;



    const [activLoading,setActivLoading]= useState<boolean>(false)
    const startSctivLoading =()=> setActivLoading(true);
    const finishLoadingt:()=>void = ()=>{
        props.actualisationAllData();
        const temer1 = setInterval(()=>{
            setActivModif(false);
            setActivLoading(false);
        },500)
    }
    const [activModif,setActivModif]= useState<boolean>(false)
    const finishUpdatPut:()=>void = ()=>{
        props.actualisationAllData();
        const temer1 = setInterval(()=>{
            setActivModif(false);
            setActivLoading(false);
        },100)
    }

    

    return (
        <>
            
            <tr id={""+item.idJobOffer} key={item.idJobOffer}>
                {keFocus.map((donne)=>{return(
                    <td>{donne.funcion(""+takeVauleObjectByNumber(donne.place,item))}</td>
                )})}
                {((bouttons!=null))?
                    <td  className="center">
                        <div className="btn-group mr-2" role="group" aria-label="First group">
                            {bouttons.map((boutton)=>{return(
                                ((boutton.name=="disponible"&&item.available)||(boutton.name!="disponible"&&!item.available))?
                                <button onClick={()=>{setActivModif(true);}} type="button" disabled className={"btn custom_color_2"}>{boutton.name}</button>:
                                <button onClick={()=>{setActivModif(true);}} type="button" className={"btn custom_color_1"}>{boutton.name}</button>
                            )})}
                        </div>
                    </td>:<></>
                }
                {((props.delet))?
                    <td>
                                <button onClick={()=>{setActivModif(true);}} type="button" className={"btn custom_color_1"}><i className="bi bi-trash-fill "></i></button>
                    </td>:<></>
                }
            </tr>
            {activModif?
            <ConfirmDispo
                joboffer = {item}
                finish = {()=>{setActivModif(false)}}
                function = {()=>{
                    bouttons!=null?bouttons[0].method({data:item,functionIfTrue:setActivModif(false),functionIfFalse:setActivModif(false),token:"",startSctivLoading:startSctivLoading}):console.log("")
                }
            }
            />:<></>}

            {activLoading?Load(finishLoadingt):<></>}
        </>
    );
};


