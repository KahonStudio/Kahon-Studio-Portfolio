import { useState, useEffect, useRef } from 'react'
import { HiMail, HiBriefcase, HiPaperAirplane } from 'react-icons/hi'
import emailjs from '@emailjs/browser'
import { supabase } from '../lib/supabase'
import './Contact.css'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success' or 'error'
  const [submitMessage, setSubmitMessage] = useState('')
  const infoRef = useRef(null)
  const formRef = useRef(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    // Clear status when user starts typing again
    if (submitStatus) {
      setSubmitStatus(null)
      setSubmitMessage('')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)
    setSubmitMessage('')

    try {
      // Insert form data into Supabase
      const { data, error: insertError } = await supabase
        .from('contacts')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            message: formData.message
          }
        ])
        .select()

      if (insertError) {
        throw insertError
      }

      // Send email notification using EmailJS
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

      if (serviceId && templateId && publicKey) {
        try {
          await emailjs.send(
            serviceId,
            templateId,
            {
              to_email: 'itsmeibay@gmail.com',
              from_name: formData.name,
              from_email: formData.email,
              message: formData.message,
              reply_to: formData.email,
            },
            publicKey
          )
        } catch (emailError) {
          // Email error silently ignored - form submission still succeeds
        }
      }

      // Success
      setSubmitStatus('success')
      setSubmitMessage('Thank you for your message! We\'ll get back to you soon.')
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      setSubmitStatus('error')
      setSubmitMessage('Sorry, there was an error submitting your message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

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

    const elements = [infoRef.current, formRef.current].filter(Boolean)
    elements.forEach(el => observer.observe(el))

    return () => {
      elements.forEach(el => observer.unobserve(el))
    }
  }, [])

  return (
    <section id="contact" className="contact section">
      <div className="container">
        <div className="section-header">
          <span className="section-number">04.</span>
          <h2 className="section-title">Get In Touch</h2>
        </div>
        <div className="contact-content">
          <div ref={infoRef} className="contact-info fade-in-up">
            <h3 className="contact-info-title">Let's Talk</h3>
            <p className="contact-info-text">
              Have a project in mind? We'd love to hear from you. Send us a message 
              and we'll respond as soon as possible.
            </p>
            <div className="contact-details">
              <div className="contact-item">
                <div className="contact-icon">
                  <HiMail />
                </div>
                <div>
                  <div className="contact-label">Email</div>
                  <div className="contact-value">hello@kahonstudio.com</div>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <HiBriefcase />
                </div>
                <div>
                  <div className="contact-label">Available For</div>
                  <div className="contact-value">New Projects & Collaborations</div>
                </div>
              </div>
            </div>
          </div>
          <form ref={formRef} className="contact-form fade-in-up" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your.email@example.com"
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                placeholder="Tell us about your project..."
              ></textarea>
            </div>
            <button 
              type="submit" 
              className="btn btn-primary btn-submit"
              disabled={isSubmitting}
            >
              <HiPaperAirplane className="btn-icon" />
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
            {submitStatus && (
              <div 
                style={{ 
                  marginTop: '1rem',
                  padding: '0.75rem',
                  borderRadius: '0.25rem',
                  backgroundColor: submitStatus === 'success' 
                    ? 'rgba(100, 255, 218, 0.1)' 
                    : 'rgba(255, 107, 107, 0.1)',
                  color: submitStatus === 'success' 
                    ? 'var(--green)' 
                    : '#ff6b6b',
                  fontSize: '0.875rem',
                  border: `1px solid ${submitStatus === 'success' ? 'var(--green)' : '#ff6b6b'}`
                }}
              >
                {submitMessage}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact

