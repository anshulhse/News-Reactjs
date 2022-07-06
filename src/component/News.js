import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";
import PropTypes from 'prop-types'

const News = (props) => {

    const[articles,setArticles] = useState([]);
    const[loading,setLoading] = useState(true);
    const[page,setPage] = useState(1);
    const[totalResults,setTotalResults] = useState(0);
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const updateNews= async  ()=>{
        props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apikey}&page=${page}&pagesize=${props.pagesize}`;
        setLoading(true);
        let data = await fetch(url);
        props.setProgress(40);
        let parsedData = await data.json();
        props.setProgress(70);

        //---for function based component---//
        setArticles(parsedData.articles)
        setLoading(false)
        setTotalResults(parsedData.totalResults)
        props.setProgress(100);
    }
    useEffect(() => {
       document.title = `${capitalizeFirstLetter(props.category)} - NewsAgent`;
        updateNews(); 
         // eslint-disable-next-line 
    }, [])


    const fetchMoreData = async () => {
        setPage(page+1)
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apikey}&page=${page + 1}&pagesize=${props.pagesize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        setArticles(articles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults);
        setLoading(false);
    };


    return (
        <>
            <h1 className="text-center" style={{ margin: '30px 0px',marginTop: '70px'}}>News-Top Hedlines on {capitalizeFirstLetter(props.category)}</h1>
            {loading && <Spinner/>}
            <InfiniteScroll dataLength={articles.length} next={fetchMoreData} hasMore={articles.length !== totalResults} loader={loading && <Spinner/>} >
                <div className="container">
                    <div className="row">
                        {articles.map((element) => (
                            <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 80) : ""} author={element.author} time={element.publishedAt} source={element.source.name} imgUrl={element.urlToImage} newsUrl={element.url} />
                            </div>
                        ))}
                    </div>
                </div>
            </InfiniteScroll>
        </>
    )
}

News.defaultProps = {
    country: 'in',
    pagesize: 10,
    category: 'general'
}

News.propTypes = {
    country: PropTypes.string,
    pagesize: PropTypes.number,
    category: PropTypes.string
}

export default News