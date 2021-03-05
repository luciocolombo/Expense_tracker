import React from 'react'
import {Button} from 'react-bootstrap'


function DeleteBtn({valueToDelete}) {

   const handleDeleteValue=function(valueToDelete){
   console.log(valueToDelete)
  
   }
    
    return (
        <div>
            <Button onClick={handleDeleteValue} className="btn btn-danger btndelete"></Button>
        </div>
    )
    }

export default DeleteBtn
