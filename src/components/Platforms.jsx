import { useEffect, useRef } from 'react'
import { HiGlobeAlt, HiDeviceMobile, HiDesktopComputer } from 'react-icons/hi'
import { FaGamepad } from 'react-icons/fa'
import './Platforms.css'

const Platforms = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const cardRefs = useRef([])

  const platforms = [
    { name: 'Web', icon: HiGlobeAlt, description: 'Web Development' },
    { name: 'Mobile', icon: HiDeviceMobile, description: 'iOS & Android' },
    { name: 'Games', icon: FaGamepad, description: 'Game Development' },
    { name: 'Desktop', icon: HiDesktopComputer, description: 'Desktop Apps' }
  ]

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-visible')
        }
      })
    }, observerOptions)

    const elements = [titleRef.current, ...cardRefs.current].filter(Boolean)
    elements.forEach(el => observer.observe(el))

    return () => {
      elements.forEach(el => observer.unobserve(el))
    }
  }, [])

  return (
    <section ref={sectionRef} className="platforms section">
      <div className="container">
        <div className="platforms-content">
          <h2 ref={titleRef} className="platforms-title fade-in-up">Available On</h2>
          <div className="platforms-grid">
            {platforms.map((platform, index) => {
              const IconComponent = platform.icon
              return (
                <div 
                  key={index} 
                  ref={el => cardRefs.current[index] = el}
                  className="platform-card fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="platform-icon">
                    <IconComponent />
                  </div>
                  <div className="platform-name">{platform.name}</div>
                  <div className="platform-description">{platform.description}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Platforms

