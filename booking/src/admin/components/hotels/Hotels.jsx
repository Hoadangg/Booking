import React from 'react'
import Datatable from '../datatable/Datatable.jsx'
import { hotelColumns } from '../../datatablesource.js'

export default function Rotels() {
  return (
    <div>
      <Datatable columns={hotelColumns}/>

    </div>
  )
}
