import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description,newsUrl,imageUrl,author,publishedAt,source } = this.props;
    return (
      
          <div>
            <div className="card mx-2 my-2"style={{minHeight:"430px",maxHeight:"430px" }}>
          <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{zIndex:"1",left:"88%"}}>
            {source}
            <span className="visually-hidden">unread messages</span>
          </span>
              <img src={imageUrl} className="card-img-top" alt="" style={{maxWidth:"100%",minHeight:"200px",maxHeight:"200px"}} />
              <div className="card-body">
                <h5 className="card-title">{title}...</h5>
                <p className="card-text">{description}...</p>
                <p className="card-text"><small className="text-muted">By {author?author:"Unknown"} on {new Date(publishedAt).toGMTString()}</small></p>
                <a href={newsUrl} className="btn btn-sm btn-dark" target="_blank" style={{paddingBottom:"0.25rem"}}>
                  Read More
                </a>
              </div>
            </div>
          </div>
    );
  }
}

export default NewsItem;
