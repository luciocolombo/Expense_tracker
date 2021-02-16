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
  })

  const btnHandler= function({amount, description, date}){
    var id=id+1
    const dateString=date.toString().slice(3,16)
    setInfoArray([...infoArray, {amount, description, dateString}])
    setTotal(total*1+amount*1)
    
  }
/*   const clearNow=function(){
  /*   window.location.reload(false); */
/*     localStorage.clear()
  } */ 
 
  return (
    <div>
    <div className="App mx-5 border ">
      <InputBar btnHandler={btnHandler} /* clearNow={clearNow} *//>
        <div className=" d-flex ">
          <div className="border comp">
            <h3 className=" border"> Description</h3>
            <div >{infoArray.map((x)=><li className="ml-4">{x.description}  </li> )}</div>
          </div>
          <div className="border comp">
            <h3 className="border">Amount </h3>
            <div >{infoArray.map((x)=><li className="ml-4">  <NumberFormat value={x.amount} displayType={'text'} thousandSeparator={true} prefix={'$'} /></li> )}</div> 
          </div>
          <div className="border comp">
            <h3 className="border">Date </h3>
            <div>{infoArray.map((x)=><li className="ml-4">{x.dateString}  </li> )}</div>
          </div>
          </div>
        </div>
        <h3 className="col-9 border text-right mt-3 ml-5 ">Total <NumberFormat value={total} displayType={'text'} thousandSeparator={true} prefix={'$'} /></h3>
      </div>
    
    
  );
}

export default App;
