import React, { useEffect, useState } from "react";
import {
    ScrollView,
    View,
    StyleSheet,
    Text,
} from "react-native";
import { Card, Image } from "react-native-elements";

import firebase from "../../database/fbConfig";

const DetailofNews = (props) => {
    const state = {
        id: "",
        title: "",
        content: "",
        downloadURL: "",
        date: "",
    };

    const [news, setNews] = useState(state);



    const getNewsById = async (id) => {
        const dbRef = firebase.firestore().collection("news").doc(id);
        const doc = await dbRef.get();
        const news = doc.data();
        setNews({ ...news, id: doc.id });
        console.log(id)
    };

    useEffect(() => {
        getNewsById(props.route.params.newsId);
    }, [])
    console.log(news)
        ;


    return (
        <ScrollView style={styles.container}>
            <View>
                <Card>
                    <Card.Title>{news.title}</Card.Title>
                    <Card.Divider />

                    <View style={styles.name1}>
                        <Image
                            source={{ uri: news.downloadURL }}
                            style={styles.image}
                        />
                        <Text style={styles.content}>{news.content}</Text>
                    </View>
                </Card>
            </View>
        </ScrollView>   
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 3,
    },

    content: {
        marginTop: 5,
        marginBottom: 10
    },
    image: {
        height: 200, left: 0, right: 0
    }
});

export default DetailofNews;