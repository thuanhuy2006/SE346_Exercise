const BASE_URL = "http://blackntt.net:4321";

// 1. Đăng ký (Register)
export const apiRegister = async (email, password, name, description = "") => {
  const response = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, name, description }),
  });
  if (!response.ok) throw new Error("Đăng ký thất bại");
  return await response.json();
};

// 2. Đăng nhập (Login) - API yêu cầu truyền qua Query Parameters
export const apiLogin = async (email, password) => {
  const response = await fetch(
    `${BASE_URL}/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
    {
      method: "POST",
    },
  );
  if (!response.ok) throw new Error("Sai tài khoản hoặc mật khẩu");
  return await response.json();
};

// 3. Lấy Profile (Get User Profile)
export const apiGetProfile = async (email) => {
  const response = await fetch(
    `${BASE_URL}/profile/${encodeURIComponent(email)}`,
  );
  if (!response.ok) throw new Error("Không tìm thấy thông tin");
  return await response.json();
};

// 4. Tạo bài viết (Create Post)
export const apiCreatePost = async (title, description, creator_email) => {
  const response = await fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description, creator_email }),
  });
  if (!response.ok) throw new Error("Không thể đăng bài");
  return await response.json();
};

// 5. Lấy danh sách bài viết (Get All Posts)
export const apiGetAllPosts = async () => {
  const response = await fetch(`${BASE_URL}/posts`);
  if (!response.ok) throw new Error("Lỗi lấy danh sách bài viết");
  return await response.json();
};

// 6 & 7. Xóa bài viết (Delete a Post)
export const apiDeletePost = async (post_id) => {
  const response = await fetch(`${BASE_URL}/posts/${post_id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Không thể xóa bài viết");
  return await response.json();
};
export default function ApiScreen() {
  return null;
}
