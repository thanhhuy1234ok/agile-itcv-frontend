// Mock API service để phát triển khi chưa có backend

// Danh sách người dùng mẫu
const mockUsers = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@example.com",
    password: "admin123",
    phone: "0123456789",
    role: "admin",
    status: true,
  },
  {
    id: 2,
    name: "Test User",
    email: "user@example.com",
    password: "user123",
    phone: "0987654321",
    role: "user",
    status: true,
  },
];

// Mock login API
export const mockLogin = async ({ email, password }) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = mockUsers.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        // Trả về thành công
        resolve({
          code: 1,
          data: {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
          },
          access_Token: "mock-jwt-token-" + Date.now(),
          message: "Đăng nhập thành công",
        });
      } else {
        // Trả về thất bại
        resolve({
          code: 0,
          message: "Email hoặc mật khẩu không đúng",
        });
      }
    }, 500); // Giả lập độ trễ mạng
  });
};

// Mock register API
export const mockRegister = async (userData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Kiểm tra email đã tồn tại chưa
      const existingUser = mockUsers.find((u) => u.email === userData.email);

      if (existingUser) {
        resolve({
          code: 0,
          message: "Email đã được sử dụng",
        });
      } else {
        // Thêm người dùng mới
        const newUser = {
          id: mockUsers.length + 1,
          ...userData,
          role: "user",
          status: true,
        };

        mockUsers.push(newUser);

        resolve({
          code: 1,
          message: "Đăng ký thành công",
          data: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
          },
        });
      }
    }, 500);
  });
};

// Các API mock khác có thể thêm vào đây
