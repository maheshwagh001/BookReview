import React from 'react';
import { Link } from 'react-router-dom';

const Book = ({ book }) => {


    const truncateTitle= (title) => {
        const trimmedString = title.substr(0, 15);
        return trimmedString
    }
    
    return (

        <div className="book-card">
            <Link to={`/book/${book.slug}`} className="book-link">

                <img className=" book-image" src={`${book.image}`} alt={truncateTitle(book.title)} />
                <div className="book-content-wrapper">

                    <h5 className="book-title">
                        
                    {book.title.length > 15 ? truncateTitle(book.title)+"..." : book.title
                    
                    }
                    </h5>


                    
                </div>
            </Link>
        </div>

    )
}

export default Book;
