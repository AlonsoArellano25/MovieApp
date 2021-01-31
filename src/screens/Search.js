import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
  Platform,
  ScrollView,
} from 'react-native';
import {Searchbar} from 'react-native-paper';
import {size, map} from 'lodash';
import {searchMoviesApi} from '../api/movies';
import {BASE_PATH_IMG} from '../utils/constants';
import usePreferences from '../hooks/usePreferences';

const {width} = Dimensions.get('window');

export default function Search({navigation}) {
  const [movies, setMovies] = useState(null);
  const [search, setSearch] = useState('');
  const {theme} = usePreferences();
  useEffect(() => {
    if (size(search) > 2) {
      searchMoviesApi(search).then((response) => {
        setMovies(response.results);
      });
    }
  }, [search]);
  return (
    <SafeAreaView>
      <Searchbar
        placeholderTextColor={theme === 'dark' ? '#fff' : '#fff'}
        placeholder="Busca tu película"
        iconColor={Platform.OS === 'ios' && 'transparent'}
        icon="arrow-left"
        iconColor={'#fff'}
        style={styles.input}
        onChangeText={(e) => setSearch(e)}
      />
      <ScrollView>
        <View style={styles.container}>
          {map(movies, (movie, index) => (
            <Movie key={index} movie={movie} navigation={navigation} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Movie({movie, navigation}) {
  const {poster_path, title, id} = movie;

  const goMovie = () => {
    navigation.navigate('movie', {id});
  };

  return (
    <TouchableWithoutFeedback onPress={goMovie}>
      <View style={styles.movie}>
        {poster_path ? (
          <Image
            style={styles.image}
            source={{uri: `${BASE_PATH_IMG}/w500${poster_path}`}}
          />
        ) : (
          <Text>{title}</Text>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  input: {
    marginTop: -3,
    backgroundColor: '#15212b',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  movie: {
    width: width / 2,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});