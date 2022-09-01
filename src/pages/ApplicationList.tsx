import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { NavbarHeader, TableConstructor } from '../components';
import { newJobOffer, ProjectUrl } from '../constants';
import { axiosGget, getCurrentUser } from '../hoooks';
import { Application } from '../interfaces';

interface props{
    items: Application[];
    actualisationAllData:() => void;
    setActivUpdat: React.Dispatch<React.SetStateAction<boolean>>;
  }

const ApplicationList: React.FC<props> = (props) => {

  const [items, setItems] = useState(props.items);
  const [offerActiv, setOfferActiv] = useState(newJobOffer);
  const [myToken,setMyToken] = useState<string>()
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
    axiosGget("/job-offers/1",myToken,setOfferActiv,null,null)
  }
  const changeItemt = ()=>{
    axiosGget("/job-offers/1/applications",myToken,setItems,null,null)
  }



    return (
        <>
          {NavbarHeader(
              [
                  {name:"Listes des offres d’emplois",href: (ProjectUrl + "/list-job")},
                  {name:"Listes des offres d’emplois",href: (ProjectUrl + "/application")}
              ],
              {name:"Offre d’emploi",href: (ProjectUrl + "/")}
          )}

          <Container className="offreDeteils">
            <Row className="offreDeteils">
              <Col md={12}>
                <h2>{"Offre N°:"+offerActiv.reference}</h2>
              </Col>
              <Col md={12}>
                <div>
                  <Row>
                    <Col md={5}>
                      {`post:`}
                    </Col>
                    <Col md={7}>
                      {offerActiv.post}
                    </Col>
                  </Row>
                  <Row>
                    <Col md={5}>
                      {`company:`}
                    </Col>
                    <Col md={7}>
                      {offerActiv.company}
                    </Col>
                  </Row>
                  <Row>
                    <Col md={5}>
                      {`domain:`}
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
              <Row className='contAplication'>
                <Col md={{ span: 6, offset: 3 }}>
                  <Row>
                    <Col md={5}>
                      {`Reférence de l'offre:`}
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
                      {`Nom du candidat:`}
                    </Col>
                    <Col md={7}>
                      {item.candidateName}
                    </Col>
                  </Row>
                </Col>
                <Col md={{ span: 5, offset: 2 }}>
                  <Row>
                    <Col md={5}>
                      {`Email du candidat:`}
                    </Col>
                    <Col md={7}>
                      {item.email}
                    </Col>
                  </Row>
                </Col>

                <Col md={5}>
                  <Row>
                    <Col md={5}>
                      {`Date de postulation :`}
                    </Col>
                    <Col md={7}>
                      {item.dateApplication}
                    </Col>
                  </Row>
                </Col>
                <Col md={{ span: 5, offset: 2 }}>
                  <Row>
                    <Col md={5}>
                      {`Prétention salariale :`}
                    </Col>
                    <Col md={7}>
                      {item.salary}
                    </Col>
                  </Row>
                </Col>

                <Col md={12}>
                  <Row>
                    <Col md={4}>
                      {`Profil du candidat:`}
                    </Col>
                    <Col md={8}>
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