import React from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta'
import CustomInput from '../components/CustomInput'
import Container from '../components/Container'

const ResetPassword = () => {
  return (
    <>
    <Meta title="Reset Password" />
    <BreadCrumb title="Reset Password" />
    <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
            <div className="col-12">
                <div className="auth-card">
                    <h3 className='text-center mb-3'>Reset Password</h3>
                    <form action="" className='d-flex flex-column gap-15'>
                        <CustomInput type="password" name="password" placeholder='Password'/>
                        <CustomInput type="password" name="confpassword" placeholder='Confirm-Password'/>
                        <div>                      
                            <div className="d-flex mt-3 justify-content-center gap-15 align-items-center">
                                <button className="button border-0">Ok</button>
                                
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

export default ResetPassword
