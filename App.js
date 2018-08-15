/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, Image, StyleSheet, Dimensions, Text, View, StatusBar, ListView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { fetch } from 'fetch';
import Call from './components/call'  
import Status from './components/status'  
import Chat from './components/chat'  

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2})



export default class App extends Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
      peopleDataSource: ds.cloneWithRows([]),
      loaded: false,
      index: 0,
      routes: [
        { key: 'chat', title: 'CHAT' },
        { key: 'status', title: 'Status' },
        { key: 'call', title: 'CALL' },
      ],
    }
  }

  _renderTabBar = props => (
    <TabBar
      {...props}
      scrollEnabled
      indicatorStyle={styles.indicator}
      style={styles.tabbar}
      tabStyle={styles.tab}
      labelStyle={styles.label}/>
  )

  componentDidMount() {
    fetch('https://gist.githubusercontent.com/yllongboy/81de024b02f1b668818066bcafbf3c4c/raw/5a508fd580cc1c3d104a300589e7e88d895fa766/whatsapp_contacts.json')
      .then(response => response.json())
      .then((data) => {
        this.setState({
          peopleDataSource: ds.cloneWithRows(data),
          loaded: true
        })
      });
  }
  render() {
    return (
      <View style={styles.maincontainer}>
        <StatusBar backgroundColor="#075e54" barStyle = "default" hidden = {false}/>
        <View style={styles.headercontainer}>
          <View style={styles.leftheadercontainer}>
            <Text style={styles.logoText}>WhatsApp</Text>
          </View>
          <View style={styles.rightheadercontainer}>
           <Icon name="search" color='#fff' size={23} style={{padding:5}} />
           <Icon name="call" color='#fff' size={23} style={{padding:5}} />
           <Icon name="more-vert" color='#fff' size={23} style={{padding:5}}/>
          </View>
        </View>
        <View style={styles.contentcontainer}>
          <TabView
        navigationState={this.state}
        renderScene={SceneMap({
          chat: Chat,
          status: Status,
          call: Call
        })}
        renderTabBar={this._renderTabBar}
        onIndexChange={index => this.setState({ index })}
        initialLayout={{ height:0,width: Dimensions.get('window').width , backgroundColor: '#075e54',}}
      />
        </View>
      </View>
    );
  }
  renderPersonRow(person) {
   return (
   <View style = {styles.listItemContainer}>
    <View style= {styles.iconContainer}>
     <Image source={{uri:person.image}} style={styles.initStyle} resizeMode='contain' />
    </View>
    <View style = {styles.callerDetailsContainer}>
     <View style={styles.callerDetailsContainerWrap}>
      <View style={styles.nameContainer}>
        <Text>{person.first_name}</Text>
        <View style={styles.dateContainer}>
          <Icon name={person.missed ? "call-missed" : "call-received"} size={15} color={person.missed ? "#ed788b" : "#075e54"} />
          <Text style={{ fontWeight:'400', color:'#666', fontSize:12 }}>{person.date} {person.time}</Text>
        </View>
       </View>
     <View style={styles.callIconContainer}>
      <Icon name="phone" color='#075e54' size={23} style={{ padding:5 }} />
     </View>
    </View>
   </View>
  </View>
  )
 }
}

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  headercontainer: {
    flex: 0.7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#075e54',
    alignItems: 'center',
    paddingRight: 5
  },
  leftheadercontainer:{
    alignItems: 'flex-start',
    flexDirection: 'row'
  },
  rightheadercontainer:{
    alignItems: 'flex-end',
    flexDirection: 'row'
  },
  contentcontainer:{
    flex: 8
  },
  logoText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    alignItems: "flex-start",
    marginLeft: 10
 },
  listItemContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 10
  },
  iconContainer: {
    flex: 1,
    alignItems: "flex-start"
  },
  callerDetailsContainer: {
    flex: 4,
    justifyContent: "center",
    borderBottomColor: "rgba(92,94,94,0.5)",
    borderBottomWidth: 0.25
  },
  callerDetailsContainerWrap: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row"
  },
  nameContainer: {
    alignItems: "flex-start",
    flex: 1
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  callIconContainer: {
    flex: 1,
    alignItems: "flex-end"
  },
  initStyle: {
    borderRadius: 30,
    width: 60,
    height: 60
  },
  tabbar: {
    backgroundColor: '#075e54',
  },
  indicator: {
    backgroundColor: '#fff',
  },
  label: {
    color: '#fff',
    fontWeight: '600',
  },
  tab: {
    width: 120,
  },
});
