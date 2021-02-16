import React, {useState} from 'react'
import DatePicker from 'react-date-picker'

function InputBar({btnHandler /* , clearNow */ }) {
    const [description, setDescription] =useState("")
    const [amount, setAmount] =useState(null)
    
    const [date, setDate] = useState(new Date());
    
    return (
        <div  className="my-4 mx-2 ">
            <form  onSubmit={e => e.preventDefault()}>
            <label className="mr-1" htmlFor="description">Description </label>
            <input className="mr-3" id="description" value={description} onChange={e=>setDescription(e.target.value)} placeholder="Description"></input>
            <label className="mr-1" htmlFor="amount">Amount $ </label>
            <input className="mr-3" id="amount" value={amount} onChange={e=>setAmount(e.target.value)} placeholder="Amount"></input>
            <label className="mr-1" htmlFor="date">Date </label>
            <DatePicker className="mr-3" id="date" onChange={setDate} value={date}/>
            <button onClick={()=>{btnHandler({description, amount, date});setAmount("");setDescription("");setDate("")}}>Add</button>
           {/* <button onClick={()=>{clearNow()}}>Clear</button> */}
            </form>     
            
        </div>
    )
}

export default InputBar
