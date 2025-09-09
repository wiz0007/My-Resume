import React from 'react'
import Navbar from '../Component/Navbar/Navbar'
import Hero from '../Component/Hero/Hero'
import About from '../Component/About/About'
import Skills from '../Component/Skills/Skills'
import Projects from '../Component/Project/Project'
import Contact from '../Component/Contact/Contact'

const HomePage = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <About/>
      <Skills/>
      <Projects/>
      <Contact/>
    </div>
  )
}

export default HomePage
