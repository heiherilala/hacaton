
import { Field, useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useEffect, useState } from "react";
import { APIUrl, backgroundColor } from "../constants";
import { JobOffer } from "../interfaces";
interface props {
  joboffer: JobOffer;
  id:number | null;
  fermetur:()=>void;
  dataCompose:any[];
  change:any;
}

const FormulaireAddOffre: React.FC<props> = (props) => {
  const fermerFormulaire=()=>{setInterval(()=>{props.fermetur()},500); };
  const change = props.change;
  
  const [activ,setActiv] = useState(true)
  const [number,setNumber] = useState(0)
  useEffect (()=>{
      if (number==0) {
          setNumber(number+1);
      }else{
          setActiv(activ==false)
      }
  },[change]);

  const formik = useFormik({
    initialValues: {
      company: (props.joboffer==undefined?"":props.joboffer.company),
      contract: (props.joboffer==undefined?"":""+props.joboffer.contract),
      description: (props.joboffer==undefined?"":""+props.joboffer.description),
      domain: (props.joboffer==undefined?"Comedy":props.joboffer.domain?.name),
      location: (props.joboffer==undefined?"":""+props.joboffer.location),
      post: (props.joboffer==undefined?"":""+props.joboffer.post),
      profile: (props.joboffer==undefined?"":""+props.joboffer.profile),
      reference: (props.joboffer==undefined?"":""+props.joboffer.reference),
    },
    validationSchema: Yup.object({
      company: Yup.string()
        .max(100, "Caractère inferieur ou egale à 100")
        .required("Requis"),
      contract: Yup.string()
        .max(100, "Caractère inferieur ou egale à 100")
        .required("Requis"),
      description: Yup.number()
        .max(1000000, "Description trop élevé")
        .required("Requis")
        .typeError('Saisissez des chiffres'),
      location: Yup.string()
        .max(1000, "trop long"),
      domain: Yup.string()
        .max(100, "Caractère inferieur ou egale à 100")
        .required("Requis"),
      post: Yup.string()
        .max(1000, "trop long"),
      profile: Yup.string()
        .max(100, "Caractère inferieur ou egale à 100")
        .required("Requis"),
      reference: Yup.string()
        .max(1000, "trop long"),
    }),
    onSubmit: (values) => {
      console.log(values);
      try {
        axios[props.id==null?"post":"put"](APIUrl+"/joboffers"+(props.id==null?"":"/"+props.id), {
          title: values.company,
          contract: values.contract,
          description: values.description,
          location: values.location,
          category: {
            idCategory: props.dataCompose.find(e=>e.nameCategory==values.domain)?.idCategory
          }
        })
        .then((response)=>{fermerFormulaire()})
        .catch((error)=>{fermerFormulaire()})
        ;
      } catch (error) {
        fermerFormulaire();
      }
    },
  });


  if (true) {
    return (
      <>
        <div className="fonds2" onClick={()=>{props.fermetur()}}></div>
        <div className="fonds">
          <div className="form_fondsDrink">
            <button className="btn_cancel" onClick={()=>{props.fermetur()}}>
              X
            </button>
            <div className="titels">
              {'      '}<h2>FORMULAIRE Offre</h2>
            </div>
            <form
              action=""
              className="form_class"
              onSubmit={formik.handleSubmit}
              onReset={formik.handleReset}
            >
              <div className="form_contenu">
                <label htmlFor="id" className="label_input">
                  company
                </label>
                <input
                  id="company"
                  type="text"
                  className="input_formulaire"
                  placeholder="Titre du Livre"
                  value={formik.values.company}
                  onChange={formik.handleChange}
                />
                {formik.errors.company ? (
                  <p> {"formik.errors.company"} </p>
                ) : null}
              </div>

              <div className="form_contenu">
                <label htmlFor="id" className="label_input">
                contract
                </label>
                <input
                  id="contract"
                  type="text"
                  className="input_formulaire"
                  placeholder="Auteur"
                  value={formik.values.contract}
                  onChange={formik.handleChange}
                />
                {formik.errors.contract ? <p> {formik.errors.contract} </p> : null}
              </div>

              <div className="form_contenu">
                <label htmlFor="id" className="label_input">
                  Description
                </label>
                <input
                  id="description"
                  type="text"
                  className="input_formulaire"
                  placeholder="Le nombre de page"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                />
                {formik.errors.description ? <p> {formik.errors.description} </p> : null}
              </div>

              <div className="form_contenu">
                <label htmlFor="id" className="label_input">
                location
                </label>
                <input
                  id="location"
                  type="textarea"
                  className="input_formulaire bigText"
                  placeholder="location"
                  value={formik.values.location}
                  onChange={formik.handleChange}
                />
                
                {formik.errors.location ? <p> {formik.errors.location} </p> : null}
              </div>


              <div className="form_contenu">
                <label htmlFor="id" className="label_input">
                post
                </label>
                <input
                  id="post"
                  type="textarea"
                  className="input_formulaire bigText"
                  placeholder="post"
                  value={formik.values.post}
                  onChange={formik.handleChange}
                />
                
                {formik.errors.post ? <p> {formik.errors.post} </p> : null}
              </div>


              <div className="form_contenu">
                <label htmlFor="id" className="label_input">
                profile
                </label>
                <input
                  id="profile"
                  type="textarea"
                  className="input_formulaire bigText"
                  placeholder="profile"
                  value={formik.values.profile}
                  onChange={formik.handleChange}
                />
                
                {formik.errors.profile ? <p> {formik.errors.profile} </p> : null}
              </div>



              <div className="form_contenu">
                <label htmlFor="id" className="label_input">
                domain
                </label>
                <input
                  id="domain"
                  type="textarea"
                  className="input_formulaire bigText"
                  placeholder="domain"
                  value={formik.values.domain}
                  onChange={formik.handleChange}
                />
                
                {formik.errors.domain ? <p> {formik.errors.domain} </p> : null}
              </div>


              <div className="form_contenu">
                <label htmlFor="id" className="label_input">
                reference
                </label>
                <input
                  id="reference"
                  type="textarea"
                  className="input_formulaire bigText"
                  placeholder="reference"
                  value={formik.values.reference}
                  onChange={formik.handleChange}
                />
                
                {formik.errors.reference ? <p> {formik.errors.reference} </p> : null}
              </div>














              <button type="submit" className={"btn_envoie btn_type "}>
                {props.id==null?"Ajouter":"Modifier"}
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }else{
    return(<></>)
  }

};

export default FormulaireAddOffre;
