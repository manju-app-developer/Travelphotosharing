import db from "../config/db.js";

// Create Photos table if not exists
const createPhotoTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS photos (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      image_url TEXT NOT NULL,
      caption TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  await db.query(query);
};

createPhotoTable().catch((err) => console.error("Error creating photos table:", err));

export default {
  async addPhoto(user_id, image_url, caption) {
    const { rows } = await db.query(
      "INSERT INTO photos (user_id, image_url, caption) VALUES ($1, $2, $3) RETURNING *",
      [user_id, image_url, caption]
    );
    return rows[0];
  },

  async getAllPhotos() {
    const { rows } = await db.query("SELECT * FROM photos ORDER BY created_at DESC");
    return rows;
  }
};
