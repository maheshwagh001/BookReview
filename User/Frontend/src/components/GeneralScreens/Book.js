import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import CardBook from "../BookScreens/CardBook";
import NoBooks from "../BookScreens/NoBooks";
import SearchForm from "./SearchForm";
import Loader from "./Loader";
import "../../Css/Book.css"

import { useNavigate } from "react-router-dom"
const Home = () => {
  const search = useLocation().search
  const searchKey = new URLSearchParams(search).get('search')
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()


  useEffect(() => {
    const getBooks = async () => {

      setLoading(true)
      try {
        const { data } = await axios.get(`/book/getAllBooks?search=${searchKey || ""}`)

        setBooks(data.data)

        setLoading(false)
      }
      catch (error) {
        setLoading(true)
      }
    }
    getBooks()
  }, [setLoading, search, navigate])



  return (
    <div className="Inclusive-home-page">
      {loading ?
        <Loader/>
        :
        <div>
          <div className="search">
          <SearchForm />
          </div>
          
          <div className="book-card-wrapper">
            {books.length !== 0 ?
              books.map((book) => {
                return (
                  <CardBook key={uuidv4()} book={book} />
                )
              }) 
              : 
               <NoBooks/>
            }
          </div>

        </div>

       } 
      <br />
    </div>

  )

};

export default Home;