import { useEffect, useState } from "react";
import { Container } from "reactstrap";
import ProjectCard from "./components/Card";
import projects from "./projects.json";
import Login from "./views/Login";
import Signup from "./views/signup";

function App() 
{
    let [showLoginPage,setShowLoginPage]=useState(true);

    console.log(showLoginPage);
    const title=showLoginPage?"Login":"Projects";

    const togglePage=()=>setShowLoginPage(!showLoginPage);

    useEffect(()=>{
      const isLoggedIn=localStorage.getItem("isLoggedIn")
      if(isLoggedIn) setShowLoginPage(false)
    },[])


    const onLoginSuccess=()=>{
      setShowLoginPage(false);
      localStorage.setItem("isLoggedIn",true);
    }

  return (
            <Container className="text-center ">
            <h1>{title}</h1>
              
            {
              showLoginPage?
            (<>
            <Login onLoginSuccess={onLoginSuccess}/>
            <Signup/>
            </>
            )
            :
            (
                <div>
                  <button onClick={()=>togglePage()}>See Projects Page</button>          
                <ProjectCard/>
                </div>
            )}  
          </Container>
          );
}

export default App;






