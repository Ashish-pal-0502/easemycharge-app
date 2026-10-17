import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  SafeAreaView,
} from 'react-native';

// Assets
import Logo from '../../assets/logo/Logo.png';
import RightArrowBlack from '../../assets/appIntro/rightarrowblack.png';
import RightArrowBg from '../../assets/appIntro/rightarrowbg.png';
import RightArrow from '../../assets/appIntro/rightarrow.png';
import CenterImage2 from '../../assets/appIntro/chargingStations.png';
import CenterImage3 from '../../assets/appIntro/trips.png';
import CenterImage4 from '../../assets/appIntro/journey.png';

import {fonts} from '../../config/fonts';

const {width} = Dimensions.get('window');

const slides = [
  {
    id: '1',
    isWelcome: true,
  },
  {
    id: '2',
    image: CenterImage2,
    title: 'Locate The Charging Stations',
    description: 'Discover nearby charging stations from multiple providers',
  },
  {
    id: '3',
    image: CenterImage3,
    title: 'Plan EV Trips',
    description: 'Effortlessly plan your EV trips with smart trip planning.',
  },
  {
    id: '4',
    image: CenterImage4,
    title: 'Recharge Your Journey',
    description: 'Seamlessly Charge Your Electric Vehicle.',
  },
];

const OnboardingScreen = ({navigation}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const handleScroll = event => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / width);
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      navigation.navigate('GetStarted');
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex - 1,
        animated: true,
      });
    }
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.slide}>
        {item.isWelcome ? (
          // Slide 1 Layout
          <View style={styles.slide1Content}>
            <Image source={Logo} style={styles.logoLarge} />
            <Text style={styles.appNameLarge}>EaseMyCharge</Text>
          </View>
        ) : (
          // Slides 2, 3, 4 Layout
          <View style={styles.slideContent}>
            <Text style={styles.appName}>EaseMyCharge</Text>
            <Image source={item.image} style={styles.centerImage} />
            <Text style={styles.subheading}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header (Hidden on Slide 1 to match your original UI) */}
      {currentIndex !== 0 && (
        <View style={styles.topRow}>
          <Image source={Logo} style={styles.logo} />
          <TouchableOpacity
            style={styles.skipContainer}
            onPress={() => navigation.navigate('GetStarted')}>
            <Text style={styles.skipText}>Skip</Text>
            <Image source={RightArrowBlack} style={styles.rightArrow} />
          </TouchableOpacity>
        </View>
      )}

      {/* Swipeable Content */}
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        bounces={false}
      />

      {/* Bottom Navigation */}
      <View style={styles.bottomSection}>
        {/* Left: Back Button or Empty Space */}
        {currentIndex > 0 ? (
          <TouchableOpacity onPress={handleBack}>
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
        ) : (
          <View style={{width: 40}} /> // Spacer to keep indicators centered
        )}

        {/* Center: Pagination Dots */}
        <View style={styles.indicators}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentIndex === index && styles.activeIndicator,
              ]}
            />
          ))}
        </View>

        {/* Right: Next / Get Started Button */}
        {currentIndex === slides.length - 1 ? (
          <TouchableOpacity style={styles.getStartedButton} onPress={handleNext}>
            <Text style={styles.getStartedText}>Get Started</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleNext}>
            <View style={styles.arrowContainer}>
              <Image
                source={RightArrowBg}
                style={styles.arrowBg}
                resizeMode="contain"
              />
              <Image
                source={RightArrow}
                style={styles.arrow}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  slide: {
    width: width,
    flex: 1,
  },
  /* --- Slide 1 Styles --- */
  slide1Content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoLarge: {
    width: 90,
    height: 100,
  },
  appNameLarge: {
    fontSize: 32,
    fontFamily: fonts.Bold,
    color: '#000',
  },
  /* --- Slides 2-4 Styles --- */
  slideContent: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
  },
  appName: {
    fontSize: 32,
    fontFamily: fonts.Bold,
    color: '#000',
  },
  centerImage: {
    width: width * 0.85, // Dynamic width for responsiveness
    height: 280,
    resizeMode: 'contain',
    marginTop: 60,
  },
  subheading: {
    fontSize: 24,
    fontFamily: fonts.SemiBold,
    color: '#000',
    marginTop: 15,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    fontFamily: fonts.Medium,
    color: '#525252',
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 40,
  },
  /* --- Header Styles --- */
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingTop: 40,
  },
  logo: {
    width: 50,
    height: 50,
  },
  skipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  skipText: {
    fontSize: 16,
    fontFamily: fonts.Medium,
    color: 'rgba(0, 0, 0, 0.55)',
    marginRight: 5,
    textDecorationLine: 'underline',
  },
  rightArrow: {
    width: 18,
    height: 18,
    tintColor: 'rgba(0, 0, 0, 0.55)',
    resizeMode: 'contain',
  },
  /* --- Bottom Navigation Styles --- */
  bottomSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingVertical: 20,
    backgroundColor: '#fff',
  },
  backText: {
    fontSize: 16,
    fontFamily: fonts.Medium,
    color: 'rgba(0, 0, 0, 0.55)',
    width: 40, // Fixed width to balance layout
  },
  indicators: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 3,
  },
  activeIndicator: {
    backgroundColor: '#38B6FF',
  },
  arrowContainer: {
    position: 'relative',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowBg: {
    position: 'absolute',
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  arrow: {
    width: 20,
    height: 20,
    tintColor: '#fff',
    resizeMode: 'contain',
  },
  getStartedButton: {
    backgroundColor: '#38B6FF',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 40,
  },
  getStartedText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: fonts.Medium,
  },
});