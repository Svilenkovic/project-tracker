import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProjectDetailsScreen = ({ route, navigation }) => {
  const { project } = route.params;
  const [currentProject, setCurrentProject] = useState(project);

  const updateStatus = async (newStatus) => {
    try {
      const savedProjects = await AsyncStorage.getItem('projects');
      if (savedProjects) {
        const projects = JSON.parse(savedProjects);
        const updatedProjects = projects.map(p => {
          if (p.id === currentProject.id) {
            return { ...p, status: newStatus };
          }
          return p;
        });

        await AsyncStorage.setItem('projects', JSON.stringify(updatedProjects));
        setCurrentProject({ ...currentProject, status: newStatus });
        Alert.alert('Uspešno', 'Status projekta je ažuriran');
      }
    } catch (error) {
      Alert.alert('Greška', 'Došlo je do greške prilikom ažuriranja statusa');
    }
  };

  const deleteProject = async () => {
    Alert.alert(
      'Potvrda',
      'Da li ste sigurni da želite da obrišete ovaj projekat?',
      [
        { text: 'Otkaži', style: 'cancel' },
        {
          text: 'Obriši',
          style: 'destructive',
          onPress: async () => {
            try {
              const savedProjects = await AsyncStorage.getItem('projects');
              if (savedProjects) {
                const projects = JSON.parse(savedProjects);
                const updatedProjects = projects.filter(p => p.id !== currentProject.id);
                await AsyncStorage.setItem('projects', JSON.stringify(updatedProjects));
                navigation.goBack();
              }
            } catch (error) {
              Alert.alert('Greška', 'Došlo je do greške prilikom brisanja projekta');
            }
          },
        },
      ]
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'završeno':
        return '#4CAF50';
      case 'u toku':
        return '#2196F3';
      case 'nije započeto':
        return '#FFC107';
      default:
        return '#757575';
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{currentProject.name}</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Opis</Text>
          <Text style={styles.description}>{currentProject.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Status</Text>
          <View style={styles.statusContainer}>
            {['nije započeto', 'u toku', 'završeno'].map((status) => (
              <TouchableOpacity
                key={status}
                style={[
                  styles.statusButton,
                  currentProject.status === status && {
                    backgroundColor: getStatusColor(status),
                  },
                ]}
                onPress={() => updateStatus(status)}
              >
                <Text
                  style={[
                    styles.statusButtonText,
                    currentProject.status === status && styles.statusButtonTextActive,
                  ]}
                >
                  {status}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Datum kreiranja</Text>
          <Text style={styles.date}>
            {new Date(currentProject.createdAt).toLocaleDateString('sr-RS')}
          </Text>
        </View>

        <TouchableOpacity style={styles.deleteButton} onPress={deleteProject}>
          <Text style={styles.deleteButtonText}>Obriši Projekat</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#333',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusButton: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: '#2196F3',
    marginHorizontal: 4,
    borderRadius: 8,
    alignItems: 'center',
  },
  statusButtonText: {
    color: '#2196F3',
  },
  statusButtonTextActive: {
    color: 'white',
  },
  date: {
    fontSize: 16,
    color: '#666',
  },
  deleteButton: {
    backgroundColor: '#f44336',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProjectDetailsScreen; 