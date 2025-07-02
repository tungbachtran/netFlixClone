import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/Layout/Header/Header';
import { MovieCard } from '../../components/MovieCard/MovieCard';
import { Button } from '../../components/UI/Button/Button';
import { FaPlay, FaInfoCircle } from 'react-icons/fa';
import { movieAPI } from '../../services/api';
import { MovieModal } from '../../components/UI/Modal/MovieModal';
import './HomePage.css';

export const HomePage = () => {
  const [movieData, setMovieData] = useState({
    popular: [],
    action: [],
    romance: [],
    comedy: [],
    domain: ''
  });
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const [popularData, actionData, romanceData, comedyData] = await Promise.all([
          movieAPI.getMoviesByCategory('khoa-hoc', 10),
          movieAPI.getMoviesByCategory('hanh-dong', 10),
          movieAPI.getMoviesByCategory('tinh-cam', 10),
          movieAPI.getMoviesByCategory('hai-huoc', 10)
        ]);

        if (popularData && popularData.data) {
          setMovieData({
            popular: popularData.data.items,
            action: actionData?.data?.items || [],
            romance: romanceData?.data?.items || [],
            comedy: comedyData?.data?.items || [],
            domain: popularData.data.APP_DOMAIN_CDN_IMAGE
          });
          
          // Set featured movie (first popular movie)
          if (popularData.data.items.length > 0) {
            setFeaturedMovie(popularData.data.items[0]);
          }
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const handlePlayMovie = (movie) => {
    navigate(`/watch/${movie.slug}`);
  };

  const handlePlayFeatured = () => {
    if (featuredMovie) {
      navigate(`/watch/${featuredMovie.slug}`);
    }
  };

  const handleMoreInfo = () => {
    if (featuredMovie) {
      handleMovieClick(featuredMovie);
    }
  };

  if (isLoading) {
    return (
      <div className="home-page">
        <Header showSearch={true} />
        <div className="loading-screen">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="home-page">
      <Header showSearch={true} />
      
      {/* Featured Content */}
      {featuredMovie && (
        <section className="hero-banner">
          <div className="hero-banner__background">
          <img 
            src="/images/Formula1.png"
            alt="Featured Movie Background"
          />
            <div className="hero-banner__gradient" />
          </div>
          
          <div className="hero-banner__content">
            <div className="hero-banner__info">
              <h1 className="hero-banner__title">{featuredMovie.name}</h1>
              <p className="hero-banner__description">
                {featuredMovie.content || 'Discover amazing stories and unforgettable characters in this must-watch series.'}
              </p>
              
              <div className="hero-banner__actions">
                <Button 
                  variant="primary" 
                  size="large"
                  onClick={handlePlayFeatured}
                  className="hero-banner__play-btn"
                >
                  <FaPlay />
                  Play
                </Button>
                <Button 
                  variant="secondary" 
                  size="large"
                  onClick={handleMoreInfo}
                  className="hero-banner__info-btn"
                >
                  <FaInfoCircle />
                  More Info
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Movie Rows */}
      <section className="movie-rows">
        <div className="container">
          {movieData.popular.length > 0 && (
            <MovieRow
              title="Popular on Netflix"
              movies={movieData.popular}
              domain={movieData.domain}
              onMovieClick={handleMovieClick}
              onPlayMovie={handlePlayMovie}
            />
          )}
          
          {movieData.action.length > 0 && (
            <MovieRow
              title="Action & Adventure"
              movies={movieData.action}
              domain={movieData.domain}
              onMovieClick={handleMovieClick}
              onPlayMovie={handlePlayMovie}
            />
          )}
          
          {movieData.romance.length > 0 && (
            <MovieRow
              title="Romantic Movies"
              movies={movieData.romance}
              domain={movieData.domain}
              onMovieClick={handleMovieClick}
              onPlayMovie={handlePlayMovie}
            />
          )}
          
          {movieData.comedy.length > 0 && (
            <MovieRow
              title="Comedy Movies"
              movies={movieData.comedy}
              domain={movieData.domain}
              onMovieClick={handleMovieClick}
              onPlayMovie={handlePlayMovie}
            />
          )}
        </div>
      </section>

      {/* Movie Modal */}
      <MovieModal
        movie={selectedMovie}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPlay={handlePlayMovie}
      />
    </div>
  );
};

// Movie Row Component
const MovieRow = ({ title, movies, domain, onMovieClick, onPlayMovie }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const rowRef = React.useRef(null);

  const scroll = (direction) => {
    const container = rowRef.current;
    const scrollAmount = container.clientWidth;
    const newPosition = direction === 'left' 
      ? Math.max(0, scrollPosition - scrollAmount)
      : Math.min(container.scrollWidth - container.clientWidth, scrollPosition + scrollAmount);
    
    container.scrollTo({ left: newPosition, behavior: 'smooth' });
    setScrollPosition(newPosition);
  };

  return (
    <div className="movie-row">
      <h2 className="movie-row__title">{title}</h2>
      <div className="movie-row__container">
        {scrollPosition > 0 && (
          <button 
            className="movie-row__nav movie-row__nav--left"
            onClick={() => scroll('left')}
          >
            ‹
          </button>
        )}
        
        <div className="movie-row__list" ref={rowRef}>
          {movies.map((movie) => (
            <MovieCard
              key={movie._id}
              movie={movie}
              domain={domain}
              onClick={onMovieClick}
              onPlay={onPlayMovie}
            />
          ))}
        </div>
        
        <button 
          className="movie-row__nav movie-row__nav--right"
          onClick={() => scroll('right')}
        >
          ›
        </button>
      </div>
    </div>
  );
};
