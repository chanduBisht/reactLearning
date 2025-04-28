import React, { Component } from 'react'

export default class News extends Component {
    articles = [];
    
    constructor() {
        super();
        this.state = {
            articles: this.articles,
            page: 1
        }    
    }

    componentDidMount = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=d78e05f154ec4d1e9af290be834c196a&page=1&pageSize=${this.props.pageSize}`;

        let data = await fetch(url);
        let parsedData = await data.json();

        this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults});
    }

    handleNext = async () => {
        if(this.state.page + 1 < Math.ceil(this.state.totalResults / this.props.pageSize)) {
            let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=d78e05f154ec4d1e9af290be834c196a&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            let data = await fetch(url);
            let parsedData = await data.json();
            this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles
            })
        }
    }

    handlePrevious = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=d78e05f154ec4d1e9af290be834c196a&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            page: this.state.page -  1,
            articles: parsedData.articles
        })
    }


    render() {
        return (
            <>
            <div className="container">
                <h2 className="text-center my-3">Top NewsHeadlines</h2>
                <div className="row">
                {this.state.articles.map((article, index) => (          
                    <div className="col-md-4">
                        <div className="card shadow-sm border-0 rounded-4 overflow-hidden" style={{ maxWidth: '350px', margin: 'auto' }}>
                            <img src={article.urlToImage} className="card-img-top" alt="News Thumbnail" />
                            <div className="card-body">
                                <h5 className="card-title fw-bold">{article.title?article.title.slice(0, 50):""}...</h5>
                                <p className="card-text text-muted">{article.description?article.description.slice(0, 100):""}...</p>   
                                <a href={article.url} className="btn btn-primary w-100 rounded-pill">Read More</a>
                            </div>
                        </div>
            
                    </div>
                ))}
                </div>

                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.handlePrevious}>Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / 9)} className="btn btn-dark" onClick={this.handleNext}>Next</button>
                </div>
            </div>
            </>  
        )
    }
}   
