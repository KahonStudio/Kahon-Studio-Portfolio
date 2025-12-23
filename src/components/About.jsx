import { useState, useEffect } from 'react'
import { HiCheckCircle, HiUsers } from 'react-icons/hi'
import { supabase } from '../lib/supabase'
import './About.css'

const About = () => {
  const [projectsCount, setProjectsCount] = useState(0)
  const [teamMembersCount, setTeamMembersCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch projects count
        const { count: projectsCountData, error: projectsError } = await supabase
          .from('projects')
          .select('*', { count: 'exact', head: true })

        if (!projectsError && projectsCountData !== null) {
          setProjectsCount(projectsCountData)
        } else {
          // Fallback if table doesn't exist or error
          console.warn('Could not fetch projects count:', projectsError)
          setProjectsCount(0)
        }

        // Fetch team members count
        const { count: teamCountData, error: teamError } = await supabase
          .from('team_members')
          .select('*', { count: 'exact', head: true })

        if (!teamError && teamCountData !== null) {
          setTeamMembersCount(teamCountData)
        } else {
          // Fallback if table doesn't exist or error
          console.warn('Could not fetch team members count:', teamError)
          setTeamMembersCount(2) // Default to 2 if can't fetch
        }
      } catch (error) {
        console.error('Error fetching stats:', error)
        // Fallback values
        setProjectsCount(0)
        setTeamMembersCount(2)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  return (
    <section id="about" className="about section">
      <div className="container">
        <div className="section-header">
          <span className="section-number">02.</span>
          <h2 className="section-title">About Us</h2>
        </div>
        <div className="about-content">
          <div className="about-text">
            <p className="about-description">
              Kahon Studio is a small team of two developers driven by a passion for building meaningful digital experiences. 
              We create video games, websites, mobile applications, and other interactive solutions with a strong focus on 
              creativity and functionality.
            </p>
            <p className="about-description">
              Our work blends thoughtful design with solid technical execution, allowing us to turn ideas into engaging and 
              reliable products. As a close-knit team, we value flexibility, attention to detail, and a hands-on approach to 
              every project we take on.
            </p>
          </div>
          <div className="about-stats">
            <div className="stat-item">
              <div className="stat-icon">
                <HiCheckCircle />
              </div>
              <div className="stat-number">
                {loading ? '...' : projectsCount > 0 ? `${projectsCount}+` : '0'}
              </div>
              <div className="stat-label">Projects Completed</div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">
                <HiUsers />
              </div>
              <div className="stat-number">
                {loading ? '...' : teamMembersCount > 0 ? teamMembersCount : '2'}
              </div>
              <div className="stat-label">Creative Minds</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About

