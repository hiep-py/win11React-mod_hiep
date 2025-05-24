import React from "react";
import { useSelector } from "react-redux";
import { ToolBar } from "../../../utils/general";

export const VSCode = () => {
  const wnapp = useSelector((state) => state.apps.vscode);

  return (
    <div
      className="vscode floatTab dpShad"
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
        name="Visual Studio Code"
      />
      <div className="windowScreen flex flex-col" data-dock="true">
        <div className="restWindow h-full flex-grow">
          <iframe
            src="https://codesandbox.io/p/sandbox/github/codesandbox/sandbox-templates/tree/main/python-flask-server"
            frameBorder="0"
            className="w-full h-full"
            allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
            sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
          ></iframe>
        </div>
      </div>
    </div>
  );
}; 