import React, { useState, useEffect } from 'react';
import StoryblokClient from 'storyblok-js-client';
import { YStack, H2, Separator, Theme, View, Text } from 'tamagui';

import EditScreenInfo from '../../components/edit-screen-info';

const Storyblok = new StoryblokClient({
  accessToken: process.env.STORYBLOK_TOKEN,
});

const Page = () => {
  const [components, setComponents] = useState([]);

  useEffect(() => {
    Storyblok.get('cdn/stories/home')
      .then((response) => {
        console.log(response.data.story.content);
        setComponents(response.data.story.content.components);
      })
      .catch((error) => {
        console.error('Error fetching components:', error);
      });
  }, []);

  return (
    <Theme name="light">
      <YStack flex={1} alignItems="center" justifyContent="center">
        <H2>Home Sweet Home</H2>
        <Separator />
        <EditScreenInfo path="app/(tabs)/index.tsx" />
        <View>
          {components.map((component, index) => (
            <View key={index}>{component.text === 'text' && <Text>{component.text}</Text>}</View>
          ))}
        </View>
      </YStack>
    </Theme>
  );
};

export default Page;
