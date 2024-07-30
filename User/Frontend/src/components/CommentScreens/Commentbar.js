import React, { useState, useEffect, useRef } from 'react';
import BookComments from './BookComments';
import axios from 'axios';
import AddComment from './AddComment';

const Commentbar = ({ slug, activeUser }) => {

  const [count, setCount] = useState(0)
  const [commentlist, setCommentList] = useState([])

  useEffect(() => {
    getBookComments()
  }, [setCommentList])


  const getBookComments = async () => {
    try {
      const { data } = await axios.get(`/comment/${slug}/getAllComment`)
      setCommentList(data.data)
      setCount(data.count)
    }
    catch (error) {
      console.log(error.response.data.error);
    }
  }




  return (


      <div className='sidebar-wrapper'>

        <AddComment slug={slug} getBookComments={getBookComments} activeUser={activeUser} count={count} />

        <BookComments commentlist={commentlist} activeUser={activeUser} getBookComments={getBookComments} count={count} />
      </div>


  )
}

export default Commentbar;
