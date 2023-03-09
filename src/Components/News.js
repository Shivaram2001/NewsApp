import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
    static defaultProps={
      country:"in",
      pageSize:12,
      category:"general",
      apiKey:"9a42fcddf870486988f7e91ff721ce07"
    }

    static propTypes={
      country:PropTypes.string,
      pageSize:PropTypes.number,
      category:PropTypes.string
    }

constructor()
{
  super();
  this.state={
    articles:[],
    loading:true,  
    page:1,
    totalResults:0
  }
}

async updateNews()
{
  this.props.setProgress(10);
  let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
  this.props.setProgress(30);
  this.setState({loading:true})
  let data=await fetch(url);
  let parsedData=await data.json();
  this.props.setProgress(60);
  console.log(parsedData);
  this.setState({
    articles:parsedData.articles,
    totalResults:parsedData.totalResults,
    loading:false
  })
  this.props.setProgress(100);
}


async componentDidMount()
{
  this.updateNews();
}

handleBackClick=async ()=>{
  this.setState({
    page:this.state.page-1
  })
  this.updateNews();
}

handleNextClick=async ()=>{
    this.setState({
      page:this.state.page+1
    })
    this.updateNews();
}

fetchMoreData = async () => {
  this.setState({
    page:this.state.page + 1,
  })
  let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
  let data=await fetch(url);
  let parsedData=await data.json();
  // console.log(parsedData);
  this.setState({
    articles:this.state.articles.concat(parsedData.articles),
    totalResults:parsedData.totalResults,
    loading:false
  })
};

  render() {
    
    return (
      
      <div className="container my-2 ">
        <h3 className="my-4 text-center">NewsMonkey-Top HeadLines</h3>
        {this.state.loading &&  <Spinner></Spinner>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner></Spinner>}>

          <div className="container">
            <div className="row" >
              {this.state.articles.map((element) => {
                return <div className="col-lg-4 col-md-6 col-sm-12" key={element.url}>
                  <NewsItem title={element.title ? element.title.slice(0, 40) : ""} description={element.description ? element.description.slice(0, 80) : ""} newsUrl={element.url}
                    imageUrl={!element.urlToImage ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4Z2vkbGfwcIqMmmMvZJGqmVOkmTU6_5np1A&usqp=CAU" : element.urlToImage} key={element.url} author={element.author} publishedAt={element.publishedAt} source={element.source.name} />
                </div>
              })}
            </div>
          </div>
            </InfiniteScroll>


          {/* {!this.state.loading && <div className="d-flex justify-content-between">
            <button disabled={this.state.page <= 1} onClick={this.handleBackClick} type="button" className="btn btn-sm btn-dark">&laquo; Back</button>
            <button disabled={(this.state.page +1 >  Math.ceil(this.state.totalResults/this.props.pageSize))} onClick={this.handleNextClick} type="button" className="btn btn-sm btn-dark">Next &raquo;</button>
          </div>} */}
        
      </div>
    );
  }
}

export default News;