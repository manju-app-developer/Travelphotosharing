import React, { useState } from "react";

function PhotoUpload() {
  const [photo, setPhoto] = useState(null);
  const [caption, setCaption] = useState("");

  const handleUpload = async () => {
    if (!photo) return alert("Please select a photo");

    const formData = new FormData();
    formData.append("image", photo);
    formData.append("caption", caption);

    const response = await fetch("http://localhost:5000/api/photos/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    alert(data.message);
  };

  return (
    <div>
      <input type="file" onChange={(e) => setPhoto(e.target.files[0])} />
      <input type="text" placeholder="Caption" value={caption} onChange={(e) => setCaption(e.target.value)} />
      <button onClick={handleUpload}>Upload Photo</button>
    </div>
  );
}

export default PhotoUpload;
