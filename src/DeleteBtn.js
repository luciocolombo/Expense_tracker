import React from 'react'
import {Button} from 'react-bootstrap'
function DeleteBtn() {
    const deleteBtn=function(){
        //AQUI VA EL AXIOS.DELETE
    }
    return (
        <div>
            <Button onClick={deleteBtn} className="btn btn-danger btndelete"></Button>
        </div>
    )
}

export default DeleteBtn
