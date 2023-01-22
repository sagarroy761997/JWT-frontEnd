import React, { useState } from "react";
import Form from "./Components/Form";
import ReactLogo from "./Components/ReactLogo";

import {Routes, Route, Navigate } from "react-router-dom";


import loginContext from "./Context/loginContext";

const App = () => {
 
  const [isLogin, setIsLogin] = useState(false);

  return (
    <loginContext.Provider value={{isLogin, setIsLogin}}>
      <div>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/ReactLogo" element={isLogin? <ReactLogo /> :<Navigate replace to={"/"} /> } />
        </Routes>
      </div>
    </loginContext.Provider>
  );
};

export default App;
