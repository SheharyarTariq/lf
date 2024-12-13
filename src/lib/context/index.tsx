import React, { createContext, useContext, useReducer, ReactNode, Dispatch } from "react";

interface State {
  openSidenav: boolean;
  sidenavColor: string;
  sidenavType: string;
  transparentNavbar: boolean;
  fixedNavbar: boolean;
  openConfigurator: boolean;
}

type Action =
    | { type: "OPEN_SIDENAV"; value: boolean }
    | { type: "SIDENAV_TYPE"; value: string }
    | { type: "SIDENAV_COLOR"; value: string }
    | { type: "TRANSPARENT_NAVBAR"; value: boolean }
    | { type: "FIXED_NAVBAR"; value: boolean }
    | { type: "OPEN_CONFIGURATOR"; value: boolean };

const MaterialTailwind = createContext<[State, Dispatch<Action>] | null>(null);
MaterialTailwind.displayName = "MaterialTailwindContext";

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "OPEN_SIDENAV":
      return { ...state, openSidenav: action.value };
    case "SIDENAV_TYPE":
      return { ...state, sidenavType: action.value };
    case "SIDENAV_COLOR":
      return { ...state, sidenavColor: action.value };
    case "TRANSPARENT_NAVBAR":
      return { ...state, transparentNavbar: action.value };
    case "FIXED_NAVBAR":
      return { ...state, fixedNavbar: action.value };
    case "OPEN_CONFIGURATOR":
      return { ...state, openConfigurator: action.value };
    default:
      throw new Error('Unhandled action type');
  }
}

interface MaterialTailwindControllerProviderProps {
  children: ReactNode;
}

export function MaterialTailwindControllerProvider({
                                                     children,
                                                   }: MaterialTailwindControllerProviderProps) {
  const initialState: State = {
    openSidenav: false,
    sidenavColor: "dark",
    sidenavType: "white",
    transparentNavbar: true,
    fixedNavbar: false,
    openConfigurator: false,
  };

  const [controller, dispatch] = useReducer<React.Reducer<State, Action>>(reducer, initialState);
  const value: [State, Dispatch<Action>] = React.useMemo(() => [controller, dispatch], [controller, dispatch]);

  return <MaterialTailwind.Provider value={value}>{children}</MaterialTailwind.Provider>;
}

export function useMaterialTailwindController(): [State, Dispatch<Action>] {
  const context = useContext(MaterialTailwind);
  if (!context) {
    throw new Error(
        "useMaterialTailwindController must be used within a MaterialTailwindControllerProvider."
    );
  }
  return context;
}

export const setOpenSidenav = (dispatch: Dispatch<Action>, value: boolean) =>
    dispatch({ type: "OPEN_SIDENAV", value });
export const setSidenavType = (dispatch: Dispatch<Action>, value: string) =>
    dispatch({ type: "SIDENAV_TYPE", value });
export const setSidenavColor = (dispatch: Dispatch<Action>, value: string) =>
    dispatch({ type: "SIDENAV_COLOR", value });
export const setTransparentNavbar = (dispatch: Dispatch<Action>, value: boolean) =>
    dispatch({ type: "TRANSPARENT_NAVBAR", value });
export const setFixedNavbar = (dispatch: Dispatch<Action>, value: boolean) =>
    dispatch({ type: "FIXED_NAVBAR", value });
export const setOpenConfigurator = (dispatch: Dispatch<Action>, value: boolean) =>
    dispatch({ type: "OPEN_CONFIGURATOR", value });
