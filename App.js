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

const KEYS_TO_FILTERS = ['beneficiary_name'];

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trxs:[],
      searchText: ''
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
          array.push(responseJson[trx]);
        }
        this.setState({trxs: array});
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
        <StatusBar barStyle="dark-content" />
        <View style={{flex: 1}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text>Cari</Text>
            <TextInput
              style={{flex: 1, height: 40, borderColor: 'gray', borderWidth: 1}}
              // onChangeText={data => this.searchQuery(data)}
              onChangeText={(text) => {this.searchQueryUpdated(text)}}
            />
          </View>
          <View style={{flex: 1}}>
            <ScrollView>
              <Trxcard data={filteredTrx} />
            </ScrollView>
          </View>
        </View>
      </>
    );
  }
};

const styles = StyleSheet.create({
  MainContainer: {
    // Setting up View inside content in Vertically center.
    margin: 10
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  }
});