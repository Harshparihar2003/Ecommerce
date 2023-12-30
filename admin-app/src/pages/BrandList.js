import React, { useEffect } from 'react'
import {Table} from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { getBrands } from '../features/brand/brandSlice';
import { Link } from 'react-router-dom';
import {BiEdit} from "react-icons/bi"
import {AiFillDelete} from "react-icons/ai"

const columns = [
    {
      title: 'S.No',
      dataIndex: 'key',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Action',
      dataIndex: 'action',
    },
  ];


const BrandList = () => { 
  const dispath = useDispatch();
  useEffect(()=>{
      dispath(getBrands())
  },[])
  const brandState = useSelector((state)=>state.brand.brands);
  const data1 = [];
  for (let i = 0; i < brandState.length; i++) {
    data1.push({
      key: i+1,
      name: brandState[i].name,
      action: <>
        <Link className='fs-3 text-danger' to="/"><BiEdit/></Link>
        <Link className='ms-3 fs-3 text-danger' to="/"><AiFillDelete/></Link>
      </>,
    });
  }
  return (
    <div>
      <h3 className="mb-4 title">Brand</h3>
      <div>
      <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  )
}

export default BrandList
