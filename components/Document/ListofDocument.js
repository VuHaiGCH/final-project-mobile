import React, { Component, useCallback } from 'react';
import { Alert, View, StyleSheet, ScrollView, Linking } from 'react-native';
import { Card, Button } from "react-native-elements";
import firebase from '../../database/fbConfig';

const OpenURLFile = ({ url, children }) => {
  const handlePress = useCallback(async () => {

    const supported = await Linking.canOpenURL(url);

    if (supported) {

      await Linking.openURL(url);
    } else {
      Alert.alert(`Can't open URL: ${url}`);
    }
  }, [url]);

  return <Button title={children} onPress={handlePress} />;
};



export default class ListofDocument extends Component {

    constructor() {
        super();
        this.firestoreRef = firebase.db.collection('document');
        this.state = {
            isLoading: true,
            documentsArr: []
        };
    }

    componentDidMount() {
        this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    getCollection = (querySnapshot) => {
        const documentsArr = [];
        querySnapshot.forEach((res) => {
            const { title, downloadURL } = res.data();
            documentsArr.push({
                key: res.id,
                res,
                title,
                downloadURL,
            });
        });
        this.setState({
            documentsArr,
            isLoading: false,
        });

        console.log(documentsArr)
    }

    render() {

        return (
            <ScrollView>

                {
                    this.state.documentsArr.map((item, i) => {
                        return (

                            <View key={i} style={styles.user}>
                                <Card>
                                    <Card.Title>{item.title}</Card.Title>
                                    <Card.Divider />

                                    <View style={styles.name1}>
                                        <OpenURLFile url={item.downloadURL}>{item.title}</OpenURLFile>
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