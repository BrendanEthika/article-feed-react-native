import React from 'react';
import {Text, SafeAreaView, StyleSheet, View, Image, ScrollView} from 'react-native';
import { RaleText700 } from '../components/StyledText';
import Moment from 'moment';

export default class HomeFeedItemScreen extends React.Component {
  render() {
    Moment.locale('en');
    const { navigation } = this.props;
    const homeFeedID = navigation.getParam('id', 'NO-ID');
    const homeFeedItem = navigation.getParam('homeFeed', {
      title: '',
      publish_date: null,
      headline_component: {
        viewport: [
          {
            url:'https://media.ethika.com/site-media/homefeed/SwollIMG_4586-copy.jpg'
          }
        ]
      }
    });

    console.log(0, `https://media.ethika.com${homeFeedItem.headline_component.viewport[0].url}`);

    return (
      <ScrollView style={styles.container}>
        <View style={styles.feedHeadlineImageHeader}>
          <Image source={{uri: 'https://media.ethika.com/site-media/homefeed/SwollIMG_4586-copy.jpg'}} style={styles.hf_headline_image} />
        </View>
        <View style={styles.feedItemHeader}>
          <RaleText700 style={styles.hf_h1}>
            {homeFeedItem.title.toUpperCase()}
          </RaleText700>
        </View>
        <View style={styles.feedItemDateDisplay}>
          <RaleText700 style={styles.hf_date}>
            {Moment(homeFeedItem.publish_date).format('MMM d, YYYY     hh:mm A').toUpperCase()}
          </RaleText700>
        </View>
        <View>
          <Text>
            Data:{JSON.stringify(homeFeedItem)}
          </Text>
        </View>
      </ScrollView>
    );
  }
}

HomeFeedItemScreen.navigationOptions = ({ navigation }) => {
  const homeFeedItem = navigation.getParam('homeFeed', {
    title: ''
  });
  return {
    title: homeFeedItem.title.toUpperCase(),
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  hf_h1: {
    fontSize: 28,
    lineHeight: 72,
    color: '#000'
  },
  hf_headline_image: {
    width: '100%',
    height: 280
  },
  feedItemHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
  },
  feedHeadlineImageHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
  },
  feedItemDateDisplay: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
    paddingTop: 8,
    paddingBottom: 8,
    marginBottom:20
  },
  hf_date: {
    fontSize: 16,
    lineHeight: 24,
    color: '#000'
  },
});
