import { useState } from "react";
import React from "react";
import { QtySelect }from './../App';
import './shop.css';
import { FaHeart, FaEye } from "react-icons/fa";
import { Button } from 'react-bootstrap';
import { FaSkullCrossbones } from "react-icons/fa6";


const Shop = ({ shop, Filter, allcatefilter, addToCart }) => {
 
  const [quantities, setQuantities] = useState({});

  const [showDetail, setShowDetail]= useState(false)
  //detail page data
  const [detail, setDetail] = useState([])

 // This function updates the qty for a given product._id
  const handleSetQty = (productId, newQty) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: newQty,
    }));
  };


  const handleAddToCart = (product) => {
    const qty = quantities[product._id] || 1;
    addToCart(product, qty); 
  };

  const detailpage =(product) =>
    {
        const detaildata = ([{product}])
        const productdetail = detaildata[0]['product']
        //console.log(productdetail)
        setDetail(productdetail)  
        setShowDetail(true)
    }
   // console.log(detail)
    const closedetail  = () =>
    {
        setShowDetail(false)
    }

  return (
<>
    {
      showDetail ? 
      <> 
          <div className="product_detail">
              <button className="close_btn" onClick={closedetail}><FaSkullCrossbones /></button>
              <div className="container">
                  <div className="img_box">
                      <img src={detail.imageCover} alt=''></img>
                  </div>
                  <div className="info">
                      <h4># {detail.cat}</h4>
                      <h2>{detail.name}</h2>
                      <p>{detail.description}</p>
                      <h3> {detail.price} €</h3>
                      <button onClick={() => handleAddToCart(detail)}>Add to Cart </button>
                  </div>
              </div>

          </div>
      
      </>
      :null
  }
    <div className="shop">
      <h2># shop</h2>
      <p>Home . shop</p>
      <div className="container">
        <div className="left_box">
          <div className="category">
            <div className="header">
              <h2>all categories</h2>
            </div>
            <div className="box">
              <ul>
                <li onClick={() => allcatefilter()}> - All </li>
                <li onClick={() => Filter('headphone')}> - Headphone </li>
                <li onClick={() => Filter('laptop')}> - Laptop </li>
                <li onClick={() => Filter('watch')}> - Watch </li>
                <li onClick={() => Filter('speaker')}> - Speaker </li>
              </ul>
            </div>
          </div>
          <div className="banner">
            <div className="img_box">
              <img src="EIKONES/shop_left.jpeg" alt="banner" />
            </div>
          </div>
        </div>

        <div className="right_box">
          <div className="banner">
            <div className="img_box">
              <img src="EIKONES/right-banner.jpeg" alt="banner" />
            </div>
          </div>
          <div className="product_box">
            <h2>Shop Product</h2>
            <div className="product_container">
              {shop.map((product) => {
                const currentQty = quantities[product._id] || 1;

                return (
                  <div className="box" key={product._id}>
                    <div className="img_box">
                      <img
                        src={`${product.imageCover}`}
                        alt={product.imageCover}
                      />
                      <div className="icon">
                        <li><FaHeart /></li>
                        <li onClick={() => detailpage(product)}><FaEye /></li >
                      </div>
                    </div>
                    <div className="detail">
                      <h2>{product.name}</h2>
                      {product.countInStock > 0 && (
                        <QtySelect
                          product={product}
                          qty={currentQty}
                          setQty={(value) => handleSetQty(product._id, value)}/>
                      )}
                      <p>€{product.price}</p>
                      <Button onClick={() => handleAddToCart(product)}>
                        Add to cart
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Shop;

