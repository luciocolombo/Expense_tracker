import React from 'react'
import {Button} from 'react-bootstrap'
import axios from 'axios'

function DeleteBtn({idExpenseToDelete}) {

   function handleDeleteValue(idExpenseToDelete){
   console.log("id task to delete...",idExpenseToDelete)
   const expenseId=idExpenseToDelete
    axios.delete(`https://expense-trakr.herokuapp.com/posts/expense/${expenseId}`)
    .then((res)=>{console.log(" expense deleted")
        const userId=localStorage.getItem("userId")         
        axios.get( ` https://expense-trakr.herokuapp.com/posts/expenses/${userId}` )
                        .then((res)=>{
                            localStorage.setItem("tasks",JSON.stringify(res))
                            window.location.href='./app'
                        },(error)=>{console.log(error)})
          
                    }
        
    )


   }
    return (
        <div>
            <Button onClick={()=>handleDeleteValue(idExpenseToDelete)} className="btn btn-danger btndelete"></Button>
        </div>
    )
    }

export default DeleteBtn
