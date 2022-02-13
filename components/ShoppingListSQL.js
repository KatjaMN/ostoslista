import * as SQLite from 'expo-sqlite';
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Button, TextInput } from 'react-native';

const db = SQLite.openDatabase('coursedb.db');

export default function ShoppingListSQL() {

    const [product, setProduct] = useState('');
    const [amount, setAmount] = useState('');
    const [list, setList] = useState([]);


    useEffect( () => {
        db.transaction(tx => {
            tx.executeSql('create table if not exists list (id integer primary key not null, product text, amount text);');
        });  
        updateList();
    }, []);
    

//Save product and amount to the list.
    const saveItem = () => {
        db.transaction(tx => {
            tx.executeSql('insert into list (product, amount) values (?, ?);',
                [product, amount]);
        }, null, updateList);
        setProduct('');
        setAmount('');
    }

    //Update shopping list
    const updateList = () => {
        db.transaction(tx => {
            tx.executeSql('select * from list;', [], (_, { rows }) =>
                setList(rows._array)
            );
        });
    }

    //Deleta product from list, when already bought
    const deleteItem = (id) => {
        db.transaction(tx => {
            tx.executeSql('delete from list where id = ?;', 
            [id]);
    }, null, updateList)
        }
        

    return (
        <View style={styles.container}>
            <TextInput style={styles.input} placeholder='Product' onChangeText={(product) => setProduct(product)} value={product} />
            <TextInput style={styles.input} placeholder='Amount' onChangeText={(amount) => setAmount(amount)} value={amount} />
            <View style={styles.row}>
                <View style={styles.button}>
                    <Button onPress={saveItem} title='Save' />
                </View>
            </View>
            <Text style={{ marginTop: 10, marginBottom:4, fontSize: 20, color: 'blue', fontWeight: 'bold' }}>Shopping list</Text>
            <FlatList
                style={{ marginLeft: "5%" }}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) =>
                    <View style={styles.listcontainer}>
                        <Text style={{marginBottom:3, fontSize: 15 }}>{item.product}, {item.amount} </Text>
                        <Text style={{ color: '#0000ff' }} onPress={() => deleteItem(item.id)}>bought</Text>
                    </View>}
                data={list}
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
        paddingTop: 70
    },
    
    listcontainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center'
       },
  
    input: {
        width: '50%',
        height: 35,
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 5,
        padding: 3
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
