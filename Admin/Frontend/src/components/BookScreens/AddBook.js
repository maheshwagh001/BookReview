import React, { useRef, useContext, useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { AiOutlineUpload } from 'react-icons/ai'
import { FiArrowLeft } from 'react-icons/fi'
import '../../Css/AddStory.css'

const AddStory = () => {
    const imageEl = useRef(null)
    const [image, setImage] = useState('')
    const editorEl = useRef(null)
    const [category, setCategory] = useState('')
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [intro, setIntro] = useState('')
    const [pages, setPages] = useState('')
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')
   

    const clearInputs = () => {
        setCategory('')
        setTitle('')
        setAuthor('')
        setPages('')
        setIntro('')
        setImage('')
        editorEl.current.editor.setData('')
        imageEl.current.value = ""
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formdata = new FormData()
        formdata.append("image", image)
        formdata.append("category", category)
        formdata.append("title", title)
        formdata.append("author", author)
        formdata.append("intro", intro)
        formdata.append("pages", pages)
        

        try {
            const { data } = await axios.post("/book/addBook", formdata)
            setSuccess('Add book successfully ')

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

        <div className="Inclusive-addStory-page ">

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
                    id="category"
                    placeholder="Category"
                    onChange={(e) => setCategory(e.target.value)}
                    value={category}
                />

                <input
                    type="text"
                    required
                    id="title"
                    placeholder="Title"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
                <input
                    type="text"
                    required
                    id="author"
                    placeholder="Author"
                    onChange={(e) => setAuthor(e.target.value)}
                    value={author}
                />

                 <CKEditor
                    editor={ClassicEditor}
                    onChange={(e, editor) => {
                        const data = editor.getData();
                        setIntro(data)
                    }}
                    ref={editorEl}
                />
                <input
                    type="Number"
                    required
                    id="pages"
                    placeholder="Pages"
                    onChange={(e) => setPages(e.target.value)}
                    value={pages}
                />
                
                <div class="StoryImageField">
                    <AiOutlineUpload />
                    <div class="txt">
                        {image ? image.name :
                            " Include a high-quality image in your story to make it more inviting to readers."
                        }
                    </div>
                    <input
                        name="image"
                        type="file"
                        ref={imageEl}
                        onChange={(e) => {
                            setImage(e.target.files[0])
                        }}
                    />
                </div>
                <button type='submit' disabled={image ? false : true} className={image ? 'addStory-btn' : 'dis-btn'}
                >Publish </button>
            </form>

        </div>

    )
}

export default AddStory
