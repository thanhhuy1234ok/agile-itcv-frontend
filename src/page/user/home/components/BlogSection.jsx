import { RightOutlined } from "@ant-design/icons";

const BlogSection = () => {
  return (
    <section className="blog-section">
      <div className="blog-container">
        <div className="blog-header">
          <h2 className="section-title">Bài viết nổi bật</h2>
          <a href="#" className="view-all-link">
            Xem tất cả <RightOutlined />
          </a>
        </div>

        <div className="blog-grid">
          {/* Blog 1 */}
          <div className="blog-card">
            <div className="blog-image">
              <img
                src="/bash-terminal-connection.png"
                alt="Bash reverse shell"
              />
            </div>
            <div className="blog-content">
              <h3 className="blog-title">
                Bash reverse shell là gì: Cách phát hiện và phòng chống reverse
                shell hiệu quả
              </h3>
              <p className="blog-excerpt">
                Reverse shell là một kỹ thuật hacking được sử dụng để thiết lập
                kết nối từ xa đến máy tính mục tiêu và thực thi các lệnh từ
                xa...
              </p>
              <a href="#" className="read-more-link">
                Đọc tiếp <RightOutlined />
              </a>
            </div>
          </div>

          {/* Blog 2 */}
          <div className="blog-card">
            <div className="blog-image">
              <img src="/dart-code-flow.png" alt="Dart programming language" />
            </div>
            <div className="blog-content">
              <h3 className="blog-title">
                Bài toán tìm kiếm trong Dart: Synchronous và asynchronous trong
                Dart
              </h3>
              <p className="blog-excerpt">
                Dart là một ngôn ngữ lập trình được phát triển bởi Google, được
                sử dụng chủ yếu để xây dựng ứng dụng di động, web và desktop...
              </p>
              <a href="#" className="read-more-link">
                Đọc tiếp <RightOutlined />
              </a>
            </div>
          </div>

          {/* Blog 3 */}
          <div className="blog-card">
            <div className="blog-image">
              <img
                src="/placeholder.svg?height=200&width=350&query=it career path"
                alt="IT career path"
              />
            </div>
            <div className="blog-content">
              <h3 className="blog-title">
                Bốn Điều Cần Biết Về Công Nghệ 2023: AI, Xu Hướng, Biến Động...
              </h3>
              <p className="blog-excerpt">
                Năm 2023 đánh dấu nhiều thay đổi lớn trong ngành công nghệ thông
                tin, từ sự bùng nổ của AI đến những biến động về nhân sự...
              </p>
              <a href="#" className="read-more-link">
                Đọc tiếp <RightOutlined />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
