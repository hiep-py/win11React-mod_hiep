import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Icon, Image, ToolBar, LazyComponent } from "../../../utils/general";
import "./assets/steam.scss";
import steamGames from "./assets/steam-games.json";

export const Steam = () => {
  const wnapp = useSelector((state) => state.apps.steam);
  const dispatch = useDispatch();
  const [tab, setTab] = useState("library");
  const [selectedGame, setSelectedGame] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredGames, setFilteredGames] = useState(steamGames);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredGames(steamGames);
    } else {
      const filtered = steamGames.filter((game) =>
        game.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredGames(filtered);
    }
  }, [searchQuery]);

  const openGameDetails = (game) => {
    setSelectedGame(game);
  };

  const closeGameDetails = () => {
    setSelectedGame(null);
  };

  return (
    <div
      className="steam-app floatTab dpShad"
      data-size={wnapp.size}
      data-max={wnapp.max}
      style={{
        ...(wnapp.size == "cstm" ? wnapp.dim : null),
        zIndex: wnapp.z,
      }}
      data-hide={wnapp.hide}
      id={wnapp.icon + "App"}
    >
      <ToolBar
        app={wnapp.action}
        icon={wnapp.icon}
        size={wnapp.size}
        name="Steam"
      />
      <div className="windowScreen flex">
        <LazyComponent show={!wnapp.hide}>
          <div className="steam-container">
            <div className="steam-sidebar">
              <div className="steam-logo">
                <img src="./img/steam/logo.png" alt="Steam Logo" />
              </div>
              <div className="steam-nav">
                <div 
                  className={`nav-item ${tab === "library" ? "active" : ""}`}
                  onClick={() => setTab("library")}
                >
                  <Icon fafa="faGamepad" />
                  <span>Thư viện</span>
                </div>
                <div 
                  className={`nav-item ${tab === "store" ? "active" : ""}`}
                  onClick={() => setTab("store")}
                >
                  <Icon fafa="faStore" />
                  <span>Cửa hàng</span>
                </div>
                <div 
                  className={`nav-item ${tab === "community" ? "active" : ""}`}
                  onClick={() => setTab("community")}
                >
                  <Icon fafa="faUsers" />
                  <span>Cộng đồng</span>
                </div>
                <div 
                  className={`nav-item ${tab === "profile" ? "active" : ""}`}
                  onClick={() => setTab("profile")}
                >
                  <Icon fafa="faUser" />
                  <span>Hồ sơ</span>
                </div>
              </div>
            </div>
            <div className="steam-content">
              {selectedGame ? (
                <GameDetails game={selectedGame} onClose={closeGameDetails} />
              ) : (
                <>
                  <div className="steam-header">
                    <div className="search-bar">
                      <input
                        type="text"
                        placeholder="Tìm kiếm game..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <Icon fafa="faSearch" />
                    </div>
                    <div className="header-actions">
                      <Icon fafa="faCog" />
                      <Icon fafa="faDownload" />
                      <div className="user-info">
                        <img src="./img/steam/avatar.jpg" alt="User Avatar" />
                        <span>Win11User</span>
                      </div>
                    </div>
                  </div>
                  {tab === "library" && (
                    <LibraryTab games={filteredGames} onGameClick={openGameDetails} />
                  )}
                  {tab === "store" && (
                    <StoreTab games={filteredGames} onGameClick={openGameDetails} />
                  )}
                  {tab === "community" && <CommunityTab />}
                  {tab === "profile" && <ProfileTab />}
                </>
              )}
            </div>
          </div>
        </LazyComponent>
      </div>
    </div>
  );
};

const LibraryTab = ({ games, onGameClick }) => {
  return (
    <div className="library-container">
      <h2>Thư viện game của bạn</h2>
      <div className="games-grid">
        {games.map((game) => (
          <div key={game.id} className="game-card" onClick={() => onGameClick(game)}>
            <div className="game-image">
              <img src={game.coverImage} alt={game.title} />
            </div>
            <div className="game-info">
              <h3>{game.title}</h3>
              <div className="game-meta">
                <span className="playtime">{game.playtime || "0"} giờ chơi</span>
                <span className="last-played">{game.lastPlayed || "Chưa chơi"}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const StoreTab = ({ games, onGameClick }) => {
  return (
    <div className="store-container">
      <div className="featured-section">
        <h2>Khuyến nghị & Nổi bật</h2>
        <div className="featured-carousel">
          {games.slice(0, 3).map((game) => (
            <div key={game.id} className="featured-item" onClick={() => onGameClick(game)}>
              <img src={game.coverImage} alt={game.title} />
              <div className="featured-info">
                <h3>{game.title}</h3>
                <p>{game.shortDescription}</p>
                <div className="price">{game.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="categories-section">
        <h2>Danh mục phổ biến</h2>
        <div className="categories-list">
          <div className="category">Hành động</div>
          <div className="category">Phiêu lưu</div>
          <div className="category">Nhập vai</div>
          <div className="category">Indie</div>
          <div className="category">Chiến thuật</div>
          <div className="category">Thể thao & Đua xe</div>
        </div>
      </div>
      <div className="new-releases">
        <h2>Game mới phát hành</h2>
        <div className="games-grid">
          {games.slice(3, 9).map((game) => (
            <div key={game.id} className="store-game-card" onClick={() => onGameClick(game)}>
              <img src={game.coverImage} alt={game.title} />
              <h3>{game.title}</h3>
              <div className="price">{game.price}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const CommunityTab = () => {
  return (
    <div className="community-container">
      <h2>Cộng đồng Steam</h2>
      <div className="community-section">
        <div className="community-card">
          <h3>Hoạt động bạn bè</h3>
          <div className="activity-list">
            <div className="activity-item">
              <img src="./img/steam/avatar.jpg" alt="User Avatar" />
              <div className="activity-info">
                <span className="user-name">FriendUser1</span> đang chơi <span className="game-name">Counter-Strike 2</span>
              </div>
            </div>
            <div className="activity-item">
              <img src="./img/steam/avatar.jpg" alt="User Avatar" />
              <div className="activity-info">
                <span className="user-name">FriendUser2</span> đã mua <span className="game-name">Baldur's Gate 3</span>
              </div>
            </div>
          </div>
        </div>
        <div className="community-card">
          <h3>Tin tức nổi bật</h3>
          <div className="news-list">
            <div className="news-item">
              <h4>Cập nhật mùa hè 2023</h4>
              <p>Steam đã ra mắt nhiều tính năng mới trong cập nhật mùa hè 2023...</p>
            </div>
            <div className="news-item">
              <h4>Sale mùa hè sắp bắt đầu</h4>
              <p>Chuẩn bị ví tiền của bạn! Sale mùa hè sẽ bắt đầu vào tuần tới...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileTab = () => {
  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar">
          <img src="./img/steam/avatar.jpg" alt="User Avatar" />
        </div>
        <div className="profile-info">
          <h2>Win11User</h2>
          <div className="profile-status">Online</div>
          <div className="profile-level">Level 10</div>
        </div>
      </div>
      <div className="profile-stats">
        <div className="stats-card">
          <h3>Thành tựu</h3>
          <div className="stats-value">156/1000</div>
        </div>
        <div className="stats-card">
          <h3>Game đã sở hữu</h3>
          <div className="stats-value">25</div>
        </div>
        <div className="stats-card">
          <h3>Nhận xét</h3>
          <div className="stats-value">12</div>
        </div>
        <div className="stats-card">
          <h3>Bạn bè</h3>
          <div className="stats-value">32</div>
        </div>
      </div>
      <div className="recent-activity">
        <h3>Hoạt động gần đây</h3>
        <div className="activity-list">
          <div className="activity-item">
            <div className="activity-icon">
              <Icon fafa="faTrophy" />
            </div>
            <div className="activity-info">
              <span className="activity-text">Đã đạt được thành tựu "First Win" trong Counter-Strike 2</span>
              <span className="activity-time">2 giờ trước</span>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon">
              <Icon fafa="faGamepad" />
            </div>
            <div className="activity-info">
              <span className="activity-text">Đã chơi Dota 2 trong 2 giờ</span>
              <span className="activity-time">Hôm qua</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const GameDetails = ({ game, onClose }) => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="game-details">
      <div className="details-header">
        <button className="back-button" onClick={onClose}>
          <Icon fafa="faArrowLeft" />
        </button>
        <h2>{game.title}</h2>
      </div>
      <div className="details-content">
        <div className="details-main">
          <div className="main-image">
            <img src={game.coverImage} alt={game.title} />
          </div>
          <div className="tabs">
            <div 
              className={`tab ${activeTab === "overview" ? "active" : ""}`} 
              onClick={() => setActiveTab("overview")}
            >
              Tổng quan
            </div>
            <div 
              className={`tab ${activeTab === "dlc" ? "active" : ""}`}
              onClick={() => setActiveTab("dlc")}
            >
              DLC
            </div>
            <div 
              className={`tab ${activeTab === "achievements" ? "active" : ""}`}
              onClick={() => setActiveTab("achievements")}
            >
              Thành tựu
            </div>
          </div>
          {activeTab === "overview" && (
            <div className="overview-content">
              <div className="description">
                <h3>Mô tả</h3>
                <p>{game.description}</p>
              </div>
              <div className="meta-info">
                <div className="info-item">
                  <span className="label">Phát hành:</span>
                  <span className="value">{game.releaseDate}</span>
                </div>
                <div className="info-item">
                  <span className="label">Nhà phát triển:</span>
                  <span className="value">{game.developer}</span>
                </div>
                <div className="info-item">
                  <span className="label">Nhà phát hành:</span>
                  <span className="value">{game.publisher}</span>
                </div>
                <div className="info-item">
                  <span className="label">Thể loại:</span>
                  <span className="value">{game.genres.join(", ")}</span>
                </div>
              </div>
              <div className="screenshots">
                <h3>Ảnh chụp màn hình</h3>
                <div className="screenshots-grid">
                  {game.screenshots && game.screenshots.map((screenshot, index) => (
                    <div key={index} className="screenshot">
                      <img src={screenshot} alt={`Screenshot ${index + 1}`} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {activeTab === "dlc" && (
            <div className="dlc-content">
              <h3>Nội dung tải xuống có sẵn</h3>
              {game.dlc ? (
                <div className="dlc-list">
                  {game.dlc.map((item, index) => (
                    <div key={index} className="dlc-item">
                      <img src={item.image} alt={item.name} />
                      <div className="dlc-info">
                        <h4>{item.name}</h4>
                        <p>{item.description}</p>
                        <div className="dlc-price">{item.price}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>Không có DLC nào cho game này.</p>
              )}
            </div>
          )}
          {activeTab === "achievements" && (
            <div className="achievements-content">
              <h3>Thành tựu</h3>
              {game.achievements ? (
                <div className="achievements-list">
                  {game.achievements.map((achievement, index) => (
                    <div key={index} className="achievement-item">
                      <div className="achievement-icon">
                        <img src={achievement.icon} alt={achievement.name} />
                      </div>
                      <div className="achievement-info">
                        <h4>{achievement.name}</h4>
                        <p>{achievement.description}</p>
                        <div className="achievement-rarity">{achievement.rarity}% người chơi đạt được</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>Không có thành tựu nào cho game này.</p>
              )}
            </div>
          )}
        </div>
        <div className="details-sidebar">
          <div className="purchase-section">
            <div className="price-info">
              <div className="price">{game.price}</div>
              {game.discount && (
                <div className="discount">-{game.discount}%</div>
              )}
            </div>
            <button className="install-button">
              {game.installed ? "Chơi ngay" : "Cài đặt"}
            </button>
            <button className="wishlist-button">
              <Icon fafa="faHeart" /> Thêm vào danh sách mong muốn
            </button>
          </div>
          <div className="system-requirements">
            <h3>Yêu cầu hệ thống</h3>
            <div className="requirements-section">
              <h4>Tối thiểu:</h4>
              <ul>
                {game.systemRequirements?.minimum.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
            <div className="requirements-section">
              <h4>Đề nghị:</h4>
              <ul>
                {game.systemRequirements?.recommended.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 