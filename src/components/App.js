// React
import React, {useEffect, } from "react";
// Components & Hooks
import GADiabetes from "./GADiabetes";
import { StitchAuthProvider, useStitchAuth } from "./StitchAuth";
import 'semantic-ui-css/semantic.min.css'
import '../styles.css'

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
