import * as SQLite from "expo-sqlite";

// Hàm khởi tạo Database và tạo bảng
export const initDB = async () => {
  const db = await SQLite.openDatabaseAsync("socialapp.db");
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS users (
      email TEXT PRIMARY KEY,
      password TEXT,
      name TEXT,
      address TEXT,
      avatarUrl TEXT,
      description TEXT
    );
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      content TEXT,
      authorEmail TEXT,
      timestamp TEXT,
      FOREIGN KEY (authorEmail) REFERENCES users(email)
    );
  `);
};

export const getUserByEmail = async (email) => {
  const db = await SQLite.openDatabaseAsync("socialapp.db");
  return await db.getFirstAsync("SELECT * FROM users WHERE email = ?", [email]);
};

export const createUser = async (name, email, password) => {
  const db = await SQLite.openDatabaseAsync("socialapp.db");
  await db.runAsync(
    "INSERT INTO users (email, password, name, address, avatarUrl, description) VALUES (?, ?, ?, ?, ?, ?)",
    [email, password, name, "", "", ""],
  );
};

export const updateUserProfile = async (
  email,
  name,
  address,
  avatarUrl,
  description,
) => {
  const db = await SQLite.openDatabaseAsync("socialapp.db");
  await db.runAsync(
    "UPDATE users SET name = ?, address = ?, avatarUrl = ?, description = ? WHERE email = ?",
    [name, address, avatarUrl, description, email],
  );
};

export const createPost = async (title, content, authorEmail, timestamp) => {
  const db = await SQLite.openDatabaseAsync("socialapp.db");
  await db.runAsync(
    "INSERT INTO posts (title, content, authorEmail, timestamp) VALUES (?, ?, ?, ?)",
    [title, content, authorEmail, timestamp],
  );
};

export const getAllPosts = async () => {
  const db = await SQLite.openDatabaseAsync("socialapp.db");
  return await db.getAllAsync(`
    SELECT p.*, u.name as authorName, u.avatarUrl as authorAvatar 
    FROM posts p 
    LEFT JOIN users u ON p.authorEmail = u.email 
    ORDER BY p.id DESC
  `);
};

export const clearAllData = async () => {
  const db = await SQLite.openDatabaseAsync("socialapp.db");
  await db.execAsync("DELETE FROM posts; DELETE FROM users;");
};
