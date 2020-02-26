import React, { useState } from 'react'
import {StyleSheet, SafeAreaView, ScrollView, View, Linking, Text, Image}from 'react-native';
import { useNavigationParam } from 'react-navigation-hooks';

export const TeacherDetail = ()=>{
    const item = useNavigationParam('item');
    
    return(
        <SafeAreaView>
            <Image style={styles.topBg} source={require('../../assets/top-bg.png')}/>
            <ScrollView>
                <View style={styles.ListBox}>
                    <View style={styles.ListItem}>
                        <View style={styles.titleBox}>
                            <Image style={styles.studentIcon} source={require('../../assets/teacher.png')} />
                            <Text style={styles.ListTitle}>{item.name}</Text>
                        </View>
                        <View style={styles.titleBox}>
                            <Image style={styles.studentIcon} source={require('../../assets/des.png')} />
                            <Text style={styles.List}>{item.designation}</Text>
                        </View>
                        <View style={styles.addressBox}>
                            <Image style={styles.studentIcon} source={require('../../assets/location.png')} />
                            <Text style={styles.List}>{item.address}</Text>
                        </View>
                        <View style={styles.titleBox}>
                            <Image style={styles.studentIcon} source={require('../../assets/phone.png')} />
                            <Text style={styles.List} onPress={()=>{Linking.openURL(`tel:${item.contact}`);}}>{item.contact}</Text>
                        </View>      
                    </View>
                </View>
            </ScrollView>
            <Image style={styles.bottomBg} source={require('../../assets/bottom-bg.png')}/>
        </SafeAreaView>
    
)};

TeacherDetail.navigationOptions = {
    headerTitleStyle: { color: "#fff", flex: 1,},
    headerTitleAlign: 'center',
    headerStyle: { backgroundColor: "#ff6f00", height:70,},
    headerTintColor: "#fff", 
    headerTitle: (
        <Image style={{width: 50, height: 60, }} source={require('../../assets/icon1.png')}/>
    ),
    headerBackground: (
        <Image
        style={{width: '100%', height: 70,}}
          source={require('../../assets/bg1.jpg')}
        />
    ),
}



const styles = StyleSheet.create({
    topBg:{
        width: '110%',
        height: 60,
        marginTop: -1,
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 9,
    },
    bottomBg:{
        width: '110%',
        height: 60,
        position: 'relative',
        bottom: 0,
        left: 0,
        zIndex: 9,
    },
    ListItem:{
        marginTop: 50,
        backgroundColor: '#858ff6',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 4,
        elevation: 2,      
    },
    titleBox:{
        flex:1,
        flexDirection: 'row',
        alignItems: 'center',

    },
    addressBox:{
        flex:1,
        flexDirection: 'row',
        alignItems: 'center',

    },
    studentIcon:{
        width: 15,
        height: 15,
        marginRight: 10,
    },
    ListTitle:{
        color: '#1c2364',
        fontSize: 16,
        fontWeight: 'bold',
    },

    List:{ 
        color: '#1c2364',
        fontSize: 16,
        
        
    },
})