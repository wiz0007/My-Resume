import React from 'react'
import Navbar from '../Component/Navbar/Navbar'
import Hero from '../Component/Hero/Hero'
import About from '../Component/About/About'
import Education from '../Component/Education/Education'
import Skills from '../Component/Skills/Skills'
import Projects from '../Component/Project/Project'
import Contact from '../Component/Contact/Contact'
import Trainings from '../Component/Training/Trainings'
import Journey from '../Component/Journey/Journey'

const HomePage = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <About/>
      <Projects/>
      <Skills/>
      <Journey/>
      <Education/>
      <Trainings/>
      <Contact/>
      
    </div>
  )
}

export default HomePage
