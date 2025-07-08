import { Row, Col, Typography, Image, Divider } from "antd";
import {
  FacebookFilled,
  InstagramFilled,
  YoutubeFilled,
} from "@ant-design/icons";

const { Text, Title } = Typography;

const Footer = () => {
  return (
    <div
      style={{
        background: "linear-gradient(to right, #000000, #a32020)",
        padding: "40px",
        color: "white",
      }}
    >
      <Row gutter={[32, 16]}>
        <Col span={8}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Image
              src="https://itviec.com/assets/logo-itviec-4492a2f2577a15a0a1d55444c21c0fa55810822b3b189fc689b450fb62ce0b5b.png"
              alt="Logo"
              width={100}
              preview={false}
            />
            <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
              Ít nhưng mà chất
            </Text>
            <div style={{ marginTop: 12 }}>
              <FacebookFilled style={{ fontSize: 30, color: "#fff", marginRight: 12 }} />
              <InstagramFilled style={{ fontSize: 30, color: "#fff", marginRight: 12 }} />
              <YoutubeFilled style={{ fontSize: 30, color: "#fff" }} />
            </div>
          </div>
        </Col>

        <Col span={16}>
          <Row gutter={[16, 8]}>
            <Col span={6}>
              <Title level={5} style={{ color: "white", margin: 0, padding: 0 }}>Về chúng tôi</Title>
              <div style={{ marginTop: 20}}>
                <Text style={{ color: "#ccc", display: "block", marginBottom: 10 }}>Giới thiệu</Text>
                <Text style={{ color: "#ccc", display: "block", marginBottom: 10  }}>Tuyển dụng</Text>
              </div>
            </Col>
            <Col span={6}>
              <Title level={5} style={{ color: "white", margin: 0, padding: 0 }}>Liên hệ</Title>
              <div style={{ marginTop: 20}}>
                <Text style={{ color: "#ccc", display: "block", marginBottom: 10 }}>Email</Text>
                <Text style={{ color: "#ccc", display: "block", marginBottom: 10 }}>Facebook</Text>
              </div>
            </Col>
            <Col span={6}>
              <Title level={5} style={{ color: "white", margin: 0, padding: 0 }}>Chính sách</Title>
              <div style={{ marginTop: 20}}>
                <Text style={{ color: "#ccc", display: "block", marginBottom: 10 }}>Bảo mật</Text>
                <Text style={{ color: "#ccc", display: "block", marginBottom: 10 }}>Điều khoản</Text>
              </div>
            </Col>
            <Col span={6}>
              <Title level={5} style={{ color: "white", margin: 0, padding: 0 }}>Hỗ trợ</Title>
              <div style={{ marginTop: 20}}>
                <Text style={{ color: "#ccc", display: "block", marginBottom: 10 }}>Trợ giúp</Text>
                <Text style={{ color: "#ccc", display: "block", marginBottom: 10 }}>Câu hỏi thường gặp</Text>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>

      <Divider
        style={{
          borderTop: "1px solid rgba(255, 255, 255, 0.3)", 
          margin: "30px 0",
        }}
      />

      <div style={{ textAlign: "center", color: "#ccc" }}>
        © 2025 My App - All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
