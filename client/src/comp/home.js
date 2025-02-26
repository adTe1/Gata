import React, { useEffect, useState } from "react";
import './home.css';
import { Link } from "react-router-dom";
import { FaEye, FaHeart, FaFacebookF, FaTwitter, FaInstagram, FaCartArrowDown } from "react-icons/fa";
import axios from 'axios'; 
import { QtySelect }from './../App';
import { FaSkullCrossbones } from "react-icons/fa6";
import { Row } from "react-bootstrap";

const Home = ({ addToCartHandler }) => {
    const [newProduct, setNewProduct] = useState([]);
    const [featuredProduct, setFeaturedProduct] = useState([]);
    const [topProduct, setTopProduct] = useState([]);
    const [allTrendingProducts, setAllTrendingProducts] = useState([]);
    const [trendingProduct, setTrendingProduct] = useState([]);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 
    const [quantities, setQuantities] = useState({});
    

      const [showDetail, setShowDetail]= useState(false)
      //detail page data
      const [detail, setDetail] = useState([])
    
const handleSetQty = (productId, newQty) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: newQty,
    }));
  };
  
  const handleAddToCart = (product) => {
    const qty = quantities[product._id] || 1;
     addToCartHandler(product, qty);
  };
  

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/api/v1/products'); 
                const products = response.data.data.data; 
                

                const newCategory = products.filter(product => product.type === 'new');
                const featuredCategory = products.filter(product => product.type === 'featured');
                const topCategory = products.filter(product => product.type === 'top');

                setAllTrendingProducts(products);
                setTrendingProduct(products); 
                setNewProduct(newCategory);
                setFeaturedProduct(featuredCategory);
                setTopProduct(topCategory);
                setLoading(false);
                
            } catch (err) {
                console.error(err);
                setError('Σφάλμα κατά τη φόρτωση των προϊόντων.');
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);


    const filtercate = (type) => {
        if (type === 'all') {
            setTrendingProduct(allTrendingProducts);
        } else {
            const filtered = allTrendingProducts.filter(product => product.type === type);
            setTrendingProduct(filtered);
        }
    };


    const allTrendingProduct = () => {
        setTrendingProduct(allTrendingProducts);
    };
    if (loading) {
        return <div>Φόρτωση προϊόντων...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }


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
            <div className="home">
                <div className="top_banner">
                    <div className="contant">
                        <h3>HP ProBook 640 G5</h3>
                        <h2>Οθoνη: 14" 1920x1080 Full HD </h2>
                        <h3>Εγγύηση: 12 Μήνες</h3>
                        <Link to='/shop' className="link">Shop Now</Link>
                    </div>
                </div>

                <div className="trending">
                    <div className="container">
                        <div className="left_box">
                            <div className="header">
                                <div className="heading">
                                    <h2 onClick={allTrendingProduct}>Trending Products</h2>
                                </div>
                                <div className="cate">
                                    <h3 onClick={() => filtercate('new')}> New</h3>
                                    <h3 onClick={() => filtercate('featured')}> Featured</h3>
                                    <h3 onClick={() => filtercate('top')}> Top Selling</h3>
                                </div>
                            </div>
                            <div className="products">
                                <div className="container">
                                {trendingProduct.map((product) => {
                                    const currentQty = quantities[product._id] || 1;

                                    return (
                                        <div className="box" key={product._id}>
                                        <div className="img_box">
                                            
                                        <img
                                            src={`/${(product.imageCover || '').replace(/^\/+/, '')}`}

                                            alt={product.name}
                                        />



                                            <div className="icon">
                                            <div className="icon_box">

                                                <Row onClick={() => detailpage(product)}><FaEye /></Row>
                                            </div>
                                            <div className="icon_box">
                                                <FaHeart />
                                            </div>
                                            </div>
                                        </div>
                                        <div className="info">
                                            <h3>{product.name}</h3>

                                            {product.countInStock > 0 && (
                                            <QtySelect
                                                product={product}
                                                qty={currentQty}
                                                setQty={(value) => handleSetQty(product._id, value)}
                                            />
                                            )}

                                            <p>€{product.price}</p>
                                            <button
                                            className="btn"
                                            onClick={() => handleAddToCart(product)}
                                            >
                                            Add to cart
                                            </button>
                                        </div>
                                        </div>
                                    );
                                    })}
                                </div>
                                <button>Show more</button>
                            </div>
                        </div>
                        <div className="right_box">
                            <div className="right_container">
                                <div className="newsletter">
                                    <div className="head">
                                        <h3>Newsletter</h3>
                                    </div>
                                    <div className="form">
                                        <p>Join our mailing list</p>
                                        <input type="email" placeholder="E-mail" autoComplete="off" />
                                        <button>Subscribe</button>
                                        <div className="icon_box">
                                            <div className="icon">
                                                <FaFacebookF />
                                            </div>
                                            <div className="icon">
                                                <FaInstagram />
                                            </div>
                                            <div className="icon">
                                                <FaTwitter />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="banners">
                    <div className="container">
                        <div className="left_box">
                            <div className="box">
                                <img src="EIKONES/multi-banner-1.jpeg" alt="banner" />
                            </div>
                            <div className="box">
                                <img src="EIKONES/multi-banner-2.jpeg" alt="banner" />
                            </div>
                        </div>
                        <div className="right_box">
                            <div className="top">
                                <img src="EIKONES/multi-banner-3.jpeg" alt="banner" />
                                <img src="EIKONES/multi-banner-4.jpeg" alt="banner" />
                            </div>
                            <div className="bottom">
                                <img src="EIKONES/multi-banner-5.jpeg" alt="banner" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="product_type">
                    <div className="container">
                        <div className="box">
                            <div className="header">
                                <h2>Featured Products</h2>
                            </div>
                            {featuredProduct.map((product) => (
                                <div className="productbox" key={product._id}>
                                    <div className="img-box">
                                    <img
                                            src={`/${(product.imageCover || '').replace(/^\/+/, '')}`}
                                            alt={product.name}
                                        />

                                    </div>
                                    <div className="detail">
                                        <h3>{product.name}</h3>
                                        <p>€{product.price}</p>
                                        <div className="icon">
                                            <button><FaEye /></button>
                                            <button><FaHeart /></button>
                                            <button
                                            className="btn"
                                            onClick={() => handleAddToCart(product)}
                                            ><FaCartArrowDown />
                                           
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="box">
                            <div className="header">
                                <h2>Top Products</h2>
                            </div>
                            {topProduct.map((product) => (
                                <div className="productbox" key={product._id}>
                                    <div className="img-box">
                                    <img
                                            src={`/${(product.imageCover || '').replace(/^\/+/, '')}`}
                                            alt={product.name}
                                        />
                                    </div>
                                    <div className="detail">
                                        <h3>{product.name}</h3>
                                        <p>€{product.price}</p>
                                        <div className="icon">
                                            <button><FaEye /></button>
                                            <button><FaHeart /></button>
                                            <button
                                            className="btn"
                                            onClick={() => handleAddToCart(product)}
                                            ><FaCartArrowDown />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="box">
                            <div className="header">
                                <h2>New Products</h2>
                            </div>
                            {newProduct.map((product) => (
                                <div className="productbox" key={product._id}>
                                    <div className="img-box">
                                    <img
                                            src={`/${(product.imageCover || '').replace(/^\/+/, '')}`}
                                            alt={product.name}
                                        />
                                    </div>
                                    <div className="detail">
                                        <h3>{product.name}</h3>
                                        <p>€{product.price}</p>
                                        <div className="icon">
                                            <button><FaEye /></button>
                                            <button><FaHeart /></button>
                                            <button
                                            className="btn"
                                            onClick={() => handleAddToCart(product)}
                                            ><FaCartArrowDown />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
