import React from 'react'
import image from '../../assets/insurance.webp'


const About = () => {
  return (
    <div id="about" className="app__header app__flex app__container">
      <section class="about-section">
  <div class="container">
    <div class="row">
      <div class="col-md-6">
        <h2 class="section-title">About Us</h2>
        <p class="section-description">
          At Insta Insurance, we are dedicated to providing reliable and comprehensive insurance solutions to individuals, families, and businesses. With years of industry experience, we understand the importance of protecting what matters most to you.
        </p>
        <p>
          Our mission is to simplify the insurance process and help you make informed decisions. Whether you're looking for auto, home, health, or business insurance, we have a range of policies tailored to meet your specific needs.
        </p>
        <p>
          We pride ourselves on our exceptional customer service and strive to build long-term relationships with our clients. Our team of knowledgeable and friendly insurance professionals is here to guide you every step of the way, offering personalized advice and finding the best coverage options at competitive prices.
        </p>
      </div>
      <div class="col-md-6">
        <img src={image} alt="About [Insurance Company Name]" class="img-fluid" />
      </div>
    </div>
  </div>
</section>
    </div>
  )


}

export default About;
