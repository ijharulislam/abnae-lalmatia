import React from 'react'
import {StyleSheet, SafeAreaView, ScrollView, View, Text, Image, Linking}from 'react-native';

import { useNavigationParam } from 'react-navigation-hooks';

import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';



export const StudentDetail = ()=>{
    const item = useNavigationParam('item');
    return(
        <View>
            <Collapse>
                <CollapseHeader>
                <View>
                    <Text>Click here</Text>
                </View>
                </CollapseHeader>
                <CollapseBody>
                <Text>Ta daa!</Text>
                </CollapseBody>
            </Collapse>
        </View>
)};


const styles = StyleSheet.create({

})