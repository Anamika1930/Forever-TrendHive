import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'


const About = () => {
  return (
    <div>
      
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, reiciendis? Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum corrupti, quidem eligendi hic itaque vero accusantium modi illo quam, fuga accusamus iusto sit asperiores consequatur iure sapiente tempore. Et iure ullam aliquid soluta, ducimus ipsum laudantium fugiat aspernatur consequatur placeat, dolore vitae fuga distinctio culpa quis repudiandae officiis molestiae quia.</p>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquid optio, repellendus iste voluptates sapiente repudiandae unde alias temporibus, sit inventore soluta vitae. Praesentium facere fugit, eius cum mollitia odit nulla natus consequatur modi explicabo veritatis, ducimus fugiat molestiae architecto illum esse. Neque ipsum cum tempore similique voluptatum dolor. Ut, dolorum molestias! Iure quibusdam reiciendis eaque corrupti veritatis numquam provident id? </p>
        <b className='text-gray-800'>Our Misson</b>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, maxime?  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis quae non cum nihil nam harum deleniti debitis dolor dolores nostrum!</p>
        </div>
      </div>

      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Qulaity Assurance:</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo voluptatem blanditiis quisquam voluptatum magni sunt hic molestiae labore exercitationem itaque.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo voluptatem blanditiis quisquam voluptatum magni sunt hic molestiae labore exercitationem itaque.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Serice:</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo voluptatem blanditiis quisquam voluptatum magni sunt hic molestiae labore exercitationem itaque.</p>
        </div>
      </div>

      <NewsletterBox />
    </div>
  )
}

export default About
