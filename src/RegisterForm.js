import React, {useState} from 'react'
import {Link} from "react-router-dom"
import axios from "axios"
import { Card, Button } from 'react-bootstrap';

function RegisterForm() {
    const [input, setInput]=useState({user:"",password:""})
    function handleChange(event){
        const {name, value}=event.target;
        

        setInput(prevInput=>{
            return{
                ...prevInput,
                [name]:value
            }
            
        })
    }
    function handleClick(event){
        event.preventDefault();
       /*  console.log(input) */
        const newUser={
            user:input.user,
            password:input.password
        }
        axios.post('http://localhost:4000/posts',newUser)
        .then((response) => {
            //response.data.message exists when there is an error, like when the user exists.
            if(response.data.message===undefined){alert("This user already exists")}
            else{
            alert("Usuario Creado")
            window.location.href="./app"
            }
     
          }, (error) => {
            console.log(error);
          });
    }

    return (
        <div>
            <Card border="primary" className="m-5 mx-auto" style={{ width: '18rem' }}>
  
                <Card.Body >
                    <Card.Title>Register</Card.Title>
                    <form>
                <label className="d-block" id="user">User </label>
                <input className="d-block" onChange={handleChange} name="user" value={input.user} id="user" type="text" placeholder="User"></input>
                <label className="d-block" id="password"> Password </label>
                <input className="d-block" onChange={handleChange} name="password" value={input.password} id="password" type="password" placeholder="Password"></input>
                <Button className="d-block my-3" onClick={handleClick}>Register</Button>
            </form>
                   <Link className="d-block" to="/login">Registered? Log In</Link>
                </Card.Body>
            </Card>
        
        
         {/*    
            <h3><Link to="/login">Go to login</Link></h3> */}
            
        </div>
    )
}

export default RegisterForm
