import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Icon, ToolBar, LazyComponent } from "../../../utils/general";

export const EdgeMenu = () => {
  const wnapp = useSelector((state) => state.apps.edge);
  const [url, setUrl] = useState("https://www.google.com/?igu=1");
  const [ierror, setErr] = useState(true);
  const [isTyping, setTyping] = useState(false);
  const [hist, setHist] = useState(["https://bing.com", "https://bing.com"]);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isReaderMode, setIsReaderMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();

  const iframes = {
    "https://www.google.com/webhp?igu=1": "Google",
    "https://bing.com": "Bing",
    "https://www.youtube-nocookie.com": "YouTube",
    "https://facebook.com": "Facebook",
    "https://twitter.com": "Twitter",
    "https://blueedge.me": "blueedge",
    "https://andrewstech.me": "\nandrewstech",
    "https://blueedge.me/unescape": "Unescape",
    "https://win11.blueedge.me": "Inception",
    "https://open.spotify.com": "Spotify",
    "https://bluelab.blueedge.me": "BlueLab",
    "https://othello.blueedge.me": "Othello",
    "https://github.com": "GitHub"
  };

  const favicons = {
    "https://andrewstech.me": "https://avatars.githubusercontent.com/u/45342431",
    "https://github.com": "https://github.githubassets.com/favicons/favicon.svg"
  };

  const isValidURL = (string) => {
    var res = string.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
    );
    return res !== null;
  };

  const addToHistory = (url) => {
    // Thêm URL vào lịch sử, loại bỏ trùng lặp và giới hạn 20 mục
    setHistory(prev => {
      const newHistory = [url, ...prev.filter(item => item !== url)];
      return newHistory.slice(0, 20);
    });
  };

  const toggleFullscreen = () => {
    const element = document.getElementById(wnapp.icon + "App");
    if (!isFullscreen) {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  const toggleReaderMode = () => {
    setIsReaderMode(!isReaderMode);
    // Thực hiện reader mode bằng cách thêm CSS vào iframe
    const iframe = document.getElementById("isite");
    if (iframe && iframe.contentDocument) {
      const styleElement = iframe.contentDocument.createElement('style');
      styleElement.id = 'reader-mode-style';
      styleElement.textContent = `
        body {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          font-size: 18px;
          line-height: 1.6;
          background-color: #f8f9fa;
          color: #333;
        }
        img {
          max-width: 100%;
          height: auto;
        }
      `;
      
      if (!isReaderMode) {
        iframe.contentDocument.head.appendChild(styleElement);
      } else {
        const existingStyle = iframe.contentDocument.getElementById('reader-mode-style');
        if (existingStyle) existingStyle.remove();
      }
    }
  };

  const action = (e) => {
    var iframe = document.getElementById("isite");
    var x = e.target && e.target.dataset.payload;

    if (iframe && x == 0) {
      iframe.src = iframe.src;
    } else if (iframe && x == 1) {
      setHist([url, "https://www.bing.com"]);
      setUrl("https://www.bing.com");
      setTyping(false);
      addToHistory("https://www.bing.com");
    } else if (iframe && x == 2) {
      setHist([url, "https://www.google.com/webhp?igu=1"]);
      setUrl("https://www.google.com/webhp?igu=1");
      setTyping(false);
      addToHistory("https://www.google.com/webhp?igu=1");
    } else if (iframe && x == 3) {
      if (e.key === "Enter") {
        var qry = e.target.value;

        if (isValidURL(qry)) {
          if (!qry.startsWith("http")) {
            qry = "https://" + qry;
          }
        } else {
          qry = "https://www.google.com/search?q=" + qry;
        }

        e.target.value = qry;
        setHist([hist[0], qry]);
        setUrl(qry);
        setTyping(false);
        addToHistory(qry);
      }
    } else if (x == 4) {
      setUrl(hist[0]);
      setTyping(false);
    } else if (x == 5) {
      setUrl(hist[1]);
      setTyping(false);
    } else if (x == 6) {
      var tmp = e.target.dataset.url;
      setHist([url, tmp]);
      setUrl(tmp);
      setTyping(false);
      addToHistory(tmp);
    } else if (x == 7) {
      // Toggle history
      setShowHistory(!showHistory);
    } else if (x == 8) {
      // Toggle fullscreen
      toggleFullscreen();
    } else if (x == 9) {
      // Toggle reader mode
      toggleReaderMode();
    }
  };

  const doSearch = () => {
    if (searchQuery.trim() !== "") {
      const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
      setHist([url, searchUrl]);
      setUrl(searchUrl);
      setTyping(false);
      addToHistory(searchUrl);
      setSearchQuery("");
    }
  };

  const typing = (e) => {
    if (!isTyping) {
      setTyping(true);
      setHist([url, url]);
    }
    setUrl(e.target.value);
  };

  const handleFailed = () => {
    setErr(false);
  };

  useEffect(() => {
    if (wnapp.url) {
      setTyping(false);
      setUrl(wnapp.url);
      addToHistory(wnapp.url);
      dispatch({ type: "EDGELINK" });
    }

    // Kiểm soát trạng thái fullscreen
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [wnapp.url]);

  return (
    <div
      className="edgeBrowser floatTab dpShad"
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
        name="Browser"
        float
      />
      <div className="windowScreen flex flex-col">
        <div className="overTool flex">
          <Icon src={wnapp.icon} width={14} margin="0 6px" />
          <div className="btab">
            <div>New Tab</div>
            <Icon
              fafa="faTimes"
              click={wnapp.action}
              payload="close"
              width={10}
            />
          </div>
        </div>
        <div className="restWindow flex-grow flex flex-col">
          <div className="addressBar w-full h-10 flex items-center">
            <Icon
              className="edgenavicon"
              src="left"
              onClick={action}
              payload={4}
              width={14}
              ui
              margin="0 8px"
            />
            <Icon
              className="edgenavicon"
              src="right"
              onClick={action}
              payload={5}
              width={14}
              ui
              margin="0 8px"
            />
            <Icon
              fafa="faRedo"
              onClick={action}
              payload={0}
              width={14}
              margin="0 8px"
            />
            <Icon
              fafa="faHome"
              onClick={action}
              payload={1}
              width={18}
              margin="0 8px"
            />
            <div className="addCont relative flex items-center flex-grow">
              <input
                className="w-full h-6 px-4"
                onKeyDown={action}
                onChange={typing}
                data-payload={3}
                value={url}
                placeholder="Type url or a query to search"
                type="text"
              />
              <Icon
                className="z-1 handcr"
                src="google"
                ui
                onClick={action}
                payload={2}
                width={14}
                margin="0 10px"
              />
            </div>
            <div className="flex items-center">
              <Icon
                fafa="faHistory"
                onClick={action}
                payload={7}
                width={14}
                margin="0 8px"
                title="History"
              />
              <Icon
                fafa={isFullscreen ? "faCompress" : "faExpand"}
                onClick={action}
                payload={8}
                width={14}
                margin="0 8px"
                title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
              />
              <Icon
                fafa="faBookReader"
                onClick={action}
                payload={9}
                width={14}
                margin="0 8px"
                title={isReaderMode ? "Exit Reader Mode" : "Reader Mode"}
              />
            </div>
          </div>

          {/* Thanh tìm kiếm nhanh */}
          <div className="w-full quickSearch flex items-center px-4 py-1 bg-gray-100">
            <input
              className="flex-grow h-6 px-2 rounded border border-gray-300 text-sm"
              placeholder="Quick search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && doSearch()}
            />
            <button
              className="ml-2 px-3 py-1 bg-blue-500 text-white text-xs rounded"
              onClick={doSearch}
            >
              Search
            </button>
          </div>

          <div className="w-full bookbar py-2">
            <div className="flex">
              {Object.keys(iframes).map((mark, i) => {
                return (
                  <div
                    key={i}
                    className="flex handcr items-center ml-2 mr-1 prtclk"
                    onClick={action}
                    data-payload={6}
                    data-url={mark}
                  >
                    <Icon
                      className="mr-1"
                      ext
                      width={16}
                      src={
                        iframes[mark][0] != "\n"
                          ? new URL(mark).origin + "/favicon.ico"
                          : favicons[mark]
                      }
                    />
                    <div className="text-xs">{iframes[mark].trim()}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* History dropdown */}
          {showHistory && (
            <div className="historyDropdown absolute top-24 right-10 w-80 max-h-80 overflow-y-auto bg-white rounded-md shadow-lg z-50 border border-gray-200">
              <div className="flex justify-between items-center bg-gray-100 p-2 sticky top-0">
                <div className="font-semibold">Lịch sử duyệt web</div>
                <Icon
                  fafa="faTimes"
                  width={10}
                  className="handcr"
                  onClick={() => setShowHistory(false)}
                />
              </div>
              <div className="p-2">
                {history.length === 0 ? (
                  <div className="text-gray-500 text-center py-4">Không có lịch sử</div>
                ) : (
                  history.map((item, i) => (
                    <div
                      key={i}
                      className="py-2 px-1 hover:bg-gray-100 cursor-pointer flex items-center"
                      onClick={() => {
                        setUrl(item);
                        setTyping(false);
                        setShowHistory(false);
                      }}
                    >
                      <Icon
                        ext
                        src={new URL(item).origin + "/favicon.ico"}
                        width={16}
                        className="mr-2"
                      />
                      <div className="text-sm truncate">{item}</div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          <div className="siteFrame flex-grow overflow-hidden">
            <LazyComponent show={!wnapp.hide}>
              <iframe
                src={!isTyping ? url : hist[0]}
                id="isite"
                frameborder="0"
                className="w-full h-full"
                title="site"
              ></iframe>
            </LazyComponent>

            <div
              className={`bg-blue-100 w-64 rounded dpShad p-2 absolute bottom-0 right-0 my-4 mx-12 transition-all ${
                ierror ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <div
                className="absolute bg-red-400 m-1 text-red-900 text-xs px-1 font-bold handcr top-0 right-0 rounded hover:bg-red-500"
                onClick={handleFailed}
              >
                x
              </div>
              <div className="text-gray-800 text-xs font-medium">
                If it shows <b>"Refused to connect"</b>, then{" "}
                <b>that website doesn't allow </b>
                other websites to show their content. <b>I cannot fix it</b>.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
