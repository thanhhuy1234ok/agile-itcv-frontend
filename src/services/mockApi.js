export const getAdminStats = async () => {
    return {
      code: 1,
      data: {
        totalUsers: 150,
        totalRevenue: 32000000,
        totalBookings: 420,
        activeRooms: 75,
      },
    };
  };
  
  export const getUsers = async () => {
    return {
      code: 1,
      data: [
        { id: 1, name: "Nguyễn Văn A", email: "a@example.com", role: "admin" },
        { id: 2, name: "Trần Thị B", email: "b@example.com", role: "customer" },
        { id: 3, name: "Lê Văn C", email: "c@example.com", role: "receptionist" },
      ],
    };
  };
  
  export const getSettings = async () => {
    return {
      code: 1,
      data: [
        { id: "maintenance_mode", name: "Bảo trì", value: false },
        { id: "max_booking_per_day", name: "Số lượt đặt tối đa mỗi ngày", value: 10 },
        { id: "support_email", name: "Email hỗ trợ", value: "support@example.com" },
      ],
    };
  };
  
  export const updateSystemSetting = async (id, value) => {
    console.log(`Mock update: ${id} = ${value}`);
    return {
      code: 1,
      message: "Cập nhật thành công",
    };
  };
  