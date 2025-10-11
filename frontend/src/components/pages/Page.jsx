import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./Page.css"

const Page = () => {
  const username = localStorage.getItem("username")
    const userId = localStorage.getItem("userId")

  const navigate = useNavigate()
  return (
    <div className="page-container">
      <h1>Hey {username}! </h1>
      <p>Here's what's new with your receipts today.</p>
      <div className="btn-group">
        <button 
          className="btn" 
          onClick={() => navigate("/CreateReceipt")}
        >
          CREATE NEW REACIPTS
        </button>
        <button 
          className="btn" 
          onClick={() => navigate("/AllReceipt", { replace: true })}
        >
          VIEW ALL RECEIPTS
        </button>
      </div>
    </div>
  )
}

export default Page
