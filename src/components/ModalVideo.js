import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Platform} from 'react-native';
import {Modal, IconButton, Title} from 'react-native-paper';
import Youtube from 'react-native-youtube';
import {getVideoMovieApi} from '../api/movies';
import {WebView} from 'react-native-webview';

export default function ModalVideo(props) {
  const {show, setShow, idMovie} = props;
  const [video, setVideo] = useState(null);
  useEffect(() => {
    getVideoMovieApi(idMovie).then((response) => {
      let idVideo = null;
      response.results.forEach((video) => {
        if (video.site === 'YouTube' && !idVideo) {
          idVideo = video.key;
        }
      });
      setVideo(idVideo);
    });
  }, [idMovie]);
  return (
    <Modal visible={show} contentContainerStyle={styles.modal}>
      {Platform.OS === 'ios' ? (
        <Youtube videoId={video} style={styles.video} />
      ) : (
        <WebView
          style={{width: 500}}
          source={{
            uri: `https://www.youtube.com/embed/${video}?controls=0&showinfo=0`,
          }}
        />
      )}

      <IconButton
        icon="close"
        onPress={() => setShow(false)}
        style={styles.close}
      />
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: '#000',
    height: '120%',
    alignItems: 'center',
  },
  close: {
    backgroundColor: '#1ea1f2',
    width: 50,
    height: 50,
    borderRadius: 100,
    position: 'absolute',
    bottom: 100,
  },
  video: {
    alignSelf: 'stretch',
    height: 300,
  },
});
