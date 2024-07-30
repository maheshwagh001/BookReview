import React, { useState, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import SearchForm from './SearchForm';
import '../../Css/Header.css'
import { BiLogOut } from 'react-icons/bi'
import { BsBookmarkPlus, BsBookmarkFill } from 'react-icons/bs'
import { AuthContext } from '../../Context/AuthContext';
import axios from "axios";


const Header = () => {
    const { activeUser ,setActiveUser, auth, setAuth} = useContext(AuthContext)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()


    const handleLogout = (async () => {
        await axios.post("/user/logout")
        setActiveUser({});
        setAuth(false);
        navigate('/')
    });

    return (

        <header>
            <div className="averager">

                <Link to="/" className="logo">
                    <h5>
                        BookReview

                    </h5>
                </Link>
                
                <div className='header_options'>

                    {auth ?
                        <div className="auth_options">


                            <Link className='addbook-link' to="/readList"><BsBookmarkPlus /> Saved </Link>


                            
                            <button className='logout-btn' onClick={handleLogout}> <BiLogOut />  Logout</button>


                        </div>

                        :
                        <div className="noAuth_options">

                            <Link className='login-link' to="/login"> Login </Link>

                            <Link className='register-link' to="/register"> Get Started</Link>
                        </div>

                    }
                </div>

            </div>

        </header>

    )
}

export default Header;
