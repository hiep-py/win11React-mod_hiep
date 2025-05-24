import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ToolBar } from "../../../utils/general";

export const Perplexity = () => {
  const [error, setError] = useState(false);
  const wnapp = useSelector((state) => state.apps.perplexity);
  const iframeSrc = "https://www.perplexity.ai";
  
  if (!wnapp) return null;

  return (
    <div
      className="perplexity floatTab dpShad"
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
        name="Perplexity AI"
      />
      <div className="windowScreen flex flex-col" data-dock="true">
        <div className="restWindow h-full flex-grow">
          {!wnapp.hide && !error && (
            <iframe
              src={iframeSrc}
              frameBorder="0"
              className="w-full h-full"
              allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
              sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
              onError={() => setError(true)}
            ></iframe>
          )}
          {error && (
            <div className="flex items-center justify-center h-full w-full flex-col text-center p-4">
              <div className="text-xl mb-4">Không thể tải nội dung</div>
              <div className="text-sm text-gray-500">
                Trang web này không cho phép được nhúng trong iframe hoặc đã xảy ra lỗi khi tải nội dung.
              </div>
              <button 
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                onClick={() => window.open(iframeSrc, '_blank')}
              >
                Mở trong tab mới
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 