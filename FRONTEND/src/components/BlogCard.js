import React from 'react'
import { NavLink, Link } from "react-router-dom"

const BlogCard = () => {
  return (
    <>
        <div className="blog-card">
          <div className="card-image">
            <img src="images/blog-1.jpg" className='img-fluid w-100' alt="blog" />
          </div>
          <div className="blog-content">
            <p className="date">
              1 Dec, 2023
            </p>
            <h5 className="title">
              A beautiful sunday morning renaissance
            </h5>
            <p className="desc">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam dolorem fugit veniam voluptates facere error ad enim adipisci nostrum nesciunt maxime impedit soluta cupiditate eaque, exercitationem nemo ipsam omnis amet pariatur ipsum cum atque libero asperiores? Incidunt eligendi dolorum accusantium?</p>
            <Link className="button" to="/blog/:id">Read More</Link>
          </div>
      </div>
    </>
  )
}

export default BlogCard
