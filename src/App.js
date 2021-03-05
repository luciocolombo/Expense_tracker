import React, {useState, useEffect} from 'react'
import {BrowserRouter as Router, Route} from "react-router-dom"
import InputBar from "./InputBar"
import NumberFormat from 'react-number-format';
import RegisterForm from "./RegisterForm"
import LoginForm from "./LoginForm"
import Dashboard from "./Dashboard"
import axios from 'axios'
import DeleteBtn from './DeleteBtn'
import deleteWarning from './deleteWarning'

function App() {
 
 //Divido los items en los ya guarados en DB de antes (arrayofobjects) y los nuevos en (arraynewobjects)
  var tasks=localStorage.getItem("tasks") //viene de un axios get
  var ArrayofObjects=Object.values(tasks!=""?JSON.parse(tasks)||{}:[])
  /* console.log("arrayoofobjects...", ArrayofObjects) */
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
    const userId=localStorage.getItem("userId")
     axios.patch( `http://localhost:4000/posts/expense/${userId} `,newData)
     .then((response) => {console.log("info enviada a DB")}) 
     
  }
  console.log(total)
  
   const clearNow=function(){
   console.log("deberia borrarse todo")

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
                    <th scope="col">Delete Btn</th>
                    <th scope="col">#</th>
                    <th scope="col">Description</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>

                    <td >{ArrayofObjects[0] .map((x)=><li className="my-4"><DeleteBtn/></li>)}</td>
                    <th scope="row">{ArrayofObjects[0].map((x)=><li className="my-4">{ArrayofObjects[0].indexOf(x)+1}  </li> )}</th>
                    <td>{ArrayofObjects[0].map((x)=><li className="my-4 ">{x.description}  </li> )}</td>
                    <td>{ArrayofObjects[0].map((x)=><li className="my-4 ">  <NumberFormat value={x.amount} displayType={'text'} thousandSeparator={true} prefix={'$'} /></li> )}</td>
                    <td>{ArrayofObjects[0].map((x)=><li className="my-4">{x.date}  </li> )}</td>
                  </tr>
                  <tr>
                    <td >{arrayNewObjects && arrayNewObjects.map((x)=><li className="my-3"><DeleteBtn/></li>)}</td>
                    <th scope="row">{arrayNewObjects && arrayNewObjects.map((x)=><li className="my-4 ">{ArrayofObjects[0].length+1+arrayNewObjects.indexOf(x)}  </li> )}</th>
                    <td>{arrayNewObjects && arrayNewObjects.map((x)=><li className="my-4 ">{x.description}  </li> )}</td>
                    <td>{arrayNewObjects && arrayNewObjects.map((x)=><li className="my-4 ">  <NumberFormat value={x.amount} displayType={'text'} thousandSeparator={true} prefix={'$'} /></li> )}</td>
                    <td>{arrayNewObjects && arrayNewObjects.map((x)=><li className="my-4 ">{JSON.stringify(x.date).slice(1,11)}  </li> )}</td>


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
