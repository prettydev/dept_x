import React, { useReducer } from "react";

const initialState = {
  drawerIsOpen: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "TOGGLE":
      return {
        ...state,
        drawerIsOpen: !state.drawerIsOpen,
      };
    default:
      return state;
  }
}
export const DrawerContext = React.createContext({});

export const DrawerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <DrawerContext.Provider value={{ state, dispatch }}>
      {children}
    </DrawerContext.Provider>
  );
};
