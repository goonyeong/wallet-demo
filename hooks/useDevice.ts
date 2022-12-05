import { useState, useEffect } from "react";
import { isMobile } from "react-device-detect";

const useDevice = () => {
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    setIsMobileDevice(isMobile);
  }, []);

  return { isMobileDevice };
};

export default useDevice;
