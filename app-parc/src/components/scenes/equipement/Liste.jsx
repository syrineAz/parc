import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "../form/users.css"
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
function Liste() {
  const [data, setData] = useState([])
  const {id}= useParams()

   
  return (
    <div>
      
    </div>
  )
}

export default Liste

