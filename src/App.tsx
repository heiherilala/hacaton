import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./style/main.css";
import "bootstrap-css-only/css/bootstrap.min.css"
import 'bootstrap-icons/font/bootstrap-icons.css'
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { BooksClass, Landing, Login, Ranking } from "./pages";
import { Profile, Register } from "./components";
import { newJobOffer } from "./constants";

function App() {
  const [myToken,setMyToken] = useState<string>()
  const [activUpdat, setActivUpdat] = useState<boolean>(false);

  const userStr = localStorage.getItem("user");
  let user = null;
  if (userStr)user = JSON.parse(userStr);

  const actualisationAllData = ()=>{

  }










  return (
    <div className="App">
      <div>
        <body>
          <BrowserRouter>
            <Routes>
              <Route path="/login" 
                    element={
                      <>
                          {Login()}
                      </>
                    }
                />
                <Route path="/" 
                    element={
                      <>
                          {Landing()}
                      </>
                    }
                />
                <Route path="/Ranking" 
                    element={
                      <>
                        {<Ranking 
                          items={[newJobOffer]} //book[];
                          actualisationAllData={actualisationAllData} //() => void;
                          setActivUpdat={setActivUpdat} //React.Dispatch<React.SetStateAction<boolean>>;
                        />}
                      </>
                    }
                />
                <Route path="/list-job" 
                    element={
                      <>
                        {<BooksClass 
                          items={[newJobOffer]} //book[];
                          actualisationAllData={actualisationAllData} //() => void;
                          setActivUpdat={setActivUpdat} //React.Dispatch<React.SetStateAction<boolean>>;
                        />}
                      </>
                    }
                />


                <Route path="/user" 
                    element={
                      <>
                        <Profile/>
                      </>
                    }
                />


            <Route path="/register" 
                    element={
                      <>
                        <Register/>
                      </>
                    }
                />
            </Routes>

          </BrowserRouter>
        </body>
      </div>
    </div>
  );
}

export default App;
