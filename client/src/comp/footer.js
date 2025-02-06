import React from "react"
import './footer.css'
import { FaPiggyBank,FaShippingFast,FaHeadphones,FaWallet } from "react-icons/fa";


const Footer = () => {
    return (
        <>
        <div className="footer">
            <div className="container">
                <div className="left-box">
                    <div className="box">
                        <div className="icon_box">
                        <FaPiggyBank />
                        </div>
                        <div className="detail">
                            <h3>Great saving</h3>
                            <p>you are the best </p>
                        </div>
                    </div>
                    <div className="box">
                        <div className="icon_box">
                        <FaShippingFast />
                        </div>
                        <div className="detail">
                            <h3>24/7 support</h3>
                            <p>you are the best </p>
                        </div>
                    </div>
                    <div className="box">
                        <div className="icon_box">
                        <FaWallet /> 
                        </div>
                        <div className="detail">
                            <h3>Money back</h3>
                            <p>you are the best </p>
                        </div>
                    </div>
                </div>
            <div className="right_box">
                <div className="header">
                    <img src="/img/products/EIKONES/newlogo.jpeg " alt="logo"></img>
                    <p> Ανυπομονούμε να σας εξυπηρετήσουμε ξανά σύντομα. Μη διστάσετε να επικοινωνήσετε μαζί μας για οποιαδήποτε απορία ή ανάγκη.</p>
                </div>
                <div className="bottom">
                    <div className="box">
                        <h3>Yout Account</h3>
                        <ul>
                            <li>About us</li>
                            <li>Account</li>
                            <li>Payment</li>
                            <li>sales</li>
                        </ul>
                    </div>
                    <div className="box">
                        <h3>Yout Account</h3>
                        <ul>
                            <li>Delivery</li>
                            <li>Track order</li>
                            <li>New product</li>
                            <li>Old product</li>
                        </ul>
                    </div>
                    <div className="box">
                        <h3>contact us</h3>
                        <ul>
                            <li>Μονοδρυο ευβοιας</li>
                            <li>+(030) 6999999999</li>
                            <li>info@gata.gr</li>
                       
                        </ul>
                    </div>
                </div>
            </div>
            </div>
        </div>
        </>
    )
}

export default Footer;