import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
  State,
  type Track
} from 'react-native-track-player';
import { STATION, type StreamQuality } from './config';

let initialized = false;

const baseTrack = (quality: StreamQuality): Track => ({
  id: `radio-revolution-${quality}`,
  url: STATION.streamUrls[quality],
  title: STATION.name,
  artist: STATION.tagline,
  artwork: undefined,
  isLiveStream: true
});

export const initializePlayer = async () => {
  if (initialized) return;

  await TrackPlayer.setupPlayer();
  await TrackPlayer.updateOptions({
    capabilities: [Capability.Play, Capability.Pause, Capability.Stop],
    compactCapabilities: [Capability.Play, Capability.Pause],
    android: {
      appKilledPlaybackBehavior:
        AppKilledPlaybackBehavior.ContinuePlayback,
      alwaysPauseOnInterruption: false
    }
  });

  await TrackPlayer.add(baseTrack('low'));
  initialized = true;
};

export const playRadio = async () => {
  await initializePlayer();
  await TrackPlayer.play();
};

export const pauseRadio = async () => {
  await initializePlayer();
  await TrackPlayer.pause();
};

export const switchQuality = async (quality: StreamQuality) => {
  await initializePlayer();
  const currentState = await TrackPlayer.getPlaybackState();
  await TrackPlayer.reset();
  await TrackPlayer.add(baseTrack(quality));

  if (currentState.state === State.Playing || currentState.state === State.Buffering) {
    await TrackPlayer.play();
  }
};

export const getPlaybackState = () => TrackPlayer.getPlaybackState();
