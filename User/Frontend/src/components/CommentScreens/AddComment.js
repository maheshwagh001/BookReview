import React, { useState, useRef } from 'react'
import axios from 'axios';
import StarRating from '../CommentScreens/StarRating'
import { BsShieldCheck, BsCheckAll } from 'react-icons/bs'
import { IoAdd } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom';
import '../../Css/AddComment.css'

const AddComment = ({ slug, getBookComments, activeUser, count }) => {

    const [star, setStar] = useState(0);
    const [starCurrentVal, setStarCurrentVal] = useState(0);
    const [content, setContent] = useState('')
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(star >= 1){
            try {
                await axios.post(`/comment/${slug}/addComment`, { content, star })
    
                setSuccess('Comment added successfully ')
                setTimeout(() => {
                    setSuccess('')
                }, 2700)
    
                clearInputs()
    
                getBookComments()
    
            }
            catch (error) {
    
                setError(error.response.data.error)
                setTimeout(() => {
                    setError('')
                }, 4500)
            }
        }
        else {
            setError("minimum 1 star required")
            setTimeout(() => {
                setError('')
            }, 4500)
        }
        
    }

    const clearInputs = () => {
        setStar(0)
        setStarCurrentVal(0)
        setContent('')

    }


    return (

        <>
            <div className="sidebar-top-block">

                <h3>Reviewed by {" "} - <span className='sidebar-commentCount'>{count}
                </span>    </h3>
            </div>

            {error && <div className="alert-error-message">{error}</div>}


            {activeUser.username &&

                <form className='addComment-form' onSubmit={handleSubmit}>


                    {success && <div className="alert-success-message">
                        <BsCheckAll />
                        {success}</div>}

                    <div className="textarea-wrapper">
                        <input
                            type='text'
                            placeholder='Share your review..' 
                            id="comment"
                            onChange={(e) => {
                                setContent(e.target.value)
                            }
                            }
                            value = {content}

                            
                            />
                    </div>
                    <StarRating setStar={setStar} setStarCurrentVal={setStarCurrentVal} starCurrentVal={starCurrentVal} />
                        <div className="formBtn-wrapper">
                            <button type='submit' 
                            >Respond </button>

                        </div>

                </form>
            }
        </>

    )
}

export default AddComment