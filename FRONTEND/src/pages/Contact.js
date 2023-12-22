import React from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta'

const Contact = () => {
  return (
    <>
      <Meta title="Contact Us" />
      <BreadCrumb title="Contact Us" />
      <div className="contact wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8034.655298293176!2d81.87833053181278!3d25.474552487381512!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399ab582b781cc97%3A0x621bfd4f1b0ef293!2sISWAR%20SARAN%20DEGREE%20COLLEGE!5e0!3m2!1sen!2sin!4v1703255874755!5m2!1sen!2sin" width="600" height="450" className="border-0 w-100" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
            <div className="col-12 mt-5">
              <div className="contact-wrapperd-flex justify-content-between">
                  <div><h3 className="contact-title">Contact Us</h3></div>
                  <div><h3 className="contact-title">Get in touch with us</h3></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact
