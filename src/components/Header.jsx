import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <nav class="navbar bg-black">
  <div class="container-fluid">
    <Link to={'./'} class="navbar-brand anta-regular text-white" href="#"><i class="fa-solid fa-car text-danger me-1"></i>AutoDash</Link>
  </div>
</nav>
  )
}

export default Header