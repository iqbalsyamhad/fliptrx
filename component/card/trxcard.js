import React, {Component} from 'react';
import {StyleSheet, View, TouchableOpacity, Image, Text, Button} from 'react-native';

export default class Trxcard extends Component {
    render(){
        let transaksi = this.props.data.map(function(trxData, index){
            return (
                <TouchableOpacity style={styles.card}>
                    <Text style={styles.cardText}>
                        {trxData.beneficiary_name}
                    </Text>
                    <Button
                        title="Pilih Paket"
                        onPress={() => alert('test')}
                    />
                </TouchableOpacity>
            )
        })

        return (
            <View>
                {transaksi}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        marginBottom: 20,
        marginLeft: '2%',
        width: '96%',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 1,
        shadowOffset: {
            width: 3,
            height: 3
        }
    },
    cardText: {
        padding: 10,
        fontSize: 16
    }
});