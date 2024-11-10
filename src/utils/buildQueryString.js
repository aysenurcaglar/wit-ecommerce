export const buildQueryString = (params) => {
    const query = Object.entries(params)
      .filter(([, value]) => value != null)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');
    return `?${query}`;
  };
  