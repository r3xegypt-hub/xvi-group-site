export const roomRouteMap = {
  arrival: '/',
  'advisory-suite': '/services',
  'story-panels': '/insights',
  'executive-timeline': '/insights',
  'magazine-layout': '/insights',
  'technology-network': '/industries',
  'luxury-testimonials': '/insights',
  'premium-cta': '/contact',
} as const

export function getRoomRoute(roomId: string) {
  return roomRouteMap[roomId as keyof typeof roomRouteMap] ?? '/'
}

export function getRoomIdForRoute(pathname: string) {
  return Object.entries(roomRouteMap).find(([, route]) => route === pathname)?.[0]
}
