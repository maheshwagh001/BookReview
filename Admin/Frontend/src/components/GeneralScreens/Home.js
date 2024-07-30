// src/components/LandingPage.js

import React, {useEffect,useState} from 'react';
import { Link, useNavigate } from "react-router-dom";
import '../../Css/Home.css';
import AddCategory from '../StoryScreens/AddCategory';
import AddBook from '../StoryScreens/AddBook';

const Home = () => {



  return (
    <div className="container">

<button to={"/addCategory"}> AddCategory </button>
<button to={AddBook}> AddBook </button>
      
      
      
    </div>
  );
};

export default Home;
