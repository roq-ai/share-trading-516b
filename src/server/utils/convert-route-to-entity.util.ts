const mapping: Record<string, string> = {
  organizations: 'organization',
  shares: 'shares',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
