/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  ScrollView,
  View,
  TouchableOpacity,
  Button,
  TextInput,
  Text,
  StatusBar,
} from 'react-native';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import SearchInput, { createFilter } from 'react-native-search-filter';
import Trxcard from './component/card/trxcard';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const KEYS_TO_FILTERS = ['beneficiary_name'];

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trxs:[],
      searchText: '',
      isLoading: true
    }
  }

  _isMounted = false;
  componentDidMount() {
    this._isMounted = true;

    fetch('https://nextar.flip.id/frontend-test')
    .then((response) => response.json())
    .then((responseJson) => {
      if (this._isMounted) {
        //this.setState({trxs: responseJson});
        //this.setState({trxs: Object.keys(responseJson)});

        let array = [];
        for (const trx in responseJson) {
          if(responseJson[trx].status == "SUCCESS")
          array.push(responseJson[trx]);
        }
        this.setState({trxs: array, isLoading: false});
      }
    });
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  searchQueryUpdated(text) {
    this.setState({searchText: text})
  }

  render() {
    const filteredTrx = this.state.trxs.filter(createFilter(this.state.searchText, KEYS_TO_FILTERS))
    if (this.state.trxs.length === 0) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <>
        <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
        <View style={{flex: 1}}>
          <View style={styles.seacrchbar}>
            <Icon style={{margin: 10}} name="search" size={25} color='#acacac' />
            <TextInput
              style={{flex: 1, height: 40}}
              // onChangeText={data => this.searchQuery(data)}
              placeholder='Cari nama...'
              onChangeText={(text) => {this.searchQueryUpdated(text)}}
            />
          </View>
          <View style={{flex: 1, margin: 10}}>
            <ScrollView>
              {filteredTrx.length === 0 ?
              <Text style={styles.nodata}>Tidak ada data</Text>
              :
              <Trxcard data={filteredTrx} />}
            </ScrollView>
          </View>
        </View>
      </>
    );
  }
};

const styles = StyleSheet.create({
  seacrchbar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#ffffff'
  },
  nodata: {
    width: '100%',
    textAlign: 'center',
    margin: 15,
    fontSize: 16,
    color: '#acacac'
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  }
});