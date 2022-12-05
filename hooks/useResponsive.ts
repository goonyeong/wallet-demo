import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { MAX_MOBILE_WIDTH, MAX_TABLIT_WIDTH } from "types/constants";

const useResponsive = () => {
  const [isMobileSize, setIsMobileSize] = useState(false);
  const [isTabletSize, setIsTabletSize] = useState(false);

  const isMobileQuery = useMediaQuery({ maxWidth: MAX_MOBILE_WIDTH });
  const isTabletQuery = useMediaQuery({ maxWidth: MAX_TABLIT_WIDTH });

  useEffect(() => {
    setIsMobileSize(isMobileQuery);
  }, [isMobileQuery]);

  useEffect(() => {
    setIsTabletSize(isTabletQuery);
  }, [isTabletQuery]);

  return { isMobileSize, isTabletSize };
};

export default useResponsive;
