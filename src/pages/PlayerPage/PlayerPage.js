import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaExpand } from 'react-icons/fa';
import { movieAPI } from '../../services/api';
import './PlayerPage.css';

export const PlayerPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  
  const videoRef = React.useRef(null);
  const controlsTimeoutRef = React.useRef(null);

  useEffect(() => {
    fetchMovieDetail();
  }, [slug]);

  useEffect(() => {
    // Auto-hide controls after 3 seconds
    if (showControls && isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }

    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [showControls, isPlaying]);

  const fetchMovieDetail = async () => {
    setIsLoading(true);
    try {
      const detail = await movieAPI.getMovieDetail(slug);
      if (detail && detail.movie) {
        setMovie(detail.movie);
      }
    } catch (error) {
      console.error('Error fetching movie:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      videoRef.current.currentTime = pos * duration;
    }
  };

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
  };

  if (isLoading) {
    return (
      <div className="player-page">
        <div className="player-loading">
          <div className="loading-spinner"></div>
          <p>Loading movie...</p>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="player-page">
        <div className="player-error">
          <h2>Movie not found</h2>
          <button onClick={() => navigate('/home')} className="back-btn">
            Go back to home
          </button>
        </div>
      </div>
    );
  }

  // Demo video URL - replace with actual movie streaming URL
  const videoUrl = movie.trailer_url 
    ? movie.trailer_url.replace('watch?v=', 'embed/') 
    : 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

  return (
    <div className="player-page" onMouseMove={handleMouseMove}>
      <div className="player-container">
        {/* Video Player */}
        <div className="video-wrapper">
          {movie.trailer_url && movie.trailer_url.includes('youtube') ? (
            // YouTube embed for demo
            <iframe
              ref={videoRef}
              src={`https://www.youtube.com/embed/${movie.trailer_url.split('v=')[1]}?autoplay=1&controls=0&modestbranding=1&rel=0`}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="video-player"
            />
          ) : (
            // HTML5 video player for demo
            <video
              ref={videoRef}
              className="video-player"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleTimeUpdate}
              poster={`https://img.ophim.live/uploads/movies/${movie.poster_url}`}
            >
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>

        {/* Player Controls */}
        <div className={`player-controls ${showControls ? 'visible' : 'hidden'}`}>
          <div className="controls-top">
            <button className="back-button" onClick={() => navigate(-1)}>
              <FaArrowLeft />
              <span>Back</span>
            </button>
            <div className="movie-info">
              <h1 className="movie-title">{movie.name}</h1>
              <p className="movie-meta">
                {movie.year} • {movie.time || 'HD'} • {movie.lang || 'Vietnamese'}
              </p>
            </div>
          </div>

          <div className="controls-bottom">
            <div className="progress-bar" onClick={handleSeek}>
              <div 
                className="progress-filled"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
            </div>
            
            <div className="controls-actions">
              <div className="controls-left">
                <button className="control-btn" onClick={handlePlayPause}>
                  {isPlaying ? <FaPause /> : <FaPlay />}
                </button>
                <button className="control-btn" onClick={handleMute}>
                  {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                </button>
                <div className="time-display">
                  <span>{formatTime(currentTime)}</span>
                  <span> / </span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>
              
              <div className="controls-right">
                <button className="control-btn" onClick={handleFullscreen}>
                  <FaExpand />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
