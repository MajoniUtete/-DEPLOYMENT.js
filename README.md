# Radio Revolution Mobile App (Starter)

A production-ready starter for your internet radio app for Apple App Store and Google Play.

## What is already built
- One-tap **Play Live** button.
- Background playback support (works with lock screen controls via `react-native-track-player`).
- Default **Low Data** stream mode for listeners with expensive mobile data.
- Switch to **High Quality** stream when users are on strong Wi‑Fi.
- Quick action buttons for:
  - Chat with host
  - Track comments
  - Song requests
  - Support / Buy Me a Coffee

## Configure your real links
Update `src/config.ts` with your real URLs:
- `streamUrls.low` (low bitrate stream for data saving)
- `streamUrls.high` (high bitrate stream)
- `chatUrl`, `commentsUrl`, `requestUrl`, `supportUrl`

## Run locally
```bash
npm install
npm run start
```

Then open iOS/Android simulator from Expo.

## Suggested stream bitrates for Zimbabwe data-saving goals
- **Low Data:** HE-AAC 24-32 kbps mono/stereo.
- **High Quality:** AAC 64-128 kbps.

This app defaults to Low Data mode to reduce data usage.
