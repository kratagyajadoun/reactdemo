import { useState,useReducer } from "react";
import axios from "axios";
import base_url from "../api/apiUrl";
import * as yup from 'yup';


const initialState={
    email:"",
    password:"",
    emailError:"",
    passwordError:""
}

const loginConstants={
    setEmail:'SET_EMAIL',
    setPassword:'SET_PASSWORD',
    setEmailError:'SET_EMAIL_ERROR',
    setPasswordError:'SET_PASSWORD_ERROR',
}

const loginSchema = yup.object().shape({
    email: yup.string().required(),
    password: yup.string().required().min(8)
  });
  

const reducer=(state,action)=>{

    const {type,payload}=action

    switch(type)
    {
        case loginConstants.setEmail:{
            return{
                ...state,
                email:payload
            };
        }


        case loginConstants.setPassword:{
            return{
                ...state,
                password:payload
            };

        }

        case loginConstants.setPasswordError:{
            return{
                ...state,
                passwordError:payload
            };

        }

        case loginConstants.setEmailError:{
            return{
                ...state,
                emailError:payload
            };

        }


        default:return state;
    }
}



export default function Login(props)
{

    // const[email,setEmail]=useState("")
    // const[password,setPassword]=useState("")


    const [state, dispatch] = useReducer(reducer, initialState)

    const {email,password,emailError,passwordError}=state;
    
    const onSubmit=(event)=>{
        event.preventDefault()

        // const isLongEnough=password.length>=8;
        // const noSpaces=password.indexOf(" ") === -1;
        // const isValid=isLongEnough&&noSpaces;

        loginSchema
        .validate({email,password},{abortEarly:false})
        .then((res)=>{
            axios.post(`${base_url}`,{
                        email:email,
                        password:password,
                    }).then(
                        (response)=>{
                            props.onLoginSuccess();
                        },
                        (error)=>{
                            console.log(error);
                        }
                    )
        })
        .catch((error)=>{
            error.inner.forEach((e)=>{
                if(e.path==="email")
                {
                    dispatch({type:loginConstants.setEmailError,payload:e.message});
                }

                if(e.path==="password")
                {
                    dispatch({type:loginConstants.setPasswordError,payload:e.message});
                }
            });
        });



        // if(isValid)
        // {
        //     axios.post(`${base_url}`,{
        //         email:email,
        //         password:password,
        //     }).then(
        //         (response)=>{
        //             props.onLoginSuccess();
        //         },
        //         (error)=>{
        //             console.log(error);
        //         }
        //     )
        // }
        // else{
        //     console.log(email,password);
        // }

 }

    const clearEmailField=()=>{
        //setEmail("")
        dispatch({ type: loginConstants.setEmail, payload: "" });

    }

    const clearPasswordField=()=>{
        //setPassword("")
        dispatch({ type: loginConstants.setPassword, payload: "" });

    }
    return (
        <form onSubmit={onSubmit}>
            <input  type="email" value={email} onChange={e=>
                //setEmail(e.target.value)
                {dispatch({type:loginConstants.setEmail,payload:e.target.value});}
            }
                
                />
            <button type="button" onClick={clearEmailField}>&times;</button>
            <div>{emailError && <sub>{emailError} </sub>}</div>
            <input  type="password" value={password} onChange={p=>
                //setPassword(p.target.value)
                {dispatch({type:loginConstants.setPassword,payload:p.target.value});}
                }/>
            <button type="button" onClick={clearPasswordField}>&times;</button>
            <div>{passwordError && <sub>{passwordError} </sub>}</div>
            <button type="submit">Submit</button>
            <button type="reset">clear</button>
        </form>
    )
}
 