import React from 'react'

const NewsItem = (props)=>{
        let { title, description, imgUrl, newsUrl, time, author ,source } = props;
        return (
            <div className='my-3'>
                <div className="card ">
                    <img src={!imgUrl ? "https://upload.wikimedia.org/wikipedia/commons/2/24/News_18_India.png" : imgUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left: '90%' , zIndex: '1'}}>
                           {source}
                        <span className="visually-hidden">unread messages</span>
                        </span>
                        <a rel="noreferrer" href={newsUrl} target="_blank" className="btn bt-sm btn-dark">Read more..</a>
                    </div>
                    <div className="card-footer justify-content-between">
                        <small className="text-muted">Published At : {new Date(time).toGMTString()}</small>
                        <h5><span className="badge bg-secondary">{author === null ? "unknown" : author}</span></h5>
                    </div>
                </div>
            </div>
        )
}

export default NewsItem