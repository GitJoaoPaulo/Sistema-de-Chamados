import { useState, useEffect, createContext } from 'react';
import firebase from '../service/firebaseConnection';
import { toast } from 'react-toastify';

export const AuthContext = createContext({});

function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(false);
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

    //Faz login do usuário
    async function signIn(email, password) {
        setLoadingAuth(true);

        await firebase.auth().signInWithEmailAndPassword(email, password)
            .then(async (value) => {
                let uid = value.user.uid;

                const userProfile = await firebase.firestore().collection('users').doc(uid).get();

                let data = {
                    uid: uid,
                    nome: userProfile.data().nome,
                    avatarUrl: userProfile.data().avatarUrl,
                    email: value.user.email
                };

                setUser(data);
                storageUser(data);
                setLoadingAuth(false);
                toast.success('Bem vindo de volta');

            })

            .catch((error) => {
                console.log(error);
                setLoadingAuth(false);
                toast.error('Ops algo de errado!!');
            })
    }


    //Cadastrando um novo usuário
    async function signUp(email, password, nome) {
        setLoadingAuth(true);

        await firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async (value) => {

                let uid = value.user.uid;

                await firebase.firestore().collection('users').doc(uid).set({
                    nome: nome,
                    avatarUrl: null,
                })
                    .then(() => {
                        let data = {
                            uid: uid,
                            nome: nome,
                            email: value.user.email,
                            avatarUrl: null
                        };

                        setUser(data);
                        storageUser(data);
                        setLoadingAuth(false);
                        toast.success('Bem vindo a plataforma!');

                    })
            })
            .catch((error) => {
                if (error.code === 'auth/weak-password') {
                    toast.info('Senha muito fraca');
                } else if (error.code === 'auth/email-already-in-use') {
                    toast.info('Email já existente');
                }
                setLoadingAuth(false);
            })

    }

    function storageUser(data) {
        localStorage.setItem('SistemaUser', JSON.stringify(data));
    }


    //Desloga o usuário
    async function signOut() {
        await firebase.auth().signOut();
        localStorage.removeItem('SistemaUser');
        setUser(null);
    }


    return (
        //Importa todos os dados do user
        <AuthContext.Provider value={{ signed: !!user, user, loading, signUp, signOut, signIn, loadingAuth, setUser, storageUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;