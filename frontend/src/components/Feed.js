import React, { useEffect, useState } from "react";

function Feed() {
  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/photos")
      .then((res) => res.json())
      .then((data) => setPhotos(data));

    fetch("http://localhost:5000/api/videos")
      .then((res) => res.json())
      .then((data) => setVideos(data));
  }, []);

  return (
    <div>
      <h3>Photos</h3>
      {photos.map((photo) => (
        <div key={photo.id}>
          <img src={photo.image_url} alt="Uploaded" width="300" />
          <p>{photo.caption}</p>
        </div>
      ))}

      <h3>Videos</h3>
      {videos.map((video) => (
        <div key={video.id}>
          <video width="300" controls>
            <source src={video.video_url} type="video/mp4" />
          </video>
          <p>{video.caption}</p>
        </div>
      ))}
    </div>
  );
}

export default Feed;
