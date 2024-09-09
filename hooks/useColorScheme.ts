import { useColorScheme as useDeviceColorScheme, ColorSchemeName } from 'react-native';
import { useState, useEffect, useCallback } from 'react';

export function useColorScheme(): [ColorSchemeName, (scheme: ColorSchemeName) => void] {
  const deviceColorScheme = useDeviceColorScheme();
  const [colorScheme, setColorScheme] = useState<ColorSchemeName>(deviceColorScheme);

  useEffect(() => {
    setColorScheme(deviceColorScheme);
  }, [deviceColorScheme]);

  const switchColorScheme = useCallback((scheme: ColorSchemeName) => {
    setColorScheme(scheme);
  }, []);

  return [colorScheme, switchColorScheme];
}
