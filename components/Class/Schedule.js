import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, FlatList } from 'react-native';
import { Avatar, Header, ListItem, ButtonGroup, Card, Image, Button } from "react-native-elements";
import firebase from '../../database/fbConfig';
import SelectSearch from 'react-select-search';


export default class Schedule extends Component {

    render() {
        const options = [
            { name: 'Swedish', value: 'sv' },
            { name: 'English', value: 'en' },
        ];

        return (
            <ScrollView>

                <View style={styles.user}>
                    <SelectSearch options={options} value="sv" name="language" placeholder="Choose your language" />

                </View>



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