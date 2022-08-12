import { useState, useEffect, createContext } from 'react';
import firebase from '../service/firebaseConnection';

export const AuthContext = createContext({});

function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingUser] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadStorage();

    }, [])



    function loadStorage() {
        const storageUser = localStorage.getItem('SistemaUser');

        if (storageUser) {
            setUser(JSON.parse(storageUser));
            setLoading(false);
        }

        setLoading(false);
    }


    return (
        //Importa todos os dados do user
        <AuthContext.Provider value={{ signed: !!user, user, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;