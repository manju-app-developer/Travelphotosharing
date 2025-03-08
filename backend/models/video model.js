import db from "../config/db.js";

// Create Videos table if not exists
const createVideoTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS videos (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      video_url TEXT NOT NULL,
      caption TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  await db.query(query);
};

createVideoTable().catch((err) => console.error("Error creating videos table:", err));

export default {
  async addVideo(user_id, video_url, caption) {
    const { rows } = await db.query(
      "INSERT INTO videos (user_id, video_url, caption) VALUES ($1, $2, $3) RETURNING *",
      [user_id, video_url, caption]
    );
    return rows[0];
  },

  async getAllVideos() {
    const { rows } = await db.query("SELECT * FROM videos ORDER BY created_at DESC");
    return rows;
  }
};
