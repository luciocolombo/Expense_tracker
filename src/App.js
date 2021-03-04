import React, {useState, useEffect} from 'react'
import {BrowserRouter as Router, Route} from "react-router-dom"
import InputBar from "./InputBar"
import NumberFormat from 'react-number-format';
import RegisterForm from "./RegisterForm"
import LoginForm from "./LoginForm"
import Dashboard from "./Dashboard"
import axios from 'axios'

function App() {
 
  //Divido los items en los ya guarados en DB de antes (arrayofobjects) y los nuevos en (arraynewobjects)
  var tasks=localStorage.getItem("tasks")
  var ArrayofObjects=Object.values(tasks!=""?JSON.parse(tasks)||{}:[])
  var [arrayNewObjects,setArrayNewObjects]=useState([])
  var [total, setTotal]=useState(()=>{
    var partial=0
    for(let z=0;z<ArrayofObjects.length;z++){
       partial=partial+ArrayofObjects[z].amount*1 
    }
    for(let z=0;z<arrayNewObjects;z++){
       partial=partial+arrayNewObjects[z].amount *1
   
    }
    return partial
  }) 

 
  const btnHandler= function({amount, description, date}){
    const newData={description,amount,date}
    setArrayNewObjects([...arrayNewObjects,{description:description,amount:amount,date:date}])
     setTotal(prevTotal=>prevTotal*1+amount*1)
    const user=localStorage.getItem("user")
    
     axios.patch( `http://localhost:4000/posts/${user} `,newData)
     .then((response) => {console.log("info enviada a DB")})
     
  }
  console.log(total)
  
   const clearNow=function(){
   window.location.reload(false);
    localStorage.clear("tasks")
    localStorage.clear("total")
   }
   
  return (
    <Router>
        <Route path="/" exact> 
          <RegisterForm/>
        </Route>
        <Route path="/login" exact> 
         <LoginForm/>
        </Route>

        <Route path="/app" >
          <div>
            <Dashboard/>
            <div className="App mx-5 border ">
              <InputBar btnHandler={btnHandler} clearNow={clearNow}/>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Description</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    
                    <th scope="row">{ArrayofObjects.map((x)=><li className="ml-4 text-decoration-none">{ArrayofObjects.indexOf(x)+1}  </li> )}</th>
                    <td>{ArrayofObjects.map((x)=><li className="ml-4 list-unstyled">{x.description}  </li> )}</td>
                    <td>{ArrayofObjects.map((x)=><li className="ml-4 list-unstyled">  <NumberFormat value={x.amount} displayType={'text'} thousandSeparator={true} prefix={'$'} /></li> )}</td>
                    <td>{ArrayofObjects.map((x)=><li className="ml-4 list-unstyled">{x.date}  </li> )}</td>
                  </tr>
                  <tr>
                    <th scope="row">{arrayNewObjects && arrayNewObjects.map((x)=><li className="ml-4 text-decoration-none">{ArrayofObjects.length+1+arrayNewObjects.indexOf(x)}  </li> )}</th>
                    <td>{arrayNewObjects && arrayNewObjects.map((x)=><li className="ml-4 list-unstyled">{x.description}  </li> )}</td>
                    <td>{arrayNewObjects && arrayNewObjects.map((x)=><li className="ml-4 list-unstyled">  <NumberFormat value={x.amount} displayType={'text'} thousandSeparator={true} prefix={'$'} /></li> )}</td>
                    <td>{arrayNewObjects && arrayNewObjects.map((x)=><li className="ml-4 list-unstyled">{JSON.stringify(x.date).slice(1,11)}  </li> )}</td>


                  </tr>
                </tbody>
              </table>
          
            </div>
         <h3 className="col-11 border text-right mt-3 ml-5 ">Total <NumberFormat value={total} displayType={'text'} thousandSeparator={true} prefix={'$'} /></h3>
            <footer>This App was created by Lucio Colombo. It lets you save your data expenses for better money management</footer>
          </div>
      </Route>
    </Router>
  );
}

export default App;
