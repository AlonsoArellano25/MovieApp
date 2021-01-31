import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {Drawer, Switch, TouchableRipple, Text} from 'react-native-paper';
import usePreference from '../hooks/usePreferences';

export default function DrawerContent({navigation}) {
  const [active, setActive] = useState('home');
  const {theme, toggleTheme} = usePreference();

  const onChangeScren = (screen) => {
    setActive(screen);
    navigation.navigate(screen);
  };

  return (
    <DrawerContentScrollView>
      <Drawer.Section>
        <Drawer.Item
          label="Inicio"
          active={active === 'home'}
          onPress={() => onChangeScren('home')}
        />
        <Drawer.Item
          label="Películas populares"
          active={active === 'popular'}
          onPress={() => onChangeScren('popular')}
        />
        <Drawer.Item
          label="Nuevas películas"
          active={active === 'news'}
          onPress={() => onChangeScren('news')}
        />
      </Drawer.Section>
      <Drawer.Section title="Opciones">
        <TouchableRipple>
          <View style={styles.preferences}>
            <Text>Tema Ocuro</Text>
            <Switch
              value={theme === 'dark' ? true : false}
              onValueChange={toggleTheme}
            />
          </View>
        </TouchableRipple>
      </Drawer.Section>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  preferences: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 16,
  },
});
