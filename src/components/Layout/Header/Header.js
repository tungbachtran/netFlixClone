import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosSearch, IoIosNotificationsOutline } from "react-icons/io";
import { useAuth } from '../../../context/AuthContext';
import './Header.css';

export const Header = ({ showSearch = false }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchInput, setShowSearchInput] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__left">
          <Link to={isAuthenticated ? "/home" : "/"} className="header__logo">
            <img src="/images/netFlixLogo.png" alt="Netflix" />
          </Link>
          
          {isAuthenticated && (
            <nav className="header__nav">
              <Link to="/home" className="header__nav-link">Home</Link>
              <Link to="/tv-shows" className="header__nav-link">TV Shows</Link>
              <Link to="/movies" className="header__nav-link">Movies</Link>
              <Link to="/popular" className="header__nav-link">New & Popular</Link>
              <Link to="/my-list" className="header__nav-link">My List</Link>
            </nav>
          )}
        </div>

        <div className="header__right">
          {isAuthenticated && showSearch && (
            <div className="header__search">
              {showSearchInput ? (
                <form onSubmit={handleSearch} className="search-form">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Titles, people, genres"
                    className="search-input"
                    autoFocus
                    onBlur={() => !searchQuery && setShowSearchInput(false)}
                  />
                </form>
              ) : (
                <button 
                  className="search-btn"
                  onClick={() => setShowSearchInput(true)}
                >
                  <IoIosSearch />
                </button>
              )}
            </div>
          )}

          {isAuthenticated ? (
            <>
              <p className="header__children">Children</p>
              <IoIosNotificationsOutline className="header__notification" />
              <div className="header__profile">
                <img src="/images/avatar.png" alt="Profile" />
                <div className="profile-dropdown">
                  <button onClick={handleLogout}>Sign out</button>
                </div>
              </div>
            </>
          ) : (
            <Link to="/login">
              <button className="header__signin-btn">Sign In</button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
