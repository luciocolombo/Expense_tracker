import React, {useState} from 'react'
import {Modal, Button} from 'react-bootstrap'
import axios from 'axios'

function DeleteWarning() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteAll=()=>{
    handleClose()
    const userId=localStorage.getItem("userId")
    axios.delete(` http://localhost:4000/posts/expenses/${userId}` )
    .then((res)=>
        
        //Por alguna razon [] rompe el ArrayofObjectos[0] pero el objeto generico que devuelve axios (aunque no haya tasks) no. Por eso lo completo denuevo
        axios.get( ` http://localhost:4000/posts/expenses/${userId}` )
        .then((res)=>{
        localStorage.setItem("tasks",JSON.stringify(res))
        window.location.href='./app'         
        },(error)=>{console.log(error)})  
        
        )

    

    
  }

  return (
    <>
      <Button variant="danger mt-2" onClick={handleShow}>
        Clear All
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete ALL?</Modal.Title>
        </Modal.Header>
        <Modal.Body>You cannot undo this action.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={deleteAll}>
            Delete all
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteWarning;