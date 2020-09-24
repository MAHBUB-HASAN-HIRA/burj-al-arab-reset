import React, { useContext, useState } from 'react';
import './Login.css';
import { firebaseInitialize, signInWithGoogle, signOut } from './LoginManager';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';


const Login = () => {
    firebaseInitialize();

    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
  
    const [user, setUser] = useState({
        isSignIn: false,
        name:'',
        email:'',
        photo:'',
        error:'',
        success: false,
    })

    const history = useHistory();
    const location = useLocation();
  
    const { from } = location.state || { from: { pathname: "/" } };

    const handleGoogleSignIn = () => {
        signInWithGoogle()
        .then(res => {
            setUser(res);
            setLoggedInUser(res);
            history.replace(from);
        })
    }

    const handleSignOut = () => {
        signOut()
        .then(res =>{
            setUser(res);
            setLoggedInUser(res);
            history.replace(from);
        })
    }

    return (
        <div className='login'>
            <h1>This is Login</h1>
            <h2>Name: {user.name}</h2>
            <h4>Email: {user.email}</h4>
            {
                user.isSignIn ? <button onClick={handleSignOut} >Sign Out</button>:
                <button onClick={handleGoogleSignIn}>Sign in WithGoogle</button>
            }
        </div>
    );
};

export default Login;