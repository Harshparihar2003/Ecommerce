import React from 'react';
import ReactStars from "react-rating-stars-component";
import { NavLink, Link, useLocation } from "react-router-dom";
import prodcompare from "../images/prodcompare.svg"
import wish from "../images/wish.svg"
import wishlist from "../images/wishlist.svg"
import watch from "../images/watch.jpg"
// import watch2 from "../images/watch2.svg"
import addcart from "../images/add-cart.svg"
import view from "../images/view.svg"

const ProductCard = (props) => {
    let location = useLocation();
    const {grid} = props;
  return (
    <>
        <div className={`${location.pathname=="/store" ? `gr-${grid}`: "col-3"}`}>
            <Link to=":id" className="product-card position-relative">
                <div className="wishlist-icon position-absolute">
                    <Link><img src={wish} alt="wishlist" /></Link>
                </div>
                <div className="product-image">
                    <img src={watch} className='img-fluid' alt="product image" />
                    <img src={watch} className='img-fluid' alt="product image" />
                </div>
                <div className="product-details">
                    <h6 className="brand">Havels</h6>
                    <h5 className="product-title">
                        Kids headphones bulk 10 pack multi colored for students.
                    </h5>
                    <ReactStars count={5} size={24} value={3} activeColor="#ffd700" edit={false}/>
                    <p className={`description ${grid === 12 ? "d-block" : "d-none"}`}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos deserunt laboriosam consequuntur? Nobis iste placeat veniam quia illo quidem maxime!</p>
                    <p className="price">$100.00</p>
                </div>
                <div className="action-bar position-absolute">
                    <div className="d-flex flex-column gap-15">
                        <Link><img src={prodcompare} alt="Product compare" /></Link>
                        <Link><img src={view} alt="view" /></Link>
                        <Link><img src={addcart} alt="add-cart" /></Link>
                    </div>
                </div>
            </Link>
        </div>
        <div className={`${location.pathname=="/store" ? `gr-${grid}`: "col-3"}`}>
            <div className="product-card position-relative">
                <div className="wishlist-icon position-absolute">
                    <Link><img src={wish} alt="wishlist" /></Link>
                </div>
                <div className="product-image">
                    <img src={watch} className='img-fluid' alt="product image" />
                    <img src={watch} className='img-fluid' alt="product image" />
                </div>
                <div className="product-details">
                    <h6 className="brand">Havels</h6>
                    <h5 className="product-title">
                        Kids headphones bulk 10 pack multi colored for students.
                    </h5>
                    <ReactStars count={5} size={24} value={3}activeColor="#ffd700" edit={false}/>
                    <p className={`description ${grid === 12 ? "d-block" : "d-none"}`}>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates consequuntur quisquam quae mollitia? Soluta accusantium corrupti eius rem nihil. Nisi.</p>
                    <p className="price">$100.00</p>
                </div>
                <div className="action-bar position-absolute">
                    <div className="d-flex flex-column gap-15">
                        <Link><img src={prodcompare} alt="Product compare" /></Link>
                        <Link><img src={view} alt="view" /></Link>
                        <Link><img src={addcart} alt="add-cart" /></Link>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default ProductCard
