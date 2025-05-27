import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddProjectScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('nije započeto');

  const saveProject = async () => {
    if (!name.trim()) {
      Alert.alert('Greška', 'Molimo unesite naziv projekta');
      return;
    }

    try {
      const newProject = {
        id: Date.now().toString(),
        name: name.trim(),
        description: description.trim(),
        status,
        createdAt: new Date().toISOString(),
      };

      const existingProjects = await AsyncStorage.getItem('projects');
      const projects = existingProjects ? JSON.parse(existingProjects) : [];
      projects.push(newProject);

      await AsyncStorage.setItem('projects', JSON.stringify(projects));
      Alert.alert('Uspešno', 'Projekat je uspešno dodat', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      Alert.alert('Greška', 'Došlo je do greške prilikom čuvanja projekta');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Naziv projekta</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Unesite naziv projekta"
        />

        <Text style={styles.label}>Opis</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={description}
          onChangeText={setDescription}
          placeholder="Unesite opis projekta"
          multiline
          numberOfLines={4}
        />

        <Text style={styles.label}>Status</Text>
        <View style={styles.statusContainer}>
          {['nije započeto', 'u toku', 'završeno'].map((statusOption) => (
            <TouchableOpacity
              key={statusOption}
              style={[
                styles.statusButton,
                status === statusOption && styles.statusButtonActive,
              ]}
              onPress={() => setStatus(statusOption)}
            >
              <Text
                style={[
                  styles.statusButtonText,
                  status === statusOption && styles.statusButtonTextActive,
                ]}
              >
                {statusOption}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={saveProject}>
          <Text style={styles.saveButtonText}>Sačuvaj Projekat</Text>
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
  form: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  statusContainer: {
    flexDirection: 'row',
    marginBottom: 24,
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
  statusButtonActive: {
    backgroundColor: '#2196F3',
  },
  statusButtonText: {
    color: '#2196F3',
  },
  statusButtonTextActive: {
    color: 'white',
  },
  saveButton: {
    backgroundColor: '#2196F3',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddProjectScreen; 