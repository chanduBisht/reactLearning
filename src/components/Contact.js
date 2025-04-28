import React from 'react'

export default function Contact() {
  return (
    <div>
      <h1>Contact</h1>
      <p>If you have any questions or feedback, please contact us at <a href="mailto:contact@textanalyzer.com">contact@textanalyzer.com</a>.</p>

      <form>
        <div className="mb-3"> 
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" placeholder="Enter your name" />
        </div>
        <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" id="email" placeholder="Enter your email" />
        </div>
        <div className="mb-3">
            <label htmlFor="message" className="form-label">Message</label>
            <textarea className="form-control" id="message" placeholder="Enter your message" />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}
