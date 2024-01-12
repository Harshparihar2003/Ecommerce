import React, { useEffect, useState } from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta'
import ReactStars from "react-rating-stars-component";
import ProductCard from '../components/ProductCard'
import ReactImageZoom from "react-image-zoom"
import Color from '../components/Color';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {TbGitCompare} from "react-icons/tb"
import {AiOutlineHeart} from "react-icons/ai"
import watch from "../images/watch.jpg"
import Container from '../components/Container';
import { useDispatch, useSelector } from 'react-redux';
import { getAProduct } from '../features/products/productSlice';
import { toast } from 'react-toastify';
import { addProductToCart, getUserCart } from '../features/user/userSlice';

const SingleProduct = () => {
  const [color, setColor] = useState(null)
  const [quantiy, setQuantiy] = useState(1);
  const [alreadyAdded, setAlreadyAdded] = useState(false)
  const navigate = useNavigate();
  const location = useLocation();
  const getProductId = location.pathname.split("/")[2]
  const dispatch = useDispatch();
  const productState = useSelector((state)=> state.product.singleProduct)
  const cartState = useSelector((state) => state.auth.cartProducts)

  useEffect(()=>{
    dispatch(getAProduct(getProductId))
    dispatch(getUserCart())
  },[])

  useEffect(()=>{
    for (let index = 0; index < cartState.length; index++) {
      if(getProductId === cartState[index]?.productId?._id){
        setAlreadyAdded(true)
      }
    }
  })

  const uploadCart = () =>{
    if(color === null){
      toast.error("Please choose color")
      return false;
    }else{
      dispatch(addProductToCart({productId : productState?._id, quantiy,color,price : productState?.price}))
      navigate("/cart")
    }
  }
    const props = {
      width : 400,
      height : 600,
      zoomWidth : 600,
      img : productState?.images[0]?.url ? productState?.images[0]?.url : "https://www.zastavki.com/pictures/originals/2014/Brands____Beautiful_watches_065807_.jpg",
    };
    const [orderedProduct, setorderedProduct] = useState(false);
    const copyToClipboard = (text) => {
      console.log('text', text)
      var textField = document.createElement('textarea')
      textField.innerText = text
      document.body.appendChild(textField)
      textField.select()
      document.execCommand('copy')
      textField.remove()
    }
  return (
    <>
    <Meta title={"Product Name"} />
    <BreadCrumb title={"Product Name"} />
    <Container class1="main-product-wrapper py-5 home-wrapper-2">
            <div className="row">
                <div className="col-6">
                  <div className="main-product-image">
                    <div>
                    <ReactImageZoom {...props}/>
                    </div>
                  </div>
                  <div className="other-product-images d-flex flex-wrap gap-15">
                    {
                      productState?.images.map((item,index)=>{
                        return(
                          <div><img
                           src={item?.url}
                          //  src="https://www.zastavki.com/pictures/originals/2014/Brands____Beautiful_watches_065807_.jpg"
                           alt="" className='img-fluid' /></div>
                        )
                      })
                    }
                  </div>
                </div>
                <div className="col-6">
                  <div className="main-products-details">
                    <div className='border-bottom'>
                      <h3 className='title'>
                        {productState?.title}
                      </h3>
                    </div>
                    <div className="border-bottom py-3">
                      <p className="price">$ {productState?.price}</p>
                      <div className="d-flex align-items-center gap-10">
                      <ReactStars count={5} size={24} value={productState?.totalrating}activeColor="#ffd700" edit={false}/>
                            <p className='mb-0 t-review'>(2 Reviews)</p>
                      </div>
                      <a className='review-btn' href="#review">Write a Review</a>
                    </div>
                      <div className=" py-3">
                          <div className='d-flex gap-10 align-items-center my-2'>
                            <h3 className='product-heading'>Type: </h3><p className='product-data'>Watch</p>
                          </div>
                          <div className='d-flex gap-10 align-items-center my-2'>
                            <h3 className='product-heading'>Brand: </h3><p className='product-data'>{productState?.brand}</p>
                          </div>
                          <div className='d-flex gap-10 align-items-center my-2'>
                            <h3 className='product-heading'>Category: </h3><p className='product-data'>{productState?.category}</p>
                          </div>
                          <div className='d-flex gap-10 align-items-center my-2'>
                            <h3 className='product-heading'>Tags: </h3><p className='product-data'>{productState?.tags}</p>
                          </div>
                          <div className='d-flex gap-10 align-items-center my-2'>
                            <h3 className='product-heading'>Availability: </h3><p className='product-data'>In Stock</p>
                          </div>
                          <div className='d-flex gap-10 flex-column mt-2 mb-3'>
                            <h3 className='product-heading'>Size: </h3>
                            <div className="d-flex flex-wrap gap-15">
                              <span className="badge border border-1 bg-white text-dark border-secondary">S</span>
                              <span className="badge border border-1 bg-white text-dark border-secondary">M</span>
                              <span className="badge border border-1 bg-white text-dark border-secondary">L</span>
                              <span className="badge border border-1 bg-white text-dark border-secondary">XL</span>
                            </div>
                          </div>
                          {
                            alreadyAdded === false && <>
                               <div className='d-flex gap-10 flex-column  mt-2 mb-3'>
                            <h3 className='product-heading'>Color: </h3>
                            <Color setColor={setColor} colorData ={productState?.color}/>
                          </div>
                            </>
                          }
                          <div className='d-flex gap-15 align-items-center flex-row  mt-2 mb-3'>
                           {
                            alreadyAdded === false && <>
                               <h3 className='product-heading'>Quantity: </h3>
                            <div>
                              <input type="number" name="" className='form-control' style={{"width" : "70px"}} min={1} max={10} id=""
                              onChange={(e)=> setQuantiy(e.target.value)}
                              value={quantiy}
                              />
                            </div>
                            </>
                           }
                            <div className={alreadyAdded ? "ms-0" : "ms-5" + "d-flex align-items-center gap-30"}>
                            <button className="button border-0"
                            onClick={()=>{alreadyAdded ? navigate("/cart") : uploadCart()}}
                            type='button'
                            >
                              {alreadyAdded ? "Go to Cart" : "Add to Cart"}
                              </button>
                                <button className='button signup'>Buy it Now</button>
                            </div>
                          </div>
                          <div className='d-flex align-items-center gap-15'>
                            <div>
                              <a href="">
                               <TbGitCompare className='fs-5'/> Add to Compare</a>
                            </div>
                            <div>
                              <a href="">
                               <AiOutlineHeart className='fs-5'/> Add to Wishlist
                            </a>
                            </div>
                          </div>
                          <div className='d-flex gap-10 flex-column my-3'>
                            <h3 className='product-heading'>Shipping & Returns: </h3><p className='product-data'>Free shipping and returns available on all orders! We ship all Us domestic orders within <b>5-10 business days!</b></p>
                          </div>
                          <div className='d-flex gap-10 align-items-center my-3'>
                            <h3 className='product-heading'>Product Link: </h3>
                            <a href="javascript:void(0);" onClick={()=>{
                              copyToClipboard(window.location.href)
                            }}>
                              Copy Product Link
                            </a>
                          </div>
                      </div>
                  </div>
                </div>
            </div>
    </Container>
    <Container class1="description-wrapper py-5 home-wrapper-2">
            <div className="row">
                <div className="col-12">
                <h4>Description</h4>
                  <div className="bg-white p-3">
                    <p dangerouslySetInnerHTML={{__html : productState?.description}}>
                    </p>
                  </div>
                </div>
            </div>
    </Container>
    <Container class1="reviews-wrapper py-5 home-wrapper-2">
            <div className="row">
                <div className="col-12">
                  <h3  id='review'>Reviews</h3>
                    <div className="review-inner-wrapper">
                    <div className="review-head d-flex justify-content-between align-items-end">
                        <div>
                            <h4 className='mb-2'>
                                Customer Reviews
                            </h4>
                            <div className='d-flex align-items-center gap-10'>
                            <ReactStars count={5} size={24} value={3}activeColor="#ffd700" edit={false}/>
                            <p className='mb-0'>Based on 2 Reviews</p>
                            </div>
                        </div>
                       {
                        orderedProduct &&  (<div>
                        <a className='text-dark text-decoration-underline' href="">Write a review</a>
                    </div>
                       )}
                    </div>
                    <div className="review-form py-4">
                      <h4>Write a Review</h4>
                    <form action="" className='d-flex flex-column gap-15'>
                      <div>
                      <ReactStars count={5} size={24} value={3}activeColor="#ffd700" edit={true}/>
                      </div>
                      <div>
                        <textarea name="" placeholder='Comments' className='w-100 form-control' id="" cols="30" rows="4"></textarea>
                      </div>
                      <div className='d-flex justify-content-end'>
                        <button className="button border-0">Submit Review</button>
                      </div>
                    </form>
                    </div>
                    <div className="reviews mt-4">
                      <div className="review">
                          <div className='d-flex gap-10 align-items-center'>
                            <h6 className='mb-0'>Pushkar</h6>
                            <ReactStars count={5} size={24} value={3}activeColor="#ffd700" edit={false}/>
                          </div>
                      <p className='mt-3'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem pariatur doloribus rem iure perferendis excepturi, ex laboriosam nesciunt illo soluta, maiores libero? Deserunt blanditiis deleniti animi non quis fugit voluptatibus!
                      </p>
                      </div>
                    </div>
                    </div>
                </div>
            </div>
    </Container>
    <Container class1="popular-wrapper py-5 home-wrapper-2">
            <div className="row">
              <div className="col-12">
                <h3 className="section-heading">
                  Our Popular Products
                </h3>
              </div>
            </div>
              <div className="row">
              <ProductCard/>
              </div>
      </Container>
    </>
  )
}

export default SingleProduct
