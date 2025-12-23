import { HiArrowDown } from 'react-icons/hi'
import './Hero.css'

const Hero = () => {
  return (
    <section id="hero" className="hero">
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="greeting">Hi, we are</span>
            <span className="title-line gradient-text">
              Kahon Studio.
            </span>
            <span className="title-line gradient-text">
              We build <span className="name-highlight">digital experiences</span>.
            </span>
          </h1>
          <p className="hero-subtitle">
            We're a creative digital studio specializing in building <span className="gradient-word">immersive</span> video games, 
            <span className="gradient-word"> stunning</span> websites, and <span className="gradient-word">innovative</span> mobile applications 
            that blend thoughtful design with robust engineering.
          </p>
          <div className="hero-buttons">
            <a href="#projects" className="btn btn-primary">
              Check out our work!
            </a>
          </div>
        </div>
      </div>
      <div className="scroll-indicator">
        <HiArrowDown className="scroll-icon" />
      </div>
    </section>
  )
}

export default Hero

