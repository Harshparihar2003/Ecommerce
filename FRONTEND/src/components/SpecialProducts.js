import React from 'react';
import { NavLink, Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const SpecialProducts = (props) => {
    const {title,brand,totalrating,price,sold,quantity} = props;
    return (
        <>
            <div className="col-6 mb-3">
                <div className="special-product-card">
                    <div className="d-flex justify-content-between">
                        <div><img src="images/watch.jpg" className='img-fluid' alt="watch" /></div>
                        <div className='special-product-content'>
                            <h5 className='brand'>
                                {brand}
                            </h5>
                            <h6 className="title">{title}</h6>
                            <ReactStars count={5} size={24} value={totalrating} activeColor="#ffd700" edit={false} />
                            <p className="price"><span className="red-p">$ {price}</span> &nbsp; <strike>$200</strike></p>
                            <div className="discount-till d-flex align-items-ceter gap-10">
                                <p className='mb-0'><b>5 </b>Days</p>
                                <div className="d-flex gap-10 align-items-center">
                                    <span className='badge rounded-circle p-3 bg-danger'>1</span>:
                                    <span className='badge rounded-circle p-3 bg-danger'>1</span>:
                                    <span className='badge rounded-circle p-3 bg-danger'>1</span>
                                </div>
                               
                            </div>
                            <div className="prod-content my-3">
                                    <p>Products: {quantity}</p>
                                    <div className="progress">
                                        <div className="progress-bar" role="progressbar" style={{width: (quantity/quantity+sold )* 100 + "%"}} aria-valuenow= {(quantity/quantity+sold )* 100} aria-valuemin={quantity} aria-valuemax={sold + quantity}></div>
                                    </div>
                                </div>
                                <Link className='button'>Add to Cart</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SpecialProducts
