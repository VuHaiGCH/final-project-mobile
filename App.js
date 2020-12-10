import React from 'react';
import { StyleSheet } from 'react-native'

import Dashboard from './components/Dashboard/Dashboard';
import OverviewFee from './components/Fee/OverviewFee';
import ListFee from './components/Fee/ListFee';
import ListOfMark from './components/Mark/ListOfMark';
import ListofNews from '././components/News/ListofNews';
import ListofDocument from '././components/Document/ListofDocument';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DetailofNews from './components/News/DetailofNews';
import Schedule from './components/Class/Schedule';
import LoginScreen from './components/auth/LoginScreen'
import AddBlog from './components/Blogs/AddBlog';
import CommentUser from './components/Blogs/CommentUser';
import ListBlog from './components/Blogs/ListBlog';
import Chat from './components/Chat/Chat';

const Stack = createStackNavigator();

function MyStack() {
  return (

    <Stack.Navigator>

      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          title: 'Student Assistant'
        }}
      />
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ListFee"
        component={ListFee}
        options={{ title: 'List Fee' }}
      />

      <Stack.Screen
        name="OverviewFee"
        component={OverviewFee}
        options={{ title: 'Overview' }}
      />
      <Stack.Screen
        name="ListMark"
        component={ListOfMark}
        options={{ title: 'Mark' }}
      />

      <Stack.Screen
        name="ListofNews"
        component={ListofNews}
        options={{ title: 'List of News' }}
      />

      <Stack.Screen
        name="ListofDocument"
        component={ListofDocument}
        options={{ title: 'List of Documents' }}
      />

      <Stack.Screen
        name="DetailofNews"
        component={DetailofNews}
        options={{ title: 'Detail' }}
      />

      <Stack.Screen
        name="schedule"
        component={Schedule}
        options={{ title: 'Scheduel' }}
      />

      <Stack.Screen
        name="AddBlog"
        component={AddBlog}
        options={{ title: 'Add Blog' }}
      />


      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{ title: 'Chat' }}
      />

      <Stack.Screen
        name="ListBlog"
        component={ListBlog}
        options={{ title: 'Comments' }}
      />

      <Stack.Screen
        name="CommentUser"
        component={CommentUser}
        options={{ title: 'Comments' }}
      />

    </Stack.Navigator>
  );
}



export default class App extends React.Component {

  render() {


    return (

      <NavigationContainer>
        <MyStack />
      </NavigationContainer>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

});
