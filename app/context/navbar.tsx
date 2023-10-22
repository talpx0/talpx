/** @jsxImportSource @emotion/react */
'use client';

import { ReactNode, createContext, useContext, useReducer } from "react";

type NavbarContextType = {
    navbarState: NavbarState;
    dispatch: React.Dispatch<NavbarAction>;
};

type NavbarState = {
    color: string;
    navbarState: "navbar" | "toolbar";
};

type NavbarAction =
    | { type: 'SET_COLOR'; payload: string }
    | { type: 'SET_NAVBAR_STATE'; payload: "navbar" | "toolbar" };

const NavbarContext = createContext<NavbarContextType | undefined>(undefined);

const reducer = (state: NavbarState, action: NavbarAction): NavbarState => {
    switch (action.type) {
        case 'SET_COLOR':
            return { ...state, color: action.payload };
        case 'SET_NAVBAR_STATE':
            return { ...state, navbarState: action.payload };
        default:
            return state;
    }
};
    
export const NavbarProvider = ({ children }: { children: ReactNode }) => {
    const initialState: NavbarState = {
        color: `background-color: white;
            .dark & {
          background-color: black;`,
        navbarState: 'navbar',
    };
    const [navbarState, dispatch] = useReducer(reducer, initialState);
    return (
        <NavbarContext.Provider value={{ navbarState, dispatch }}>
            {children}
        </NavbarContext.Provider>
    );
};

export const useNavbar = () => {
    const context = useContext(NavbarContext);
    if (!context) {
        throw new Error('useNavbar must be used within a NavbarProvider');
    }
    return context;
};
