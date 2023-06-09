import React, {useState} from "react";
import  {useNavigate} from "react-router-dom";
import axios from "axios";
import "../Style/Login.css";

export default function Login(){
    const navigate = useNavigate();
    const [userName, setUserName] = useState();
    const [userEmail, setUserEmail] = useState();
    const [userPassword, setUserPassword] = useState();
    const [err, setErr] = useState('')

    const userEmailChange = (e) =>{
        setUserEmail(e.target.value)
    }
    const userPasswordChange = (e) =>{
        setUserPassword(e.target.value)
    }
    const userNameChange = (e) =>{
        setUserName(e.target.value)
    }
    const loginSubmit = (e) =>{
        e.preventDefault()
        setErr('')
        if (userEmail === '' || userPassword === ''){
            setErr("Field is required")
        } else{
            axios.post(`/log-in`,{
                email: userEmail,
                password: userPassword
            })
                .then(result =>{
                    if (result.data.user){
                        localStorage.setItem("userId", `${result.data.user}`)
                        navigate(`/homePage`)
                    } else {
                        setErr(result.data.error)
                    }
                })
                .catch(err =>{
                    console.log(err)
                })
        }
    }
    const signUpSubmit = (e) =>{
        e.preventDefault()
        setErr('')
        if (userName === '' || userEmail === '' || userPassword === ''){
            setErr("Field is required")
        } else{
            axios.post(`/signUp`,{
                userName: userName,
                email: userEmail,
                password: userPassword
            })
                .then(result =>{
                    if (result.data.user){
                        localStorage.setItem("userId", `${result.data.user}`)
                        navigate(`/homePage`)
                    } else {
                        setErr(result.data.error)
                    }
                })
                .catch(err =>{
                    console.log(err)
                })
        }
    }
    return(
        <div className="login container">
            <h1>Matrix Master Community</h1>
            <form onSubmit={loginSubmit} className="login-form">
                <h2>Log In</h2>
                <input type="email" name="email" placeholder="Email..." onChange={userEmailChange}/>
                <input type="password" name="password" placeholder="Password..." onChange={userPasswordChange} autoComplete="off" />
                {userEmail && userPassword ? < button onClick={loginSubmit} className="button-login">Login</button> : null
                }
            </form>
            <form onSubmit={signUpSubmit} className="signup-form">
                <h2>Sign Up</h2>
                <input type="text" name="userName" placeholder="Username..." onChange={userNameChange}/>
                <input type="email" name="email" placeholder="Email..." onChange={userEmailChange}/>
                <input type="password" name="password" placeholder="Password..." onChange={userPasswordChange} autoComplete="off" />
                {userEmail && userPassword && userName ? < button onClick={signUpSubmit} className="button-login">Sign Up</button> : null
                }
            </form>
            {
                err ? <h5 className="error">{err}</h5> : null
            }
        </div>
    )
}

// kyrylo@gmail.com
// 1234