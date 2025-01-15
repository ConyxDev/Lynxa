import {useState, useEffect} from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-config";

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsAuthenticated(!!user);
        });

        return () => unsubscribe();
    }, []);

    return isAuthenticated;
};

export default useAuth;