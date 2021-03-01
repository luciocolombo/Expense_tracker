import React from 'react'
import Bootstrap, {Button} from 'react-bootstrap'

function Dashboard() {
    function logOutHandle(){
        localStorage.clear()
        window.location.href="./"
    }
    return (
        <div className="container">
            <Button className="float-right" onClick={()=>logOutHandle()}>Log Out</Button>
            <p className=" text-left mt-3">Logged in as: <span className="font-weight-bold font-italic text-success">{localStorage.getItem("user")}</span></p>  {/* tengo acceso a user.user?? */}
           
        </div>
    )
}

export default Dashboard
