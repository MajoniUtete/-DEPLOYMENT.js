export const STATION = {
  name: 'Radio Revolution',
  tagline: 'Live from Zimbabwe',
  streamUrls: {
    low: 'https://example.com/radio-revolution-low.aac',
    high: 'https://example.com/radio-revolution-high.aac'
  },
  supportUrl: 'https://buymeacoffee.com/radiorevolution',
  requestUrl: 'https://example.com/song-request',
  chatUrl: 'https://example.com/live-chat',
  commentsUrl: 'https://example.com/track-comments'
};

export type StreamQuality = keyof typeof STATION.streamUrls;
