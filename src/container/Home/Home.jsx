import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Header from '../Header/Header'
import About from '../About/About'
import Footer from '../Footer/Footer'

const Home = () => {
  const userDetails = {
    name: localStorage.setItem('name',""),
    username: localStorage.setItem('username',""),
    role: localStorage.setItem('role',""),
    token: localStorage.setItem('token',""),
    userId: localStorage.setItem('userId',""),
  };

  localStorage.removeItem("name");
  localStorage.removeItem("username");
  localStorage.removeItem("role");
  localStorage.removeItem("token");
  localStorage.removeItem("userId");

  return (
    <>
        <Navbar user={userDetails}/>
        <Header />
        <About />
        <Footer />
    </>
  )
}

export default Home