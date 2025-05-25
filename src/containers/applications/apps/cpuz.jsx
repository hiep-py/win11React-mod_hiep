import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ToolBar, Icon } from "../../../utils/general";
import "./assets/cpuz.scss";

export const CPUZ = () => {
  const wnapp = useSelector((state) => state.apps.cpuz);
  const [activeTab, setActiveTab] = useState("cpu");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Giả lập thời gian tải dữ liệu
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Reset trạng thái loading khi chuyển tab
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);
    
    return () => clearTimeout(timer);
  }, [activeTab]);

  const cpuInfo = {
    name: "AMD Ryzen 9 9950X3D",
    cores: "16 cores, 32 threads",
    clock: "5.7 GHz (max boost)",
    cache: "3D V-Cache Gen 2",
    socket: "AM5",
    process: "3nm TSMC",
    tdp: "170W",
    features: "PCIe 5.0, DDR5, AMD Pro"
  };

  const mainboardInfo = {
    model: "ASUS ROG Crosshair X870 Extreme",
    chipset: "AMD X870",
    bios: "UEFI AMI 4.23.1",
    features: "PCIe 5.0, DDR5-8000, Wi-Fi 7, Thunderbolt 5, USB4",
    formFactor: "E-ATX",
    power: "24-pin ATX, 8+8-pin CPU",
    audio: "SupremeFX 7.1 Channel HD Audio"
  };

  const memoryInfo = {
    type: "G.Skill Trident Z5 RGB DDR5-8000",
    size: "96GB (4x24GB)",
    channels: "Quad Channel",
    timings: "CL38-48-48-128",
    voltage: "1.45V",
    speed: "8000 MHz (effective)"
  };

  const graphicsInfo = {
    name: "NVIDIA GeForce RTX 5090",
    memory: "32GB GDDR7",
    cuda: "21,760 CUDA Cores",
    clock: "2.8 GHz (boost)",
    bus: "PCIe 5.0 x16",
    features: "DLSS 4, Ray Tracing, Path Tracing, AI Acceleration",
    power: "600W TDP"
  };

  const storageInfo = {
    primary: "Samsung 990 Pro 4TB NVMe SSD",
    interface: "PCIe 4.0 x4",
    readSpeed: "7,450 MB/s",
    writeSpeed: "6,900 MB/s",
    encryption: "AES 256-bit",
    cache: "LPDDR4 4GB",
    lifespan: "2,400 TBW"
  };

  const peripheralsInfo = {
    cooling: "Corsair iCUE H170i ELITE LCD XT (420mm AIO)",
    power: "Seasonic PRIME TX-1600 1600W 80+ Titanium",
    case: "Lian Li O11 Dynamic EVO XL",
    monitor: "ASUS ROG Swift PG32UQX 32\" 4K HDR 144Hz",
    keyboard: "Razer BlackWidow V4 Pro",
    mouse: "Logitech G Pro X Superlight Wireless",
    os: "Windows 11 Pro"
  };

  if (!wnapp) return null;

  // SVG Components
  const AMDLogo = () => (
    <div className="vendor-logo-svg amd-logo">
      <svg viewBox="0 0 100 30" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0h50v30H0V0zm55 0h5v30h-5V0zm10 0h5v30h-5V0zm10 0h25v5H75V0zm0 12.5h20v5H75v-5zm0 12.5h25v5H75V25z" fill="currentColor" />
      </svg>
      <span>AMD</span>
    </div>
  );

  const AsusLogo = () => (
    <div className="vendor-logo-svg asus-logo">
      <svg viewBox="0 0 100 30" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 5h60v5H20V5zm0 10h60v5H20v-5zm0 10h60v5H20v-5z" fill="currentColor" />
      </svg>
      <span>ASUS</span>
    </div>
  );

  const GSkillLogo = () => (
    <div className="vendor-logo-svg gskill-logo">
      <svg viewBox="0 0 100 30" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 5L20 25h15L25 5H10zm30 0l10 20h15L55 5H40zm30 0l10 20h10L80 5H70z" fill="currentColor" />
      </svg>
      <span>G.Skill</span>
    </div>
  );

  const NvidiaLogo = () => (
    <div className="vendor-logo-svg nvidia-logo">
      <svg viewBox="0 0 100 30" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 5h80v20H70V15H50v10H30V15H10V5z" fill="currentColor" />
      </svg>
      <span>NVIDIA</span>
    </div>
  );

  const SamsungLogo = () => (
    <div className="vendor-logo-svg samsung-logo">
      <svg viewBox="0 0 100 30" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="5" width="80" height="20" rx="10" fill="currentColor" />
        <rect x="25" y="10" width="50" height="10" rx="5" fill="white" />
      </svg>
      <span>Samsung</span>
    </div>
  );

  const CPUZLogo = () => (
    <div className="cpuz-logo-container">
      <div className="cpuz-logo-svg">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="10" width="80" height="80" rx="5" fill="#0078D7" />
          <rect x="20" y="20" width="60" height="60" rx="3" fill="#FFFFFF" />
          <text x="50" y="55" fontSize="20" fontWeight="bold" textAnchor="middle" fill="#0078D7">CPU-Z</text>
          <rect x="25" y="65" width="50" height="10" rx="2" fill="#0078D7" />
        </svg>
      </div>
    </div>
  );

  // Diagram Components
  const CPUDiagram = () => (
    <div className="cpu-diagram-svg">
      <svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
        <rect x="50" y="30" width="100" height="100" rx="5" fill="#E0E0E0" stroke="#888" strokeWidth="2" />
        <rect x="60" y="40" width="80" height="80" rx="3" fill="#C0C0C0" stroke="#888" strokeWidth="1" />
        <circle cx="70" cy="50" r="3" fill="#333" />
        <circle cx="130" cy="50" r="3" fill="#333" />
        <circle cx="70" cy="110" r="3" fill="#333" />
        <circle cx="130" cy="110" r="3" fill="#333" />
        <text x="100" y="85" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#444">AMD</text>
        <text x="100" y="100" fontSize="6" textAnchor="middle" fill="#444">RYZEN 9 9950X3D</text>
      </svg>
    </div>
  );

  const MotherboardDiagram = () => (
    <div className="motherboard-diagram-svg">
      <svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="20" width="160" height="120" rx="5" fill="#0F5132" stroke="#0A3622" strokeWidth="2" />
        <rect x="40" y="30" width="40" height="40" rx="2" fill="#252525" stroke="#333" strokeWidth="1" />
        <rect x="100" y="40" width="60" height="10" rx="1" fill="#888" />
        <rect x="100" y="60" width="60" height="10" rx="1" fill="#888" />
        <rect x="100" y="80" width="60" height="10" rx="1" fill="#888" />
        <rect x="30" y="90" width="60" height="15" rx="1" fill="#AAAAAA" />
        <rect x="30" y="115" width="120" height="15" rx="1" fill="#777" />
        <text x="100" y="140" fontSize="8" textAnchor="middle" fill="#FFF">ASUS ROG CROSSHAIR</text>
      </svg>
    </div>
  );

  const GPUDiagram = () => (
    <div className="gpu-diagram-svg">
      <svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="20" width="160" height="80" rx="3" fill="#222" stroke="#444" strokeWidth="2" />
        <rect x="30" y="30" width="100" height="60" rx="2" fill="#333" stroke="#555" strokeWidth="1" />
        <circle cx="160" cy="40" r="10" fill="#444" stroke="#555" strokeWidth="1" />
        <circle cx="160" cy="40" r="8" fill="#222" />
        <circle cx="160" cy="40" r="4" fill="#555" />
        <circle cx="160" cy="70" r="10" fill="#444" stroke="#555" strokeWidth="1" />
        <circle cx="160" cy="70" r="8" fill="#222" />
        <circle cx="160" cy="70" r="4" fill="#555" />
        <text x="80" y="65" fontSize="10" fontWeight="bold" textAnchor="middle" fill="#0F0">NVIDIA</text>
      </svg>
    </div>
  );

  const NVMeDiagram = () => (
    <div className="nvme-diagram-svg">
      <svg viewBox="0 0 200 80" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="20" width="160" height="40" rx="3" fill="#000" stroke="#333" strokeWidth="1" />
        <rect x="30" y="25" width="80" height="30" rx="2" fill="#222" stroke="#444" strokeWidth="1" />
        <rect x="120" y="30" width="50" height="20" rx="1" fill="#111" stroke="#333" strokeWidth="1" />
        <text x="80" y="45" fontSize="10" fontWeight="bold" textAnchor="middle" fill="#FFF">Samsung 990 Pro</text>
      </svg>
    </div>
  );

  const PCSetupDiagram = () => (
    <div className="setup-diagram-svg">
      <svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
        <rect x="60" y="20" width="80" height="60" rx="2" fill="#333" stroke="#555" strokeWidth="1" />
        <rect x="70" y="30" width="60" height="40" rx="1" fill="#0078D7" stroke="#0056A3" strokeWidth="1" />
        <rect x="40" y="85" width="120" height="25" rx="2" fill="#222" stroke="#444" strokeWidth="1" />
        <rect x="40" y="115" width="120" height="5" rx="1" fill="#444" />
        <rect x="85" y="125" width="30" height="15" rx="3" fill="#555" />
        <text x="100" y="55" fontSize="10" fontWeight="bold" textAnchor="middle" fill="#FFF">DESKTOP</text>
      </svg>
    </div>
  );
  


  const LoadingPlaceholder = () => (
    <div className="loading-placeholder">
      <div className="loading-spinner"></div>
      <div className="loading-text">Loading data...</div>
    </div>
  );

  const renderTab = () => {
    if (isLoading) {
      return <LoadingPlaceholder />;
    }
    
    switch(activeTab) {
      case "cpu":
        return (
          <div className="tab-content">
            <div className="cpuz-header">
              <AMDLogo />
              <div className="cpu-name">{cpuInfo.name}</div>
            </div>
            <div className="info-grid">
              <div className="info-group">
                <div className="info-title">Processor</div>
                <div className="info-row">
                  <div className="info-label">Name</div>
                  <div className="info-value">{cpuInfo.name}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">Cores</div>
                  <div className="info-value">{cpuInfo.cores}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">Clock Speed</div>
                  <div className="info-value">{cpuInfo.clock}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">Cache</div>
                  <div className="info-value">{cpuInfo.cache}</div>
                </div>
              </div>
              
              <div className="info-group">
                <div className="info-title">Architecture</div>
                <div className="info-row">
                  <div className="info-label">Socket</div>
                  <div className="info-value">{cpuInfo.socket}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">Process</div>
                  <div className="info-value">{cpuInfo.process}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">TDP</div>
                  <div className="info-value">{cpuInfo.tdp}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">Features</div>
                  <div className="info-value">{cpuInfo.features}</div>
                </div>
              </div>
            </div>
            
            <div className="cpu-diagram">
              <CPUDiagram />
            </div>
          </div>
        );
      
      case "mainboard":
        return (
          <div className="tab-content">
            <div className="cpuz-header">
              <AsusLogo />
              <div className="motherboard-name">{mainboardInfo.model}</div>
            </div>
            <div className="info-grid">
              <div className="info-group">
                <div className="info-title">Motherboard</div>
                <div className="info-row">
                  <div className="info-label">Manufacturer</div>
                  <div className="info-value">ASUS</div>
                </div>
                <div className="info-row">
                  <div className="info-label">Model</div>
                  <div className="info-value">{mainboardInfo.model}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">Chipset</div>
                  <div className="info-value">{mainboardInfo.chipset}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">BIOS</div>
                  <div className="info-value">{mainboardInfo.bios}</div>
                </div>
              </div>
              
              <div className="info-group">
                <div className="info-title">Specifications</div>
                <div className="info-row">
                  <div className="info-label">Form Factor</div>
                  <div className="info-value">{mainboardInfo.formFactor}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">Power Connectors</div>
                  <div className="info-value">{mainboardInfo.power}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">Audio</div>
                  <div className="info-value">{mainboardInfo.audio}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">Features</div>
                  <div className="info-value">{mainboardInfo.features}</div>
                </div>
              </div>
            </div>
            
            <div className="motherboard-image">
              <MotherboardDiagram />
            </div>
          </div>
        );
      
      case "memory":
        return (
          <div className="tab-content">
            <div className="cpuz-header">
              <GSkillLogo />
              <div className="memory-name">{memoryInfo.type}</div>
            </div>
            <div className="info-grid">
              <div className="info-group">
                <div className="info-title">Memory</div>
                <div className="info-row">
                  <div className="info-label">Type</div>
                  <div className="info-value">{memoryInfo.type}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">Size</div>
                  <div className="info-value">{memoryInfo.size}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">Channels</div>
                  <div className="info-value">{memoryInfo.channels}</div>
                </div>
              </div>
              
              <div className="info-group">
                <div className="info-title">Timings</div>
                <div className="info-row">
                  <div className="info-label">Frequency</div>
                  <div className="info-value">{memoryInfo.speed}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">Timings</div>
                  <div className="info-value">{memoryInfo.timings}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">Voltage</div>
                  <div className="info-value">{memoryInfo.voltage}</div>
                </div>
              </div>
            </div>
            
            <div className="memory-slots">
              <div className="slot filled">
                <div className="slot-name">DIMM #1</div>
                <div className="slot-info">G.Skill Trident Z5 RGB 24GB DDR5-8000</div>
              </div>
              <div className="slot filled">
                <div className="slot-name">DIMM #2</div>
                <div className="slot-info">G.Skill Trident Z5 RGB 24GB DDR5-8000</div>
              </div>
              <div className="slot filled">
                <div className="slot-name">DIMM #3</div>
                <div className="slot-info">G.Skill Trident Z5 RGB 24GB DDR5-8000</div>
              </div>
              <div className="slot filled">
                <div className="slot-name">DIMM #4</div>
                <div className="slot-info">G.Skill Trident Z5 RGB 24GB DDR5-8000</div>
              </div>
            </div>
          </div>
        );
      
      case "graphics":
        return (
          <div className="tab-content">
            <div className="cpuz-header">
              <NvidiaLogo />
              <div className="gpu-name">{graphicsInfo.name}</div>
            </div>
            <div className="info-grid">
              <div className="info-group">
                <div className="info-title">Graphics Processor</div>
                <div className="info-row">
                  <div className="info-label">GPU</div>
                  <div className="info-value">{graphicsInfo.name}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">Memory</div>
                  <div className="info-value">{graphicsInfo.memory}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">CUDA Cores</div>
                  <div className="info-value">{graphicsInfo.cuda}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">Clock</div>
                  <div className="info-value">{graphicsInfo.clock}</div>
                </div>
              </div>
              
              <div className="info-group">
                <div className="info-title">Interface</div>
                <div className="info-row">
                  <div className="info-label">Bus</div>
                  <div className="info-value">{graphicsInfo.bus}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">TDP</div>
                  <div className="info-value">{graphicsInfo.power}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">Features</div>
                  <div className="info-value">{graphicsInfo.features}</div>
                </div>
              </div>
            </div>
            
            <div className="gpu-image">
              <GPUDiagram />
            </div>
          </div>
        );
      
      case "storage":
        return (
          <div className="tab-content">
            <div className="cpuz-header">
              <SamsungLogo />
              <div className="storage-name">{storageInfo.primary}</div>
            </div>
            <div className="info-grid">
              <div className="info-group">
                <div className="info-title">Storage Device</div>
                <div className="info-row">
                  <div className="info-label">Model</div>
                  <div className="info-value">{storageInfo.primary}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">Interface</div>
                  <div className="info-value">{storageInfo.interface}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">Cache</div>
                  <div className="info-value">{storageInfo.cache}</div>
                </div>
              </div>
              
              <div className="info-group">
                <div className="info-title">Performance</div>
                <div className="info-row">
                  <div className="info-label">Read Speed</div>
                  <div className="info-value">{storageInfo.readSpeed}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">Write Speed</div>
                  <div className="info-value">{storageInfo.writeSpeed}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">Endurance</div>
                  <div className="info-value">{storageInfo.lifespan}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">Encryption</div>
                  <div className="info-value">{storageInfo.encryption}</div>
                </div>
              </div>
            </div>
            
            <div className="nvme-image">
              <NVMeDiagram />
            </div>
          </div>
        );
      
      case "peripherals":
        return (
          <div className="tab-content">
            <div className="cpuz-header">
              <div className="peripherals-title">System Components</div>
            </div>
            <div className="info-grid">
              <div className="info-group">
                <div className="info-title">Cooling & Power</div>
                <div className="info-row">
                  <div className="info-label">CPU Cooler</div>
                  <div className="info-value">{peripheralsInfo.cooling}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">Power Supply</div>
                  <div className="info-value">{peripheralsInfo.power}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">Case</div>
                  <div className="info-value">{peripheralsInfo.case}</div>
                </div>
              </div>
              
              <div className="info-group">
                <div className="info-title">Peripherals</div>
                <div className="info-row">
                  <div className="info-label">Monitor</div>
                  <div className="info-value">{peripheralsInfo.monitor}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">Keyboard</div>
                  <div className="info-value">{peripheralsInfo.keyboard}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">Mouse</div>
                  <div className="info-value">{peripheralsInfo.mouse}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">Operating System</div>
                  <div className="info-value">{peripheralsInfo.os}</div>
                </div>
              </div>
            </div>
            
            <div className="setup-image">
              <PCSetupDiagram />
            </div>
          </div>
        );
      
      case "about":
        return (
          <div className="tab-content about-tab">
            <CPUZLogo />
            <div className="about-info">
              <div className="about-version">CPU-Z 2.08.0</div>
              <div className="about-copyright">Copyright © 2023-2025 CPUID</div>
              <div className="about-description">
                CPU-Z is a freeware that gathers information on some of the main devices of your system.
              </div>
              <div className="about-website">www.cpuid.com</div>
            </div>
          </div>
        );
      
      default:
        return <div>Select a tab</div>;
    }
  };

  return (
    <div
      className="cpuz-app floatTab dpShad"
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
        name="CPU-Z"
      />
      <div className="windowScreen flex flex-col" data-dock="true">
        <div className="cpuz-container">
          <div className="cpuz-tabs">
            <div 
              className={`tab ${activeTab === "cpu" ? "active" : ""}`}
              onClick={() => setActiveTab("cpu")}
            >
              CPU
            </div>
            <div 
              className={`tab ${activeTab === "mainboard" ? "active" : ""}`}
              onClick={() => setActiveTab("mainboard")}
            >
              Mainboard
            </div>
            <div 
              className={`tab ${activeTab === "memory" ? "active" : ""}`}
              onClick={() => setActiveTab("memory")}
            >
              Memory
            </div>
            <div 
              className={`tab ${activeTab === "graphics" ? "active" : ""}`}
              onClick={() => setActiveTab("graphics")}
            >
              Graphics
            </div>
            <div 
              className={`tab ${activeTab === "storage" ? "active" : ""}`}
              onClick={() => setActiveTab("storage")}
            >
              Storage
            </div>
            <div 
              className={`tab ${activeTab === "peripherals" ? "active" : ""}`}
              onClick={() => setActiveTab("peripherals")}
            >
              Peripherals
            </div>
            <div 
              className={`tab ${activeTab === "about" ? "active" : ""}`}
              onClick={() => setActiveTab("about")}
            >
              About
            </div>
          </div>
          
          <div className="cpuz-content">
            {renderTab()}
          </div>
        </div>
      </div>
    </div>
  );
}; 