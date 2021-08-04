import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,Image } from 'react-native';
import TransactionScreen from './screens/BookTransactionScreen';
import SearchScreen from './screens/SearchScreen';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';

export default class App extends React.Component{
  render(){
    return(
      <AppContainer/>
    )
  }
}

const tabNavigator = createBottomTabNavigator({
  Transaction : {screen:TransactionScreen},
  Search :{screen:SearchScreen},
},{
defaultNavigationOptions : ({navigation})=>({
  tabBarIcon:({})=>{
    const routeName = navigation.state.routeName
    if(routename==='Transaction'){
      return(
        <Image source={require('./assets/book.png')}
        style = {{
          width:40,
          height:40
        }}/>
      )
    }
    else if (routeName==='Search'){
      return(
      <Image source = {require('./assets/searchingBook.png')}
      style = {{
        width:40,
        height:40
      }}/>
      )
    }
  }
})
}
)

const AppContainer = createAppContainer(tabNavigator)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
