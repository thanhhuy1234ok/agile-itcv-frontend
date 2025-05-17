"use client";

import { useState, useCallback } from "react";
import { notification } from "antd";
import {
  getAdminStats,
  getUsers,
  getSettings,
  updateSystemSetting,
} from "@/services/mockApi";

export const useAdminHomepageModal = () => {
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [settings, setSettings] = useState([]);
  const [loading, setLoading] = useState({
    stats: false,
    users: false,
    settings: false,
  });

  const fetchStats = useCallback(async () => {
    setLoading((prev) => ({ ...prev, stats: true }));
    try {
      const response = await getAdminStats();
      if (response.code === 1) {
        setStats(response.data || {});
      } else {
        notification.error({
          message: "Lấy thống kê thất bại",
          description: response.message || "Không thể lấy thống kê hệ thống.",
        });
      }
    } catch (error) {
      notification.error({
        message: "Lỗi kết nối",
        description: error.message || "Không thể kết nối đến máy chủ.",
      });
    } finally {
      setLoading((prev) => ({ ...prev, stats: false }));
    }
  }, []);

  const fetchUsers = useCallback(async () => {
    setLoading((prev) => ({ ...prev, users: true }));
    try {
      const response = await getUsers();
      if (response.code === 1) {
        setUsers(response.data || []);
      } else {
        notification.error({
          message: "Lấy danh sách người dùng thất bại",
          description:
            response.message || "Không thể lấy danh sách người dùng.",
        });
      }
    } catch (error) {
      notification.error({
        message: "Lỗi kết nối",
        description: error.message || "Không thể kết nối đến máy chủ.",
      });
    } finally {
      setLoading((prev) => ({ ...prev, users: false }));
    }
  }, []);

  const fetchSettings = useCallback(async () => {
    setLoading((prev) => ({ ...prev, settings: true }));
    try {
      const response = await getSettings();
      if (response.code === 1) {
        setSettings(response.data || []);
      } else {
        notification.error({
          message: "Lấy cài đặt thất bại",
          description: response.message || "Không thể lấy cài đặt hệ thống.",
        });
      }
    } catch (error) {
      notification.error({
        message: "Lỗi kết nối",
        description: error.message || "Không thể kết nối đến máy chủ.",
      });
    } finally {
      setLoading((prev) => ({ ...prev, settings: false }));
    }
  }, []);

  const updateSetting = async (id, value) => {
    try {
      const response = await updateSystemSetting(id, value);
      if (response.code === 1) {
        notification.success({
          message: "Cập nhật thành công",
          description: "Cài đặt đã được cập nhật thành công.",
        });

        // Cập nhật state
        setSettings(
          settings.map((setting) =>
            setting.id === id ? { ...setting, value } : setting
          )
        );

        return true;
      } else {
        notification.error({
          message: "Cập nhật thất bại",
          description: response.message || "Không thể cập nhật cài đặt.",
        });
        return false;
      }
    } catch (error) {
      notification.error({
        message: "Lỗi kết nối",
        description: error.message || "Không thể kết nối đến máy chủ.",
      });
      return false;
    }
  };

  return {
    stats,
    users,
    settings,
    loading,
    fetchStats,
    fetchUsers,
    fetchSettings,
    updateSetting,
  };
};
