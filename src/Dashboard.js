import React from 'react'
import Cookies from "universal-cookie"

function Dashboard() {
    const cookies=new Cookies();

    return (
        <div>
            <p className="container text-right mt-3">Logged in as: <span className="font-weight-bold font-italic text-success">{cookies.get("user")}</span></p>  {/* tengo acceso a user.user?? */}
           
        </div>
    )
}

export default Dashboard
