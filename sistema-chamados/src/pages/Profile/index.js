import { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/auth';

import './profile.css';
import { FiSettings, FiUpload } from 'react-icons/fi'

import Header from '../../components/Header';
import Title from '../../components/Title';

import avatar from '../../assets/avatar.png';

import firebase from '../../service/firebaseConnection';
import { toast } from 'react-toastify';

function Profile() {

    const { user, signOut, setUser, storageUser } = useContext(AuthContext);

    const [nome, setNome] = useState(user && user.nome);
    const [email, setEmail] = useState(user && user.email);
    const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);
    const [imageAvatar, setImageAvatar] = useState(null);

    function previewImg(e){
        if(e.target.files[0]){
            const image = e.target.files[0];

            if(image.type === "image/jpeg" || image.type === "image/png"){
                setImageAvatar(image);
                setAvatarUrl(URL.createObjectURL(e.target.files[0]))
            }else{
                toast.warning("Envie uma imagem do tipo JPEG ou PNG");
                setImageAvatar(null);
                return null;
            }
        }
    }

    async function handleUpload(){
        const currentUid = user.uid;

        const uploadImg = await firebase.storage().ref(`images/${currentUid}/${imageAvatar.name}`)
        .put(imageAvatar)
        .then(async() => {
            toast.success("Alterações realizadas com sucesso")
        
            await firebase.storage().ref(`images/${currentUid}`).child(imageAvatar.name).getDownloadURL()
            .then( async(url) => {
                let urlPhoto = url;

                await firebase.firestore().collection("users").doc(user.uid)
                .update({
                    avatarUrl: urlPhoto,
                    nome: nome
                })
                .then(() => {
                    let data = {
                        ...user,
                        avatarUrl: urlPhoto,
                        nome: nome
                    };
                    setUser(data);
                    storageUser(data);
                })
            })
        })
        
    }


    async function handleSave(e) {
        e.preventDefault();

        if (avatarUrl === null && nome !== "") {
            await firebase.firestore().collection("users").doc(user.uid)
                .update({
                    nome: nome
                })
                .then(() => {
                    let data = {
                        ...user,
                        nome: nome
                    };
                    setUser(data);
                    storageUser(data);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        else if (nome !== "" && imageAvatar !== null) {
            handleUpload();
        }

    }

    return (
        <div>
            <Header />

            <div className='content'>

                <Title name="Meu perfil">
                    <FiSettings size={24} />
                </Title>

                <div className='container'>
                    <form className='form-avatar' onSubmit={handleSave}>

                        <label className='label-avatar'>
                            <span>
                                <FiUpload color='#FFF' size={24} />
                            </span>

                            <input type="file" accept="image/*" onChange={previewImg}/><br />
                            {avatarUrl === null ?
                                <img src={avatar} width="250" height="250" alt="Foto do usuário" />
                                :
                                <img src={avatarUrl} width="250" height="250" alt="Foto do usuário" />
                            }
                        </label>

                        <label>Nome</label>
                        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />

                        <label>Email</label>
                        <input type="email" value={email} disabled={true} />

                        <button type='submit'>Salvar</button>

                    </form>

                </div>

                <div className='container'>
                    <button className='logout-btn' onClick={() => signOut()}>Sair</button>
                </div>

            </div>
        </div>
    )
}

export default Profile;