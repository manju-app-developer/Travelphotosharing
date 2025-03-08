import React, { useState } from "react";

function VideoUpload() {
  const [video, setVideo] = useState(null);
  const [caption, setCaption] = useState("");

  const handleUpload = async () => {
    if (!video) return alert("Please select a video");

    const formData = new FormData();
    formData.append("video", video);
    formData.append("caption", caption);

    const response = await fetch("http://localhost:5000/api/videos/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    alert(data.message);
  };

  return (
    <div>
      <input type="file" onChange={(e) => setVideo(e.target.files[0])} />
      <input type="text" placeholder="Caption" value={caption} onChange={(e) => setCaption(e.target.value)} />
      <button onClick={handleUpload}>Upload Video</button>
    </div>
  );
}

export default VideoUpload;
