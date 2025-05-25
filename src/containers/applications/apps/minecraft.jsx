import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { ToolBar } from "../../../utils/general";

export const Minecraft = () => {
  const [error, setError] = useState(false);
  const [showFullscreenInfo, setShowFullscreenInfo] = useState(true);
  const [showDeviceSelect, setShowDeviceSelect] = useState(false);
  const [showMobileVersionSelect, setShowMobileVersionSelect] = useState(false);
  const [language, setLanguage] = useState("en"); // Mặc định là tiếng Anh
  const wnapp = useSelector((state) => state.apps.minecraft);
  const iframeSrc = "https://eaglercraft.com/mc/1.12.2/";
  const iframeRef = useRef(null);
  
  const translations = {
    en: {
      title: "Minecraft 1.12.2",
      infoText: "For the best experience with full mouse lock, please open the game in fullscreen mode.",
      playInNewTab: "Play in new tab",
      continueHere: "Continue here",
      fullscreen: "Open fullscreen",
      loadError: "Could not load content",
      errorDesc: "This website may not allow embedding in an iframe or an error occurred while loading the content.",
      openInNewTab: "Open in new tab",
      deviceQuestion: "What device are you using?",
      pc: "PC / Desktop",
      mobile: "Mobile / Tablet",
      selectVersion: "Select Minecraft version:",
      version188: "Minecraft 1.8.8",
      version1122: "Minecraft 1.12.2",
      back: "Back"
    },
    vi: {
      title: "Minecraft 1.12.2",
      infoText: "Để có trải nghiệm tốt nhất với chế độ khóa chuột đầy đủ, hãy mở game ở chế độ toàn màn hình.",
      playInNewTab: "Chơi trong tab mới",
      continueHere: "Tiếp tục trong cửa sổ này",
      fullscreen: "Mở toàn màn hình",
      loadError: "Không thể tải nội dung",
      errorDesc: "Trang web này không cho phép được nhúng trong iframe hoặc đã xảy ra lỗi khi tải nội dung.",
      openInNewTab: "Mở trong tab mới",
      deviceQuestion: "Bạn đang sử dụng thiết bị nào?",
      pc: "PC / Máy tính",
      mobile: "Điện thoại / Máy tính bảng",
      selectVersion: "Chọn phiên bản Minecraft:",
      version188: "Minecraft 1.8.8",
      version1122: "Minecraft 1.12.2",
      back: "Quay lại"
    }
  };
  
  const t = translations[language];
  
  if (!wnapp) return null;
  
  const openFullscreen = () => {
    setShowDeviceSelect(true);
    setShowFullscreenInfo(false);
  };
  
  const hideInfo = () => {
    setShowFullscreenInfo(false);
  };
  
  const toggleLanguage = () => {
    setLanguage(language === "vi" ? "en" : "vi");
  };
  
  const selectPC = () => {
    window.open(iframeSrc, '_blank');
    setShowDeviceSelect(false);
  };
  
  const selectMobile = () => {
    setShowMobileVersionSelect(true);
    setShowDeviceSelect(false);
  };
  
  const selectVersion188 = () => {
    window.open("https://eaglercraft.com/mc/1.8.8/?userscript=flameddogo99-eaglermobile.js", '_blank');
    setShowMobileVersionSelect(false);
  };
  
  const selectVersion1122 = () => {
    window.open("https://eaglercraft.com/mc/1.12.2/?userscript=flameddogo99-eaglermobile.js", '_blank');
    setShowMobileVersionSelect(false);
  };
  
  const goBackToDeviceSelect = () => {
    setShowMobileVersionSelect(false);
    setShowDeviceSelect(true);
  };

  useEffect(() => {
    // Hiển thị lại thông tin mỗi khi ứng dụng được mở
    if (!wnapp.hide) {
      setShowFullscreenInfo(true);
      setShowDeviceSelect(false);
      setShowMobileVersionSelect(false);
    }
  }, [wnapp.hide]);

  return (
    <div
      className="minecraft floatTab dpShad"
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
        name="Minecraft"
      />
      <div className="windowScreen flex flex-col" data-dock="true">
        <div className="restWindow h-full flex-grow relative">
          {!wnapp.hide && !error && (
            <>
              <iframe
                ref={iframeRef}
                src={iframeSrc}
                frameBorder="0"
                className="w-full h-full"
                allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking; pointer-lock; fullscreen"
                sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts allow-pointer-lock"
                onError={() => setError(true)}
              ></iframe>
              
              {/* Language toggle button */}
              <button 
                className="absolute top-2 right-2 z-10 px-2 py-1 bg-gray-800 text-white text-sm rounded hover:bg-gray-700"
                onClick={toggleLanguage}
              >
                {language === "en" ? "VI" : "EN"}
              </button>
              
              {/* Main info dialog */}
              {showFullscreenInfo && (
                <div className="absolute top-0 left-0 right-0 p-4 bg-black bg-opacity-70 text-white flex flex-col items-center">
                  <div className="flex justify-between w-full">
                    <h3 className="text-xl font-bold mb-2">{t.title}</h3>
                    <button 
                      className="text-white hover:text-gray-300"
                      onClick={hideInfo}
                    >
                      ✕
                    </button>
                  </div>
                  <p className="mb-2">{t.infoText}</p>
                  <div className="flex space-x-4 mt-2">
                    <button 
                      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                      onClick={openFullscreen}
                    >
                      {t.playInNewTab}
                    </button>
                    <button 
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                      onClick={hideInfo}
                    >
                      {t.continueHere}
                    </button>
                  </div>
                </div>
              )}
              
              {/* Device selection dialog */}
              {showDeviceSelect && (
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-80 flex items-center justify-center p-4">
                  <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full">
                    <h3 className="text-xl font-bold mb-4 text-white">{t.deviceQuestion}</h3>
                    <div className="flex flex-col space-y-3">
                      <button 
                        className="px-4 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center justify-center"
                        onClick={selectPC}
                      >
                        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {t.pc}
                      </button>
                      <button 
                        className="px-4 py-3 bg-green-600 text-white rounded hover:bg-green-700 flex items-center justify-center"
                        onClick={selectMobile}
                      >
                        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        {t.mobile}
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Mobile version selection dialog */}
              {showMobileVersionSelect && (
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-80 flex items-center justify-center p-4">
                  <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full">
                    <h3 className="text-xl font-bold mb-4 text-white">{t.selectVersion}</h3>
                    <div className="flex flex-col space-y-3">
                      <button 
                        className="px-4 py-3 bg-yellow-600 text-white rounded hover:bg-yellow-700 flex items-center justify-center"
                        onClick={selectVersion188}
                      >
                        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                        </svg>
                        {t.version188}
                      </button>
                      <button 
                        className="px-4 py-3 bg-green-600 text-white rounded hover:bg-green-700 flex items-center justify-center"
                        onClick={selectVersion1122}
                      >
                        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                        </svg>
                        {t.version1122}
                      </button>
                      <button 
                        className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 mt-2 flex items-center justify-center"
                        onClick={goBackToDeviceSelect}
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        {t.back}
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Permanent fullscreen button */}
              <button 
                className="absolute bottom-4 right-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center"
                onClick={openFullscreen}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 110-2h4a1 1 0 011 1v4a1 1 0 11-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 112 0v1.586l2.293-2.293a1 1 0 011.414 1.414L6.414 15H8a1 1 0 110 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 110-2h1.586l-2.293-2.293a1 1 0 011.414-1.414L15 13.586V12a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                {t.fullscreen}
              </button>
            </>
          )}
          {error && (
            <div className="flex items-center justify-center h-full w-full flex-col text-center p-4">
              <div className="text-xl mb-4">{t.loadError}</div>
              <div className="text-sm text-gray-500">
                {t.errorDesc}
              </div>
              <button 
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                onClick={() => window.open(iframeSrc, '_blank')}
              >
                {t.openInNewTab}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 