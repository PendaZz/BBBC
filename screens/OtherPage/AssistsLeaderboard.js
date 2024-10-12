import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import Header from "../../component/Header";
import { ScrollView } from "react-native-gesture-handler";

export default function AssistsLeaderboard({ }) {

  // Player data
  const playerData = [
    ["Shannon Scott", 1, 22, 4.91, 4.91, 2.05, 1.64, 33.3, 2.23, 0.68, 30.6, 1.36, 0.95, 70.0, 3.27, 0.14, 1.68, 1.27, 32, 'G'],
    ["Mitch Norton", 2, 28, 7.11, 5.75, 2.21, 2.36, 41.0, 1.79, 0.64, 36.0, 2.43, 1.75, 72.1, 2.71, 0.04, 0.82, 1.25, 70, 'G'],
    ["Nathan Sobey", 3, 27, 20.15, 15.48, 4.41, 6.22, 40.2, 6.52, 1.81, 27.8, 6.85, 5.89, 85.9, 2.56, 0.22, 1, 2.33, 130, 'G'],
    ["Josh Bannan", 4, 19, 11.95, 10.53, 7.21, 4.74, 45.0, 1.74, 0.58, 33.3, 2.53, 1.89, 75.0, 1.53, 0.21, 0.42, 1.26, 38, 'F'],
    ["Isaac White", 5, 28, 7, 5.89, 2.04, 2.79, 47.3, 1.54, 0.32, 20.9, 1.54, 1.11, 72.1, 1.46, 0, 0.29, 0.68, 42, 'G'],
    ["Sam McDaniel", 6, 28, 8.96, 7.07, 4.04, 3.14, 44.4, 1.93, 0.61, 31.5, 2.75, 2.07, 75.3, 1.32, 0.29, 0.75, 0.71, 57, 'G'],
    ["Chris Smith", 7, 27, 11, 9.59, 2.93, 4, 41.7, 5.15, 1.63, 31.7, 1.89, 1.37, 72.5, 1.11, 0.26, 0.56, 1.11, 48, 'G'],
    ["DJ Mitchell", 8, 15, 5, 3.8, 2.93, 1.93, 50.9, 2, 0.87, 43.3, 0.4, 0.27, 66.7, 0.93, 0.33, 0.53, 0.87, 6, 'F'],
    ["Casey Prather", 9, 7, 6.71, 7, 3, 2.43, 34.7, 2.43, 1, 41.2, 1.14, 0.86, 75.0, 0.86, 0.14, 0.71, 1.29, 6, 'F'],
    ["Tyrell Harrison", 10, 27, 9.56, 6.52, 6.22, 3.81, 58.5, 0.07, 0.04, 50.0, 2.96, 1.89, 63.7, 0.52, 1.41, 0.52, 1.63, 66, 'C'],
    ["Aron Baynes", 11, 23, 7.3, 5.35, 4.26, 2.57, 48.0, 1.09, 0.35, 32.0, 2.3, 1.83, 79.2, 0.52, 0.39, 0.13, 1.39, 48, 'C'],
    ["Matthew Johns", 12, 13, 0, 0.31, 0.77, 0, 0, 0.23, 0, 0.23, 0, 0, 0, 0.15, 0, 0.08, 0.23, 1, 'PF'],
    ["Rocco Zikarsky", 13, 27, 3.22, 2.3, 2.11, 1.37, 59.7, 0.04, 0, 0, 0.96, 0.48, 50.0, 0.15, 1, 0.11, 0.56, 21, 'C'],
    ["Gabe Hadley", 14, 6, 0.17, 1, 0, 0, 0, 0.5, 0, 0, 0.33, 0.17, 50.0, 0, 0, 0, 0, 0, 'G'],
    ["Tristan Devers", 15, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.5, 0, 0, 0, 'G']
  ];

  const renderItem = ({ item }) => (
    <View style={[styles.row, item[1] % 2 === 0 ? styles.evenRow : styles.oddRow]}>
      {item.map((cell, index) => (
        <Text key={index} style={[styles.cell, { width: index === 0 ? 150 : 60 }]}>{cell}</Text>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <Header />
      <View>
        <ScrollView horizontal={true}>
        <View>
          <FlatList
            data={playerData}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            ListHeaderComponent={() => (
              <View style={[styles.row, styles.header]}>
                <Text style={[styles.cell, styles.headerText, { width: 150 }]}>Name</Text>
                <Text style={[styles.cell, styles.headerText, { width: 60 }]}>RANK</Text>
                <Text style={[styles.cell, styles.headerText, { width: 40 }]}>GP</Text>
                <Text style={[styles.cell, styles.headerText, { width: 60 }]}>PPG</Text>
                <Text style={[styles.cell, styles.headerText, { width: 60 }]}>FGA</Text>
                <Text style={[styles.cell, styles.headerText, { width: 60 }]}>RPG</Text>
                <Text style={[styles.cell, styles.headerText, { width: 60 }]}>FGM</Text>
                <Text style={[styles.cell, styles.headerText, { width: 60 }]}>FG%</Text>
                <Text style={[styles.cell, styles.headerText, { width: 60 }]}>3PA</Text>
                <Text style={[styles.cell, styles.headerText, { width: 60 }]}>3PM</Text>
                <Text style={[styles.cell, styles.headerText, { width: 60 }]}>3P%</Text>
                <Text style={[styles.cell, styles.headerText, { width: 60 }]}>FTA</Text>
                <Text style={[styles.cell, styles.headerText, { width: 60 }]}>FTM</Text>
                <Text style={[styles.cell, styles.headerText, { width: 60 }]}>FT%</Text>
                <Text style={[styles.cell, styles.headerText, { width: 60 }]}>APG</Text>
                <Text style={[styles.cell, styles.headerText, { width: 60 }]}>BPG</Text>
                <Text style={[styles.cell, styles.headerText, { width: 60 }]}>SPG</Text>
                <Text style={[styles.cell, styles.headerText, { width: 60 }]}>TPG</Text>
                <Text style={[styles.cell, styles.headerText, { width: 60 }]}>F</Text>
                <Text style={[styles.cell, styles.headerText, { width: 60 }]}>POS</Text>
              </View>
            )}
          />
        </View>
      </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  row: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#ccc', height: 40 },
  cell: { paddingVertical: 8, paddingHorizontal: 4, textAlign: 'center' },
  headerText: { fontWeight: 'bold' },
  evenRow: { backgroundColor: '#f9f9f9' },
  oddRow: { backgroundColor: '#fff' }
});
