// Example: Contact component with Supabase integration
// This shows how to integrate Supabase with your Contact form
// You can use this as a reference when updating Contact.jsx

import { useState } from 'react'
import { HiMail, HiBriefcase, HiPaperAirplane } from 'react-icons/hi'
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // Insert form data into Supabase
      const { data, error } = await supabase
        .from('contacts')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            message: formData.message,
            created_at: new Date().toISOString()
          }
        ])
        .select()

      if (error) {
        throw error
      }

      // Success
      setSubmitStatus('success')
      setFormData({ name: '', email: '', message: '' })
      
      // Optional: Show success message
      alert('Thank you for your message! We\'ll get back to you soon.')
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
      alert('Sorry, there was an error submitting your message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="contact section">
      <div className="container">
        <div className="section-header">
          <span className="section-number">04.</span>
          <h2 className="section-title">Get In Touch</h2>
        </div>
        <div className="contact-content">
          <div className="contact-info">
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
          <form className="contact-form" onSubmit={handleSubmit}>
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
                disabled={isSubmitting}
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
                disabled={isSubmitting}
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
                disabled={isSubmitting}
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
            {submitStatus === 'success' && (
              <p style={{ color: 'var(--green)', marginTop: '1rem' }}>
                Message sent successfully!
              </p>
            )}
            {submitStatus === 'error' && (
              <p style={{ color: '#ff6b6b', marginTop: '1rem' }}>
                Error sending message. Please try again.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact


