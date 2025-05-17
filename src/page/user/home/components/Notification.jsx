import { Badge } from "antd";

const Notification = () => {
  return (
    <section className="notification-section">
      <div className="notification-container">
        <div className="notification-content">
          <Badge status="processing" color="#ff0000" />
          <span className="notification-text">
            Chúng phải lựa mới nhận việc - Lý do để nơi việc và cơ sở hội nhận
            khi IT-Viec đều quyết!
          </span>
        </div>
      </div>
    </section>
  );
};

export default Notification;
