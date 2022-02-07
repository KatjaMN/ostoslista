import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, View, FlatList } from 'react-native';
import { Button, TextInput } from 'react-native';


export default function ShoppingList() {

    const [text, setText] = useState('');;
    const [data, setData] = useState([]);

    const addToList = () => {
        let product = text;
        setData([...data, { key: product }]);
        setText('');
        Alert.alert(``);
    }

    const clearList = () => {
        setData([]);
    }

    return (
        <View style={styles.container}>
            <TextInput style={styles.input} onChangeText={text => setText(text)} value={text} />
            <View style={styles.row}>
                <View style={styles.button}>
                    <Button onPress={addToList} title='Add' />
                </View>
                <View style={styles.button}>
                    <Button onPress={clearList} title='Clear' />
                </View>
            </View>
            <Text style={{ marginTop: 10, fontSize: 15, color: 'blue', fontWeight: 'bold' }}>Shopping list</Text>
            <FlatList
                data={data}
                renderItem={({ item }) => <Text>{item.key}</Text>}
                keyExtractor={(item, index) => index.toString()}
            />
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 30
    },

    input: {
        width: '40%',
        height: 30,
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 5,
    },

    row: {
        flexDirection: "row",
        justifyContent: 'space-evenly',
        width: '20%',
        marginTop: 20,
        marginBottom: 30,
    },


    button: {
        marginTop: 10,
        fontWeight: 'bold'
    }

});
