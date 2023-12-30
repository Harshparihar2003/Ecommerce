import React, { useEffect } from 'react'
import {Table} from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../features/customers/customerSlice';

const columns = [
    {
      title: 'S.No',
      dataIndex: 'key',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      sorter : (a,b) => a.name.length - b.name.length
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Mobile',
      dataIndex: 'mobile',
    },
  ];


const Customers = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getUsers())
  },[])
  const customerState = useSelector((state)=>state.customer.customers)
  const data1 = [];
  for (let i = 0; i < customerState.length; i++) {
   if(customerState[i].roll!== "admin"){
    data1.push({
      key: i + 1,
      name: customerState[i].firstName + " " + customerState[i].lastName,
      email: customerState[i].email,
      status: customerState[i].mobile,
    });
   }
  }
  return (
    <div>
      <h3 className="mb-4 title">Customers</h3>
      <div>
      <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  )
}

export default Customers
