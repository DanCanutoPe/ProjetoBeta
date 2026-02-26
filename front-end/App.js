import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';

const API_URL = 'http://10.0.2.2:3333'; // 10.0.2.2 is the localhost alias for Android Emulator. Change to your local IP for physical devices.

// Mascot Helper Function
const getMascotAscii = (physicalExp, mentalExp, petHealth) => {
  if (petHealth < 30) return '💀 (Mascote Morrendo)';
  if (physicalExp === 0 && mentalExp === 0) return '🥚 (Ovo)';

  if (physicalExp > mentalExp + 100) return '💪🦍 (Gorila Maromba)'; // Foco físico
  if (mentalExp > physicalExp + 100) return '🧠🦉 (Coruja Sábia)'; // Foco mental
  if (physicalExp >= 50 && mentalExp >= 50) return '🥷🧘‍♂️ (Monge Ninja)'; // Equilibrado

  return '🐣 (Pintinho)'; // Iniciante
};

export default function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLeaderboard = async () => {
    try {
      // Change this to output fetch correctly depending on emulator or web
      // Since it's expo web/android, we use a generic fetch. (Localhost vs 10.0.2.2 usually creates issues, so using 127.0.0.1 for Web or your PC's IP)
      // I'll try localhost first, which works for web. 
      const response = await fetch('http://localhost:3333/leaderboard').catch(() => fetch('http://10.0.2.2:3333/leaderboard'));
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível conectar a API.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const renderItem = ({ item, index }) => {
    const mascot = getMascotAscii(item.physicalExp, item.mentalExp, item.petHealth);

    return (
      <View style={styles.card}>
        <View style={styles.rankContainer}>
          <Text style={styles.rankText}>#{index + 1}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.nameText}>{item.name}</Text>
          <Text style={styles.statsText}>
            🔥 Streak: {item.currentStreak} dias | 🏆 Pontos: {item.totalPoints}
          </Text>
          <View style={styles.mascotContainer}>
            <Text style={styles.mascotLabel}>Seu Pet: {mascot}</Text>
            <Text style={styles.xpText}>Cérebro: {item.mentalExp} XP | Músculo: {item.physicalExp} XP</Text>
          </View>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FF4500" />
        <Text style={{ marginTop: 10, color: '#fff' }}>Carregando a Arena...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Pódio Semanal 🏆</Text>
      <Text style={styles.subtitle}>Evolua seu mascote treinando Corpo e Mente!</Text>

      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />

      <TouchableOpacity style={styles.refreshButton} onPress={fetchLeaderboard}>
        <Text style={styles.buttonText}>🔄 Atualizar Pódio</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121214',
    paddingTop: 50,
  },
  center: {
    flex: 1,
    backgroundColor: '#121214',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF4500',
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    color: '#A8A8B3',
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 14,
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#202024',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: '#FF4500',
  },
  rankContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#323238',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  rankText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  infoContainer: {
    flex: 1,
  },
  nameText: {
    color: '#E1E1E6',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statsText: {
    color: '#A8A8B3',
    fontSize: 12,
    marginBottom: 8,
  },
  mascotContainer: {
    backgroundColor: '#29292E',
    padding: 10,
    borderRadius: 8,
    marginTop: 5,
  },
  mascotLabel: {
    color: '#00B37E',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 4,
  },
  xpText: {
    color: '#C4C4CC',
    fontSize: 11,
  },
  refreshButton: {
    backgroundColor: '#FF4500',
    marginHorizontal: 20,
    marginBottom: 30,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
