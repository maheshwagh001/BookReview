import React, { useState, useEffect } from 'react';
import { FaRegHeart, FaHeart } from 'react-icons/fa'
import { RiDeleteBin6Line } from 'react-icons/ri'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CommentItem = ({ comment, activeUser,getBookComments, count }) => {
    const navigate = useNavigate()

    
    const editDate = (createdAt) => {
        const d = new Date(createdAt);
        var datestring = d.toLocaleString('eng', { month: 'long' }).substring(0, 3) + " " + d.getDate()
        return datestring
    }
    
    const handleDelete = async () => {

        if (window.confirm("Do you want to delete this comment")) {
            
            const comment_id = comment._id
            // console.log(activeUser)
          try {
    
            await axios.delete(`/comment/${comment_id}/delete`)
            getBookComments();
    
          }
          catch (error) {
            navigate("/blog");
            console.log(error)
          }
    
        }
    
      }

    return (

        <div className='comment-item'>
            <div className="comment-top-block">

                <section>
                    <div>
                    <span className='comment-createdAt' >{editDate(comment.createdAt)}</span>
                        <span className='comment-author-username' >{comment.author.username}</span>
                        
                        
                    </div>
                </section>

                <section>
                {activeUser && comment.author &&
                    (comment.author._id === activeUser._id)?
                        <span onClick={handleDelete}>
                            <RiDeleteBin6Line />
                        </span>
                      :
                      null
                      }
                </section>
            </div>


            <div className="comment-content">

                 {  comment.content }

            </div>
            Rating - {" "}
            {comment.star}


        </div>

    )
}

export default CommentItem;
