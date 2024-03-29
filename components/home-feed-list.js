import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  FlatList,
  StyleSheet,
  Image,
  Text,
  View,
  RefreshControl,
  ScrollView,
  Animated,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';
import Touchable from 'react-native-platform-touchable';
import { Ionicons } from '@expo/vector-icons';
import EStyleSheet from "react-native-extended-stylesheet";
// import io from 'socket.io-client'
import api from '../services/api';
import { SharedElement } from 'react-navigation-shared-element';
import TouchableScale from 'react-native-touchable-scale';

export default class HomeFeedList extends React.Component {
  state = {
    feed: [],
    response: false,
    refreshing: false,
    setRefreshing: false
  };

  async componentDidMount() {
    const response = await api.get('home-feed');
    this.setState({feed: response.data.data.homeFeeds})
  };

  render() {
    const { navigation } = this.props;
    const position = new Animated.Value(0);
    let startAncestor;
    let startNode;
    let endAncestor;
    let endNode;
    return (
      <ScrollView
        contentContainerStyle={{flex: 1}}
        refreshControl={
          <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />
        }
      >
        <FlatList
          data={this.state.feed}
          keyExtractor={feedItem => feedItem._id}
          renderItem={({item}) => (
            <View>
              <TouchableScale
                background={Touchable.Ripple('#ccc', false)}
                style={styles.touchFlex}
                activeScale={0.9}
                tension={50}
                friction={7}
                useNativeDriver
                onPress={() => {
                  navigation.navigate({
                    routeName: 'HomeFeedItem',
                    params: {
                      id: item._id,
                      homeFeed: item,
                      startAncestor: startAncestor,
                      startNode: startNode,
                      endAncestor: endAncestor,
                      endNode: endNode,
                      position: position
                    }
                  });
                }}>
                <View
                  style={styles.feedItemContainer}
                >
                  <View style={styles.feedItemDisplay}>
                    <View style={styles.feedItemHeader}>
                      <Ionicons name="ios-chatboxes" size={22} color="#ccc" />
                      <Text style={styles.optionText}>{item.title}</Text>
                    </View>
                    <View style={styles.touchContainer}>
                    <SharedElement id={`item.${item._id}.photo`}>
                      { this.displayFeedImage(item) }
                    </SharedElement>
                    </View>
                  </View>
                </View>
              </TouchableScale>
            </View>
          )}
        />
      </ScrollView>
    );
  }

  displayFeedImage(item) {
    const imageSource = `https://media.ethika.com/${item.headline_component && item.headline_component.viewport && item.headline_component.viewport[0].url ? item.headline_component.viewport[0].url : 'site-media/news/BlogReclaimed_01.jpg?cachebust=201&auto=format,compress'}`;
    return <Image
      style={styles.feedImage}
      source={
        {uri: imageSource}
      }
    />
  };

  _handlePressDocs = () => {
    WebBrowser.openBrowserAsync('http://docs.expo.io');
  };

  _handlePressForums = () => {
    WebBrowser.openBrowserAsync('https://api.etk-dev.com/api-docs/#/Home%20Feed/get_app_api_home_feed_');
  };

  onRefresh = () => {
    this.setState({setRefreshing: true});
    this.componentDidMount();
  };
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
  },
  hf_headline_image: {
    width: '100%',
    height: 280
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
  feedItemContainer: {
    marginTop: 20,
    flexDirection: 'row',
    width: '100%',
  },
  feedItemDisplay: {
    flex: 1,
    paddingHorizontal: 15,
  },
  feedItemHeader: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  feedImage: {
    width: '100%',
    height: 250,
    marginVertical: 15
  },
  touchFlex: {
    flex: 1,
  },
  touchContainer: {
    flex: 1
  },
});
