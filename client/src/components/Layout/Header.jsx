import { useEffect, useState } from 'react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()
const [loginUser, setLoginuser] = useState('')
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('user'))
    if(user){
      setLoginuser(user)
    }
  },[]);


const logoutHandler=()=>{
  localStorage.removeItem('user')
  navigate('/login')
}

  return (
    <>
<nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <p className="navbar-brand" to = '/'> Expense Management </p>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item"> {" "}
       <p className='nav-link'> {loginUser && loginUser.name}</p> 
       {" "}
       </li>
       <li className='nav-link'>
          <button className="btn btn-primary" aria-current="page" onClick={logoutHandler}>Logout</button>
        </li>
      </ul>
    </div>
  </div>
</nav>

    </>
  )
}

export default Header;