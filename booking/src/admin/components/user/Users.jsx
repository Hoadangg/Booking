import React from 'react'
import Datatable from '../datatable/Datatable.jsx'
import { userColumns } from '../../datatablesource.js'

export default function User() {
  
  // console.log(data)
  return (
    <div>
        
      <Datatable columns={userColumns}/>
    </div>
  )
}
