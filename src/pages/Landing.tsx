
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { newApplication, newJobOffer, ProjectUrl} from '../constants';
import background from "./../assets/images/pexels-andrea-piacquadio-3760067.jpg";
import { useEffect, useRef, useState } from "react";
import { axiosGetWithPage, axiosGget, login } from '../hoooks';
import { ConfirmAplication, Load, NavbarHeader } from '../components';
import { Application, Domain, JobOffer } from '../interfaces';
import { Link } from 'react-router-dom';
import { number } from 'yup/lib/locale';




  interface RouterProps {
      history: string;
  }
  
  //type Props = RouteComponentProps<RouterProps>;

  const Landing = () => {
    const [page, setPage] = useState(1);
    const [valuNumbur, setValuNumbur] = useState<number>(5);
    const [domaine, setDomaine] = useState<number|null>(null)
    const [aplication, setAplication] = useState<Application[]>([newApplication]);
    const [job, setJob] = useState<JobOffer[]>([newJobOffer]);
    const [loadJob, setLoadJob] = useState<number>(0);
    const [activLoad, setActivLoad] = useState<boolean>();
    useEffect(()=>{
        if (domaine == null){
            axiosGetWithPage("/job-offers",page,valuNumbur,token,setJob,()=>{},()=>{})//(endPoint: string, page: number, page_sise: number, token: string | undefined, takingData: React.Dispatch<React.SetStateAction<any[]>>, functionIfTrue: (() => void)
        }else {
            axiosGetWithPage("/domains/"+domaine+"/job-offers",page,valuNumbur,token,setJob,()=>{},()=>{})//(endPoint: string, page: number, page_sise: number, token: string | undefined, takingData: React.Dispatch<React.SetStateAction<any[]>>, functionIfTrue: (() => void)
        }
    },[loadJob,page,valuNumbur,domaine])
    
    const [dataCompose, setDataCompose] = useState<Domain[]>([]);
    useEffect(() => {
        if (activLoad!=undefined) {
            setActivLoad(true);
        } 
        axiosGget("/domains/?page=1&page_size=100",undefined,setDataCompose,null,()=>{setActivLoad(false)});
    }, [])

    
    const [password, setPassword] = useState<string>("");
    const [token, setToken] = useState<string>("");


  const navigate = ()=>{
    window.location.href=(ProjectUrl+"/Ranking");
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
                  {name:"Listes des offres d’emplois",href: (ProjectUrl + "/list-job")},
                  {name:"Applications par",href: (ProjectUrl + "/application")}
              ],
              {name:"Offre d’emploi",href: (ProjectUrl + "/")}
          )}
        {
            
        <div className=" contereAllLanding d-flex flex-column bd-highlight " >
            <div className="contereAllLoginb" style={{
                backgroundImage: 'url('+background+')',
                backgroundSize: "cover",
                height: "100vh",
                
              }}>
                <h1>Vous cherchez un emploi ?</h1>
                <a className='section-btn' href='#actu'>Consulter nos offres</a>
            </div>
                <div className="p-2 landing-list">

                        <p id='actu' className="landing-list-text">VOICI LES OFFRES D'ACTUALITE</p> 


                    <div className="landingSelection">
                        <p>
                            <div className="dataTable-dropdown">
                                <label>
                                nombre offres: 
                                    <select className="dataTable-selector landingSelect">
                                    <option value="5" onClick={() => setValuNumbur(5)} selected>
                                        5
                                    </option>
                                    <option value="10" onClick={() => setValuNumbur(10)} >
                                        10
                                    </option>
                                    <option value="15" onClick={() => setValuNumbur(15)}>
                                        15
                                    </option>
                                    <option value="20" onClick={() => setValuNumbur(20)}>
                                        20
                                    </option>
                                    <option value="25" onClick={() => setValuNumbur(25)}>
                                        25
                                    </option>
                                    </select>{" "}
                                    
                                </label>
                            </div>
                        </p>
                        <p>
                            <div className="dataTable-dropdown">
                                <label>
                                Domaine: 
                                    <select className="dataTable-selector landingSelect">
                                    <option value="5" onClick={() => setDomaine(null)} selected>
                                        tout
                                    </option>
                                    {dataCompose.map((data)=>{return(
                                        <option value="10" onClick={() => {setDomaine(data.idDomain);setPage(1)} } >
                                            {data.name}
                                        </option>
                                    )})}
                                    </select>{" "}
                                    
                                </label>
                            </div>
                        </p>
                    </div>





                    <div  className="landing-list-children1">
                        
                        {
                            page==1?
                            <button className="landing-list-children2-move" disabled>
                                <i className="bi bi-chevron-compact-left"></i>
                            </button>
                            :
                            <button className="landing-list-children2-move" onClick={()=>{setPage(page-1)}}>
                                <i className="bi bi-chevron-compact-left"></i>
                            </button>
                        }
                        
                        <div className='row row-cols-6 '>

                            {job.map((data)=>{return(
                                <div className="landing-list-children2">
                                    <ConfirmAplication item={data}/>
                                </div>
                            )})}
                        </div>







                        <button  className="landing-list-children2-move" onClick={()=>{setPage(page+1)}}>
                            <i className="bi bi-chevron-compact-right"></i>
                        </button>

                    </div>
                </div>
                <div className="p-2 landing-list">
                    <p>Le saviez-vous? Les métiers les plus recherché chez nous se trouvent dans le domaine de : INFORMATIQUE (10 candidatures)</p>
                </div>
                <div className="p-2 landing-list">
                    <p>VOUS ETES RECRUTEURS? CONTACTEZ-NOUS POUR QUE NOUS METTONS EN AVANT VOTRE OFFRE</p>
                    
                </div>

                <footer id="footer">
          <div className="container">
               <div className="row">

                    <div className="col">
                         <div className="footer-info">
                              <div className="footer-content"><p> Entreprise de recrutement</p></div>
                              <div className="copyright-text"> 
                                   <p > &copy; HEI - SARLU</p>                                
                              </div>        
                                                            
                              <p >Email: <a href="mailto:contact@hei.school">contact@hei.school</a> • Tel: +261 34 94 041 16 • <a href="https://www.google.com/maps/place/Haute+School+It+%5BHei%5D/@-18.8707638,47.5347298,15z/data=!4m5!3m4!1s0x0:0x73f917bb47615aa0!8m2!3d-18.8707923!4d47.5347803" target="_blank">2J 161R Ivandry, Antananarivo</a></p>
                         </div>
                    </div>                                      
                    
               </div>
          </div>
     </footer>
        </div>
        }
        {activLoad==true?Load(()=>{setActivLoad(false)}):<></>}
    </>
  );
}

export default Landing;
