import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import Header from "../../component/Header";
import { ScrollView } from "react-native-gesture-handler";

export default function ReboundsLeaderboard({ }) {

  // Player data
  const playerData = [
    { name: "Josh Bannan", rank: 1, gp: 19, ppg: 11.95, fga: 10.53, rpg: 7.21, fgm: 4.74, fgPercentage: 45.0, threePA: 1.74, threePM: 0.58, threePPercentage: 33.3, fta: 2.53, ftm: 1.89, ftPercentage: 75.0, apg: 1.53, bpg: 0.21, spg: 0.42, tpg: 1.26, f: 38, pos: 'F' },
    { name: "Tyrell Harrison", rank: 2, gp: 27, ppg: 9.56, fga: 6.52, rpg: 6.22, fgm: 3.81, fgPercentage: 58.5, threePA: 0.07, threePM: 0.04, threePPercentage: 50.0, fta: 2.96, ftm: 1.89, ftPercentage: 63.7, apg: 0.52, bpg: 1.41, spg: 0.52, tpg: 1.63, f: 66, pos: 'C' },
    { name: "Nathan Sobey", rank: 3, gp: 27, ppg: 20.15, fga: 15.48, rpg: 4.41, fgm: 6.22, fgPercentage: 40.2, threePA: 6.52, threePM: 1.81, threePPercentage: 27.8, fta: 6.85, ftm: 5.89, ftPercentage: 85.9, apg: 2.56, bpg: 0.22, spg: 1, tpg: 2.33, f: 130, pos: 'G' },
    { name: "Aron Baynes", rank: 4, gp: 23, ppg: 7.3, fga: 5.35, rpg: 4.26, fgm: 2.57, fgPercentage: 48.0, threePA: 1.09, threePM: 0.35, threePPercentage: 32.0, fta: 2.3, ftm: 1.83, ftPercentage: 79.2, apg: 0.52, bpg: 0.39, spg: 0.13, tpg: 1.39, f: 48, pos: 'C' },
    { name: "Sam McDaniel", rank: 5, gp: 28, ppg: 8.96, fga: 7.07, rpg: 4.04, fgm: 3.14, fgPercentage: 44.4, threePA: 1.93, threePM: 0.61, threePPercentage: 31.5, fta: 2.75, ftm: 2.07, ftPercentage: 75.3, apg: 1.32, bpg: 0.29, spg: 0.75, tpg: 0.71, f: 57, pos: 'G' },
    { name: "Casey Prather", rank: 6, gp: 7, ppg: 6.71, fga: 7, rpg: 3, fgm: 2.43, fgPercentage: 34.7, threePA: 2.43, threePM: 1, threePPercentage: 41.2, fta: 1.14, ftm: 0.86, ftPercentage: 75.0, apg: 0.86, bpg: 0.14, spg: 0.71, tpg: 1.29, f: 6, pos: 'F' },
    { name: "DJ Mitchell", rank: 7, gp: 15, ppg: 5, fga: 3.8, rpg: 2.93, fgm: 1.93, fgPercentage: 50.9, threePA: 2, threePM: 0.87, threePPercentage: 43.3, fta: 0.4, ftm: 0.27, ftPercentage: 66.7, apg: 0.93, bpg: 0.33, spg: 0.53, tpg: 0.87, f: 6, pos: 'F' },
    { name: "Chris Smith", rank: 8, gp: 27, ppg: 11, fga: 9.59, rpg: 2.93, fgm: 4, fgPercentage: 41.7, threePA: 5.15, threePM: 1.63, threePPercentage: 31.7, fta: 1.89, ftm: 1.37, ftPercentage: 72.5, apg: 1.11, bpg: 0.26, spg: 0.56, tpg: 1.11, f: 48, pos: 'G' },
    { name: "Mitch Norton", rank: 9, gp: 28, ppg: 7.11, fga: 5.75, rpg: 2.21, fgm: 2.36, fgPercentage: 41.0, threePA: 1.79, threePM: 0.64, threePPercentage: 36.0, fta: 2.43, ftm: 1.75, ftPercentage: 72.1, apg: 2.71, bpg: 0.04, spg: 0.82, tpg: 1.25, f: 70, pos: 'G' },
    { name: "Rocco Zikarsky", rank: 10, gp: 27, ppg: 3.22, fga: 2.3, rpg: 2.11, fgm: 1.37, fgPercentage: 59.7, threePA: 0.04, threePM: 0, threePPercentage: 0, fta: 0.96, ftm: 0.48, ftPercentage: 50.0, apg: 0.15, bpg: 1, spg: 0.11, tpg: 0.56, f: 21, pos: 'C' },
    { name: "Shannon Scott", rank: 11, gp: 22, ppg: 4.91, fga: 4.91, rpg: 2.05, fgm: 1.64, fgPercentage: 33.3, threePA: 2.23, threePM: 0.68, threePPercentage: 30.6, fta: 1.36, ftm: 0.95, ftPercentage: 70.0, apg: 3.27, bpg: 0.14, spg: 1.68, tpg: 1.27, f: 32, pos: 'G' },
    { name: "Isaac White", rank: 12, gp: 28, ppg: 7, fga: 5.89, rpg: 2.04, fgm: 2.79, fgPercentage: 47.3, threePA: 1.54, threePM: 0.32, threePPercentage: 20.9, fta: 1.54, ftm: 1.11, ftPercentage: 72.1, apg: 1.46, bpg: 0, spg: 0.29, tpg: 0.68, f: 42, pos: 'G' },
    { name: "Matthew Johns", rank: 13, gp: 13, ppg: 0, fga: 0.31, rpg: 0.77, fgm: 0, fgPercentage: 0, threePA: 0.23, threePM: 0.08, threePPercentage: 0.23, fta: 0, ftm: 0, ftPercentage: 0, apg: 0.15, bpg: 0, spg: 0.08, tpg: 0.23, f: 1, pos: 'PF' },
    { name: "Gabe Hadley", rank: 14, gp: 6, ppg: 0.17, fga: 1, rpg: 0, fgm: 0, fgPercentage: 0, threePA: 0.5, threePM: 0, threePPercentage: 0, fta: 0.33, ftm: 0.17, ftPercentage: 50.0, apg: 0, bpg: 0, spg: 0, tpg: 0, f: 0, pos: 'G' },
    { name: "Tristan Devers", rank: 15, gp: 2, ppg: 0, fga: 0, rpg: 0, fgm: 0, fgPercentage: 0, threePA: 0, threePM: 0, threePPercentage: 0, fta: 0, ftm: 0, ftPercentage: 0, apg: 0, bpg: 0.5, spg: 0, tpg: 0, f: 0, pos: 'G' }
  ];

  const renderItem = ({ item }) => (
    <View style={[styles.row, item.index % 2 === 0 ? styles.evenRow : styles.oddRow]}>
      <Text style={[styles.cell, { width: 150 }]}>{item.name}</Text>
      <Text style={[styles.cell, { width: 60 }]}>{item.rank}</Text>
      <Text style={[styles.cell, { width: 40 }]}>{item.gp}</Text>
      <Text style={[styles.cell, { width: 60 }]}>{item.ppg}</Text>
      <Text style={[styles.cell, { width: 60 }]}>{item.fga}</Text>
      <Text style={[styles.cell, { width: 60 }]}>{item.rpg}</Text>
      <Text style={[styles.cell, { width: 60 }]}>{item.fgm}</Text>
      <Text style={[styles.cell, { width: 60 }]}>{item.fgPercentage}</Text>
      <Text style={[styles.cell, { width: 60 }]}>{item.threePA}</Text>
      <Text style={[styles.cell, { width: 60 }]}>{item.threePM}</Text>
      <Text style={[styles.cell, { width: 60 }]}>{item.threePPercentage}</Text>
      <Text style={[styles.cell, { width: 60 }]}>{item.fta}</Text>
      <Text style={[styles.cell, { width: 60 }]}>{item.ftm}</Text>
      <Text style={[styles.cell, { width: 60 }]}>{item.ftPercentage}</Text>
      <Text style={[styles.cell, { width: 60 }]}>{item.apg}</Text>
      <Text style={[styles.cell, { width: 60 }]}>{item.bpg}</Text>
      <Text style={[styles.cell, { width: 60 }]}>{item.spg}</Text>
      <Text style={[styles.cell, { width: 60 }]}>{item.tpg}</Text>
      <Text style={[styles.cell, { width: 60 }]}>{item.f}</Text>
      <Text style={[styles.cell, { width: 60 }]}>{item.pos}</Text>
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
