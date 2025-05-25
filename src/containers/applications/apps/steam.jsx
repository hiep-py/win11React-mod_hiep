import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Icon, Image, ToolBar, LazyComponent } from "../../../utils/general";
import "./assets/steam.scss";
import steamGames from "./assets/steam-games.json";

// Định nghĩa các bản dịch
const translations = {
  en: {
    library: "Library",
    store: "Store",
    community: "Community",
    profile: "Profile",
    search: "Search games...",
    yourLibrary: "Your Game Library",
    hoursPlayed: "hours played",
    notPlayed: "Not played",
    featured: "Featured & Recommended",
    popularCategories: "Popular Categories",
    action: "Action",
    adventure: "Adventure",
    rpg: "RPG",
    indie: "Indie",
    strategy: "Strategy",
    sports: "Sports & Racing",
    newReleases: "New Releases",
    communityHub: "Steam Community",
    friendActivity: "Friend Activity",
    playing: "is playing",
    purchased: "purchased",
    news: "Featured News",
    summerUpdate: "Summer 2023 Update",
    summerUpdateDesc: "Steam has launched many new features in the summer 2023 update...",
    summerSale: "Summer Sale Coming Soon",
    summerSaleDesc: "Get your wallet ready! The summer sale starts next week...",
    achievements: "Achievements",
    gamesOwned: "Games Owned",
    reviews: "Reviews",
    friends: "Friends",
    recentActivity: "Recent Activity",
    achievedIn: "Achieved achievement",
    playedFor: "Played for",
    yesterday: "Yesterday",
    hoursAgo: "hours ago",
    overview: "Overview",
    dlc: "DLC",
    achievementsTab: "Achievements",
    description: "Description",
    release: "Release:",
    developer: "Developer:",
    publisher: "Publisher:",
    genres: "Genres:",
    screenshots: "Screenshots",
    availableDLC: "Available Downloadable Content",
    noDLC: "No DLC available for this game.",
    noAchievements: "No achievements available for this game.",
    ofPlayersEarned: "of players earned",
    systemRequirements: "System Requirements",
    minimum: "Minimum:",
    recommended: "Recommended:",
    playNow: "Play Now",
    install: "Install",
    addToWishlist: "Add to Wishlist",
    priceInfo: "Price Info",
    level: "Level",
    online: "Online",
    in: "in"
  },
  vi: {
    library: "Thư viện",
    store: "Cửa hàng",
    community: "Cộng đồng",
    profile: "Hồ sơ",
    search: "Tìm kiếm game...",
    yourLibrary: "Thư viện game của bạn",
    hoursPlayed: "giờ chơi",
    notPlayed: "Chưa chơi",
    featured: "Khuyến nghị & Nổi bật",
    popularCategories: "Danh mục phổ biến",
    action: "Hành động",
    adventure: "Phiêu lưu",
    rpg: "Nhập vai",
    indie: "Indie",
    strategy: "Chiến thuật",
    sports: "Thể thao & Đua xe",
    newReleases: "Game mới phát hành",
    communityHub: "Cộng đồng Steam",
    friendActivity: "Hoạt động bạn bè",
    playing: "đang chơi",
    purchased: "đã mua",
    news: "Tin tức nổi bật",
    summerUpdate: "Cập nhật mùa hè 2023",
    summerUpdateDesc: "Steam đã ra mắt nhiều tính năng mới trong cập nhật mùa hè 2023...",
    summerSale: "Sale mùa hè sắp bắt đầu",
    summerSaleDesc: "Chuẩn bị ví tiền của bạn! Sale mùa hè sẽ bắt đầu vào tuần tới...",
    achievements: "Thành tựu",
    gamesOwned: "Game đã sở hữu",
    reviews: "Nhận xét",
    friends: "Bạn bè",
    recentActivity: "Hoạt động gần đây",
    achievedIn: "Đã đạt được thành tựu",
    playedFor: "Đã chơi",
    yesterday: "Hôm qua",
    hoursAgo: "giờ trước",
    overview: "Tổng quan",
    dlc: "DLC",
    achievementsTab: "Thành tựu",
    description: "Mô tả",
    release: "Phát hành:",
    developer: "Nhà phát triển:",
    publisher: "Nhà phát hành:",
    genres: "Thể loại:",
    screenshots: "Ảnh chụp màn hình",
    availableDLC: "Nội dung tải xuống có sẵn",
    noDLC: "Không có DLC nào cho game này.",
    noAchievements: "Không có thành tựu nào cho game này.",
    ofPlayersEarned: "người chơi đạt được",
    systemRequirements: "Yêu cầu hệ thống",
    minimum: "Tối thiểu:",
    recommended: "Đề nghị:",
    playNow: "Chơi ngay",
    install: "Cài đặt",
    addToWishlist: "Thêm vào danh sách mong muốn",
    priceInfo: "Thông tin giá",
    level: "Level",
    online: "Online",
    in: "trong"
  }
};

export const Steam = () => {
  const wnapp = useSelector((state) => state.apps.steam);
  const dispatch = useDispatch();
  const [tab, setTab] = useState("library");
  const [selectedGame, setSelectedGame] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredGames, setFilteredGames] = useState(steamGames);
  const [language, setLanguage] = useState("vi"); // Default language is Vietnamese
  const t = translations[language]; // Get translations based on selected language

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

  const toggleLanguage = () => {
    setLanguage(language === "vi" ? "en" : "vi");
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
                  <span>{t.library}</span>
                </div>
                <div 
                  className={`nav-item ${tab === "store" ? "active" : ""}`}
                  onClick={() => setTab("store")}
                >
                  <Icon fafa="faStore" />
                  <span>{t.store}</span>
                </div>
                <div 
                  className={`nav-item ${tab === "community" ? "active" : ""}`}
                  onClick={() => setTab("community")}
                >
                  <Icon fafa="faUsers" />
                  <span>{t.community}</span>
                </div>
                <div 
                  className={`nav-item ${tab === "profile" ? "active" : ""}`}
                  onClick={() => setTab("profile")}
                >
                  <Icon fafa="faUser" />
                  <span>{t.profile}</span>
                </div>
              </div>
            </div>
            <div className="steam-content">
              {selectedGame ? (
                <GameDetails game={selectedGame} onClose={closeGameDetails} lang={language} t={t} />
              ) : (
                <>
                  <div className="steam-header">
                    <div className="search-bar">
                      <input
                        type="text"
                        placeholder={t.search}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <Icon fafa="faSearch" />
                    </div>
                    <div className="header-actions">
                      <div className="language-toggle" onClick={toggleLanguage}>
                        {language === "vi" ? "EN" : "VI"}
                      </div>
                      <Icon fafa="faCog" />
                      <Icon fafa="faDownload" />
                      <div className="user-info">
                        <img src="./img/steam/avatar.jpg" alt="User Avatar" />
                        <span>Win11User</span>
                      </div>
                    </div>
                  </div>
                  {tab === "library" && (
                    <LibraryTab games={filteredGames} onGameClick={openGameDetails} t={t} />
                  )}
                  {tab === "store" && (
                    <StoreTab games={filteredGames} onGameClick={openGameDetails} t={t} />
                  )}
                  {tab === "community" && <CommunityTab t={t} />}
                  {tab === "profile" && <ProfileTab t={t} />}
                </>
              )}
            </div>
          </div>
        </LazyComponent>
      </div>
    </div>
  );
};

const LibraryTab = ({ games, onGameClick, t }) => {
  return (
    <div className="library-container">
      <h2>{t.yourLibrary}</h2>
      <div className="games-grid">
        {games.map((game) => (
          <div key={game.id} className="game-card" onClick={() => onGameClick(game)}>
            <div className="game-image">
              <img src={game.coverImage} alt={game.title} />
            </div>
            <div className="game-info">
              <h3>{game.title}</h3>
              <div className="game-meta">
                <span className="playtime">{game.playtime || "0"} {t.hoursPlayed}</span>
                <span className="last-played">{game.lastPlayed || t.notPlayed}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const StoreTab = ({ games, onGameClick, t }) => {
  return (
    <div className="store-container">
      <div className="featured-section">
        <h2>{t.featured}</h2>
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
        <h2>{t.popularCategories}</h2>
        <div className="categories-list">
          <div className="category">{t.action}</div>
          <div className="category">{t.adventure}</div>
          <div className="category">{t.rpg}</div>
          <div className="category">{t.indie}</div>
          <div className="category">{t.strategy}</div>
          <div className="category">{t.sports}</div>
        </div>
      </div>
      <div className="new-releases">
        <h2>{t.newReleases}</h2>
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

const CommunityTab = ({ t }) => {
  return (
    <div className="community-container">
      <h2>{t.communityHub}</h2>
      <div className="community-section">
        <div className="community-card">
          <h3>{t.friendActivity}</h3>
          <div className="activity-list">
            <div className="activity-item">
              <img src="./img/steam/avatar.jpg" alt="User Avatar" />
              <div className="activity-info">
                <span className="user-name">FriendUser1</span> {t.playing} <span className="game-name">Counter-Strike 2</span>
              </div>
            </div>
            <div className="activity-item">
              <img src="./img/steam/avatar.jpg" alt="User Avatar" />
              <div className="activity-info">
                <span className="user-name">FriendUser2</span> {t.purchased} <span className="game-name">Baldur's Gate 3</span>
              </div>
            </div>
          </div>
        </div>
        <div className="community-card">
          <h3>{t.news}</h3>
          <div className="news-list">
            <div className="news-item">
              <h4>{t.summerUpdate}</h4>
              <p>{t.summerUpdateDesc}</p>
            </div>
            <div className="news-item">
              <h4>{t.summerSale}</h4>
              <p>{t.summerSaleDesc}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileTab = ({ t }) => {
  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar">
          <img src="./img/steam/avatar.jpg" alt="User Avatar" />
        </div>
        <div className="profile-info">
          <h2>Win11User</h2>
          <div className="profile-status">{t.online}</div>
          <div className="profile-level">{t.level} 10</div>
        </div>
      </div>
      <div className="profile-stats">
        <div className="stats-card">
          <h3>{t.achievements}</h3>
          <div className="stats-value">156/1000</div>
        </div>
        <div className="stats-card">
          <h3>{t.gamesOwned}</h3>
          <div className="stats-value">25</div>
        </div>
        <div className="stats-card">
          <h3>{t.reviews}</h3>
          <div className="stats-value">12</div>
        </div>
        <div className="stats-card">
          <h3>{t.friends}</h3>
          <div className="stats-value">32</div>
        </div>
      </div>
      <div className="recent-activity">
        <h3>{t.recentActivity}</h3>
        <div className="activity-list">
          <div className="activity-item">
            <div className="activity-icon">
              <Icon fafa="faTrophy" />
            </div>
            <div className="activity-info">
              <span className="activity-text">{t.achievedIn} "First Win" {t.in} Counter-Strike 2</span>
              <span className="activity-time">2 {t.hoursAgo}</span>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon">
              <Icon fafa="faGamepad" />
            </div>
            <div className="activity-info">
              <span className="activity-text">{t.playedFor} Dota 2 {t.in} 2 {t.hoursPlayed}</span>
              <span className="activity-time">{t.yesterday}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const GameDetails = ({ game, onClose, lang, t }) => {
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
              {t.overview}
            </div>
            <div 
              className={`tab ${activeTab === "dlc" ? "active" : ""}`}
              onClick={() => setActiveTab("dlc")}
            >
              {t.dlc}
            </div>
            <div 
              className={`tab ${activeTab === "achievements" ? "active" : ""}`}
              onClick={() => setActiveTab("achievements")}
            >
              {t.achievementsTab}
            </div>
          </div>
          {activeTab === "overview" && (
            <div className="overview-content">
              <div className="description">
                <h3>{t.description}</h3>
                <p>{lang === "en" && game.englishDescription ? game.englishDescription : game.description}</p>
              </div>
              <div className="meta-info">
                <div className="info-item">
                  <span className="label">{t.release}</span>
                  <span className="value">{game.releaseDate}</span>
                </div>
                <div className="info-item">
                  <span className="label">{t.developer}</span>
                  <span className="value">{game.developer}</span>
                </div>
                <div className="info-item">
                  <span className="label">{t.publisher}</span>
                  <span className="value">{game.publisher}</span>
                </div>
                <div className="info-item">
                  <span className="label">{t.genres}</span>
                  <span className="value">{game.genres.join(", ")}</span>
                </div>
              </div>
              <div className="screenshots">
                <h3>{t.screenshots}</h3>
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
              <h3>{t.availableDLC}</h3>
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
                <p>{t.noDLC}</p>
              )}
            </div>
          )}
          {activeTab === "achievements" && (
            <div className="achievements-content">
              <h3>{t.achievementsTab}</h3>
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
                        <div className="achievement-rarity">{achievement.rarity}% {t.ofPlayersEarned}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>{t.noAchievements}</p>
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
              {game.installed ? t.playNow : t.install}
            </button>
            <button className="wishlist-button">
              <Icon fafa="faHeart" /> {t.addToWishlist}
            </button>
          </div>
          <div className="system-requirements">
            <h3>{t.systemRequirements}</h3>
            <div className="requirements-section">
              <h4>{t.minimum}</h4>
              <ul>
                {game.systemRequirements?.minimum.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
            <div className="requirements-section">
              <h4>{t.recommended}</h4>
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