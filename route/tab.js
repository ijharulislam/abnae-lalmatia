import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text } from 'react-native'



export const Tab = ({ onPress, activeTab, type }) => {
    return (
      <View style={styles.tabBox}>
        <TouchableOpacity
          onPress={onPress}
          style={{
            ...styles.tab,
            ...(activeTab === type ? styles.tabActive : {})
          }}
        >
          <Text
            style={{
              ...styles.tabTitle,
              ...(activeTab === type ? styles.tabTitleActive : {})
            }}
          >
            {type === "teachers" ? "শিক্ষক" : "ছাত্র "}
          </Text>
        </TouchableOpacity>
      </View>
    )
  };


   
  const styles = StyleSheet.create({
    tabBox:{
      width: '50%',
      marginLeft: -3,
      marginRight: -3,
    },
    tab: {
      marginBottom: -5,
      borderTopLeftRadius: 4,
      borderTopRightRadius: 4,
      
    },
    tabTitle: {
      fontSize: 16,
      textAlign: "center",
      padding: 15,
      fontWeight: "500",
      color:'#6800c6',
      fontWeight: 'bold',
      textTransform: 'uppercase',
    },
    tabActive: {
      backgroundColor: '#7a11e6',
      
    },
    tabTitleActive: {
      color: '#fff',
    },
  
});