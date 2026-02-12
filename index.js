import { registerRootComponent } from 'expo';
import TrackPlayer from 'react-native-track-player';
import App from './App';
import { playbackService } from './src/playbackService';

TrackPlayer.registerPlaybackService(() => playbackService);

registerRootComponent(App);
