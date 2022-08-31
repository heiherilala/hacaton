import React from 'react';
import { NavbarHeader, TableConstructor } from '../components';
import { ProjectUrl } from '../constants';

interface props{
    items: any[];
    actualisationAllData:() => void;
    setActivUpdat: React.Dispatch<React.SetStateAction<boolean>>;
  }

const Ranking: React.FC<props> = (props) => {
    return (
        <>
          {NavbarHeader(
              [
                  {name:"Listes des offres d’emplois",href: (ProjectUrl + "/BooksClass")},
                  {name:"Listes des offres d’emplois",href: (ProjectUrl + "/Ranking")}
              ],
              {name:"Offre d’emploi",href: (ProjectUrl + "/")}
          )}
          <TableConstructor 
            items={props.items}
            actualisationAllData={props.actualisationAllData}
            setActivUpdat={props.setActivUpdat}
            colloneName= {["Rang","Titre",'Auteur','Nombre de page',"Nombre d'emprunts"]}
            keFocus={[[8,null,null],[1,null,null],[2,null,null],[3,null,null],[7,null,null]]}
            bouttons={null}
            title={"Classement des livres par nombre d’emprunts"}
            delet={false}
          />
        </>
    );
};

export default Ranking;