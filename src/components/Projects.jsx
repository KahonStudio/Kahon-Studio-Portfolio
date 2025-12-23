import { useState, useEffect } from 'react'
import { HiCollection, HiDeviceMobile, HiGlobeAlt, HiChat, HiLightningBolt, HiPhotograph } from 'react-icons/hi'
import { FaGamepad } from 'react-icons/fa'
import { supabase } from '../lib/supabase'
import ProjectModal from './ProjectModal'
import './Projects.css'

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedProject, setSelectedProject] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Icon mapping for categories
  const categoryIcons = {
    games: FaGamepad,
    web: HiGlobeAlt,
    mobile: HiDeviceMobile,
    all: HiCollection
  }

  // Fetch projects from Supabase
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true)
        const { data, error: fetchError } = await supabase
          .from('projects')
          .select('*')
          .order('display_order', { ascending: true })

        if (fetchError) throw fetchError

        // Map database projects to component format
        const mappedProjects = data.map(project => ({
          id: project.id,
          title: project.title,
          category: project.category,
          description: project.description,
          tags: project.tags || [],
          icon: categoryIcons[project.category] || HiCollection,
          // Support both image_urls (array) and image_url (single) for backward compatibility
          images: project.image_urls && project.image_urls.length > 0 
            ? project.image_urls 
            : (project.image_url ? [project.image_url] : []),
          link: project.project_url,
          githubUrl: project.github_url,
          featured: project.featured
        }))

        // Sort projects alphabetically by title
        const sortedProjects = mappedProjects.sort((a, b) => 
          a.title.localeCompare(b.title)
        )

        setProjects(sortedProjects || [])
        setError(null)
      } catch (err) {
        console.error('Error fetching projects:', err)
        // Check if it's a "table doesn't exist" error
        if (err.message && (err.message.includes('does not exist') || err.message.includes('Could not find the table'))) {
          setError('Projects table not found. Please create the tables in Supabase.')
        } else {
          setError('Failed to load projects. Please check your connection.')
        }
        setProjects([])
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const filters = ['all', 'games', 'web', 'mobile']
  
  const filterIcons = {
    all: HiCollection,
    games: FaGamepad,
    web: HiGlobeAlt,
    mobile: HiDeviceMobile
  }

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter)

  const openModal = (project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedProject(null), 300)
  }

  const currentIndex = selectedProject 
    ? filteredProjects.findIndex(p => p.id === selectedProject.id)
    : -1

  const navigateProject = (direction) => {
    if (currentIndex === -1) return
    const newIndex = direction === 'next' 
      ? (currentIndex + 1) % filteredProjects.length
      : (currentIndex - 1 + filteredProjects.length) % filteredProjects.length
    setSelectedProject(filteredProjects[newIndex])
  }

  return (
    <section id="projects" className="projects section">
      <div className="container">
        <div className="section-header">
          <span className="section-number">03.</span>
          <h2 className="section-title">Some Things We've Built</h2>
        </div>
        
        <div className="project-filters">
          {filters.map(filter => {
            const IconComponent = filterIcons[filter]
            return (
              <button
                key={filter}
                className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter)}
              >
                <IconComponent className="filter-icon" />
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            )
          })}
        </div>

        {loading && (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--slate)' }}>
            Loading projects...
          </div>
        )}

        {error && (
          <div style={{ textAlign: 'center', padding: '2rem', color: '#ff6b6b' }}>
            {error}
          </div>
        )}

        {!loading && !error && projects.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--slate)' }}>
            <p style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>No projects found</p>
            <p style={{ fontSize: '0.875rem', color: 'var(--slate)' }}>
              Add projects in your Supabase database to see them here.
            </p>
          </div>
        )}

        {!loading && !error && projects.length > 0 && (
          <div className="projects-grid">
            {filteredProjects.map(project => {
              const IconComponent = project.icon
              const hasImages = project.images && project.images.length > 0
              return (
                <div 
                  key={project.id} 
                  className="project-card"
                  onClick={() => openModal(project)}
                >
                  <div className="project-image">
                    {hasImages ? (
                      <>
                        <img 
                          src={project.images[0]} 
                          alt={project.title}
                          className="project-img"
                          loading="lazy"
                        />
                        {project.images.length > 1 && (
                          <div className="image-count-badge">
                            <HiPhotograph />
                            <span>{project.images.length}</span>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="project-placeholder">
                        {IconComponent && <IconComponent className="project-icon" />}
                      </div>
                    )}
                    <div className="project-overlay">
                      <div className="overlay-content">
                        <button className="project-btn">
                          {hasImages ? 'View Gallery' : 'View Details'}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="project-info">
                    <div className="project-header">
                      <h3 className="project-title">{project.title}</h3>
                      <span className="project-category-badge">{project.category}</span>
                    </div>
                    <p className="project-description">{project.description}</p>
                    <div className="project-tags">
                      {project.tags.map((tag, index) => (
                        <span key={index} className="project-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        <ProjectModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      </div>
    </section>
  )
}

export default Projects

