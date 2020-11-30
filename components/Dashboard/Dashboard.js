import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Icon } from "react-native-elements";

export default class Dashboard extends Component {

  render() {

    const { navigate } = this.props.navigation;

    return (
      <ScrollView>

        <View style={styles.container}>
          <TouchableOpacity
            style={styles.categoryBtn}
            onPress={() => this.props.navigation.navigate('ListofNews')}

          >
            <View style={styles.categoryIcon}>
              <Icon
                reverse
                name='ios-american-football'
                type='ionicon'
                color='#517fa4'
              />
            </View>
            <Text style={styles.categoryBtnTxt}>News</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.categoryBtn}
          >
            <View style={styles.categoryIcon}>
              <Icon
                reverse
                name='ios-american-football'
                type='ionicon'
                color='#517fa4'
              />
            </View>
            <Text style={styles.categoryBtnTxt}>Schedule</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.container}>
          <TouchableOpacity
            style={styles.categoryBtn}
            onPress={() => this.props.navigation.navigate('OverviewFee')}
          >
            <View style={styles.categoryIcon}>
              <Icon
                reverse
                name='ios-american-football'
                type='ionicon'
                color='#517fa4'
              />
            </View>
            <Text style={styles.categoryBtnTxt}>Fee</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.categoryBtn}
            onPress={() => this.props.navigation.navigate('ListMark')}
          >
            <View style={styles.categoryIcon}>
              <Icon
                reverse
                name='ios-american-football'
                type='ionicon'
                color='#517fa4'
              />
            </View>
            <Text style={styles.categoryBtnTxt}>Mark</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.container}>
          <TouchableOpacity
            style={styles.categoryBtn}
            onPress={() => this.props.navigation.navigate('ListofDocument')}

          >
            <View style={styles.categoryIcon}>
              <Icon
                reverse
                name='ios-american-football'
                type='ionicon'
                color='#517fa4'
              />
            </View>
            <Text style={styles.categoryBtnTxt}>Document</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.categoryBtn}
          >
            <View style={styles.categoryIcon}>
              <Icon
                reverse
                name='ios-american-football'
                type='ionicon'
                color='#517fa4'
              />
            </View>
            <Text style={styles.categoryBtnTxt}>Exam Schedule</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    justifyContent: 'flex-end',
    backgroundColor: '#1258DC',
  },

  userDetail: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    margin: 10,
  },

  userContent: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },

  userAvatar: {
    marginLeft: 20
  },

  textTitle: {
    color: '#FDED2A'
  },

  TextSub: {
    color: '#091834',
    marginTop:10
  },

  container: {
    flexDirection: 'row',
    width: '80%',
    alignSelf: 'center',
    marginTop: 25,
    marginBottom: 10,
  },

  categoryBtn: {
    flex: 1,
    width: '50%',
    marginHorizontal: 0,
    alignSelf: 'center',
  },
  categoryIcon: {
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 120,
    height: 120,
    backgroundColor: '#091834',
    borderRadius: 30,
    marginBottom: 10
  },
  categoryBtnTxt: {
    alignSelf: 'center',
    marginTop: 5,
    color: '#091834',
  },
});