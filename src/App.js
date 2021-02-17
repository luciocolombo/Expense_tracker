import React, {useState, useEffect} from 'react'
import InputBar from "./InputBar"
import NumberFormat from 'react-number-format';

function App() {
 
  const localData =localStorage.getItem("tasks")
  const [infoArray, setInfoArray]=useState(localData? JSON.parse(localData):[])
  const [total, setTotal]=useState(0)
  var id=1
  
  useEffect(()=>{
    localStorage.setItem("tasks",JSON.stringify(infoArray))
    const kk=JSON.parse(localStorage.getItem("tasks"))
    let summm=0
      for(let x=0;x<kk.length;x++){
      summm=kk[x]["amount"]*1+summm
      setTotal(summm)
      }
  })

  const btnHandler= function({amount, description, date}){
    var id=id+1
    const dateString=date.toString().slice(3,16)
    setInfoArray([...infoArray, {amount, description, dateString}])
    setTotal(total*1+amount*1)
    
  }
   const clearNow=function(){
   window.location.reload(false);
    localStorage.clear()
    
   }
 
  return (
  <div>
    <div className="App mx-5 border ">
      <InputBar btnHandler={btnHandler} clearNow={clearNow}/>
      <table class="table table-striped">
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
    <footer>This App was created by Lucio Colombo. It uses local storage to remember saved costs.</footer>
  </div>
    
    
  );
}

export default App;
