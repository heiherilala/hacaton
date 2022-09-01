import axios from 'axios';
import { isEmptyArray } from 'formik';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { backgroundColor, APIUrl, variant } from '../../constants';
import { postPutDeletRequest } from '../../hoooks';
import { Domain, JobOffer } from '../../interfaces';
import ConfirmDispo from '../ConfirmDispo';
import Formulaire from '../Formulaire';
import FormulaireAddOffre from '../FormulaireAddOffre';
import Load from '../Loading';



interface props{
    idLine: any;
    item: JobOffer;
    actualisationAllData: () => void;
    bouttons:{name:string,method:(object:object)=>void}[]|null
    keFocus:{place: [number, number | null, number | null],funcion: (a: any) => any}[]
    takeVauleObjectByNumber:(n: [number, number | null, number | null], o: Object) => string
    dataCompose:Domain[]
    delet:boolean
    token: string|undefined
  }

export const LigneList:React.FC<props> = (props) => {
    const[activPut,setActivPut]=useState<Boolean>(false)
    const idLine = props.idLine;
    const item = props.item;
    const bouttons = props.bouttons;
    const keFocus = props.keFocus;
    const takeVauleObjectByNumber = props.takeVauleObjectByNumber;



    const [activLoading,setActivLoading]= useState<boolean>(false)
    const [activModif,setActivModif]= useState<boolean>(false)
    const [activModifPut,setActivModifPut]= useState<boolean>(false)

    const startSctivLoading =()=> setActivLoading(true);
    const finishLoadingt:()=>void = ()=>{
        const temer1 = setInterval(()=>{
            setActivModif(false);
            setActivLoading(false);
            setActivModifPut(false);
            clearInterval(temer1);
        },500);
        props.actualisationAllData();

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
                                <button onClick={()=>{setActivModif(true);}} type="button" className={"btn custom_color_1"}>{boutton.name}</button>:
                                <button onClick={()=>{setActivModif(true);}} type="button" disabled className={"btn custom_color_2"}>{boutton.name}</button>
                                
                            )})}
                        </div>
                    </td>:<></>
                }
                {((props.delet))?
                    <td>
                                <button onClick={()=>{setActivModifPut(true);}} type="button" className={"btn custom_color_1"}><i className="bi bi-pencil-square"></i></button>
                    </td>:<></>
                }
            </tr>
            {activModif?
            <ConfirmDispo
                joboffer = {item}
                finish = {()=>{setActivModif(false)}}
                function = {()=>{
                    const newValue = {
                        reference: item.reference,
                        post: item.post,
                        profile: item.profile,
                        location: item.location,
                        description: item.description,
                        company: item.company,
                        contract: item.contract,
                        available:!item.available,
                        domain: {
                          idDomain: item.domain?.idDomain
                        }
                    }
                    postPutDeletRequest("/job-offers/"+item.idJobOffer,newValue,null,false,true,()=>finishLoadingt(),()=>()=>{setActivModif(false)},props.token);
                }
            }
            />:<></>}
                {activModifPut?<div className='fonds3'><FormulaireAddOffre
                joboffer = {item} //: joboffer | undefined;
                id = {idLine} //:number | null;
                fermetur = {finishLoadingt} //:()=>void;
                dataCompose = {props.dataCompose} //:category[];
                change = {4} //:any;
                token = {props.token}
          /></div>:<></>}

            {activLoading?Load(()=> {props.actualisationAllData();setActivModifPut(false)}):<></>}
        </>
    );
};


