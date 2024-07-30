import React, { useState } from 'react'
import {BiSearchAlt2} from 'react-icons/bi'
import {  useNavigate } from "react-router-dom";
const SearchForm = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate =useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault() ; 
        if(searchTerm){
            navigate(`/blog/?search=${searchTerm}`)
        }

        setSearchTerm("")
    }

  
    return (
     
        <form
            className="search-form"
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                name="search"
                placeholder="Search Category Author or Title ..."
                className=" m-4"
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
            />

            <button type="submit" className={searchTerm.trim() ? 'searchBtn' : 'disBtn'}  ><i> <BiSearchAlt2/> </i> </button>
        </form>
    )
}

export default SearchForm