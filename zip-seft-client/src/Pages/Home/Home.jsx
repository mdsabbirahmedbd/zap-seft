import React from 'react'
import Banner from '../../Components/HomeComponets/Banner'
import OurWorks from '../../Components/HomeComponets/OurWorks'
import OurServices from '../../Components/HomeComponets/OurServices'
import OurHelped from '../../Components/HomeComponets/OurHelped'
import Marchent from '../../Components/HomeComponets/Marchent'
import ReviewsSlider from '../../Components/HomeComponets/Reviews'
import FAQSection from '../../Components/HomeComponets/Question'

const Home = () => {
  return (
    <div>
        <Banner></Banner>
        <OurWorks></OurWorks>
        <OurServices></OurServices>
        <OurHelped></OurHelped>
        <Marchent></Marchent>
        <ReviewsSlider></ReviewsSlider>
        <FAQSection></FAQSection>
    </div>
  )
}

export default Home