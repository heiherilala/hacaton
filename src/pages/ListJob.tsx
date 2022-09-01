import React from 'react';
import { NavbarHeader, TableConstructor } from '../components';
import { ProjectUrl } from '../constants';
import { postPutDeletRequest } from '../hoooks';


interface props{
    items: any[];
    actualisationAllData:() => void;
    setActivUpdat: React.Dispatch<React.SetStateAction<boolean>>;
  }

const ListJob: React.FC<props> = (props) => {


const takeName = (a:any)=>{
  if (a!="true") {
    return "disponible"
  }else{
    return "indisponible"
  }
}



    return (
        <>
        <div className='background_gray' >
        {NavbarHeader(
              [
                  {name:"Listes des offres d’emplois",href: (ProjectUrl + "/list-job")},
                  {name:"Listes des candicatures",href: (ProjectUrl + "/application")}
              ],
              {name:"Offre d’emploi",href: (ProjectUrl + "/")}
          )}
          <div className='liste_tab'>
          <TableConstructor 
            items={props.items}
            actualisationAllData={props.actualisationAllData}
            setActivUpdat={props.setActivUpdat}
            colloneName= {["Référence","Domaine",'Poste','Statut']}
            keFocus={[{place:[1,null,null],funcion:(a:any)=>{return a}},{place:[9,1,null],funcion:(a:any)=>{return a}},{place:[2,null,null],funcion:(a:any)=>{return a}},{place:[6,null,null],funcion:takeName}]}
            bouttons={[
              {name:"disponible",method:((book:any)=>{postPutDeletRequest("books",book.data,1,false,false,book.functionIfTrue,book.functionIfFalse,book.token)})},
              {name:"indisponible",method:((book:any)=>{postPutDeletRequest("books",book.data,1,false,false,book.functionIfTrue,book.functionIfFalse,book.token)})},
            ]}
            title={"Listes des offres d’emplois"}
            delet={true}
          />
          </div>
          </div>
        </>
    );
};

export default ListJob;