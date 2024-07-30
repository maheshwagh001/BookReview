import React, { useRef, useContext, useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
// import '../../Css/AddStory.css'

const AddCategory = () => {

    
    const [name, setname] = useState('')
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')

   
    const clearInputs = () => {
        setname('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formdata = new FormData()
        formdata.append("name", name)
        console.log("d")

        try {
            const { data } = await axios.post("/category/addCategory", {name})
            setSuccess('Add category successfully ')
            console.log(data)

            clearInputs()
            setTimeout(() => {
                setSuccess('')
            }, 7000)

        }
        catch (error) {
            setTimeout(() => {
                setError('')

            }, 7000)
            setError(error.response.data.error)

        }

    }
    return (

            <form onSubmit={handleSubmit} className="addStory-form">

                {error && <div className="error_msg">{error}</div>}
                {success && <div className="success_msg">
                    <span>
                        {success}
                    </span>
                    <Link to="/">Go home</Link>
                </div>}
            
                <input
                    type="text"
                    required
                    id="name"
                    placeholder="Name"
                    onChange={(e) => setname(e.target.value)}
                    value={name}
                />

                <button type='submit'
                >Publish </button>
            </form>

    )
}

export default AddCategory


