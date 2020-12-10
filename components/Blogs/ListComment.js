import React, { Component, useState } from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Card} from "react-native-elements";
import firebase from '../../database/fbConfig';

export default class ListComment extends Component {

    constructor() {
        super();
        this.firestoreRef = firebase.firestore().collection("comments");
        this.state = {
            isLoading: true,
            commentArr: []
        };
    }

    

    componentDidMount() {
        this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    getCollection = (querySnapshot) => {
        const commentArr = [];
        querySnapshot.forEach((res) => {
            const { comment, displayName, blogId } = res.data();
            commentArr.push({
                key: res.id,
                res,
                displayName,
                comment,
                blogId
            });
        });
        this.setState({
            commentArr,
            isLoading: false,
        });
        console.log(commentArr)
    }


    render() {

        return (
            <ScrollView>

                {
                    this.state.commentArr.map((item, i) => {
                        return (

                            <View key={i} style={styles.user}>
                                <Card>
                                    <Text style={styles.title}>{item.displayName}</Text>
                                    <Card.Divider />
                                    <View style={styles.name1}>
                                        <Text style={styles.mark}>{item.comment}</Text>
                                    </View>

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
        fontSize: 20,
        justifyContent: "flex-start"
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