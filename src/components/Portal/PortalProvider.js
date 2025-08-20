import React, { useMemo, useState } from "react";
import PortalContext from "./PortalContext";

const PortalProvider = ({ children }) => {
  const [components, setComponents] = useState({});

  const addComponent = ({ name, component }) => {
    setComponents((prevComponents) => ({
      ...prevComponents,
      [name]: component,
    }));
  };

  const removeComponent = (name) => {
    setComponents((prevComponents) => {
      const newComponents = { ...prevComponents };
      delete newComponents[name];
      return newComponents;
    });
  };

  return (
    <PortalContext.Provider value={{ addComponent, removeComponent }}>
      <>
        {children}
        {Object.entries(components).map(([name, Component]) => Component)}
      </>
    </PortalContext.Provider>
  );
};
export default PortalProvider;
