import { useState, useEffect, useRef } from 'react'
import { HiCode, HiColorSwatch, HiLightBulb, HiChip, HiTemplate, HiServer } from 'react-icons/hi'
import { supabase } from '../lib/supabase'
import './Team.css'

const Team = () => {
  const [teamMembers, setTeamMembers] = useState([])
  const [loading, setLoading] = useState(true)

  const skillIcons = {
    'UI/UX Design': HiColorSwatch,
    'Frontend Development': HiCode,
    'Creative Strategy': HiLightBulb,
    'Full-Stack Development': HiServer,
    'Product Design': HiTemplate,
    'Technical Architecture': HiChip
  }

  const hardcodedMembers = [
    {
      name: 'James Raphael',
      role: 'Creative Director & Developer',
      description: 'Passionate about creating beautiful interfaces and seamless user experiences.',
      skills: ['UI/UX Design', 'Frontend Development', 'Creative Strategy']
    },
    {
      name: 'Kelvin',
      role: 'Lead Developer & Designer',
      description: 'Expert in turning complex ideas into elegant, functional solutions.',
      skills: ['Full-Stack Development', 'Product Design', 'Technical Architecture']
    }
  ]

  const gridRef = useRef(null)

  // Fetch team members from Supabase
  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        setLoading(true)
        const { data, error: fetchError } = await supabase
          .from('team_members')
          .select('*')
          .order('display_order', { ascending: true })

        if (fetchError) throw fetchError

        if (data && data.length > 0) {
          setTeamMembers(data)
        } else {
          // Fallback to hardcoded if no data
          setTeamMembers(hardcodedMembers)
        }
      } catch (err) {
        // Fallback to hardcoded on error
        setTeamMembers(hardcodedMembers)
      } finally {
        setLoading(false)
      }
    }

    fetchTeamMembers()
  }, [])

  useEffect(() => {
    if (!gridRef.current) return

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const cards = entry.target.querySelectorAll('.team-card')
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.add('fade-in-visible')
            }, index * 100)
          })
        }
      })
    }, observerOptions)

    if (gridRef.current) {
      observer.observe(gridRef.current)
    }

    return () => {
      if (gridRef.current) {
        observer.unobserve(gridRef.current)
      }
    }
  }, [teamMembers])

  return (
    <section id="team" className="team section">
      <div className="container">
        <div className="section-header">
          <span className="section-number">01.</span>
          <h2 className="section-title">Our Team</h2>
        </div>
        <div ref={gridRef} className="team-grid">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-card fade-in-up">
              <div className="team-avatar">
                <div className="avatar-placeholder">
                  <span>{member.name.split(' ').map(n => n[0]).join('')}</span>
                </div>
              </div>
              <div className="team-info">
                <h3 className="team-name">{member.name}</h3>
                <p className="team-role">{member.role}</p>
                <p className="team-description">{member.description}</p>
                <div className="team-skills">
                  {member.skills.map((skill, skillIndex) => {
                    const IconComponent = skillIcons[skill]
                    return (
                      <span key={skillIndex} className="skill-tag">
                        {IconComponent && <IconComponent className="skill-icon" />}
                        {skill}
                      </span>
                    )
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Team

