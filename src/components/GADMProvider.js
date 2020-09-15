import React from "react";
import PropTypes from "prop-types";

const GADMContext = React.createContext();

// Create a React Hook that lets us get data from our auth context
export function useGADM() {
  const context = React.useContext(GADMContext);
  if (!context) {
    throw new Error(`useGADM must be used within a GADMProvider`);
  }
  return context;
}

// Create a component that controls auth state and exposes it via
// the React Context we created.
export function GADMProvider(props) {
  const [pageState, setPageState] = React.useState({
    selectedVariable: {'varName': 'percentDiabetes', 'printName': '% with Diabetes'},
    selectedCounty: {NAME: 'Fulton', GEOID: '13121'},
  });

  const handlePageStateChange = (doc) => {
    setPageState({...pageState, ...doc});
  };

  // We useMemo to improve performance by eliminating some re-renders
  const pageInfo = React.useMemo(
    () => {
      const { selectedVariable, selectedCounty } = pageState;
      const value = {
        selectedVariable,
        selectedCounty,
        actions: { handlePageStateChange },
      };
      return value;
    },
    [pageState],
  );
  return (
    <GADMContext.Provider value={pageInfo}>
      {props.children}
    </GADMContext.Provider>
  );
}
GADMProvider.propTypes = {
  children: PropTypes.element,
};
