import React from 'react';
import {
  Text,
  SafeAreaView,
  Animated,
  View,
  Image,
  ScrollView,
  FlatList,
  Dimensions,
  Linking,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { RaleText700 } from '../components/StyledText';
import Moment from 'moment';
import HTML from 'react-native-render-html';
import * as WebBrowser from "expo-web-browser";
import EStyleSheet from 'react-native-extended-stylesheet';
import {
  SharedElement,
  SharedElementTransition,
  nodeFromRef
} from 'react-native-shared-element';


const IMAGES_MAX_WIDTH = Dimensions.get('window').width - 50;
const CUSTOM_STYLES = {};
const CUSTOM_RENDERERS = {};
const DEFAULT_PROPS = {
  htmlStyles: CUSTOM_STYLES,
  renderers: CUSTOM_RENDERERS,
  imagesMaxWidth: IMAGES_MAX_WIDTH,
  onLinkPress: (evt, href) => {
    //To open within app use WebBrowser
    //To open in safari use Linking
    Linking.openURL(href);
    // WebBrowser.openBrowserAsync(
    //   href
    // );
  },
  debug: true
};


export default class HomeFeedItemScreen extends React.Component {
  render() {
    Moment.locale('en');
    const { navigation } = this.props;
    let startAncestor = navigation.getParam('startAncestor', {});
    let startNode = navigation.getParam('startNode', {});
    let endAncestor = navigation.getParam('endAncestor', {});
    let endNode = navigation.getParam('endNode', {});
    const position = new Animated.Value(0);
    const homeFeedID = navigation.getParam('id', 'NO-ID');
    const homeFeedItem = navigation.getParam('homeFeed', {
      title: '',
      publish_date: null,
      headline_component: {
        viewport: [
          {
            url:'https://media.ethika.com/site-media/news/BlogReclaimed_01.jpg?cachebust=201&auto=format,compress'
          }
        ]
      },
      detail_components: []
    });

    return (
      <ScrollView style={styles.container}>
        <View style={StyleSheet.absoluteFill}>
          <SharedElementTransition
            start={{
              node: startNode,
              ancestor: startAncestor
            }}
            end={{
              node: endNode,
              ancestor: endAncestor
            }}
            position={position}
            animation='move'
            resize='auto'
            align='auto'
          />
        </View>
        <View
          style={styles.feedItemHeader}
          ref={ref => endAncestor = nodeFromRef(ref)}
        >
          <SharedElement onNode={node => endNode = node}>
            {this.displayFeedImage(homeFeedItem)}
          </SharedElement>
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
        <FlatList
          data={homeFeedItem.detail_components}
          style={styles.feedDetailComponentList}
          keyExtractor={detailItem => detailItem._id}
          renderItem={({item}) => (
            <View style={styles.feedItemContainer}>
              {this.displayDetailComponent(item)}
            </View>
          )}
        />
        <View>
          <Text>
            Data:{JSON.stringify(homeFeedItem)}
          </Text>
        </View>
      </ScrollView>
    );
  }

  displayFeedImage(item) {
    const imageSource = `https://media.ethika.com/${item.headline_component && item.headline_component.viewport && item.headline_component.viewport[0].url ? item.headline_component.viewport[0].url : 'site-media/news/BlogReclaimed_01.jpg?cachebust=201&auto=format,compress'}`;
    return <Image
      source={
        {uri: imageSource}
      }
      style={styles.feedImage}
    />
  };

  displayDetailComponent(componentItem) {
    if(componentItem.type === 'ARTICLE') {
      return <View>
        <Text> Type: ARTICLE Render </Text>
        <HTML
        {...DEFAULT_PROPS}
        html={componentItem.content}
      />
      </View>;
    } else if(componentItem.type === 'PRODUCT') {
      return <View>
        <Text> Type: PRODUCT Link </Text>
        <TouchableOpacity activeOpacity = { .5 } onPress={() => {this.openProductPage(componentItem.product_id)}}>
          <Image style={{width: '100%', height: 250}} resizeMode={'contain'} source={{uri: `https://media.ethika.com/${componentItem._product.cart_image_url}`}} />
        </TouchableOpacity>
      </View>;
    } else {
      return <View>
        <Text>
        Type: { componentItem.type }
        Data:{JSON.stringify(componentItem)}
        </Text>
      </View>;
    }
  };

  openProductPage = (product_id) => {
    WebBrowser.openBrowserAsync(`https://www.ethika.com/s/${product_id}`);
  };
}

HomeFeedItemScreen.navigationOptions = ({ navigation }) => {
  const homeFeedItem = navigation.getParam('homeFeed', {
    title: ''
  });
  return {
    title: homeFeedItem.title.toUpperCase(),
  };
};

const styles = EStyleSheet.create({
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
  feedDetailComponentList: {
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
    paddingBottom: 10,
    marginBottom:5
  },
  feedItemContainer: {
    marginTop: 20,
    flexDirection: 'row',
    width: '100%',
  },
  feedItem: {
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
    marginBottom:5
  },
  'feedItem:last-child': {
    borderBottomWidth: 0,
    marginBottom:0
  },
  feedImage: {
    width: '100%',
    height: 300
  },
});
