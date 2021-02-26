import React from 'react'


function Dashboard() {
    return (
        <div>
            <p className="container text-right mt-3">Logged in as: <span className="font-weight-bold font-italic text-success">{localStorage.getItem("user")}</span></p>  {/* tengo acceso a user.user?? */}
           
        </div>
    )
}

export default Dashboard
