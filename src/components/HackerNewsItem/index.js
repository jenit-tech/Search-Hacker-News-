import React, { Component } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import SearchBar from '../SearchBar';
import './index.css';

const searchTypesList = [
  { label: 'All', searchTypeId: 'ALL' },
  { label: 'Stories', searchTypeId: 'STORIES' },
  { label: 'Comments', searchTypeId: 'COMMENTS' },
  { label: 'Ask HN', searchTypeId: 'ASKHN' },
  { label: 'Show HN', searchTypeId: 'SHOWHN' },
  { label: 'Launch HN', searchTypeId: 'LAUNCHHN' },
  { label: 'Jobs', searchTypeId: 'JOBS' },
  { label: 'Polls', searchTypeId: 'POLLS' },
];

const popularityTypesList = [
  { label: 'Popularity', popularityTypeId: 'POPULARITY' },
  { label: 'Date', popularityTypeId: 'DATE' },
];

const timeTypesList = [
  { label: 'All time', timeTypeId: 'ALLTIME' },
  { label: 'Last 24h', timeTypeId: 'LAST24H' },
  { label: 'Past Week', timeTypeId: 'PASTWEEK' },
  { label: 'Past Month', timeTypeId: 'PASTMONTH' },
  { label: 'Past Year', timeTypeId: 'PASTYEAR' },
  { label: 'Custom range', timeTypeId: 'CUSTOMRANGE' },
];

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
};

class HackerNewsItem extends Component {
  state = {
    jobsList: [],
    jobsApiStatus: apiStatusConstants.initial,
    activeSearchOptionId: searchTypesList[0].searchTypeId,
    activePopularityOptionId: popularityTypesList[0].popularityTypeId,
    activeTimeOptionId: timeTypesList[0].timeTypeId,
  };

  componentDidMount() {
    this.getNews();
  }

  getNews = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const { activeSearchOptionId, activePopularityOptionId,activeTimeOptionId } =
      this.state
    const apiUrl = `http://hn.algolia.com/api/v1/search?query=${activeSearchOptionId}&tags=${activePopularityOptionId}restrictSearchableAttributes=${searchInput}&search_by_date?tags=${activeTimeOptionId}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.products.map(product => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
        rating: product.rating,
      }))
      this.setState({
        productsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  changeSearchOption = (activeSearchOptionId) => {
    this.setState({ activeSearchOptionId },  getNews);
  };

  changePopularityOption = (activePopularityOptionId) => {
    this.setState({ activePopularityOptionId },  getNews);
  };

  changeTimeOption = (activeTimeOptionId) => {
    this.setState({ activeTimeOptionId });
  };

  renderJobsList = () => {
    const { activeSearchOptionId, activePopularityOptionId, activeTimeOptionId } = this.state;
    return (
      <SearchBar
        activeSearchOptionId={activeSearchOptionId}
        activePopularityOptionId={activePopularityOptionId}
        activeTimeOptionId={activeTimeOptionId}
        searchTypesList={searchTypesList}
        popularityTypesList={popularityTypesList}
        timeTypesList={timeTypesList}
        changeSearchOption={this.changeSearchOption}
        changePopularityOption={this.changePopularityOption}
        changeTimeOption={this.changeTimeOption}
      />
    );
  };

  renderJobsLoaderView = () => (
    <div className="products-details-loader-container" data-testid="loader">
      <ThreeDots color="#0b69ff" height={50} width={50} />
    </div>
  );

  renderJobsApiFailureView = () => (
    <div className="jobs-api-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="job-api-failure-image"
      />
      <h1 className="failure-view-heading">Oops! Something Went Wrong</h1>
      <p className="failure-view-description">We cannot seem to find the page you are looking for.</p>
      <button type="button" className="retry-button" onClick={this.getJobs}>
        Retry
      </button>
    </div>
  );

  renderJobsBasedOnAPiStatus = () => {
    const { jobsApiStatus } = this.state;
    switch (jobsApiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderJobsLoaderView();
      case apiStatusConstants.success:
        return this.renderJobsList();
      case apiStatusConstants.failure:
        return this.renderJobsApiFailureView();
      default:
        return null;
    }
  };

  render() {
    return (
      <div className="jobs-page-container">
        <div className="jobs-page">
          <div className="jobs-container">{this.renderJobsBasedOnAPiStatus()}</div>
        </div>
      </div>
    );
  }
}

export default HackerNewsItem;
