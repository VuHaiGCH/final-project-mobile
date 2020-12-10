import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Button } from 'react-native';
import { Card, Icon } from "react-native-elements";
import firebase from '../../database/fbConfig';
import AddBlog from './AddBlog';

export default class ListofNews extends Component {

    constructor() {
        super();
        this.firestoreRef = firebase.firestore().collection('blog');
        this.state = {
            isLoading: true,
            isModalVisible: false,
            blogArr: []
        };
    }

    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };

    componentDidMount() {
        this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    getCollection = (querySnapshot) => {
        const blogArr = [];
        querySnapshot.forEach((res) => {
            const { displayName, post, title } = res.data();
            blogArr.push({
                key: res.id,
                res,
                title,
                displayName,
                post,
            });
            console.log(blogArr)
        });
        this.setState({
            blogArr,
            isLoading: false,
        });
    }


    render() {

        return (
            <ScrollView>

                <AddBlog />
                {
                    this.state.blogArr.map((item, i) => {
                        return (

                            <Card key={i}>
                                <Card.Title>{item.title}</Card.Title>
                                <Card.Divider />


                                <View>
                                    <Text style={styles.name}>{item.post}</Text>
                                    <Text style={styles.name}>Author: {item.displayName}</Text>
                                </View>
                                <Card.Divider />
                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate('CommentUser', {
                                        blogId: item.key,
                                    })}
                                >
                                    <View style={styles.comment}>

                                        <Icon
                                            name='comment'
                                            color='#00aced' />
                                        <Text>Comment</Text>
                                    </View>
                                </TouchableOpacity>

                            </Card>



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

    comment:{
        flexDirection: "row"
    }
});