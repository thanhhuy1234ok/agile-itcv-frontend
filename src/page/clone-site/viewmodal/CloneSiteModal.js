"use client";

import { useState, useCallback } from "react";
import { notification } from "antd";

export const useCloneSiteModal = () => {
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(false);

  // Hàm lấy danh sách site
  const fetchSites = useCallback(async () => {
    setLoading(true);
    try {
      // Giả lập API call
      setTimeout(() => {
        setSites([
          {
            id: 1,
            name: "ITViec Clone",
            url: "https://itviec.com",
            status: true,
          },
          {
            id: 2,
            name: "TopCV Clone",
            url: "https://topcv.vn",
            status: true,
          },
        ]);
        setLoading(false);
      }, 1000);
    } catch (error) {
      notification.error({
        message: "Lấy dữ liệu thất bại",
        description: error.message || "Không thể lấy danh sách site.",
      });
      setLoading(false);
    }
  }, []);

  // Hàm thêm site mới
  const addNewSite = async (siteData) => {
    try {
      // Giả lập API call
      return new Promise((resolve) => {
        setTimeout(() => {
          const newSite = {
            id: sites.length + 1,
            ...siteData,
            status: true,
          };
          setSites([...sites, newSite]);
          resolve({
            code: 1,
            data: newSite,
            message: "Thêm site thành công",
          });
        }, 1000);
      });
    } catch (error) {
      throw new Error(error.message || "Thêm site thất bại.");
    }
  };

  // Hàm xóa site
  const deleteSite = async (id) => {
    try {
      // Giả lập API call
      return new Promise((resolve) => {
        setTimeout(() => {
          setSites(sites.filter((site) => site.id !== id));
          resolve({
            code: 1,
            message: "Xóa site thành công",
          });
        }, 1000);
      });
    } catch (error) {
      throw new Error(error.message || "Xóa site thất bại.");
    }
  };

  return {
    sites,
    loading,
    fetchSites,
    addNewSite,
    deleteSite,
  };
};
