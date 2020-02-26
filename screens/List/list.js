import React, { useState, useEffect,useCallback } from 'react';
import { SafeAreaView, Linking, View, StyleSheet, Text, ScrollView, TouchableOpacity, TextInput, Image, Picker} from 'react-native';
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
import {Tab} from '../../route/tab';
import { useNavigation } from 'react-navigation-hooks';

import teachers from '../../data/teachers.json';

const student_২০২০ = require(`../../data/Student_list/student_২০২০.json`);
const student_২০১৯ = require(`../../data/Student_list/student_২০১৯.json`);
const student_২০১৮ = require(`../../data/Student_list/student_২০১৮.json`);
const student_২০১৭ = require(`../../data/Student_list/student_২০১৭.json`);


const mapData = {
    student_২০২০,
    student_২০১৯,
    student_২০১৮,
    student_২০১৭
}

const allData = [
    ...student_২০২০,
    ...student_২০১৯,
    ...student_২০১৮,
    ...student_২০১৭
]

const getData = (year)=> {
    return `student_${year}` in mapData? mapData[`student_${year}`]:[]
}

const TeacherList = ({data})=>{
    const { navigate } = useNavigation();
    
    return(

        <View style={styles.ListBox}>
            
            {
                data.map((item, index)=>(
                    <View key={index} style={styles.ListItem}>
                    <Collapse>
                        <CollapseHeader style={styles.contBox}>
                            <View style={styles.contItem}>
                                <View style={styles.titleBox}>
                                    <Text style={styles.ListTitle}>{item.name}</Text>
                                </View>
                                <View style={styles.titleBox}>
                                    <Text style={styles.List}>{item.contact}</Text>
                                </View>
                            </View>
                            <View style={styles.imgBox}>
                                <TouchableOpacity onPress={()=>{Linking.openURL(`tel:${item.contact}`);}}><Image style={styles.itemImg} source={require('../../assets/call.png')}/></TouchableOpacity>
                                <TouchableOpacity onPress={()=>{Linking.openURL(`sms:${item.contact}`);}}><Image style={styles.itemImg} source={require('../../assets/sms.png')}/></TouchableOpacity>
                            </View>
                        </CollapseHeader>
                        <CollapseBody>
                            <View>
                                <View style={styles.titleBox}>
                                    <Text style={styles.List}> {item.designation} </Text>
                                </View>
                                <View style={styles.titleBox}>
                                    <Text style={styles.List}>{item.department}</Text>
                                </View>
                                <View style={styles.addressBox}>
                                    <Text style={styles.List}>{item.address}</Text>
                                </View>
                            </View>
                        </CollapseBody>
                    </Collapse>
                    </View>
                ))
            }
            
        </View>
    )
};

const StudentList = ({data})=>{
    const { navigate} = useNavigation();

    return(
        
        <View style={styles.ListBox}>
            
            {
                data.map((item, index)=>(
                    <View key={index} style={styles.ListItem}>
                    <Collapse>
                        <CollapseHeader style={styles.contBox}>
                            <View style={styles.contItem}>
                                <View style={styles.titleBox}>
                                    <Text style={styles.ListTitle}>{item.name}</Text>
                                </View>
                                <View style={styles.titleBox}>
                                    <Text style={styles.List}>{item.contact}</Text>
                                </View>
                            </View>
                            <View style={styles.imgBox}>
                                <TouchableOpacity onPress={()=>{Linking.openURL(`tel:${item.contact}`);}}><Image style={styles.itemImg} source={require('../../assets/call.png')}/></TouchableOpacity>
                                <TouchableOpacity onPress={()=>{Linking.openURL(`sms:${item.contact}`);}}><Image style={styles.itemImg} source={require('../../assets/sms.png')}/></TouchableOpacity>
                            </View>
                        </CollapseHeader>
                        <CollapseBody>
                            <View>
                                <View style={styles.titleBox}>
                                    <Text style={styles.titleHeading}>পিতা: </Text>
                                    <Text style={styles.List}>{item.father} </Text>
                                </View>
                                <View style={styles.titleBox}>
                                    <Text style={styles.titleHeading}>শিক্ষাবর্ষ: </Text>
                                    <Text style={styles.List}>{item.session} </Text>
                                </View>
                                <View style={styles.titleBox}>
                                    <Text style={styles.titleHeading}>বিভাগ: </Text>
                                    <Text style={styles.List}>{item.department}</Text>
                                </View>
                                <View style={styles.addressBox}>
                                    <Text style={styles.titleHeading}>ঠিকানা: </Text>
                                    <Text style={styles.List}>{item.address}</Text>
                                </View>
                                <View style={styles.addressBox}>
                                    <Text style={styles.titleHeading}>বর্তমান ঠিকানা: </Text>
                                    <Text style={styles.List}>{item.current_address}</Text>
                                </View>
                                <View style={styles.addressBox}>
                                    <Text style={styles.titleHeading}>পদবি: </Text>
                                    <Text style={styles.List}>{item.designation}</Text>
                                </View>
                                <View style={styles.addressBox}>
                                    <Text style={styles.titleHeading}>রক্তের গ্রুপ: </Text>
                                    <Text style={styles.List}>{item.blood}</Text>
                                </View>
                            </View>
                        </CollapseBody>
                    </Collapse>
                    </View>
                ))
            }
            
        </View>
    )
}

export const List =()=>{

    const [activeTab, setActiveTab] = React.useState("teachers");
    
    const [department, setDepartment] = React.useState("ইফতা বিভাগ");
    const [session, setSession] = React.useState("২০২০");

    const [searchParam, setSearchParam] = React.useState("");

    const [studentData, setStudentData] = React.useState(getData("২০২০"));
    const [teacherData, setTeacherData] = React.useState(teachers);
    const [loading, setLoading] = React.useState(false);

    useEffect(()=> {

        if(activeTab==="students" && !searchParam){
            setStudentData(getData(session));

            if(department && department !== "0"){
                const stData = getData(session);
                const filteredData = stData.filter(item => item.department.includes(department) && item.session && item.session.includes(session))
                setStudentData(filteredData);
            }
        } else if (activeTab==="teachers" && !searchParam){
            setTeacherData(teachers);
        }
       
    }, [activeTab, department, session])

    
    const searchItems = useEffect(()=>{

        if(searchParam) {
            const studentSearch = allData.filter(item => item.name.includes(searchParam));
            const teachSearch = teachers.filter(item => item.name.includes(searchParam));
            
            if(studentSearch.length > 0){
                setStudentData(studentSearch);
            } else if (teachSearch.length > 0){
                setTeacherData(teachSearch);
            } else {
                setStudentData([]);
                setTeacherData([]);
            }
        }
    },[searchParam])


    return(
        <SafeAreaView style={styles.listBox}>
            <Image style={styles.topBg} source={require('../../assets/top-bg.png')}/> 
            <ScrollView>
                
                <View style = {styles.searchBox}>
                    <TextInput placeholder="অনুসন্ধান" value={searchParam} style={styles.input} onChangeText={text => setSearchParam(text)}/>
                    <Image source ={require('../../assets/search.png')} style={styles.arrowIcon} onPress={()=> searchItems()}/>
                </View>

                <View style={styles.pickerWrap}>
                    <View style={styles.pickerBox}>
                        <Picker
                            selectedValue={department}
                            style={styles.picker}
                            onValueChange={(value) => setDepartment(value)}
                            >
                            <Picker.Item style={styles.pickerItem} label="ইফতা বিভাগ" value="ইফতা বিভাগ" key="1" />
                            <Picker.Item style={styles.pickerItem} label="তাকমীল বিভাগ" value="তাকমীল বিভাগ" key="2" />
                            <Picker.Item style={styles.pickerItem} label="হিফজ বিভাগ" value="হিফজ বিভাগ" key="3" />
                        </Picker>
                    </View>

                    <View style={styles.pickerBox}>
                        <Picker
                            selectedValue={session}
                            style={styles.picker}
                            onValueChange={(value) => setSession(value)}
                            >
                            <Picker.Item style={styles.pickerItem} label="২০২০" value="২০২০" key="1" />
                            <Picker.Item style={styles.pickerItem} label="২০১৯" value="২০১৯" key="2" />
                            <Picker.Item style={styles.pickerItem} label="২০১৮" value="২০১৮" key="3" />
                            <Picker.Item style={styles.pickerItem} label="২০১৭" value="২০১৭" key="4" />
                            <Picker.Item style={styles.pickerItem} label="২০১৬" value="২০১৬" key="5" />
                            <Picker.Item style={styles.pickerItem} label="২০১৫" value="২০১৫" key="6" />
                            <Picker.Item style={styles.pickerItem} label="২০১৪" value="২০১৪" key="7" />
                            <Picker.Item style={styles.pickerItem} label="২০১৩" value="২০১৩" key="8" />
                            <Picker.Item style={styles.pickerItem} label="২০১২" value="২০১২" key="9" />
                            <Picker.Item style={styles.pickerItem} label="২০১১" value="২০১১" key="10" />
                            <Picker.Item style={styles.pickerItem} label="২০১০" value="২০১০" key="11" />
                            <Picker.Item style={styles.pickerItem} label="২০০৯" value="২০০৯" key="12" />
                            <Picker.Item style={styles.pickerItem} label="২০০৮" value="২০০৮" key="13" />
                            <Picker.Item style={styles.pickerItem} label="২০০৭" value="২০০৭" key="14" />
                            <Picker.Item style={styles.pickerItem} label="২০০৬" value="২০০৬" key="15" />
                            <Picker.Item style={styles.pickerItem} label="২০০৫" value="২০০৫" key="16" />
                            <Picker.Item style={styles.pickerItem} label="২০০৪" value="২০০৪" key="17" />
                            <Picker.Item style={styles.pickerItem} label="২০০৩" value="২০০৩" key="18" />
                            <Picker.Item style={styles.pickerItem} label="২০০২" value="২০০২" key="19" />
                            <Picker.Item style={styles.pickerItem} label="২০০১" value="২০০১" key="20" />
                            <Picker.Item style={styles.pickerItem} label="২০০০" value="২০০০" key="21" />
                            <Picker.Item style={styles.pickerItem} label="১৯৯৯" value="১৯৯৯" key="22" />
                            <Picker.Item style={styles.pickerItem} label="১৯৯৮" value="১৯৯৮" key="23" />
                            <Picker.Item style={styles.pickerItem} label="১৯৯৭" value="১৯৯৭" key="24" />
                            <Picker.Item style={styles.pickerItem} label="১৯৯৬" value="১৯৯৬" key="25" />
                            <Picker.Item style={styles.pickerItem} label="১৯৯৫" value="১৯৯৫" key="27" />
                            <Picker.Item style={styles.pickerItem} label="১৯৯৪" value="১৯৯৪" key="28" />
                            <Picker.Item style={styles.pickerItem} label="১৯৯৩" value="১৯৯৩" key="29" />
                            <Picker.Item style={styles.pickerItem} label="১৯৯২" value="১৯৯২" key="30" />
                            <Picker.Item style={styles.pickerItem} label="১৯৯১" value="১৯৯১" key="31" />
                            <Picker.Item style={styles.pickerItem} label="১৯৯০" value="১৯৯০" key="32" />
                            <Picker.Item style={styles.pickerItem} label="১৯৮৯" value="১৯৮৯" key="33" />
                            <Picker.Item style={styles.pickerItem} label="১৯৮৮" value="১৯৮৮" key="34" />
                            <Picker.Item style={styles.pickerItem} label="১৯৮৭" value="১৯৮৭" key="35" />
                            <Picker.Item style={styles.pickerItem} label="১৯৮৬" value="১৯৮৬" key="36" />
                            <Picker.Item style={styles.pickerItem} label="১৯৮৫" value="১৯৮৫" key="37" />
                            <Picker.Item style={styles.pickerItem} label="১৯৮৪" value="১৯৮৪" key="38" />
                            <Picker.Item style={styles.pickerItem} label="১৯৮৩" value="১৯৮৩" key="39" />
                            <Picker.Item style={styles.pickerItem} label="১৯৮২" value="১৯৮২" key="40" />
                            <Picker.Item style={styles.pickerItem} label="১৯৮১" value="১৯৮১" key="41" />
                            <Picker.Item style={styles.pickerItem} label="১৯৮০" value="১৯৮০" key="42" />
                            <Picker.Item style={styles.pickerItem} label="১৯৭৯" value="১৯৭৯" key="43" />
                            <Picker.Item style={styles.pickerItem} label="১৯৭৮" value="১৯৭৮" key="44" />
                            <Picker.Item style={styles.pickerItem} label="১৯৭৭" value="১৯৭৭" key="45" />
                            <Picker.Item style={styles.pickerItem} label="১৯৭৬" value="১৯৭৬" key="46" />
                            <Picker.Item style={styles.pickerItem} label="১৯৭৫" value="১৯৭৫" key="47" />
                            <Picker.Item style={styles.pickerItem} label="১৯৭৪" value="১৯৭৪" key="48" />
                            <Picker.Item style={styles.pickerItem} label="১৯৭৩" value="১৯৭৩" key="49" />
                            <Picker.Item style={styles.pickerItem} label="১৯৭২" value="১৯৭২" key="50" />
                            <Picker.Item style={styles.pickerItem} label="১৯৭১" value="১৯৭১" key="51" />
                            <Picker.Item style={styles.pickerItem} label="১৯৭০" value="১৯৭০" key="52" />
                            <Picker.Item style={styles.pickerItem} label="১৯৬৯" value="১৯৬৯" key="53" />
                            <Picker.Item style={styles.pickerItem} label="১৯৬৮" value="১৯৬৮" key="54" />
                            <Picker.Item style={styles.pickerItem} label="১৯৬৭" value="১৯৬৭" key="55" />
                            <Picker.Item style={styles.pickerItem} label="১৯৬৬" value="১৯৬৬" key="56" />


                        </Picker>
                    </View>
                </View>
            
                <View>
                    <View style={styles.tabBox}>
                        <Tab 
                            onPress={() => setActiveTab('teachers')}
                            activeTab={activeTab}
                            type={"teachers"}
                        />
                        <Tab
                            onPress={() => setActiveTab('students')}
                            activeTab={activeTab}
                            type={"students"}
                        />
                    </View>
                    <View style={styles.tabCont}>
                            {activeTab ==='teachers' ? (
                                <TeacherList data={teacherData} />
                            ): (
                                <StudentList data={studentData} />
                            )
                            
                            }
                    </View>
                </View>
            </ScrollView>
            <Image style={styles.bottomBg} source={require('../../assets/bottom-bg.png')}/>
         </SafeAreaView>
        )
}



List.navigationOptions = {
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
          source={require('../../assets/bg1.png')}
        />
    ),
}

const styles = StyleSheet.create({


    listBox:{
        backgroundColor: '#e8eaf0',
        paddingLeft: 15,
        paddingRight:15,
        flexGrow: 1,  
        justifyContent: 'space-between'
    },
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
        position: 'absolute',
        bottom: 0,
        left: 0,
        zIndex: 9,
    },
    
    searchBox:{
        flexBasis: '10%',
        height:50,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 4,
        backgroundColor: '#fff',
        marginTop: 80,
        paddingLeft: 10,
    },
    input:{
      flex: 1,
      paddingLeft: 10,
      color: '#696969',
      fontSize: 15,
    },
    arrowIcon:{
      width: 20,
      height: 20,
      justifyContent: 'flex-end',
      marginRight:10,
      alignItems: 'center'
    },
    pickerWrap:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    pickerBox:{
        flexBasis: '48%',
        borderRadius: 4,
        backgroundColor: '#fff',
        marginTop: 20,
        paddingLeft: 10,
    },
    picker:{
        color: '#696969',
        
    },
    pickerItem:{},
    tabBox:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 4,
        borderRadius: 4,
        borderBottomWidth: 1,
        borderColor:'#7a11e6',
        marginTop: 20,
    },
    ListBox:{
        marginBottom: 100,
        borderRadius: 4,
        height: 'auto',
    },
    
    ListItem:{
        marginTop: 15,
        backgroundColor: '#858ff6',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 4,
        elevation: 2,      
    },
    contBox:{
        flexDirection: 'row',
        
    },
    contItem:{
        flex: 6,
    },
    imgBox:{
        flex: 1,
    },
    itemImg:{
        height: 40,
        width: 40,
    },
    titleBox:{
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
    titleHeading:{
        color: '#1c2364',
        fontSize: 16,
        fontWeight: 'bold',
        paddingRight: 5,
        paddingTop: 5,
    },
    List:{ 
        color: '#1c2364',
        fontSize: 16,
        
        
    }
   

})