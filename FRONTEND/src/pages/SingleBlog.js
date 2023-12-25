import React from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta'
import { Link } from 'react-router-dom'
import {HiOutlineArrowLeft} from "react-icons/hi";
import blog from "../images/blog-1.jpg"
import Container from '../components/Container';

const SingleBlog = () => {
  return (
   <>
     <Meta title="Dynamic Blog Name" />
    <BreadCrumb title="Dynamic Blog Name" />
    <Container class1="blog-wrapper home-wrapper-2 py-5">
                <div className="row">
                    <div className="col-12">
                      <div className="single-blog-card">
                        <Link to="/blogs" className='d-flex align-items-center gap-10'><HiOutlineArrowLeft className='fs-4'/>Go back to Blogs</Link>
                        <h3 className="title">
                          A Beautiful Sunday Morning Renaissance
                        </h3>
                        <img src={blog} className='img-fluid w-100 my-4' alt="blog" />
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi molestiae at iure quod ducimus. Rerum porro dolorum molestias autem cum. Praesentium commodi numquam itaque in necessitatibus architecto eveniet ipsum? Distinctio similique tempora laboriosam voluptatibus, dolores et placeat, natus, cum quae maiores debitis commodi omnis numquam nihil iste nostrum veritatis sequi.
                        </p>
                      </div>
                    </div>
                </div>
            </Container>
   </>
  )
}

export default SingleBlog
