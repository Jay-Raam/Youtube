import React, { useState, useEffect } from "react";
import { MdOutlineClose } from "react-icons/md";
import "./youtube.css";

const Gaming = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [newSearch, setNewSearch] = useState("Gaming");
  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        const API_KEY = "AIzaSyBi77FZs8-MXjwQbiLFJSfM8vMq9uVWmnw";
        const maxResults = 30;
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&part=snippet&type=video&q=${newSearch}&maxResults=${maxResults}`
        );
        const data = await response.json();

        if (data.items === undefined) {
          setError("We are reaching Our limit please try another time...");
          return;
        }

        setVideos(data.items);
        setLoading(false);
        setError(null);
      } catch (error) {
        setError("Error fetching videos. Please try again later.");
        console.error("Error fetching videos:", error);
        setLoading(false);
      }
    };

    fetchVideos();
  }, [newSearch]);

  const handleSearchBar = (e) => {
    const alteredSearch = e.target.value;
    setNewSearch(alteredSearch);
  };

  const handleImageclick = (video) => {
    setSelectedVideo(video);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  };

  return (
    <div className="container">
      <div className="search">
        <input
          type="text"
          className="search__input"
          placeholder="Search"
          onChange={handleSearchBar}
        />
        <button className="search__button">
          <svg className="search__icon" aria-hidden="true" viewBox="0 0 24 24">
            <g>
              <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
            </g>
          </svg>
        </button>
      </div>

      {loading && (
        <div className="loader">
          <div className="dot-one"></div>
          <div className="dot-two">- -</div>
          <div className="dot-three"></div>
        </div>
      )}

      {error && <div className="text-center text-red-600 mt-8">{error}</div>}
      <div className="videos">
        {videos.map((video) => (
          <div
            key={video.id.videoId}
            className="video flex flex-col justify-center items-center gap-3"
          >
            <img
              src={video.snippet.thumbnails.high.url}
              alt={video.snippet.title}
              onClick={() => handleImageclick(video)}
            />
            <h2 className="title-2">{video.snippet.title}</h2>
            <p className="description">{video.snippet.channelTitle}</p>
          </div>
        ))}
      </div>
      {selectedVideo && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="bg-white rounded-lg shadow-lg p-4 max-w-3xl w-full">
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-[60px] right-[50px] text-white md:top-8 md:right-[67px] hover:text-gray-800 focus:outline-none"
            >
              <MdOutlineClose />
            </button>
            <div
              className="relative overflow-hidden"
              style={{ paddingTop: "56.25%" }}
            >
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${selectedVideo.id.videoId}`}
                title={selectedVideo.snippet.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-4">
              <p className="text-xl font-bold">
                {selectedVideo.snippet.channelTitle}
              </p>
              <p className="text-sm text-gray-600">
                {selectedVideo.snippet.description}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                {formatDate(selectedVideo.snippet.publishTime)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gaming;
