import React from 'react'
import { useContext } from 'react'
import UserContext from '../../globalState.js'
import "./modal.css"
import Register from '../signUp_login/Register_form.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  
  faCircleXmark

} from "@fortawesome/free-solid-svg-icons";

export default function Modal() {
  const {modal, setModal} = useContext(UserContext)
  return (
    <>
        <div className='modal'>
            <div className="ovelay">
                <div className="modal-content">
                <FontAwesomeIcon
                  icon={faCircleXmark}
                  className="modal-close"
                  onClick={()=>{setModal(!modal)}}
                />
                
                <Register/>
                </div>
            </div>

        </div>


    </>
  )
}
