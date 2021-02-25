import React, {useState} from 'react'
import {Link} from "react-router-dom"
import axios from "axios"
import { Card, Button } from 'react-bootstrap';
import Cookies from "universal-cookie"
function LoginForm() {
    const [input, setInput]=useState({user:"",password:""})
    
    function handleChange(event){
        const {name, value}=event.target;
        

        setInput(prevInput=>{
            return{
                ...prevInput,
                [name]:value.toLowerCase().trim()
            }
            
        })
    }
    function handleClick(event){
        event.preventDefault();
        const User={
            user:input.user,
            password:input.password
        }
        axios.get('http://localhost:4000/posts',User)
        .then((response) => {
            console.log(response)
            
            for(let x=0;x<response.data.length;x++){
                if(response.data[x].user==User.user&&response.data[x].password==User.password){
                    console.log("Acceso concedido")
                    var existe=true;
                    window.location.href="./app"
                    const cookies=new Cookies();
                    cookies.set("user",User.user,{path:'/'})
                   
                    break;
                }
            }
            if(existe!=true){
                alert("Check user/password combination")
            }

        }, (error) => {
            console.log(error);
          });

          <Link className="d-block" to="/">Not Registered? Register</Link>
    }

    return (
        <div>
            <Card border="primary" className="m-5 mx-auto" style={{ width: '18rem' }}>
  
                <Card.Body >
                    <Card.Title>Login</Card.Title>
                    <form>
                <label className="d-block" id="user">User </label>
                <input className="d-block" onChange={handleChange} name="user" value={input.user} id="user" type="text" placeholder="User"></input>
                <label className="d-block" id="password"> Password </label>
                <input className="d-block" onChange={handleChange} name="password" value={input.password} id="password" type="password" placeholder="Password"></input>
                <Button className="d-block my-3" onClick={handleClick}>Login</Button>
            </form>
                   <Link className="d-block" to="/">Not Registered? Register</Link>
                </Card.Body>
            </Card>
        
        
         {/*    
            <h3><Link to="/login">Go to login</Link></h3> */}
            
        </div>
    )
}

export default LoginForm
