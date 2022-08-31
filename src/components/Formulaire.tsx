
import { Field, useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useEffect, useState } from "react";
import { APIUrl, backgroundColor } from "../constants";
interface props {
  joboffer: any;
  id:number | null;
  fermetur:()=>void;
  dataCompose:any[];
  change:any;
}

const Formulaire: React.FC<props> = (props) => {
  const fermerFormulaire=()=>{setInterval(()=>{props.fermetur()},500); };
  const change = props.change;
  const phoneRegExp =
    /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
  
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
      nameJobOffer: (props.joboffer==undefined?"":props.joboffer.title),
      author: (props.joboffer==undefined?"":""+props.joboffer.author),
      pages: (props.joboffer==undefined?"":""+props.joboffer.pages),
      categorie: (props.joboffer==undefined?"Comedy":props.joboffer.category?.nameCategory),
      synopsis: (props.joboffer==undefined?"":""+props.joboffer.synopsis),
    },
    validationSchema: Yup.object({
      nameJobOffer: Yup.string()
        .max(100, "Caractère inferieur ou egale à 100")
        .required("Requis"),
      author: Yup.string()
        .max(100, "Caractère inferieur ou egale à 100")
        .required("Requis"),
      pages: Yup.number()
        .max(1000000, "Pages trop élevé")
        .required("Requis")
        .typeError('Saisissez des chiffres'),
      synopsis: Yup.string()
        .max(1000, "trop long"),
      categorie: Yup.string()
        .max(100, "Caractère inferieur ou egale à 100")
        .required("Requis"),
    }),
    onSubmit: (values) => {
      console.log(values);
      try {
        axios[props.id==null?"post":"put"](APIUrl+"/joboffers"+(props.id==null?"":"/"+props.id), {
          title: values.nameJobOffer,
          author: values.author,
          pages: values.pages,
          synopsis: values.synopsis,
          category: {
            idCategory: props.dataCompose.find(e=>e.nameCategory==values.categorie)?.idCategory
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
              {'      '}<h2>FORMULAIRE LIVRE</h2>
            </div>
            <form
              action=""
              className="form_class"
              onSubmit={formik.handleSubmit}
              onReset={formik.handleReset}
            >
              <div className="form_contenu">
                <label htmlFor="id" className="label_input">
                  Titre
                </label>
                <input
                  id="nameJobOffer"
                  type="text"
                  className="input_formulaire"
                  placeholder="Titre du Livre"
                  value={formik.values.nameJobOffer}
                  onChange={formik.handleChange}
                />
                {formik.errors.nameJobOffer ? (
                  <p> {"formik.errors.nameJobOffer"} </p>
                ) : null}
              </div>

              <div className="form_contenu">
                <label htmlFor="id" className="label_input">
                  Auteur
                </label>
                <input
                  id="author"
                  type="text"
                  className="input_formulaire"
                  placeholder="Auteur"
                  value={formik.values.author}
                  onChange={formik.handleChange}
                />
                {formik.errors.author ? <p> {formik.errors.author} </p> : null}
              </div>

              <div className="form_contenu">
                <label htmlFor="id" className="label_input">
                  Pages
                </label>
                <input
                  id="pages"
                  type="text"
                  className="input_formulaire"
                  placeholder="Le nombre de page"
                  value={formik.values.pages}
                  onChange={formik.handleChange}
                />
                {formik.errors.pages ? <p> {formik.errors.pages} </p> : null}
              </div>

              <div className="form_contenu">
                <label htmlFor="id" className="label_input">
                synopsis
                </label>
                <input
                  id="synopsis"
                  type="textarea"
                  className="input_formulaire bigText"
                  placeholder="synopsis"
                  value={formik.values.synopsis}
                  onChange={formik.handleChange}
                />
                
                {formik.errors.synopsis ? <p> {formik.errors.synopsis} </p> : null}
              </div>

              <div className="form_contenu">
                <label htmlFor="id" className="label_input">
                  Catégorie
                </label>
                <select
                  id="categorie"
                  className="input_formulaire"
                  placeholder="categorie"
                  value={formik.values.categorie}
                  onChange={formik.handleChange}
                >
                  {props.dataCompose.map((donne)=>{return(
                      <option value={donne.nameCategory} label={donne.nameCategory}>
                      {donne.nameCategory}
                    </option>
                  )})}
                </select>
                {formik.errors.categorie ? (
                  <p> {"formik.errors.categorie"} </p>
                ) : null}
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

export default Formulaire;
