import React, { Component, useCallback } from 'react';
import { StyleSheet, TextInput, ScrollView, ActivityIndicator, View } from 'react-native';
import { Button } from "react-native-elements";
import firebase from '../../database/fbConfig';
import ListBlog from './ListBlog';


export default class AddBlog extends Component {

    constructor() {
        super();
        this.dbRef = firebase.firestore().collection('blog');
        this.state = {
            title: '',
            post: '',
            isLoading: false
        };
    }
    inputValueUpdate = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    }
    storeUser() {
        if(this.state.title === ''){
            alert('Fill your title!')
        }
        else if(this.state.post === ''){
            alert('Fill your post!')
        }
        else {
            let user = firebase.auth().currentUser;
            console.log(user)
            this.setState({
                isLoading: true,
            });
            this.dbRef.add({
                title: this.state.title,
                post: this.state.post,
                displayName: user.displayName,
                date: new Date(),
            }).then((res) => {
                this.setState({
                    title: '',
                    post: '',
                    isLoading: false,
                });
            })
                .catch((err) => {
                    console.error("Error found: ", err);
                    this.setState({
                        isLoading: false,
                    });
                });
        }
    }


    render() {
        if(this.state.isLoading){
            return(
                <View style={styles.preloader}>
                    <ActivityIndicator size="large" color="#9E9E9E"/>
                </View>
            )
        }
        return (
            <ScrollView style={styles.container}>
                <View style={styles.inputGroup}>
                    <TextInput
                        placeholder={'Title..'}
                        value={this.state.title}
                        onChangeText={(val) => this.inputValueUpdate(val, 'title')}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <TextInput
                        multiline={true}
                        numberOfLines={4}
                        placeholder={'Post...'}
                        value={this.state.post}
                        onChangeText={(val) => this.inputValueUpdate(val, 'post')}
                    />
                </View>
                <View style={styles.button}>
                    <Button
                        title='Submit'
                        onPress={() => this.storeUser()}
                        color="#19AC52"
                    />
                </View>
                
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({

    inputGroup: {
        flex: 2,
        padding: 20,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
    },
    preloader: {
        left: 0,
        right: 10,
        top: 0,
        bottom: 0,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center'
    }
});