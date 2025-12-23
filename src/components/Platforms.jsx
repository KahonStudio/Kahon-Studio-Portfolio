import { HiGlobeAlt, HiDeviceMobile, HiDesktopComputer } from 'react-icons/hi'
import { FaGamepad } from 'react-icons/fa'
import './Platforms.css'

const Platforms = () => {
  const platforms = [
    { name: 'Web', icon: HiGlobeAlt, description: 'Web Development' },
    { name: 'Mobile', icon: HiDeviceMobile, description: 'iOS & Android' },
    { name: 'Games', icon: FaGamepad, description: 'Game Development' },
    { name: 'Desktop', icon: HiDesktopComputer, description: 'Desktop Apps' }
  ]

  return (
    <section className="platforms section">
      <div className="container">
        <div className="platforms-content">
          <h2 className="platforms-title">Available On</h2>
          <div className="platforms-grid">
            {platforms.map((platform, index) => {
              const IconComponent = platform.icon
              return (
                <div key={index} className="platform-card">
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

