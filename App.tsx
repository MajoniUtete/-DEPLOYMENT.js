import { StatusBar } from 'expo-status-bar';
import * as Linking from 'expo-linking';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { STATION, type StreamQuality } from './src/config';
import {
  getPlaybackState,
  initializePlayer,
  pauseRadio,
  playRadio,
  switchQuality
} from './src/player';

const quickActions = [
  { label: '💬 Chat with Host', url: STATION.chatUrl },
  { label: '📝 Comment on Track', url: STATION.commentsUrl },
  { label: '🎵 Song Request', url: STATION.requestUrl },
  { label: '☕ Support / Buy Me a Coffee', url: STATION.supportUrl }
];

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [quality, setQuality] = useState<StreamQuality>('low');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const setup = async () => {
      try {
        await initializePlayer();
        const state = await getPlaybackState();
        setIsPlaying(state.state === 'playing' || state.state === 'buffering');
      } catch {
        Alert.alert('Playback Error', 'Could not initialize the player.');
      } finally {
        setLoading(false);
      }
    };

    void setup();
  }, []);

  const togglePlayback = async () => {
    try {
      setLoading(true);
      if (isPlaying) {
        await pauseRadio();
        setIsPlaying(false);
        return;
      }

      await playRadio();
      setIsPlaying(true);
    } catch {
      Alert.alert('Playback Error', 'Please verify your stream URL settings.');
    } finally {
      setLoading(false);
    }
  };

  const changeQuality = async (nextQuality: StreamQuality) => {
    if (nextQuality === quality) return;

    try {
      setLoading(true);
      await switchQuality(nextQuality);
      setQuality(nextQuality);
      setIsPlaying(true);
    } catch {
      Alert.alert('Quality Switch Failed', 'Could not switch stream quality.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <Text style={styles.title}>{STATION.name}</Text>
        <Text style={styles.subtitle}>{STATION.tagline}</Text>

        <Pressable style={styles.playButton} onPress={togglePlayback}>
          {loading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.playText}>{isPlaying ? 'Pause' : 'Play Live'}</Text>
          )}
        </Pressable>

        <View style={styles.qualityRow}>
          <Text style={styles.sectionLabel}>Data mode</Text>
          <View style={styles.pillRow}>
            <Pressable
              style={[styles.pill, quality === 'low' && styles.pillActive]}
              onPress={() => {
                void changeQuality('low');
              }}>
              <Text style={styles.pillText}>Low Data</Text>
            </Pressable>
            <Pressable
              style={[styles.pill, quality === 'high' && styles.pillActive]}
              onPress={() => {
                void changeQuality('high');
              }}>
              <Text style={styles.pillText}>High Quality</Text>
            </Pressable>
          </View>
        </View>

        <Text style={styles.sectionLabel}>Live actions</Text>
        {quickActions.map((action) => (
          <Pressable
            key={action.label}
            style={styles.actionButton}
            onPress={() => {
              void Linking.openURL(action.url);
            }}>
            <Text style={styles.actionText}>{action.label}</Text>
          </Pressable>
        ))}

        <Text style={styles.helper}>
          Optimized for low bandwidth first. Replace placeholder links in
          src/config.ts with your real endpoints.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f9f9fb'
  },
  container: {
    flex: 1,
    gap: 14,
    padding: 20
  },
  title: {
    fontSize: 30,
    fontWeight: '800'
  },
  subtitle: {
    color: '#5b6170'
  },
  playButton: {
    alignItems: 'center',
    backgroundColor: '#18181b',
    borderRadius: 16,
    minHeight: 56,
    justifyContent: 'center'
  },
  playText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '700'
  },
  qualityRow: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
    gap: 8
  },
  sectionLabel: {
    color: '#2d3240',
    fontSize: 15,
    fontWeight: '700'
  },
  pillRow: {
    flexDirection: 'row',
    gap: 8
  },
  pill: {
    backgroundColor: '#edf0f5',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8
  },
  pillActive: {
    backgroundColor: '#1f2937'
  },
  pillText: {
    color: '#111827',
    fontWeight: '600'
  },
  actionButton: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 14
  },
  actionText: {
    fontWeight: '600'
  },
  helper: {
    color: '#6b7280',
    fontSize: 12,
    marginTop: 'auto'
  }
});
