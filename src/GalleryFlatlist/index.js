import * as React from 'react';
import {
  StatusBar,
  FlatList,
  Image,
  Animated,
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Easing,
  SafeAreaViewBase,
  SafeAreaView,
} from 'react-native';
const {width, height} = Dimensions.get('screen');

const DESC =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,' +
  'molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum' +
  'numquam blanditiis harum quisquam eius sed odit';
const IMAGE_SIZE = 80;
const SPACING = 20;
const API_KEY = '563492ad6f91700001000001bc24103566634c6a90cd77a44dc26105';
const API_URL =
  'https://api.pexels.com/v1/search?query=nature&orientation=portrait&size=small&per_page=20';

const fetchImagefromPexels = async () => {
  const data = await fetch(API_URL, {
    headers: {
      Authorization: API_KEY,
    },
  });

  const {photos} = await data.json();
  return photos;
  // console.log(results);
};
export const GalleryFlatlist = () => {
  const TopRef = React.useRef(null);
  const BottomRef = React.useRef(null);
  const [images, setImages] = React.useState(null);
  const [activeIndex, setactiveIndex] = React.useState(0);
  React.useEffect(() => {
    console.log('data');
    const fetchImages = async () => {
      const images = await fetchImagefromPexels();
      console.log('IMAGES', images);
      setImages(images);
    };

    fetchImages();
  }, []);

  const scrollToActiveIndex = index => {
    console.log('INDEX CALCULATED', index);
    setactiveIndex(index);

    TopRef?.current?.scrollToOffset({
      offset: index * width,
      Animated: true,
    });

    if (index * (IMAGE_SIZE + SPACING) - IMAGE_SIZE / 2 > width / 2) {
      BottomRef?.current?.scrollToOffset({
        offset: index * (IMAGE_SIZE + SPACING) - width / 2 + IMAGE_SIZE,
        Animated: true,
      });
    }
  };

  if (!images) {
    return <Text>loading . . . . </Text>;
  } else {
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <StatusBar backgroundColor={'transparent'} translucent />

        <View
          style={{
            position: 'absolute',
            zIndex: 100,
            padding: SPACING,
            margin: SPACING,
            backgroundColor: '#ffffff44',
            top: height * 0.3,
            borderRadius: 10,
            flexGrow: 1,
            flexDirection: 'row',
          }}>
          <View style={{height: 200, width: '100%'}}>
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 30}}>
              Heading
            </Text>
            <View style={{ height:SPACING}}/>
            <Text style={{color: 'white', fontSize: 16}}>
              {DESC}
            </Text>
          </View>
        </View>

        <FlatList
          ref={TopRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          data={images}
          keyExtractor={item => item.id.toString()}
          onMomentumScrollEnd={ev => {
            console.log(
              'ITEM WIDTH ==>',
              ev.nativeEvent.contentOffset.x / width,
              width,
            );
            scrollToActiveIndex(
              Math.ceil(ev.nativeEvent.contentOffset.x / width),
            );
          }}
          renderItem={({item}) => {
            return (
              <View style={{width, height}}>
                <Image
                  resizeMode="cover"
                  // StyleSheet.absoluteFillObject
                  style={[StyleSheet.absoluteFillObject]}
                  source={{uri: item.src.portrait}}
                />
              </View>
            );
          }}
        />

        <FlatList
          ref={BottomRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={images}
          style={{position: 'absolute', bottom: IMAGE_SIZE}}
          contentContainerStyle={{paddingHorizontal: SPACING}}
          keyExtractor={item => item.id.toString()}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  scrollToActiveIndex(index);
                }}>
                <Image
                  resizeMode="cover"
                  // StyleSheet.absoluteFillObject
                  style={[
                    {
                      width: IMAGE_SIZE,
                      height: IMAGE_SIZE,
                      borderRadius: 12,
                      marginRight: SPACING,
                      borderWidth: 3,
                      borderColor:
                        activeIndex === index ? 'white' : 'transparent',
                    },
                  ]}
                  source={{uri: item.src.portrait}}
                />
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  }
};
