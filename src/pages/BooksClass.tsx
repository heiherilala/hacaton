import React from 'react';
import { NavbarHeader, TableConstructor } from '../components';
import { ProjectUrl } from '../constants';
import { postPutDeletRequest } from '../hoooks';


interface props{
    items: any[];
    actualisationAllData:() => void;
    setActivUpdat: React.Dispatch<React.SetStateAction<boolean>>;
  }

const BooksClass: React.FC<props> = (props) => {






    return (
        <>
        <div className='background_gray' >
          {NavbarHeader(
              [
                  {name:"Listes des offres d’emplois",href: (ProjectUrl + "/BooksClass")},
                  {name:"Listes des offres d’emplois",href: (ProjectUrl + "/Ranking")}
              ],
              {name:"Offre d’emploi",href: (ProjectUrl + "/")}
          )}  
          <div className='liste_tab'>
          <TableConstructor 
            items={props.items}
            actualisationAllData={props.actualisationAllData}
            setActivUpdat={props.setActivUpdat}
            colloneName= {["Titre","Auteur",'Catégorie','Nombre de page']}
            keFocus={[[1,null,null],[2,null,null],[5,1,null],[3,null,null]]}
            bouttons={[
              {name:"Emprunter",method:((book:any)=>{postPutDeletRequest("books",book.data,1,false,false,book.functionIfTrue,book.functionIfFalse,book.token)})},
              {name:"Rendre",method:((book:any)=>{postPutDeletRequest("books",book.data,1,false,false,book.functionIfTrue,book.functionIfFalse,book.token)})},
            ]}
            title={"Liste des Livres"}
            delet={true}
          />
          </div>
          </div>
        </>
    );
};

export default BooksClass;