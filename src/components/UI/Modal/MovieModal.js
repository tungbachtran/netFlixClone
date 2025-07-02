import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { FaPlay, FaPlus, FaTimes } from 'react-icons/fa';
import { AiFillLike } from 'react-icons/ai';
import { movieAPI } from '../../../services/api';
import { Button } from '../Button/Button';
import './MovieModal.css';

Modal.setAppElement('#root');

export const MovieModal = ({ movie, isOpen, onClose, onPlay }) => {
  const [movieDetail, setMovieDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (movie && isOpen) {
      fetchMovieDetail();
    }
  }, [movie, isOpen]);

  const fetchMovieDetail = async () => {
    if (!movie?.slug) return;
    
    setIsLoading(true);
    try {
      const detail = await movieAPI.getMovieDetail(movie.slug);
      setMovieDetail(detail);
    } catch (error) {
      console.error('Error fetching movie detail:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const convertToEmbedUrl = (url) => {
    if (!url) return '';
    const videoId = url.split('v=')[1];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
  };

  const handlePlay = () => {
    onPlay(movie);
    onClose();
  };

  if (!movie) return null;

  const detail = movieDetail?.movie;
  const trailerUrl = detail?.trailer_url ? convertToEmbedUrl(detail.trailer_url) : '';

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="movie-modal"
      overlayClassName="movie-modal-overlay"
    >
      <div className="movie-modal__content">
        <button className="movie-modal__close" onClick={onClose}>
          <FaTimes />
        </button>

        {isLoading ? (
          <div className="movie-modal__loading">
            <div className="loading-spinner"></div>
          </div>
        ) : (
          <>
            {/* Video Section */}
            <div className="movie-modal__video">
              {trailerUrl ? (
                <iframe
                  src={trailerUrl}
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={movie.name}
                />
              ) : (
                <div className="movie-modal__poster">
                  <img src={`${movieDetail?.data?.APP_DOMAIN_CDN_IMAGE || ''}/${movie.poster_url}`} alt={movie.name} />
                </div>
              )}
              
              <div className="movie-modal__video-overlay">
                <div className="movie-modal__title-section">
                  <h2 className="movie-modal__title">{movie.name}</h2>
                  <div className="movie-modal__actions">
                    <Button onClick={handlePlay} className="movie-modal__play-btn">
                      <FaPlay />
                      Play
                    </Button>
                    <button className="movie-modal__icon-btn">
                      <FaPlus />
                    </button>
                    <button className="movie-modal__icon-btn">
                      <AiFillLike />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Info Section */}
            <div className="movie-modal__info">
              <div className="movie-modal__main-info">
                <div className="movie-modal__meta">
                  <span className="movie-modal__year">{movie.year}</span>
                  <span className="movie-modal__quality">HD</span>
                  <span className="movie-modal__duration">{detail?.time || 'N/A'}</span>
                </div>
                
                <p className="movie-modal__description">
                  {detail?.content || movie.content || 'No description available.'}
                </p>
              </div>

              <div className="movie-modal__additional-info">
                {detail?.actor && detail.actor.length > 0 && (
                  <div className="movie-modal__cast">
                    <span className="movie-modal__label">Cast: </span>
                    <span className="movie-modal__value">
                      {detail.actor.slice(0, 3).join(', ')}
                      {detail.actor.length > 3 && ', ...'}
                    </span>
                  </div>
                )}

                {detail?.category && detail.category.length > 0 && (
                  <div className="movie-modal__genres">
                    <span className="movie-modal__label">Genres: </span>
                    <span className="movie-modal__value">
                      {detail.category.map(cat => cat.name).join(', ')}
                    </span>
                  </div>
                )}

                {detail?.country && detail.country.length > 0 && (
                  <div className="movie-modal__country">
                    <span className="movie-modal__label">Country: </span>
                    <span className="movie-modal__value">
                      {detail.country.map(country => country.name).join(', ')}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};
