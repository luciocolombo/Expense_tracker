import React, {useState, useEffect} from 'react'
import {BrowserRouter as Router, Route} from "react-router-dom"
import InputBar from "./InputBar"
import NumberFormat from 'react-number-format';
import RegisterForm from "./RegisterForm"
import LoginForm from "./LoginForm"
import Dashboard from "./Dashboard"
import axios from 'axios'

function App() {
 
  
  const localData =localStorage.getItem("tasks")
  const [infoArray, setInfoArray]=useState(localData? JSON.parse(localData):[])
  const [total, setTotal]=useState(0)
  var id=1
  

    useEffect(()=>{
    localStorage.setItem("tasks",JSON.stringify(infoArray))
    const kk=JSON.parse(localStorage.getItem("tasks"))
    let summm=0
    //aca hago la suma del total
      for(let x=0;x<kk.length;x++){
      summm=kk[x]["amount"]*1+summm
      setTotal(summm)
      }
  },[infoArray])

     useEffect(()=>
      {
      const user=localStorage.getItem("user")
      axios.patch(`http://localhost:4000/posts/${user}`,{expenses:localStorage.getItem("taks")});
      }
      ,[infoArray]  //Ver setTimer y cantidad de pedidos a axios. Crear ruta PATCH
     
    ) 

  const btnHandler= function({amount, description, date}){
    var id=id+1
    const dateString=date.toString().slice(3,16)
    
    setInfoArray([...infoArray, {amount, description, dateString}])
    setTotal(total*1+amount*1)
    localStorage.setItem("tasks",infoArray)
    localStorage.setItem("total",total)
    
  }
   const clearNow=function(){
   window.location.reload(false);
    localStorage.clear("tasks")
    localStorage.clear("total")

    //ACA HAGO AXIOS.DELETE
  /*   que interprete USER como variable. Luegoe de patchear debe actualizar las cookies.get(data) */
    
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
                    <th scope="row">{infoArray.map((x)=><li className="ml-4 text-decoration-none">{infoArray.indexOf(x)+1}  </li> )}</th>
                    <td>{infoArray.map((x)=><li className="ml-4 list-unstyled">{x.description}  </li> )}</td>
                    <td>{infoArray.map((x)=><li className="ml-4 list-unstyled">  <NumberFormat value={x.amount} displayType={'text'} thousandSeparator={true} prefix={'$'} /></li> )}</td>
                    <td>{infoArray.map((x)=><li className="ml-4 list-unstyled">{x.dateString}  </li> )}</td>
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
