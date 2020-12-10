import React, { Component, useState } from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Avatar, Header, ListItem, ButtonGroup, Card, Image, Button } from "react-native-elements";
import firebase from '../../database/fbConfig';

export default class ListOfMark extends Component {

    constructor() {
        super();
        let user = firebase.auth().currentUser;
        console.log(user)
        this.firestoreRef = firebase.firestore().collection('mark').where("displayName", "==", user.displayName);
        this.state = {
            email:"",
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
            const { id, classes, course, onlineTest, quiz, report, avg, status } = res.data();
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
                                    <Card.Title style={styles.title}>{item.course}</Card.Title>
                                    <Card.Divider />
                                    <View style={styles.name1}>

                                        <Text style={styles.name}>Online Test</Text>
                                        <Text style={styles.mark}>{item.onlineTest}</Text>
                                        <Text style={styles.name}>Quiz</Text>
                                        <Text style={styles.mark}>{item.quiz}</Text>
                                        <Text style={styles.name}>Report</Text>
                                        <Text style={styles.mark}>{item.report}</Text>
                                        <Text style={styles.name}>Average</Text>
                                        <Text style={styles.mark}>{item.avg}</Text>
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
        flexDirection: "column",
        width: '100%'
    },

    title: {
        fontSize: 30
    },
    name: {
        fontSize: 20
    },

    mark: {
        fontSize: 15,
        marginBottom: 5,
        marginTop: 5,

    },
    status: {
        fontSize: 30
    }
});