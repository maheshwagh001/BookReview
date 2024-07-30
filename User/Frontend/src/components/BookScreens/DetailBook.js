import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import "../../Css/DetailBook.css"
import Loader from '../GeneralScreens/Loader';
import { BsBookmarkPlus, BsBookmarkFill } from 'react-icons/bs'
import Commentbar from '../CommentScreens/Commentbar';

const DetailBook = () => {
  const [activeUser, setActiveUser] = useState({})
  const [book, setBook] = useState({})
  const [sidebarShowStatus, setSidebarShowStatus] = useState(true)
  const [loading, setLoading] = useState(true)
  const slug = useParams().slug
  const [bookReadListStatus, setBookReadListStatus] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {

    const getDetailBook = async () => {
      setLoading(true)
      try {
        const { data } = await axios.get("/user/private");

        setActiveUser(data)

      }
      catch (error) {
        setActiveUser({})
      }

      try {
        const { data } = await axios.post(`/book/${slug}`, { activeUser })
        setBook(data.data)

        const book_id = data.data._id;

        if (activeUser.readList) {

          if (!activeUser.readList.includes(book_id)) {
            setBookReadListStatus(false)
          }
          else {
            setBookReadListStatus(true)

          }

        }
        setLoading(false)

      }
      catch (error) {
        setBook({})
        navigate("/not-found")
      }

    }
    getDetailBook();

  }, [slug, setLoading ])

  const addBookToReadList = async () => {

    try {
      if(activeUser._id == null){
        navigate("/login");
      }

      const { data } = await axios.post(`/user/${slug}/addBookToReadList`, { activeUser })

      setBookReadListStatus(data.status)

    }
    catch (error) {
      console.log(error)
    }
  }

  

  

  return (
    <>
      {
        loading ? <Loader /> :
          <>

            <div className='Inclusive-detailbook-page'>

              <div className="top_detail_wrapper">

                <h5>{book.title}</h5>
                
                 

                <i onClick={addBookToReadList}>

                        {bookReadListStatus ? <BsBookmarkFill color='#0205b1' /> :
                          <BsBookmarkPlus />
                        }
                      </i>


              </div>
              <div className='book-general-info'>
                {(book.rating === 0) ? 
                 <h4>Rating -  {" " + "No Rating Yet"}</h4>
                 :
                 <h4>Rating -  {" " +book.rating.toFixed(2)}</h4>
                }
              
              </div>
              <div className='book-general-info'>

                  <ul>
                    <li className='book-createdAt'>
                      Category - {" "} 
                      {
                         book.category
                      }
                    </li>
                    <li className='book-createdAt'>
                      Author - {" "}
                      {
                        book.author
                      }
                    </li>

                    <li className='book-readtime'>
                      Pages - {" "}
                      {book.pages}

                    </li>

                  </ul>
                </div>

              <div className='book-content' >

                <div className="book-banner-img">

                  <img src={`${book.image}`} alt={book.title} />

                </div>

                <div className='content' dangerouslySetInnerHTML={{ __html: (book.intro) }}>
                </div>

              </div>
              <br/><br/><br/><br/> <hr/>
              <div className="CommentFieldEmp">

                <Commentbar slug={slug} sidebarShowStatus={sidebarShowStatus} setSidebarShowStatus={setSidebarShowStatus}
                  activeUser={activeUser}
                />

              </div>
 
              

            </div>
          </>
      }
    </>
  )
}

export default DetailBook;
