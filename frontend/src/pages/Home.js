import React from "react";
import Feed from "../components/Feed";
import PhotoUpload from "../components/PhotoUpload";
import VideoUpload from "../components/VideoUpload";

function Home() {
  return (
    <div>
      <h1>Welcome to Travel Share</h1>
      <PhotoUpload />
      <VideoUpload />
      <Feed />
    </div>
  );
}

export default Home;
