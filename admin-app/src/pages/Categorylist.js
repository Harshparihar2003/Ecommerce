import React, { useEffect } from 'react'
import {Table} from "antd";
import {BiEdit} from "react-icons/bi"
import {AiFillDelete} from "react-icons/ai"
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCategories } from '../features/pcategory/pcategorySlice';

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


const Categorylist = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getCategories());
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
  
    fetchData();
  }, [dispatch]);
  const pCategoryState = useSelector((state)=> state.pCategory.pCategories)
  const data1 = [];
  for (let i = 0; i < pCategoryState.length; i++) {
    data1.push({
      key: i + 1,
      name: pCategoryState[i].title,
      action: (<>
      <Link className='fs-3 text-danger' to="/"><BiEdit/></Link>
      <Link className='ms-3 fs-3 text-danger' to="/"><AiFillDelete/></Link>
    </>
      ),
    });
  }
  console.log(data1)
  return (
    <div>
      <h3 className="mb-4 title">Product Categories</h3>
      <div>
      <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  )
}

export default Categorylist
