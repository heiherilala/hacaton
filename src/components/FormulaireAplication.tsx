
import { Field, FieldArray, useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { APIUrl, backgroundColor } from "../constants";
import { Application, JobOffer } from "../interfaces";
import { postPutDeletRequest } from "../hoooks";
interface props {
  item:JobOffer;
  fermetur:()=>void;
  token:string|undefined
}

const FormulaireAplication: React.FC<props> = (props) => {
  const fermerFormulaire=()=>{const timer = setInterval(()=>{props.fermetur(); clearInterval(timer)},500); };
  const formik = useFormik({
    initialValues: {
      nameAplication: "",
      email: "",
      profil: "",
      salary: "",
    },
    validationSchema: Yup.object({
      nameAplication: Yup.string()
        .max(100, "Caractère inferieur ou egale à 100")
        .required("Requis"),
      email: Yup.string().email()
        .max(100, "Caractère inferieur ou egale à 100")
        .required("Requis"),
      salary: Yup.number()
        .max(100000000, "salary trop élevé")
        .required("Requis")
        .typeError('Saisissez des chiffres'),
      profil: Yup.string()
        .max(100, "Caractère inferieur ou egale à 100")
        .required("Requis"),
    }),
    onSubmit: (values) => {
      const newDate = new Date;
      console.log(props.item);
      
      const objectData = {
        candidateName: values.nameAplication,
        email: values.email,
        salary: values.salary,
        profile: values.profil,
        dateApplication: newDate.getDate.toString,
        jobOffer:{idJobOffer:props.item.idJobOffer},
      };
      try{
        postPutDeletRequest("/job-offers",objectData,null,true,false,()=>fermerFormulaire(),()=>fermerFormulaire(),props.token);
      } catch (error){};
    },
  });


  if (true) {
    return (
      <>
          <div className="">
            <div className="">
              {'      '}<h3 className="">Information sur vous</h3>
            </div>
            <form
              action=""
              className="form_class"
              onSubmit={formik.handleSubmit}
              onReset={formik.handleReset}
            >
              <div className="row">
              <div className="form_contenu">
                <label htmlFor="id" className="label_input">
                  Votre nom:
                </label>
                <input
                  id="nameAplication"
                  type="text"
                  className="input_formulaire"
                  placeholder="Nom complet"
                  value={formik.values.nameAplication}
                  onChange={formik.handleChange}
                />
                {formik.errors.nameAplication ? (
                  <p> {formik.errors.nameAplication} </p>
                ) : null}
              </div>                         
              </div>
              <div className="row">
              <div className="form_contenu">
                <label htmlFor="id" className="label_input">
                Votre profil:
                </label>
                <input
                  
                  id="profil"
                  type="textarea"
                  className="input_formulaire bigText"
                  placeholder="profil"
                  value={formik.values.profil}
                  onChange={formik.handleChange}
                />
                {formik.errors.profil ? <p> {formik.errors.profil} </p> : null}
              </div>                      
              </div>
              <div className="row">
                <span></span>
                <div className="form_contenu2">
                <label htmlFor="id" className="label_input">
                  Votre email:
                </label>
                <input
                  id="email"
                  type="text"
                  className="input_formulaire"
                  placeholder="Email professionnel"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
                {formik.errors.email ? <p> {formik.errors.email} </p> : null}
              </div>
                  <div className="form_contenu">
                  <label htmlFor="id" className="label_input">
                    Prétention salariale (Ar)
                  </label>
                  <input
                    id="salary"
                    type="text"
                    className="input_formulaire"
                    placeholder="salariale"
                    value={formik.values.salary}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.salary ? <p> {formik.errors.salary} </p> : null}
                </div>           
              </div>
              <span>
                <button className={"btn_envoie btn_type2 "} onClick={()=>{props.fermetur()}}>
                  {"Annuler".toUpperCase()}
                </button>
                <button type="submit" className={"btn_envoie btn_type "}>
                  {"Confirmer".toUpperCase()}
                </button>
              </span>

            </form>
          </div>
      </>
    );
  }else{
    return(<></>)
  }

};

export default FormulaireAplication;
