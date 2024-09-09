import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ThemedView } from '@/components/ThemedView';

export default function SettingsScreen() {
  const { t, i18n } = useTranslation(); 
  const toggleLanguage = () => {
    const newLanguage = i18n.language === 'en' ? 'zh' : 'en';
    i18n.changeLanguage(newLanguage);
  };

  const [colorScheme, setColorScheme] = useColorScheme();
    console.log('=====', colorScheme, setColorScheme, '=======');
  
  const toggleDarkMode = () => {
    console.log('toggleDarkMode', colorScheme);
    console.log('toggleDarkMode', colorScheme, 'switch to', colorScheme === 'light' ? 'dark' : 'light');
    //setColorScheme(colorScheme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemedView style={styles.container}>

    <View style={styles.container}>
      <View style={styles.header}>
        <Text>{t('settings.title')}</Text>
      </View>
      <Switch value={i18n.language === 'zh'} onValueChange={toggleLanguage} />
      <Text>{t('settings.language')}</Text>
      <Switch value={colorScheme === 'dark'} onValueChange={toggleDarkMode} />
      <Text>{t('settings.darkMode')}</Text>
    </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    padding: 30,
  },
});
