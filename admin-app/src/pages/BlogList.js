import React, { useEffect, useState } from 'react'
import {Table} from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {BiEdit} from "react-icons/bi"
import {AiFillDelete} from "react-icons/ai"
import { getBlogs } from '../features/blogs/blogSlice';

const columns = [

    {
      title: 'S.No',
      dataIndex: 'key',
    },
    {
      title: 'Title',
      dataIndex: 'name',
    },
    {
      title: 'Category',
      dataIndex: 'category',
    },
    {
      title: 'Action',
      dataIndex: 'action',
    },
  ];

const BlogList = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getBlogs())
  },[])
  const BlogState = useSelector((state) => state.blogs.blogs)
  const data1 = [];
  for (let i = 0; i < BlogState.length; i++) {
    data1.push({
      key: i+1,
      name: BlogState[i].title,
      category: BlogState[i].category,
      action: <>
      <Link className='fs-3 text-danger' to="/"><BiEdit/></Link>
      <Link className='ms-3 fs-3 text-danger' to="/"><AiFillDelete/></Link>
    </>,
    });
  }
  console.log(data1)
  return (
    <div>
      <h3 className="mb-4 title">Blogs list</h3>
      <div>
      <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  )
}

export default BlogList
