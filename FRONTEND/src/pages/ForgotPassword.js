import React from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta'
import { Link } from 'react-router-dom'
import CustomInput from '../components/CustomInput'
import Container from '../components/Container'

const ForgotPassword = () => {
  return (
    <>
    <Meta title="Forgot Password" />
    <BreadCrumb title="Forgot Password" />
    <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
            <div className="col-12">
                <div className="auth-card">
                    <h3 className='text-center mb-3'>Reset Your Password</h3>
                    <p className="text-center mt-2 mb-3">
                      We will send you an email to rest your password
                    </p>
                    <form action="" className='d-flex flex-column gap-15'>
                        <CustomInput type="email" name='email' placeholder="email"/>
                        <div>
                          
                            <div className="d-flex mt-3 justify-content-center gap-15 align-items-center flex-column">
                                <button className="button border-0" type='submit'>Submit</button>
                               
                                <Link to="/login">Cancel</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </Container>
    </>
  )
}

export default ForgotPassword
