import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const Results = ({ data, onBack, globalTheme = 'Light' }) => {
  if (!data) return null;

  const isDark = globalTheme === 'Dark';
  const themeStyles = {
    container: { backgroundColor: isDark ? '#1a1a1a' : '#f8f9fa' },
    card: { backgroundColor: isDark ? '#2d2d2d' : 'white' },
    title: { color: isDark ? 'white' : '#333' },
    subtitle: { color: isDark ? '#ccc' : '#666' },
    sectionTitle: { color: isDark ? 'white' : '#333' },
    foodName: { color: isDark ? 'white' : '#333' },
    foodWeight: { color: isDark ? '#ccc' : '#666' },
    calorieLabel: { color: isDark ? '#ccc' : '#666' },
    confidenceBadge: { backgroundColor: isDark ? '#3d3d3d' : '#f8f9fa' },
    confidenceText: { color: isDark ? '#ccc' : '#666' },
    macroLabel: { color: isDark ? '#ccc' : '#666' },
    macroBreakdown: { color: isDark ? '#ccc' : '#666' },
    foodItem: { borderBottomColor: isDark ? '#555' : '#eee' },
  };

  return (
    <ScrollView style={[styles.container, themeStyles.container]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        
        <Text style={[styles.title, themeStyles.title]}>Analysis Results</Text>
        <Text style={[styles.subtitle, themeStyles.subtitle]}>AI-powered nutrition analysis</Text>
      </View>

      <View style={[styles.card, themeStyles.card]}>
        <View style={styles.calorieSection}>
          <Text style={styles.calorieNumber}>{data.totalCalories}</Text>
          <Text style={[styles.calorieLabel, themeStyles.calorieLabel]}>Total Calories</Text>
          <View style={[styles.confidenceBadge, themeStyles.confidenceBadge]}>
            <Text style={[styles.confidenceText, themeStyles.confidenceText]}>Confidence: {data.confidence}%</Text>
          </View>
        </View>
      </View>

      {data.macronutrients && (
        <View style={[styles.card, themeStyles.card]}>
          <Text style={[styles.sectionTitle, themeStyles.sectionTitle]}>Macronutrients</Text>
          <View style={styles.macroGrid}>
            <View style={styles.macroItem}>
              <Text style={[styles.macroValue, { color: '#FF9800' }]}>
                {data.macronutrients.protein}g
              </Text>
              <Text style={[styles.macroLabel, themeStyles.macroLabel]}>Protein</Text>
            </View>
            <View style={styles.macroItem}>
              <Text style={[styles.macroValue, { color: '#2196F3' }]}>
                {data.macronutrients.carbs}g
              </Text>
              <Text style={[styles.macroLabel, themeStyles.macroLabel]}>Carbs</Text>
            </View>
            <View style={styles.macroItem}>
              <Text style={[styles.macroValue, { color: '#9C27B0' }]}>
                {data.macronutrients.fat}g
              </Text>
              <Text style={[styles.macroLabel, themeStyles.macroLabel]}>Fat</Text>
            </View>
          </View>
        </View>
      )}

      <View style={[styles.card, themeStyles.card]}>
        <Text style={[styles.sectionTitle, themeStyles.sectionTitle]}>Detected Food Items</Text>
        {data.foodItems.map((item, index) => (
          <View key={index} style={[styles.foodItem, themeStyles.foodItem]}>
            <View style={styles.foodInfo}>
              <Text style={[styles.foodName, themeStyles.foodName]}>{item.name}</Text>
              <Text style={[styles.foodWeight, themeStyles.foodWeight]}>{item.weight}{item.unit}</Text>
            </View>
            <View style={styles.foodCalories}>
              <Text style={styles.calorieValue}>{item.calories} cal</Text>
              {item.protein !== undefined && (
                <Text style={[styles.macroBreakdown, themeStyles.macroBreakdown]}>
                  P: {item.protein}g | C: {item.carbs}g | F: {item.fat}g
                </Text>
              )}
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    alignItems: 'center',
  },
  backButton: {
    alignSelf: 'flex-start',
    backgroundColor: 'transparent',
    padding: 8,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#4CAF50',
    marginBottom: 20,
  },
  backButtonText: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    margin: 20,
    marginTop: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  calorieSection: {
    alignItems: 'center',
  },
  calorieNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 8,
  },
  calorieLabel: {
    fontSize: 18,
    color: '#666',
    marginBottom: 16,
  },
  confidenceBadge: {
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  confidenceText: {
    fontSize: 14,
    color: '#666',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333',
  },
  macroGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  macroItem: {
    alignItems: 'center',
  },
  macroValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  macroLabel: {
    fontSize: 14,
    color: '#666',
  },
  foodItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  foodInfo: {
    flex: 1,
  },
  foodName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  foodWeight: {
    fontSize: 14,
    color: '#666',
  },
  foodCalories: {
    alignItems: 'flex-end',
  },
  calorieValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4CAF50',
  },
  macroBreakdown: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
});

export default Results;