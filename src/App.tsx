import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./style/main.css";
import "bootstrap-css-only/css/bootstrap.min.css"
import 'bootstrap-icons/font/bootstrap-icons.css'
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { ApplicationList, ListJob, Landing, Login } from "./pages";
import { Profile, Register } from "./components";
import { newApplication, newJobOffer } from "./constants";
import { getCurrentUser } from "./hoooks";

function App() {
  const [myToken,setMyToken] = useState<string>();
  const [activUpdat, setActivUpdat] = useState<boolean>(false);
  const [idOffres, estIdOffres]= useState<number>(4);
  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      const subtitutionValue:string =  user.accessToken
      setMyToken(subtitutionValue);
    }
  }, []);


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
                <Route path="/application" 
                    element={
                      <>
                        {<ApplicationList 
                          items={[newApplication]} //book[];
                          id={idOffres} //() => void;
                          setActivUpdat={setActivUpdat} //React.Dispatch<React.SetStateAction<boolean>>;
                        />}
                      </>
                    }
                />
                <Route path="/list-job" 
                    element={
                      <>
                        {<ListJob 
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
