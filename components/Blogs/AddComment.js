import React, { Component, useCallback } from 'react';
import { StyleSheet, TextInput, ScrollView, ActivityIndicator, View, TouchableOpacity } from 'react-native';
import { Icon, Input } from "react-native-elements";
import firebase from '../../database/fbConfig';
import ListBlog from './ListBlog';


export default class AddComment extends Component {

    constructor() {
        super();
        this.dbRef = firebase.firestore().collection('comments');
        this.state = {
            displayName: '',
            comment: '',
            isLoading: false
        };
    }
    inputValueUpdate = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    }
    storeUser() {
        if(this.state.comment === ''){
            alert('Fill your comment!')
        }

        else {
            let user = firebase.auth().currentUser;
            console.log(user)
            this.setState({
                isLoading: true,
            });
            this.dbRef.add({
                comment: this.state.comment,
                displayName: user.displayName,
                blogId: this.props.dataFromParent,
                date: new Date(),
            }).then((res) => {
                this.setState({
                    comment: '',
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

                <View style={styles.comment}>
                <View style={styles.inputGroup}>
                    <TextInput
                        placeholder={'Write your comment..'}
                        value={this.state.comment}
                        onChangeText={(val) => this.inputValueUpdate(val, 'comment')}
                    />
                </View>
                    <TouchableOpacity
                        onPress={() => this.storeUser()}
                    >
                        <Icon
                            name='send'
                            color='#00aced' style={{ marginTop: 20 }}
                            style={{ justifyContent: "flex-end" }} />
                    </TouchableOpacity>
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
    },
    comment: {
        marginTop: 10,
        flexDirection: "row",
        width: 300
    }
});