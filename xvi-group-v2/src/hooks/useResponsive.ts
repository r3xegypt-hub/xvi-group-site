// XVI GROUP — useResponsive Hook (v2)
// 7 device categories, each independently optimized

import { useState, useEffect, useCallback } from 'react';
import { BREAKPOINTS } from '../constants';
import type { Breakpoint, DeviceFlags } from '../types';

// ============================================
// CORE HOOK
// ============================================

export function useResponsive() {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('small-mobile');
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

  const getBreakpoint = useCallback((w: number): Breakpoint => {
    if (w >= BREAKPOINTS.desktop) return 'desktop';
    if (w >= BREAKPOINTS.laptop) return 'laptop';
    if (w >= BREAKPOINTS.tabletLandscape) return 'tablet-landscape';
    if (w >= BREAKPOINTS.tabletPortrait) return 'tablet-portrait';
    if (w >= BREAKPOINTS.largeMobile) return 'large-mobile';
    if (w >= BREAKPOINTS.mediumMobile) return 'medium-mobile';
    return 'small-mobile';
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      setWidth(w);
      setBreakpoint(getBreakpoint(w));
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [getBreakpoint]);

  const flags: DeviceFlags = {
    isSmallMobile: breakpoint === 'small-mobile',
    isMediumMobile: breakpoint === 'medium-mobile',
    isLargeMobile: breakpoint === 'large-mobile',
    isTabletPortrait: breakpoint === 'tablet-portrait',
    isTabletLandscape: breakpoint === 'tablet-landscape',
    isLaptop: breakpoint === 'laptop',
    isDesktop: breakpoint === 'desktop',
    // Group flags
    isAnyMobile: ['small-mobile', 'medium-mobile', 'large-mobile'].includes(breakpoint),
    isAnyTablet: ['tablet-portrait', 'tablet-landscape'].includes(breakpoint),
    isSmallScreen: ['small-mobile', 'medium-mobile', 'large-mobile', 'tablet-portrait'].includes(breakpoint),
    isMediumScreen: ['tablet-landscape', 'laptop'].includes(breakpoint),
    isLargeScreen: breakpoint === 'desktop',
  };

  return {
    breakpoint,
    width,
    ...flags,
    // Legacy aliases
    isMobile: flags.isAnyMobile,
    isTablet: flags.isAnyTablet,
    isDesktopOrWide: flags.isLargeScreen || flags.isMediumScreen,
  };
}

// ============================================
// RESPONSIVE VALUE HOOK
// ============================================

export function useResponsiveValue<T>(values: {
  smallMobile: T;
  mediumMobile?: T;
  largeMobile?: T;
  tabletPortrait?: T;
  tabletLandscape?: T;
  laptop?: T;
  desktop?: T;
}): T {
  const { breakpoint } = useResponsive();

  switch (breakpoint) {
    case 'desktop':
      return values.desktop ?? values.laptop ?? values.tabletLandscape ?? values.tabletPortrait ?? values.largeMobile ?? values.mediumMobile ?? values.smallMobile;
    case 'laptop':
      return values.laptop ?? values.tabletLandscape ?? values.tabletPortrait ?? values.largeMobile ?? values.mediumMobile ?? values.smallMobile;
    case 'tablet-landscape':
      return values.tabletLandscape ?? values.tabletPortrait ?? values.largeMobile ?? values.mediumMobile ?? values.smallMobile;
    case 'tablet-portrait':
      return values.tabletPortrait ?? values.largeMobile ?? values.mediumMobile ?? values.smallMobile;
    case 'large-mobile':
      return values.largeMobile ?? values.mediumMobile ?? values.smallMobile;
    case 'medium-mobile':
      return values.mediumMobile ?? values.smallMobile;
    default:
      return values.smallMobile;
  }
}

// ============================================
// HOOK FOR DEVICE-SPECIFIC IMAGES
// ============================================

export function useResponsiveImage(sources: {
  smallMobile: string;
  mediumMobile?: string;
  largeMobile?: string;
  tabletPortrait?: string;
  tabletLandscape?: string;
  laptop?: string;
  desktop?: string;
}): string {
  return useResponsiveValue(sources);
}

// ============================================
// HOOK FOR DEVICE-SPECIFIC COLUMNS
// ============================================

export function useResponsiveColumns(): number {
  return useResponsiveValue({
    smallMobile: 1,
    mediumMobile: 1,
    largeMobile: 1,
    tabletPortrait: 2,
    tabletLandscape: 3,
    laptop: 3,
    desktop: 4,
  });
}
