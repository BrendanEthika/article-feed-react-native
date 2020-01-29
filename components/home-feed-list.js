import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { FlatList, StyleSheet, Image, Text, View } from 'react-native';
import Touchable from 'react-native-platform-touchable';
import { Ionicons } from '@expo/vector-icons';
import api from '../services/api';
// import io from 'socket.io-client'

export default class HomeFeedList extends React.Component {
  state = {
    feed: [],
    response: false,
  };

  async componentDidMount() {
    const response = await api.get('home-feed');
    this.setState({feed: response.data.data.homeFeeds})
  };




  render() {
    const { navigation } = this.props;
    return (
        <FlatList
          data={this.state.feed}
          keyExtractor={feedItem => feedItem._id}
          renderItem={({item}) => (
            <View>
            <Touchable
              style={styles.option}
              background={Touchable.Ripple('#ccc', false)}
              onPress={() => {
                navigation.navigate({
                  routeName: 'HomeFeedItem',
                  params: {
                    id: item._id,
                    homeFeed: item,
                  }
                });
              }}>
              <View style={{ flexDirection: 'row' }}>
                <View style={styles.optionIconContainer}>
                  <Ionicons name="ios-chatboxes" size={22} color="#ccc" />
                </View>
                <View style={styles.optionTextContainer}>
                  <Text style={styles.optionText}>{item.title}</Text>
                </View>
              </View>
            </Touchable>
            </View>
            )}
        />
    );
  }

  _handlePressDocs = () => {
    WebBrowser.openBrowserAsync('http://docs.expo.io');
  };

  _handlePressForums = () => {
    WebBrowser.openBrowserAsync('https://api.etk-dev.com/api-docs/#/Home%20Feed/get_app_api_home_feed_');
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
  },
  optionsTitleText: {
    fontSize: 16,
    marginLeft: 15,
    marginTop: 9,
    marginBottom: 12,
  },
  optionIconContainer: {
    marginRight: 9,
  },
  option: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#EDEDED',
  },
  optionText: {
    fontSize: 15,
    marginTop: 1,
    color: '#000',
  },
});
