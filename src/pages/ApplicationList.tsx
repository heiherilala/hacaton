import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { setConstantValue } from 'typescript';
import { NavbarHeader, TableConstructor } from '../components';
import { newJobOffer, ProjectUrl } from '../constants';
import { axiosGget, getCurrentUser } from '../hoooks';
import { Application } from '../interfaces';

interface props{
    items: Application[];
    id:number;
    setActivUpdat: React.Dispatch<React.SetStateAction<boolean>>;
  }

const ApplicationList: React.FC<props> = (props) => {

  const [items, setItems] = useState(props.items);
  const [offerActiv, setOfferActiv] = useState(newJobOffer);
  const [myToken,setMyToken] = useState<string>()
  const [id,setId] = useState<string|number>(props.id)
  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      const subtitutionValue:string =  user.accessToken
      setMyToken(subtitutionValue);
    }
  }, []);

  useEffect(() => {
    changeItemt();
    changeOffre();
  }, []);

  const changeOffre = ()=>{
    axiosGget("/job-offers/"+id,myToken,setOfferActiv,null,null)
  }
  const changeItemt = ()=>{
    axiosGget("/job-offers/"+id+"/applications/?page=1&page_size=50",myToken,setItems,null,null)
  }




    return (
        <>
          {NavbarHeader(
              [
                  {name:"Listes des offres d’emplois",href: (ProjectUrl + "/list-job")},
                  {name:"Listes des candicatures",href: (ProjectUrl + "/application")}
              ],
              {name:"Offre d’emploi",href: (ProjectUrl + "/")}
          )}

          <Container className="offreDeteils">
            <Row className="offreDeteils">
              <Col md={12}>
                <h2>{"Offre N°:"+offerActiv.reference}</h2>
                <input type="text" name="id" id="idId" value={id} onChange={(e)=>{setId(e.target.value)}} />
                <button onClick={()=>{changeItemt();changeOffre();}}>Changer offre</button>
              </Col>
              <Col md={12}>
                <div className="job_offer_info">
                  <Row>
                    <Col md={5}>
                      {`Poste:`}
                    </Col>
                    <Col md={7}>
                      {offerActiv.post}
                    </Col>
                  </Row>
                  <Row>
                    <Col md={5}>
                      {`Companie:`}
                    </Col>
                    <Col md={7}>
                      {offerActiv.company}
                    </Col>
                  </Row>
                  <Row>
                    <Col md={5}>
                      {`Domaine:`}
                    </Col>
                    <Col md={7}>
                      {offerActiv.domain?.name}
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </Container>




          {items.map((item)=>{return (
            <Container>
              <Row className='contAplication jumbotron marging'>
                <Col md={{ span: 6, offset: 3 }} className="titleAplication">
                  <Row>
                    <Col md={5} className="titleApication">
                      <b>{`Reférence:`}</b>
                    </Col>
                    <Col md={7}>
                      {item.jobOffer?.reference}
                    </Col>
                  </Row>
                </Col>
                <Col md={3}></Col>
                
                <Col md={5}>
                  <Row>
                    <Col md={5}>
                    <b>{`Nom du candidat:`}</b>
                    </Col>
                    <Col md={7} className="containtApication">
                      {item.candidateName}
                    </Col>
                  </Row>
                </Col>
                <Col md={{ span: 5, offset: 2 }}>
                  <Row>
                    <Col md={5}>
                    <b>{`Email du candidat:`}</b>
                    </Col>
                    <Col md={7} className="containtApication">
                      {item.email}
                    </Col>
                  </Row>
                </Col>

                <Col md={5}>
                  <Row>
                    <Col md={5}>
                    <b>{`Date du post :`}</b>
                    </Col>
                    <Col md={7} className="containtApication">
                      {item.dateApplication}
                    </Col>
                  </Row>
                </Col>
                <Col md={{ span: 5, offset: 2 }}>
                  <Row>
                    <Col md={5}>
                    <b>{`Prétention salariale :`}</b>
                    </Col>
                    <Col md={7} className="containtApication">
                      {item.salary}
                    </Col>
                  </Row>
                </Col>

                <Col md={12}>
                  <Row>
                    <Col md={4}>
                    <b>{`Profil du candidat:`}</b>
                    </Col>
                    <Col md={8} className="containtApication">
                      {item.profile}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          )})}

        </>
    );
};

export default ApplicationList;