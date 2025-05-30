import { EnvironmentOutlined, SearchOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchJob = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const navigate = useNavigate();

  const buildSearchParams = () => {
    const params = new URLSearchParams();
    params.set('page', 1);

    if (searchKeyword.trim()) params.set('name', searchKeyword.trim());
    if (searchLocation.trim()) params.set('location', searchLocation.trim());

    return params.toString();
  };

  const handleSearch = () => {
    const query = buildSearchParams();
    navigate(`/it-jobs?${query}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const query = buildSearchParams();
      navigate(`/it-jobs?${query}`);
    }
  };

  return (
    <section className="hero-section">
      <div className="hero-container">
        <h1 className="hero-title">977 Việc làm IT cho Developer "Chất"</h1>
        <div className="search-container">
          <div className="search-input-group">
            <div className="search-input keyword">
              <SearchOutlined className="search-icon" />
              <input
                type="text"
                placeholder="VP kỹ sư, React..."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            <div className="search-input location">
              <EnvironmentOutlined className="search-icon" />
              <input
                type="text"
                placeholder="Thành phố hoặc địa điểm, VD: Hà Nội, quận 2..."
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>
          <Button type="primary" className="search-button" onClick={handleSearch}>
            Tìm kiếm
          </Button>
        </div>
        <div className="search-tags">
          <span className="tag-label">Gợi ý cho bạn:</span>
          {['React/JS', 'Java', 'Python', '.NET', 'NodeJs'].map((skill) => (
            <a
              key={skill}
              className="search-tag"
              onClick={() =>
                navigate(`/it-jobs?page=1&skill=${encodeURIComponent(skill)}`)
              }
              style={{ cursor: 'pointer' }}
            >
              {skill}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SearchJob;
