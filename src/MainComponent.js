import React, {useState, useEffect} from 'react'
import InputBar from "./InputBar"
import NumberFormat from 'react-number-format';
import Dashboard from "./Dashboard"
import axios from 'axios'
import DeleteBtn from './DeleteBtn'
import DeleteWarning from './DeleteWarning'

function MainComponent() {
//Divido los items en los ya guarados en DB de antes (arrayofobjects) y los nuevos en (arraynewobjects)
var tasks=localStorage.getItem("tasks") //viene de un axios get
var ArrayofObjects=Object.values(tasks!=""?JSON.parse(tasks)||{}:[])
/* console.log("arrayoofobjects...", ArrayofObjects) */
var [arrayNewObjects,setArrayNewObjects]=useState([])
var [total, setTotal]=useState(()=>{
  var partial=0
  for(let z=0;z<ArrayofObjects[0].length;z++){
    for(let r=0;r<arrayNewObjects;r++){
      partial=partial+arrayNewObjects[z].amount *1
    }
  partial=partial+ArrayofObjects[0][z].amount*1 
  }
  return partial
}) 

const btnHandler= function({amount, description, date}){
  const newData={description,amount,date}
  setArrayNewObjects([...arrayNewObjects,{description:description,amount:amount,date:date}])
  setTotal(prevTotal=>prevTotal*1+amount*1)
  console.log("el total es...", total)
  const userId=localStorage.getItem("userId")
   axios.patch( `http://localhost:4000/posts/expense/${userId} `,newData)
   .then((response) => {console.log("info enviada a DB")}) 
   
}



    return (
        <div>
            <Dashboard/>
            <div className="App mx-5 border ">
              <InputBar btnHandler={btnHandler} clearNow={<DeleteWarning/>}/>
              <table className="table table-striped">
                <thead >
                  <tr>
                    <th scope="col">Delete</th>
                    <th scope="col">#</th>
                    <th scope="col">Description</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Date</th>
                  </tr>
                </thead>
                <tbody>                  
                    {ArrayofObjects[0] .map((x)=>
                    <tr>
                      <td className="my-4"><DeleteBtn valueToDelete={x.id}/></td>
                      <th className="my-4">{ArrayofObjects[0].indexOf(x)+1}  </th>
                      <td className="my-4 ">{x.description}  </td>
                      <td className="my-4 ">  <NumberFormat value={x.amount} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                      <td className="my-4">{x.date}  </td>
                    </tr>
                    )}
                    {arrayNewObjects && arrayNewObjects.map((x)=>
                      <tr>
                      <td className="my-3"><DeleteBtn/></td>
                      <th className="my-4 ">{ArrayofObjects[0].length+1+arrayNewObjects.indexOf(x)}  </th>
                      <td className="my-4 ">{x.description}  </td>
                      <td className="my-4 ">  <NumberFormat value={x.amount} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td> 
                      <td className="my-4 ">{JSON.stringify(x.date).slice(1,11)}  </td>
                      </tr>
                    )}

                </tbody>
              </table>
          
            </div>
         <h3 className="col-11 border text-right mt-3 ml-5 ">Total <NumberFormat value={total} displayType={'text'} thousandSeparator={true} prefix={'$'} /></h3>
            <footer>This App was created by Lucio Colombo. It lets you save your data expenses for better money management</footer>
            
          </div>
    )
}

export default MainComponent
