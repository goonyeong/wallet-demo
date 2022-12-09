import { useState, useEffect } from "react";
// import { isMobile } from "react-device-detect";
import MobileDetect from "mobile-detect";

const useMobile = () => {
  const [_navigator, _setNavigator] = useState<Navigator | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileOs, setMobileOs] = useState<string | null>(null);
  const [mobileBrowser, setMobileBrowser] = useState<string | null>(null);

  useEffect(() => {
    if (navigator) {
      _setNavigator(navigator);
    }
  }, []);

  useEffect(() => {
    if (_navigator) {
      const mobileDetect = new MobileDetect(_navigator.userAgent);
      const _mobileOs = mobileDetect.os();
      const _mobileBrowser = mobileDetect.userAgent();

      setIsMobile(_mobileOs ? true : false);
      setMobileOs(_mobileOs);
      setMobileBrowser(_mobileBrowser);
    }
  }, [_navigator]);

  return { isMobile, mobileOs, mobileBrowser };
};

export default useMobile;
