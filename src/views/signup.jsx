import { useReducer } from 'react';
import * as yup from 'yup';
const Signup=()=>{

    const initial={
        name:"",
        email:"",
        address:"",
        contact:"",
        password:"",
    }

    const signUpConstants={
        setName:"SET_NAME",
        setEmail:"SET_EMAIL",
        setAddress:"SET_ADDRESS",
        setContact:"SET_CONTACT",
        setPassword:"SET_PASSWORD",
    }

    const signUpSchema = yup.object().shape({
        name:yup.string().required(),
        email: yup.string().required(),
        address:yup.string().required(),
        contact:yup.number().required().positive(),
        password: yup.string().required().min(8)
      });

    const reducer=(state,action)=>{

        const {type,payload}=action
    
        switch(type)
        {
            case signUpConstants.setName:{
                return{
                    ...state,
                    name:payload
                };
            }
    
    
            case signUpConstants.setEmail:{
                return{
                    ...state,
                    email:payload
                };
    
            }
    
            case signUpConstants.setAddress:{
                return{
                    ...state,
                    address:payload
                };
    
            }
    
            case signUpConstants.setContact:{
                return{
                    ...state,
                    contact:payload
                };
    
            }
            
            case signUpConstants.setPassword:{
                return{
                    ...state,
                    password:payload
                };
    
            }
    
            default:return state;
        }
    }
    
    

    const [state, dispatch] = useReducer(reducer, initial)

    const {name,email,address,contact,password}=state;

    const onSubmit=(event)=>{
        event.preventDefault();

        signUpSchema.validate({name,email,address,contact,password},{abortEarly:false})
        .then((res)=>{
            console.log("signup success");
        })
        .catch((error)=>{
            error.inner.forEach((e)=>{
                if(e.path==="email")
                {
                    console.log("invalid email");
                }

                if(e.path==="name")
                {
                    console.log("invalid name");
                }
                if(e.path==="address")
                {
                    console.log("invalid address");
                }
                if(e.path==="contact")
                {
                    console.log("invalid contact");
                }
                
                if(e.path==="password")
                {
                    console.log("invalid password");
                    //dispatch({type:loginConstants.setPasswordError,payload:e.message});
                }
            });
        });

        console.log(name);
        console.log(email);
        console.log(address);
        console.log(contact);
        console.log(password);
    }
    return(
        <div>
            <h1>Signup </h1>
            <form onSubmit={onSubmit}>
            Name:<input  type="text" value={name} onChange={e=>
                {dispatch({type:signUpConstants.setName,payload:e.target.value});}
            }
            />
            <br/>
            Email:
            <input  type="email" value={email} onChange={e=>
                {dispatch({type:signUpConstants.setEmail,payload:e.target.value});}
            }
            />
            <br/>
            Address:
            <input  type="text" value={address} onChange={p=>
                {dispatch({type:signUpConstants.setAddress,payload:p.target.value});}
            }/>
            <br/>
            Contact No:
            <input  type="number" value={contact} onChange={p=>
                {dispatch({type:signUpConstants.setContact,payload:p.target.value});}
            }/>
            <br/>

            Password:
            <input  type="password" value={password} onChange={p=>
                {dispatch({type:signUpConstants.setPassword,payload:p.target.value});}
                }/>
            <br/>
            <button type="submit">Submit</button>
        </form>
        </div>
    );
}

export default Signup;