import React, { useEffect, useState } from 'react'

const ReadListBookItem = ({ book, editDate }) => {
    

    return (

        <div className="readList-book-item">

            <section to={`book/${book.slug}`}>
                <div className="book-top-block">
                    <div className="readList-book-author">

                        {book.author}

                    
                    <span>-</span>
                    {book.category}
                    </div>

                </div>

                <div className="book-med-block">
                    <div className="readList-book-title">
                        <a href={`book/${book.slug}`}>
                            {book.title}
                        </a>
                    </div>

                </div>

                <div className="book-bottom-block">
                    <span>
                        Rating - {book.rating}
                    </span>
                    <a href={`book/${book.slug}`}>
                        <span>
                            Know More
                        </span>
                        
                    </a>

                    
                </div>
            </section>

            <section>
                <div className="book-Image-Wrap">
                    <img src={`${book.image}`} alt={book.title} width="180px" />
                </div>

            </section>

        </div>
    )
}

export default ReadListBookItem