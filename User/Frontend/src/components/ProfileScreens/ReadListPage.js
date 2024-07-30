import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import Loader from "../GeneralScreens/Loader";
import { useNavigate, Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { AuthContext } from '../../Context/AuthContext'
import { AiFillLock } from 'react-icons/ai'
import { BsThreeDots } from 'react-icons/bs'
import ReadListBookItem from '../BookScreens/ReadListBookItem';

import '../../Css/ReadListPage.css'

const ReadListPage = () => {
    const navigate = useNavigate();
    const [readList, setReadList] = useState([{}])
    const [loading, setLoading] = useState(false)
    // const { activeUser } = useContext(AuthContext)
    const [activeUser, setActiveUser] = useState({})

    useEffect(() => {
        
        const getUserReadingList = async () => {
            setLoading(true)
            // console.log(activeUser)
            try {
                const { data } = await axios.get("/user/private");
        
                setActiveUser(data)
                console.log(activeUser)
        
              }
              catch (error) {
                setActiveUser({})
              }

            try {
                const { data } = await (axios.get(`/user/readList`))
                setReadList(data.data)
                setLoading(false)
            }
            catch (error) {
                console.log(error)
                navigate("/") 
            }
        }
        getUserReadingList()


    }, [])


    const editDate = (createdAt) => {

        const d = new Date(createdAt);
        var datestring = d.toLocaleString('eng', { month: 'long' }).substring(0, 3) + "  " + d.getDate()
        return datestring
    }


    return (
        <>
            {loading ? <Loader /> :

                <div className="Inclusive-readList-page">
                    <h2>Reading List </h2>

                    <div className="readList-top-block">


                        <div className='activeUser-info-wrapper'>

                            <b>
                                {activeUser.username}
                            </b>

                            <div>
                                <span>
                                    {editDate(Date.now())}
                                </span>
                                <span>-</span>
                                <span>
                                    {activeUser.readListLength} Books
                                </span>
                                <i>
                                    <AiFillLock />
                                </i>
                            </div>

                        </div>

                    </div>

                    <div className="readList-book-wrapper">

                        {activeUser.readListLength !== 0 ?
                            <>
                                {readList.map(book => {
                                    return (
                                        <ReadListBookItem key={book._id} book={book} editDate={editDate} />

                                    )
                                })}
                            </>

                            :

                            <div className="empty-readList">

                                Reading List is empty

                            </div>
                        }


                    </div>

                </div>
            }
        </>

    )
}

export default ReadListPage