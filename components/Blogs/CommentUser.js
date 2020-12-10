// import React, { Component, useCallback } from 'react';
// import { StyleSheet, TextInput, ScrollView, ActivityIndicator, TouchableOpacity, View } from 'react-native';
// import { Button, Input, Icon } from "react-native-elements";
// import firebase from '../../database/fbConfig';
// import ListComment from './ListComment';


// const DetailofNews = ({ route }) => {    
//     const { blogID, otherParam } = route.params;
//     console.log(route.params)
//     const state = {
//         id: "",
//         title: "",
//         content: "",
//         downloadURL: "",
//         date: "",
//     };
//     inputValueUpdate = (val, prop) => {
//         const state = this.state;
//         state[prop] = val;
//         this.setState(state);
//     };

//     render() {
//         if (this.state.isLoading) {
//             return (
//                 <View style={styles.preloader}>
//                     <ActivityIndicator size="large" color="#9E9E9E" />
//                 </View>
//             )
//         }
//         return (
            // <ScrollView style={styles.container}>
            //     <ListComment />
            //     <View style={styles.comment}>
            //         <Input placeholder='Write comment' />
            //         <TouchableOpacity
            //             onPress={() => this.storeUser()}
            //         >
            //             <Icon
            //                 name='send'
            //                 color='#00aced' style={{ marginTop: 20 }}
            //                 style={{ justifyContent: "flex-end" }} />
            //         </TouchableOpacity>
            //     </View>

            // </ScrollView>
//         )
//     }
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 3,
//     },

//     preloader: {
//         left: 0,
//         right: 10,
//         top: 0,
//         bottom: 0,
//         position: 'absolute',
//         alignItems: 'center',
//         justifyContent: 'center'
//     },
    // comment: {
    //     marginTop: 10,
    //     flexDirection: "row",
    //     width: 330
    // }
// });

import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, TouchableOpacity, View } from 'react-native';
import { Input, Icon } from "react-native-elements";
import ListComment from './ListComment';
import AddComment from './AddComment';
import firebase from "../../database/fbConfig";

const CommentUser = (props) => {
    const state = {
        id: "",
        displayName:"",
        comment:""
    };
    
    const [blog, setBlog] = useState(state);
    console.log(blog.id)



    const getBlogById = async (id) => {
        const dbRef = firebase.firestore().collection("blog").doc(id);
        const doc = await dbRef.get();
        const blog = doc.data();
        setBlog({ ...blog, id: doc.id });
        console.log(id)
    };
 


    useEffect(() => {
        getBlogById(props.route.params.blogId);
    }, [])
    console.log(blog);


    return (
        <ScrollView style={styles.container}>
            <ScrollView style={styles.container}>
                <ListComment/>
                <AddComment dataFromParent = {blog.id}/>

            </ScrollView>
        </ScrollView>   
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 3,
    },

    comment: {
        marginTop: 10,
        flexDirection: "row",
        width: 330
    }
});

export default CommentUser;