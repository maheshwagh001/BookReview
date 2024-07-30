import React from 'react';
import CommentItem from './CommentItem';
import '../../Css/BookComments.css'

const BookComments = ({ commentlist, count, activeUser, getBookComments}) => {

    return (
        <>
            {count !== 0 ?
                <div className='bookComments'>
                    <h5>MOST RELEVANT</h5>
                    <div className="comment-Wrapper">
                        {
                            commentlist.map((comment) => {
                                return (
                                    <CommentItem key={comment._id} comment={comment} activeUser={activeUser} getBookComments={getBookComments} count={count}  />
                                )
                            })
                        }
                    </div>

                </div> :
                <div className='no-response'>There are currently no responses for this book.
                    Be the first to respond. </div>
            }
        </>
    )
}

export default BookComments;
