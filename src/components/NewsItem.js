import React from 'react'

const NewsItem=(props)=>{
    let { title, description, imageUrl, newsUrl, author, date, source } = props;
    let alternateImage ='https://www.quantumbalancing.com/images/News2.gif';
    return (
      <div className='my-3'>
        <div className="card" >
          <div style={{ display: 'flex', justifyContent: "flex", position:'absolute',right: "0" }}>
            <span className='badge rounded-pill bg-danger'>{source}</span>
          </div>
          <img src={!imageUrl ? alternateImage : imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p><small className='text-muted'>By <b>{!author ? "Unknown" : author}</b> on {new Date(date).toGMTString()}</small></p>
            <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-dark">Go</a>
          </div>
        </div>
      </div>
    )
  }

export default NewsItem
