import React from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta'
import BlogCard from '../components/BlogCard'
import { Link } from 'react-router-dom'

const SingleBlog = () => {
  return (
   <>
     <Meta title="Dynamic Blog Name" />
    <BreadCrumb title="Dynamic Blog Name" />
    <div className="blog-wrapper home-wrapper-2 py-5">
            <div className="container-xxl">
                <div className="row">
                    <div className="col-12">
                      <div className="single-blog-card">
                        <Link to="/blog" >Go back to Blogs</Link>
                        <h3 className="title">
                          A Beautiful Sunday Morning Renaissance
                        </h3>
                        <img src="images/blog-1.js" className='img-fluid w-100 my-4' alt="blog" />
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi molestiae at iure quod ducimus. Rerum porro dolorum molestias autem cum. Praesentium commodi numquam itaque in necessitatibus architecto eveniet ipsum? Distinctio similique tempora laboriosam voluptatibus, dolores et placeat, natus, cum quae maiores debitis commodi omnis numquam nihil iste nostrum veritatis sequi.
                        </p>
                      </div>
                    </div>
                </div>
            </div>
        </div>
   </>
  )
}

export default SingleBlog
