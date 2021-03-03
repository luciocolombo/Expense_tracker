import React, {useState, useEffect} from 'react'
import {BrowserRouter as Router, Route} from "react-router-dom"
import InputBar from "./InputBar"
import NumberFormat from 'react-number-format';
import RegisterForm from "./RegisterForm"
import LoginForm from "./LoginForm"
import Dashboard from "./Dashboard"
import axios from 'axios'

function App() {
 
  //defino el info array y total
  var localDataJson =JSON.parse(localStorage.getItem("tasks")) //aca tengo un objeto de objetos
  var [localDataArray,setLocalDataArray]=useState(Object.values(localDataJson|| {}))
  var [infoArray, setInfoArray]=useState( localDataJson)
  var [total, setTotal]=useState(0)
  var id=1
  
/*   useEffect(()=>{
    //actualizo el valor del array cada vez q cambia el local storage (localdatajson es localstorage parseado)
    setLocalDataArray(Object.values(localDataJson))
    
  },[localDataJson]) */

    //esto intenta meter los nuevos cambios a LOCAL STORAGE, los de infoarray y total
   /*  useEffect(()=>{
    localStorage.setItem("tasks",JSON.stringify(infoArray))
    const kk=JSON.parse(localStorage.getItem("tasks"))
    let summm=0
    //aca hago la suma del total
      for(let x=0;x<kk.length;x++){
      summm=kk[x]["amount"]*1+summm
      setTotal(summm)
      }
  },[infoArray]) */

  //esto sube a la DB los cambios de TASKS
   /*   useEffect(()=>
      {
      const user=localStorage.getItem("user")
      axios.patch(`http://localhost:4000/posts/${user}`,{expenses:localStorage.getItem("tasks")});
      }
      ,[infoArray]  //Ver setTimer y cantidad de pedidos a axios. Crear ruta PATCH
     
    )  */

  const btnHandler= function({amount, description, date}){
    setLocalDataArray([...localDataArray,"3"/* {description:description,amount:amount,date:date} */])
    console.log("localdataarray ", localDataArray)
    console.log({description, amount, date})

  /*   var localStorageArray=[localDataJson].push({description:"description",amount:"amount",date:"date"}) */
    
    /* var id=id+1
    const dateString=date.toString().slice(3,16) */
    /* 
    setInfoArray([...infoArray, {amount, description, dateString}])
    setTotal(total*1+amount*1)
    var tasksArray=[""]
    const taskString=localStorage.getItem("tasks")
    tasksArray = JSON.parse(taskString);
    console.log(taskString)
    tasksArray.push([...infoArray]);
    localStorage.setItem("tasks", JSON.stringify(tasksArray));
    localStorage.setItem("total",total) */
    
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
              
            {/*   EMBELLECER Y AGREGAR TOTAL */}
              <td>{localDataArray && localDataArray.map((x)=><li>{Object.values(x)}</li>)}</td>  
       
             
                


                   {/*  <th scope="row">{infoArray.map((x)=><li className="ml-4 text-decoration-none">{infoArray.indexOf(x)+1}  </li> )}</th>
                    <td>{infoArray.map((x)=><li className="ml-4 list-unstyled">{x.description}  </li> )}</td>
                    <td>{infoArray.map((x)=><li className="ml-4 list-unstyled">  <NumberFormat value={x.amount} displayType={'text'} thousandSeparator={true} prefix={'$'} /></li> )}</td>
                    <td>{infoArray.map((x)=><li className="ml-4 list-unstyled">{x.dateString}  </li> )}</td> */}
                  </tr>
                </tbody>
              </table>
          
            </div>
         {/*    <h3 className="col-11 border text-right mt-3 ml-5 ">Total <NumberFormat value={total} displayType={'text'} thousandSeparator={true} prefix={'$'} /></h3> */}
            <footer>This App was created by Lucio Colombo. It lets you save your data expenses for better money management</footer>
          </div>
      </Route>
    </Router>
  );
}

export default App;
