

import { Application, JobOffer } from "../interfaces";
//https://virtserver.swaggerhub.com/fenohasinalala/overlordJobOffer/1.0.0
export const variant: string = "info";
export const APIUrl: string = "https://virtserver.swaggerhub.com/fenohasinalala/overlordJobOffer/1.0.0";
export const ProjectUrl: string = "http://localhost:3000";
export const backgroundColor: string = "bg-"+variant;








export const newApplication:Application={
  "idApplication": 1,
  "candidateName": "Lova RAFANOMEZANTSOA",
  "email": "lova@gmail.com",
  "profile": "Ingenieur en Génie Civil, 05 années d'expériences",
  "salary": 2000000,
  "dateApplication": "2022-07-12",
  "jobOffer": {
    "idJobOffer": 1,
    "reference": "REF-001",
    "post": "Chef de chantier",
    "profile": "Bacc+3 avec 02 années d'expérience",
    "location": "Antananarivo",
    "description": "Parle courament français, ayant comme mission du suivie du bon derouement des travaux sur chantier",
    "company": "COLAS",
    "contract": "CDI",
    "available": true,
    "domain": {
      "idDomain": 1,
      "name": "Informatique"
    }
  }
}



  export const newJobOffer:JobOffer={
    "idJobOffer": 1,
    "reference": "REF-001",
    "post": "Chef de chantier",
    "profile": "Bacc+3 avec 02 années d'expérience",
    "location": "Antananarivo",
    "description": "Parle courament français, ayant comme mission du suivie du bon derouement des travaux sur chantier",
    "company": "COLAS",
    "contract": "CDI",
    "available": true,
    "domain": {
      "idDomain": 1,
      "name": "Informatique"
    }
  }

  