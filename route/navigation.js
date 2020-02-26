import {List} from '../screens/List/list';
import {StudentDetail} from '../screens/StudentDetails/student_details';
import {TeacherDetail} from '../screens/TeacherDetails/teacher_details';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';


const AppNavigator = createStackNavigator({
    Home: List,
    StudentDetail: StudentDetail,
    TeacherDetail: TeacherDetail,
}, {initialRouteName: 'Home'});

export const AppContainer = createAppContainer(AppNavigator);