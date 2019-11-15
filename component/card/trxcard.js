import React, {Component} from 'react';
import {StyleSheet, View, TouchableOpacity, Image, Text, Button} from 'react-native';
import Moment from 'moment';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

export default class Trxcard extends Component {
    render(){
        Moment.locale('en');
        let transaksi = this.props.data.map(function(trxData, index){
            return (
                <TouchableOpacity style={styles.card} key={trxData.id}>
                    {trxData.status == "SUCCESS" ?
                    <View style={{width: 8, backgroundColor: 'green'}}></View>
                    :
                    <View style={{width: 8, backgroundColor: 'gray'}}></View>
                    }
                    <View style={{padding: 10, flex: 1}}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.nameText}>
                                {trxData.sender_bank.toUpperCase()}
                            </Text>
                            <Icon style={{margin: 10, marginTop: 2.5}} name="arrow-right" size={15} color='#000000' />
                            <Text style={styles.nameText}>
                                {trxData.beneficiary_bank.toUpperCase()}
                            </Text>
                        </View>
                        <Text>
                            {trxData.beneficiary_name.toUpperCase()}
                        </Text>
                        <View style={{flexDirection: 'row'}}>
                            <Text>
                                Rp{Number(trxData.amount).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}
                            </Text>
                            <Icon style={{marginTop: 7.5, marginLeft: 5, marginRight: 5}} name="circle" size={5} color='#000000' />
                            <Text>
                                {Moment(trxData.completed_at).format('D MMMM Y')}
                            </Text>
                        </View>
                    </View>
                    <View style={{justifyContent: 'center', padding: 10}}>
                        {trxData.status == "SUCCESS" ?
                        <Text style={styles.successText}>{trxData.status.toUpperCase()}</Text>
                        :
                        <Text style={styles.unsuccessText}>{trxData.status.toUpperCase()}</Text>
                        }
                    </View>
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
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginBottom: 5,
        marginLeft: '2%',
        width: '96%',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 3,
        shadowOffset: {
            width: 5,
            height: 5
        },
        elevation: 1,
        overflow: 'hidden'
    },
    nameText: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    successText: {
        fontSize: 11,
        backgroundColor: 'green',
        color: 'white',
        padding: 5,
        borderRadius: 5
    },
    unsuccessText: {
        fontSize: 11,
        backgroundColor: 'gray',
        color: 'white',
        padding: 5,
        borderRadius: 5
    }
});