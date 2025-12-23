import { useEffect, useState } from 'react'
import { HiX, HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import './ProjectModal.css'

const ProjectModal = ({ project, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      // Reset image index when modal opens
      setCurrentImageIndex(0)
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, project])

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      window.addEventListener('keydown', handleEscape)
    }
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  // Handle arrow keys for image navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen || !project?.images || project.images.length <= 1) return
      
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        goToPreviousImage()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        goToNextImage()
      }
    }
    
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, project, currentImageIndex])

  const goToNextImage = () => {
    if (project?.images && project.images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % project.images.length)
    }
  }

  const goToPreviousImage = () => {
    if (project?.images && project.images.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length)
    }
  }

  const goToImage = (index) => {
    setCurrentImageIndex(index)
  }

  if (!isOpen || !project) return null

  const images = project.images || []
  const hasMultipleImages = images.length > 1

  return (
    <div className="project-modal-overlay" onClick={onClose}>
      <div className="project-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close">
          <HiX />
        </button>

        <div className="modal-header">
          <h2 className="modal-title">{project.title}</h2>
          <p className="modal-category">{project.category}</p>
        </div>

        <div className="modal-body">
          {images.length > 0 ? (
            <div className="modal-image-container">
              <div className="modal-main-image-wrapper">
                <img 
                  src={images[currentImageIndex]} 
                  alt={`${project.title} - Image ${currentImageIndex + 1}`}
                  className="modal-main-image"
                  loading="lazy"
                />
                
                {hasMultipleImages && (
                  <>
                    <button 
                      className="modal-image-nav-btn modal-image-prev"
                      onClick={(e) => {
                        e.stopPropagation()
                        goToPreviousImage()
                      }}
                      aria-label="Previous image"
                    >
                      <HiChevronLeft />
                    </button>
                    <button 
                      className="modal-image-nav-btn modal-image-next"
                      onClick={(e) => {
                        e.stopPropagation()
                        goToNextImage()
                      }}
                      aria-label="Next image"
                    >
                      <HiChevronRight />
                    </button>
                    
                    <div className="modal-image-counter">
                      {currentImageIndex + 1} / {images.length}
                    </div>
                  </>
                )}
              </div>

              {hasMultipleImages && (
                <>
                  <div className="modal-thumbnails">
                    {images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => goToImage(index)}
                        className={`modal-thumbnail-btn ${index === currentImageIndex ? 'active' : ''}`}
                        aria-label={`Go to image ${index + 1}`}
                      >
                        <img
                          src={img}
                          alt={`${project.title} - Thumbnail ${index + 1}`}
                          className="modal-thumbnail"
                        />
                      </button>
                    ))}
                  </div>
                  
                  <div className="modal-image-indicators">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        className={`modal-indicator ${index === currentImageIndex ? 'active' : ''}`}
                        onClick={() => goToImage(index)}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="modal-placeholder">
              {project.icon && <project.icon className="modal-placeholder-icon" />}
            </div>
          )}

          <div className="modal-info">
            <p className="modal-description">{project.description}</p>
            <div className="modal-tags">
              {project.tags.map((tag, index) => (
                <span key={index} className="modal-tag">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectModal

