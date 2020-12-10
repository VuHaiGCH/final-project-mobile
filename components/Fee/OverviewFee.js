import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, } from 'react-native';
import { ListItem, ButtonGroup, } from "react-native-elements";
import firebase from '../../database/fbConfig';


export default class OverviewFee extends Component {

    constructor() {
        super();
        this.firestoreRef = firebase.db.collection('OverviewFee');
        this.state = {
            isLoading: true,
            OverviewFeeArr: []
        };
    }

    componentDidMount() {
        this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    getCollection = (querySnapshot) => {
        const OverviewFeeArr = [];
        querySnapshot.forEach((res) => {
            const { idbank, isdone, mustdone, notyet } = res.data();
            OverviewFeeArr.push({
                key: res.id,
                res,
                isdone,
                mustdone,
                notyet,
                idbank,
            });
        });
        this.setState({
            OverviewFeeArr,
            isLoading: false,
        });
    }




    render() {



        return (
            <ScrollView>



                {
                    this.state.OverviewFeeArr.map((item, i) => {
                        return (

                            <View key={i}>
                                <ListItem bottomDivider>
                                    <ListItem.Content>
                                        <ListItem.Title>ID of bank</ListItem.Title>
                                        <ListItem.Subtitle>{item.idbank}</ListItem.Subtitle>
                                    </ListItem.Content>
                                </ListItem>

                                <ListItem bottomDivider>
                                    <ListItem.Content>
                                        <ListItem.Title>Must done</ListItem.Title>
                                        <ListItem.Subtitle>{item.mustdone}</ListItem.Subtitle>
                                    </ListItem.Content>
                                </ListItem>

                                <ListItem bottomDivider>
                                    <ListItem.Content>
                                        <ListItem.Title>Is done</ListItem.Title>
                                        <ListItem.Subtitle>{item.isdone}</ListItem.Subtitle>
                                    </ListItem.Content>
                                </ListItem>

                                <ListItem bottomDivider>
                                    <ListItem.Content>
                                        <ListItem.Title>Not yet</ListItem.Title>
                                        <ListItem.Subtitle>{item.notyet}</ListItem.Subtitle>
                                    </ListItem.Content>
                                </ListItem>
                            </View>



                        );
                    })
                }


            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({

});