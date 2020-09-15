// React
import React, {useEffect, } from "react";
import styled from "@emotion/styled";
// Components & Hooks
import GADiabetes from "./GADiabetes";
import { StitchAuthProvider, useStitchAuth } from "./StitchAuth";
import { Button } from "reactstrap";

import 'semantic-ui-css/semantic.min.css'

App.propTypes = {};
export default function App() {
  return (
    <StitchAuthProvider>
      <AppUI />
    </StitchAuthProvider>
  );
}

AppUI.propTypes = {};
function AppUI() {
  const {
    isLoggedIn,
    actions: { handleLogout, handleAnonymousLogin },
  } = useStitchAuth();

  useEffect(()=>{
    handleAnonymousLogin();
  }, []);

  return <GADiabetes/>;
}
