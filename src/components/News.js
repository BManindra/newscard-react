import React, { useEffect, useState } from 'react'

import NewsItem from './NewsItem'
// import Spinner from './Spinner';
import PropTypes from 'prop-types'
// import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([])
  // const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // const updateNews = async () => {
  //   props.setProgress(10);
  //   const page=props.page || 1;
  //   const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=9f9c7a85e7374c098389a1b0892598b0&page=${page}&pageSize=${props.pageSize}`;
  //   // setLoading(true)
  //   let data = await fetch(url);
  //   props.setProgress(30);
  //   let parsedData = await data.json()
  //   props.setProgress(70);
  //   setArticles(parsedData.articles)
  //   // setTotalResults(parsedData.totalResults)
  //   // setLoading(false)
  //   props.setProgress(100);
  // }

  const updateNews = async () => {
    props.setProgress(10);
    const page = props.page || 1; // Set a default value for page if not provided
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=ac542cfba886443f874f8b46e67e7196&page=${page}&pageSize=${props.pageSize}`;

    try {
      let data = await fetch(url);
      props.setProgress(30);
      let parsedData = await data.json();
      props.setProgress(70);
      setArticles(parsedData.articles);
      props.setProgress(100);
    } catch (error) {
      console.error("Error updating news:", error);
    }
  }


  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - News Card`;
    updateNews();
    // eslint-disable-next-line
  }, [])


  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=ac542cfba886443f874f8b46e67e7196&page=${page + 1}&pageSize=${props.pageSize}`;
    setPage(page + 1);

    try {
      let data = await fetch(url);
      let parsedData = await data.json();

      // Use the functional form of setArticles to update based on previous state
      setArticles(prevArticles => [...prevArticles, ...parsedData.articles]);
      setTotalResults(parsedData.totalResults);
    } catch (error) {
      console.error("Error fetching more data:", error);
    }
  };


  return (
    <>
      <h1 className="text-center" style={{ margin: '35px 0px', marginTop: '90px' }}>News Card - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
      {/* {loading && <Spinner />} */}
      {/* <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        > */}

      {/* dataLength={articles.length}
      next={fetchMoreData}
      hasMore={articles.length !== totalResults} */}


      <div className="container">

        <div className="row">
          {articles && articles.map((element) => {
            return <div className="col-md-4" key={element.url}>
              <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
            </div>
          })}
        </div>
      </div>
      {/* </InfiniteScroll> */}
    </>
  )

}


News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general',
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}

export default News