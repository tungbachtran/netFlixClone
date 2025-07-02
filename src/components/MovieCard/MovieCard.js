import React from 'react';
import { FaPlay, FaPlus } from 'react-icons/fa';
import { AiFillLike } from 'react-icons/ai';
import './MovieCard.css';

export const MovieCard = ({ movie, domain, onClick, onPlay }) => {
  return (
    <div className="movie-card" onClick={() => onClick(movie)}>
      <div className="movie-card__image">
        <img 
          src={`${domain}/${movie.poster_url}`} 
          alt={movie.name}
          loading="lazy"
        />
        <div className="movie-card__overlay">
          <div className="movie-card__actions">
            <button 
              className="movie-card__play-btn"
              onClick={(e) => {
                e.stopPropagation();
                onPlay(movie);
              }}
            >
              <FaPlay />
            </button>
            <button className="movie-card__action-btn">
              <FaPlus />
            </button>
            <button className="movie-card__action-btn">
              <AiFillLike />
            </button>
          </div>
          <div className="movie-card__info">
            <h4 className="movie-card__title">{movie.name}</h4>
            <p className="movie-card__year">{movie.year}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
