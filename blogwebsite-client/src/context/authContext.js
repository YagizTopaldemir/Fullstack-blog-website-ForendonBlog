import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")));

    const login = async (inputs) => {
        
        const res = await axios.post("http://localhost:1562/api/auth/login", inputs, {
            withCredentials: true,
        });
        setCurrentUser(res.data);
    };

    const logout = async () => {
        console.log("authlogout")
        await axios.post("http://localhost:1562/api/auth/logout");
        setCurrentUser(null);
        localStorage.removeItem("user")
      };
    
    

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);

    return (
        <AuthContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
