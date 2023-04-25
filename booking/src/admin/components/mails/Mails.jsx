import React from 'react'
import Datatable from '../datatable/Datatable.jsx'
import { mailColumns } from '../../datatablesource.js'

export default function Mails() {
  return (
    <div><Datatable columns={mailColumns}/></div>
  )
}
