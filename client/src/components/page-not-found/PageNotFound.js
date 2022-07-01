import React from 'react'
import { MdErrorOutline } from 'react-icons/md'
import './pageNotFound.css'

const PageNotFound = () => {
    return (
        <div className='page-not-found-component'>
            <div className='wrapper'>
                <MdErrorOutline className='icon' />
                <h1>Page Not Found</h1>
            </div>
        </div>
    )
}

export default PageNotFound