import React from 'react'
import Datatable from '../datatable/Datatable.jsx'
import { roomColumns } from '../../datatablesource.js'

export default function Rooms() {
  return (
    <div>
      <Datatable columns={roomColumns}/>

    </div>
  )
}
