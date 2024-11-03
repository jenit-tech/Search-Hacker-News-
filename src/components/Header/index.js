import {Link, withRouter} from 'react-router-dom'
import {IoSearch} from 'react-icons/io5'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-card">
          <Link to="/">
            <img
              src="https://hn.algolia.com/public/899d76bbc312122ee66aaaff7f933d13.png"
              alt="website logo"
              className="home-website-logo"
            />
          </Link>
          <p className="nav-heading">
            Search
            <br />
            Hacker News
          </p>
        </div>
        <div className="nav-items">
          <IoSearch className="search-icon" />
          <input
            type="text"
            className="search-input-field"
            id="username"
            placeholder="Search stories by title, url or author"
          />
          <p>Search By</p>
          <img
            src="https://hn.algolia.com/public/38a9c67b12016b52267071c530ff2e78.svg"
            alt=""
            className="algolia"
          />
        </div>

        <button
          type="button"
          className="logout-button-lg"
          onClick={onClickLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)
