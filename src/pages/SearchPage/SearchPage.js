import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Header } from '../../components/Layout/Header/Header';
import { MovieCard } from '../../components/MovieCard/MovieCard';
import { MovieModal } from '../../components/UI/Modal/MovieModal';
import { movieAPI } from '../../services/api';
import './SearchPage.css';

export const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cdnDomain, setCdnDomain] = useState(''); // ✅ Thêm state cho CDN domain
  const navigate = useNavigate();
  
  const query = searchParams.get('q') || '';

  useEffect(() => {
    if (query) {
      performSearch(query);
    }
  }, [query]);

  const performSearch = async (searchQuery) => {
    setIsLoading(true);
    try {
      const results = await movieAPI.searchMovies(searchQuery);
      console.log('API Response:', results); // 🔍 Debug log
      
      // ✅ Xử lý nhiều cấu trúc response khác nhau
      let movieData = [];
      let domain = '';
      
      if (results) {
        // Trường hợp 1: results.data.items
        if (results.data && results.data.items) {
          movieData = results.data.items;
          domain = results.data.APP_DOMAIN_CDN_IMAGE || results.APP_DOMAIN_CDN_IMAGE || '';
        }
        // Trường hợp 2: results.data trực tiếp là array
        else if (results.data && Array.isArray(results.data)) {
          movieData = results.data;
          domain = results.APP_DOMAIN_CDN_IMAGE || '';
        }
        // Trường hợp 3: results trực tiếp là array
        else if (Array.isArray(results)) {
          movieData = results;
        }
        // Trường hợp 4: results có items ở root level
        else if (results.items) {
          movieData = results.items;
          domain = results.APP_DOMAIN_CDN_IMAGE || '';
        }
      }
      
      setSearchResults(movieData);
      setCdnDomain(domain);
      
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const handlePlayMovie = (movie) => {
    navigate(`/watch/${movie.slug}`);
  };

  return (
    <div className="search-page">
      <Header showSearch={true} />
      
      <div className="search-page__content">
        <div className="container">
          <div className="search-page__header">
            <h1 className="search-page__title">
              {query ? `Search results for "${query}"` : 'Search'}
            </h1>
            {!isLoading && searchResults.length > 0 && (
              <p className="search-page__count">
                {searchResults.length} results found
              </p>
            )}
          </div>

          {isLoading ? (
            <div className="search-page__loading">
              <div className="loading-spinner"></div>
              <p>Searching...</p>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="search-page__results">
              <div className="search-results-grid">
                {searchResults.map((movie, index) => (
                  <MovieCard
                    key={movie._id || movie.id || index} // ✅ Fallback key
                    movie={movie}
                    domain={cdnDomain} // ✅ Sử dụng CDN domain từ state
                    onClick={handleMovieClick}
                    onPlay={handlePlayMovie}
                  />
                ))}
              </div>
            </div>
          ) : query ? (
            <div className="search-page__no-results">
              <h2>No results found for "{query}"</h2>
              <p>Try searching for something else or check your spelling.</p>
            </div>
          ) : (
            <div className="search-page__empty">
              <h2>Start searching for movies and TV shows</h2>
              <p>Use the search bar above to find your favorite content.</p>
            </div>
          )}
        </div>
      </div>

      <MovieModal
        movie={selectedMovie}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPlay={handlePlayMovie}
      />
    </div>
  );
};
