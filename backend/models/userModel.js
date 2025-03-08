import db from "../config/db.js";

// Create Users table if not exists
const createUserTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  await db.query(query);
};

createUserTable().catch((err) => console.error("Error creating users table:", err));

export default {
  async createUser(username, email, password) {
    const { rows } = await db.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
      [username, email, password]
    );
    return rows[0];
  },

  async findUserByEmail(email) {
    const { rows } = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    return rows[0];
  },

  async findUserById(id) {
    const { rows } = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    return rows[0];
  }
};
