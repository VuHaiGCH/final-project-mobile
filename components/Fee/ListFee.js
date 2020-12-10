import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { Card } from "react-native-elements";
import firebase from '../../database/fbConfig';


export default class ListFee extends Component {

    constructor() {
        super();
        let user = firebase.auth().currentUser;
        console.log(user)
        this.firestoreRef = firebase.firestore().collection('fee').where("displayName", "==", user.displayName);
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
            const { hasPaid, needPaid , idbank, semester, nameBank, name, status } = res.data();
            feeArr.push({
                key: res.id,
                res,
                semester,
                nameBank,
                name,
                idbank,
                hasPaid,
                needPaid,
                status
            });
        });
        this.setState({
            feeArr,
            isLoading: false,
        });
        console.log(feeArr)
    }


    render() {

        return (
            <ScrollView>


                {
                    this.state.feeArr.map((item, i) => {
                        return (

                            <Card key={i}>
                                <Card.Title>Semester: {item.semester}</Card.Title>
                                <Card.Divider />


                                <View>
                                    <Text style={styles.name}>Has paid: {item.hasPaid} VND</Text>
                                    <Text style={styles.name}>ID of Bank: {item.idbank}</Text>
                                    <Text style={styles.name}>Name of Bank: {item.nameBank}</Text>
                                    <Text style={styles.name}>Status: {item.status}</Text>

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