
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { newApplication, newJobOffer, ProjectUrl} from '../constants';
import background from "./../assets/images/KOLORO_1661547966914.jpg";
import { useEffect, useRef, useState } from "react";
import { axiosGetWithPage, login } from '../hoooks';
import { ConfirmAplication, NavbarHeader } from '../components';
import { Application, JobOffer } from '../interfaces';




  interface RouterProps {
      history: string;
  }
  
  //type Props = RouteComponentProps<RouterProps>;

  const Landing = () => {

    const [aplication, setAplication] = useState<Application[]>([newApplication]);
    const [job, setJob] = useState<JobOffer[]>([newJobOffer]);
    const [loadJob, setLoadJob] = useState<number>(0);
    useEffect(()=>{
        axiosGetWithPage("/job-offers",1,5,token,setJob,()=>{},()=>{})//(endPoint: string, page: number, page_sise: number, token: string | undefined, takingData: React.Dispatch<React.SetStateAction<any[]>>, functionIfTrue: (() => void)
    },[loadJob])
 
    
    const [password, setPassword] = useState<string>("");
    const [token, setToken] = useState<string>("");


  const navigate = ()=>{
    window.location.href=(ProjectUrl+"/application");
  }

  const functionLog = (username:string, password:string) => {
    console.log("GGGGGGGGGGGGGGGGGGGGGGGGGGG");
    login(username, password, navigate, setToken).then((re)=>{
    })
  }

  


  
  
  


  return (
    <>
        {NavbarHeader(
            [
                {name:"Listes des offres",href: (ProjectUrl + "/list-job")},
                {name:"Listes des candidatures",href: (ProjectUrl + "/application")}
            ],
            {name:"Offre d’emploi",href: (ProjectUrl + "/")}
        )}
        {
        <div className=" contereAllLanding d-flex flex-column bd-highlight mb-3" >


                <div className="p-2 landing-list">

                        <p className="landing-list-text">VOUS ETES A LA RECHERCHE D'emploi? VOICI LES OFFRES D'ACTUALITE</p>

                    <div className="landing-list-children1">
                        <button className="landing-list-children2-move">
                            <i className="bi bi-chevron-compact-left"></i>
                        </button>
                        {job.map((data)=>{return(
                            <div className="landing-list-children2">
                                <ConfirmAplication item={data}/>
                            </div>
                        )})}
                        <button className="landing-list-children2-move">
                            <i className="bi bi-chevron-compact-right"></i>
                        </button>
                    </div>
                </div>
                <div className="p-2 landing-list">
                    <p>Le saviez-vous? Les métiers les plus recherché chez nous se trouvent dans le domaine de : INFORMATIQUE (10 candidatures)</p>
                </div>
                <div className="p-2 landing-list">
                    <p>VOUS ETES RECRUTEURS? CONTACTEZ-NOUS POUR QUE NOUS METTONS EN AVANT VOTRE OFFRE</p>
                    <div className="landing-list2-children1">
                        <div className="landing-list2-children2">
                            <h2>TELEPHONE</h2>
                            <div>Mobile1: +261 33 12 345 64</div>
                            <div>Mobile1: +261 34 12 345 64</div>
                            <div>Mobile1: +261 22 12 345 64</div>
                        </div>
                        <div className="landing-list2-children2">
                            <h2>EMAIL</h2>
                            <div>nyainaheri@gmail.com</div>
                            <div>lova@gmail.com</div>
                            <div>unbon@gmail.com</div>
                        </div>
                        <div className="landing-list2-children2">
                            <h2>ADRESSE</h2>
                            <div>Batiment Ivandry, 101 Antananarivo</div>
                            <div>Madagascar</div>
                        </div>
                    </div>
                </div>


        </div>
        }
    </>
  );
}

export default Landing;
