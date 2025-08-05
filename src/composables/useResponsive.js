import { ref, onMounted, onUnmounted } from "vue";

const BREAKPOINTS = {
  MOBILE: 768,
  TABLET: 1024,
  DESKTOP: 1200,
};

export function useResponsive() {
  const isMobile = ref(false);
  const isTablet = ref(false);
  const isDesktop = ref(false);

  const checkScreenSize = () => {
    const width = window.innerWidth;
    isMobile.value = width <= BREAKPOINTS.MOBILE;
    isTablet.value = width > BREAKPOINTS.MOBILE && width <= BREAKPOINTS.TABLET;
    isDesktop.value = width > BREAKPOINTS.TABLET;
  };

  // Initialize immediately if window is available
  if (typeof window !== "undefined") {
    checkScreenSize();
  }

  onMounted(() => {
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", checkScreenSize);
  });

  return {
    isMobile,
    isTablet,
    isDesktop,
    BREAKPOINTS,
  };
}
