import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Avatar, Icon, Header, ListItem, ButtonGroup, Card } from "react-native-elements";
import firebase from '../../database/fbConfig';


export default class ListFee extends Component {

    constructor() {
        super();
        this.firestoreRef = firebase.db.collection('fee');
        this.state = {
            isLoading: true,
            feeArr: []
        };
    }

    componentDidMount() {
        this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    getCollection = (querySnapshot) => {
        const feeArr = [];
        querySnapshot.forEach((res) => {
            const { amout, idbank, semester, namebank  } = res.data();
            feeArr.push({
                key: res.id,
                res,
                semester,
                namebank,
                amout,
                idbank,
            });
        });
        this.setState({
            feeArr,
            isLoading: false,
        });
    }


    render() {
        const component1 = () => <Text>Overview</Text>
        const component2 = () => <Text>Detail</Text>

        const buttons = [{ element: component1 }, { element: component2 }]
        const { selectedIndex } = this.state

        const list = [
            {
                name: 'ID Bank',
                subtitle: '111111111111111'
            },
            {
                name: 'Not Done',
                subtitle: '37,504,422'
            },

            {
                name: 'Done',
                subtitle: '37,504,422'
            },

            {
                name: 'Need submit',
                subtitle: '0'
            },
        ]
        return (
            <ScrollView>

                <ButtonGroup
                    onPress={this.updateIndex}
                    selectedIndex={selectedIndex}
                    buttons={buttons} />

                {
                    this.state.feeArr.map((item, i) => {
                        return (

                            <Card key={i}>
                                <Card.Title>Semester: {item.semester}</Card.Title>
                                <Card.Divider />


                                <View>
                                    <Text style={styles.name}>Amout: {item.amout} VND</Text>
                                    <Text style={styles.name}>ID of Bank: {item.idbank}</Text>
                                    <Text style={styles.name}>Name of Bank: {item.namebank}</Text>
                                </View>

                            </Card>



                        );
                    })
                }


            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({

});