import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ListItem } from "react-native-elements";
import firebase from '../../database/fbConfig';

export default class ListofNews extends Component {

    constructor() {
        super();
        this.firestoreRef = firebase.firestore().collection('news');
        this.state = {
            isLoading: true,
            newsArr: []
        };
    }

    componentDidMount() {
        this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    getCollection = (querySnapshot) => {
        const newsArr = [];
        querySnapshot.forEach((res) => {
            const { title, content, downloadURL, date } = res.data();
            newsArr.push({
                key: res.id,
                res,
                title,
                content,
                downloadURL,
                date,
            });
            console.log(newsArr)
        });
        this.setState({
            newsArr,
            isLoading: false,
        });
    }


    render() {

        return (
            <ScrollView>

                {
                    this.state.newsArr.map((item, i) => {
                        return (

                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('DetailofNews', {
                                    newsId: item.key,
                                })}

                            >
                                <View>
                                    <ListItem
                                        key={item.key}
                                        bottomDivider
                                    >
                                        <ListItem.Chevron />

                                        <ListItem.Content>
                                            <ListItem.Title>{item.title}</ListItem.Title>
                                        </ListItem.Content>
                                    </ListItem>
                                </View>
                            </TouchableOpacity>
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

    name: {
        flex: 1,
    },

    mark: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'flex-start',
        marginRight: 20
    },

    mark_alpha: {
        justifyContent: 'flex-end',
    }
});