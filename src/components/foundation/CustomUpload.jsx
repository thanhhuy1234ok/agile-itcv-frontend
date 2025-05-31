import React, { useState, useEffect } from "react";
import { Upload, message } from "antd";
import { UploadOutlined, LoadingOutlined } from "@ant-design/icons";
import { uploadImage } from '@/services/api';  

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("Chỉ cho phép file JPG/PNG!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Ảnh phải nhỏ hơn 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const getBase64 = (file, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(file);
};

const UploadLogo = ({ value = [], onChange }) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (value.length > 0) {
      const file = value[0];
      if (file.url) {
        setImageUrl(file.url);
      } else if (file.originFileObj) {
        getBase64(file.originFileObj, (url) => setImageUrl(url));
      }
    } else {
      setImageUrl(null);
    }
  }, [value]);

  const customUpload = async ({ file, onSuccess, onError }) => {
  setLoading(true);
  try {
    const res = await uploadImage(file);
    const imageUrl = res.data.imageUrl;

    onSuccess({ url: imageUrl }, file);
    setImageUrl(imageUrl);

    if (onChange) {
      onChange([
        {
          uid: file.uid,
          name: file.name,
          status: 'done',
          url: imageUrl,
        },
      ]);
    }
  } catch (error) {
    message.error("Upload ảnh thất bại!");
    onError(error);
  } finally {
    setLoading(false);
  }
};


  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      const url = info.file.url || info.file.response?.url || "";
      setLoading(false);
      setImageUrl(url);
      if (onChange) {
        onChange(info.fileList);
      }
    }
    if (info.file.status === "removed") {
      setImageUrl(null);
      if (onChange) {
        onChange(info.fileList);
      }
    }
  };

  return (
    <Upload
      listType="picture-card"
      fileList={value}
      beforeUpload={beforeUpload}
      onChange={handleChange}
      maxCount={1}
      showUploadList={false}
      customRequest={customUpload} 
    >
      {imageUrl ? (
        <img src={imageUrl} alt="logo" style={{ width: "100%" }} />
      ) : loading ? (
        <LoadingOutlined />
      ) : (
        <div>
          <UploadOutlined />
          <div style={{ marginTop: 8 }}>Tải lên logo</div>
        </div>
      )}
    </Upload>
  );
};

export default UploadLogo;
