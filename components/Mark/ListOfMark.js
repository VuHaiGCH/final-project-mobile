import React, { Component, useState } from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Avatar, Header, ListItem, ButtonGroup, Card, Image, Button } from "react-native-elements";
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from '../../database/fbConfig';

export default class ListOfMark extends Component {

    constructor() {
        super();
        this.firestoreRef = firebase.db.collection('mark');
        this.state = {
            isLoading: true,
            marksArr: []
        };
    }

    componentDidMount() {
        this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    getCollection = (querySnapshot) => {
        const marksArr = [];
        querySnapshot.forEach((res) => {
            const { id, classes, course, onlineTest, quiz, report, avg, status   } = res.data();
            marksArr.push({
                key: res.id,
                res,
                id,
                classes,
                course,
                onlineTest,
                quiz,
                report,
                avg,
                status
            });
        });
        this.setState({
            marksArr,
            isLoading: false,
        });
    }


    render() {

        return (
            <ScrollView>

{
                    this.state.marksArr.map((item, i) => {
                        return (

                            <View key={i} style={styles.user}>
                                <Card>
                                    <Card.Title>{item.course}</Card.Title>
                                    <Card.Divider />
                                    <View style={styles.name1}>
                                            
                                            <Text style={styles.name}>Online Test: {item.onlineTest}</Text>
                                            <Text style={styles.name}>Quiz: {item.quiz}</Text>
                                            <Text style={styles.name}>Report: {item.report}</Text>
                                            <Text style={styles.name}>Average: {item.avg}</Text>
                                    </View>
                                    <Card.Divider />
                                    <Card.Title style={styles.status}>{item.status}</Card.Title>

                                </Card>
                            </View>
                        );
                    })
                }


            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    name1: {
        flexDirection: "row",
        width: '100%'
    },

    name: {
        flex: 1,
    },

    mark: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'flex-start',
        marginRight: 20
    },
    status:{
        fontSize:30
    }
});