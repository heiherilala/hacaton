import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { StringDecoder } from "string_decoder";
import { backgroundColor, APIUrl, newJobOffer } from "../../constants";
import { axiosGetWithPage, axiosGget, getCurrentUser, logout, takeKeyObjectByNumber, takeVauleObjectByNumber } from "../../hoooks";
import EventBus from "../../hoooks/EventBus";
import {  Domain, objectIUser } from "../../interfaces";
import Formulaire from "../Formulaire";
import FormulaireAddOffre from "../FormulaireAddOffre";
import Load from "../Loading";
import Arrow from "./Arrow";
import { LigneList } from "./LineTable";
import HorizontalPagination from "./Pagination";
import "./style.css";


interface props {
  items: any[];
  actualisationAllData:() => void;
  setActivUpdat: React.Dispatch<React.SetStateAction<boolean>>;
  colloneName: string[];
  keFocus:{place:[number, number | null, number | null],funcion:(a:any)=>any}[];//{place:[1,null,null],funcion:(a:any)=>{return a}}
  bouttons:{name:string,method:(object:object)=>void}[]|null;
  title:string;
  delet:boolean;
}

export const TableConstructor: React.FC<props> = (props) => {
  const [activTri,setActivTri]=useState<boolean[]>([]);
  const [activLoading,setActivLoading]=useState<boolean>(true);
  const [valuNumbur, setValuNumbur] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [activUpdatePost,setActivUpdatePost]= useState<boolean>(false)
  const [myToken,setMyToken] = useState<string>()
  const [longPage, setLongPage] = useState<number>(105);
  const [loadlongPage, setloadLongPage] = useState<number>(0);
  const [dataJobOffer, setDataJobOffer] = useState<any[]>([newJobOffer]);
  const [loagJobOffer, setLoagJobOffer] = useState<number>(0);
  const [dataCompose, setDataCompose] = useState<Domain[]>([]);
  const [loadDataCompose, setLoadDataCompose] = useState<number>(0);

  const finishLoadingt = ()=>{setActivLoading(false)};
  const actualisationAllData =()=>{setLoagJobOffer(loagJobOffer+1);console.log("UPDATEEEEEEEEEEEEEEEEEEEEEEEEE");};
  const finishUpdatPost:()=>void = ()=>{const timer=setInterval(()=>{setActivUpdatePost(false);clearInterval(timer)},300); actualisationAllData()}

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      const subtitutionValue:string =  user.accessToken
      setMyToken(subtitutionValue);
    }
  }, []);

  useEffect(() => {
    setActivLoading(true)
    axiosGetWithPage("/job-offers",page,valuNumbur,myToken,setDataJobOffer,()=>{setActivLoading(false)},null)
  }, [loagJobOffer,page,valuNumbur,myToken])

  useEffect(() => {
    setActivLoading(true)
    axiosGget("/domains",myToken,setDataCompose,()=>{setActivLoading(false)},null)
  }, [loadDataCompose])

  useEffect(() => {
    axiosGget("/joboffers/count",myToken,setLongPage,null,null)
  }, [loadlongPage])


  const [tri, setTri] = useState("");
  let items = [newJobOffer];

    items = dataJobOffer;

  const colloneName: string[] = props.colloneName;
  const keFocus = props.keFocus
  const [bouttons] = useState(props.bouttons);

  return (
    <div className="d-flex flex-column mb-3 ForcedFisplayColone marging-top">
      <h2 className="titleCoctail"> {props.title} </h2>
      <div className="dataTable-header p-2">
        <div className="dataTable-dropdown">
          <label>
            <select className="dataTable-selector">
              <option value="5" onClick={() => setValuNumbur(5)}>
                5
              </option>
              <option value="10" onClick={() => setValuNumbur(10)} selected>
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
            entité par pages
          </label>
        </div>
        {(props.delet||bouttons!=null)?<div className="dataTable-search">
          <Button variant="primary" onClick={()=>{setActivUpdatePost(true)}} className="custom_color">Ajouter</Button>
        </div>:<></>}
      </div>
      <div className="dataTable-container p-2 bd-highlight">
        <Table striped bordered hover className="tableBody">
          <thead>
            <tr>
              {colloneName.map((value,key)=>{return(
                  <th
                  onClick={() => {
                    setTri(takeKeyObjectByNumber(keFocus[key].place,items[0]));
                    let newValue = [false,false,false,false,false,false,false,false,false,false];
                    newValue[key] = true;
                    setActivTri(newValue);
                  }}
                >
                  {value} {Arrow(activTri[key])}
                </th>
              )})}
              {(bouttons!=null)?<th className="center"> Actions</th>:<></>}
              {(props.delet)?<th > {" "} </th>:<></>}
            </tr>
          </thead>
          <tfoot>
            <tr>
            {colloneName.map((value,key)=>{return(
                  <th
                  onClick={() => {
                    setTri(takeKeyObjectByNumber(keFocus[key].place,items[0]));
                    let newValue = [false,false,false,false,false,false,false,false,false,false];
                    newValue[key] = true;
                    setActivTri(newValue);
                  }}
                >
                  {value} {Arrow(activTri[key])}
                </th>
              )})}
              {(bouttons!=null)?<th className="center"> Actions</th>:<></>}
              {(props.delet)?<th> {" "} </th>:<></>}
            </tr>
          </tfoot>
          <tbody>
            {items.map((item) => {
              if (true)
                return (
                  <LigneList
                    idLine={1}
                    item={item}
                    actualisationAllData={actualisationAllData}
                    bouttons={bouttons}// :boolean
                    keFocus={keFocus}// :[number, number | null, number | null][]
                    takeVauleObjectByNumber={takeVauleObjectByNumber}// :(n: [number, number | null, number | null], o: Object) => string
                    dataCompose={dataCompose}
                    delet={props.delet}
                    token={myToken}
                  />
                );
            })}
          </tbody>
        </Table>
      </div>
      <div className="dataTable-bottom p-2">
        <div className="dataTable-info">
          {"Affiche " +
            (page * valuNumbur - valuNumbur + 1) +
            " à " +
            Math.min(page * valuNumbur, items.length) +
            " sur " +
            items.length +
            " données"}
        </div>
        <nav className="dataTable-pagination">
          {HorizontalPagination(longPage, valuNumbur, page, setPage, tri)}
        </nav>
      </div>
      
      {activUpdatePost?<FormulaireAddOffre
      joboffer = {undefined} //: joboffer | undefined;
      id = {null} //:number | null;
      fermetur = {finishUpdatPost} //:()=>void;
      dataCompose = {dataCompose} //:category[];
      change = {4} //:any;
      token = {myToken}
          />:<></>}
    {activLoading?Load(finishLoadingt):<></>}
    </div>
  );
};
