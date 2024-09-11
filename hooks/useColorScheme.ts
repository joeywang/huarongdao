import { useColorScheme as useDeviceColorScheme, ColorSchemeName } from 'react-native';
import { useState, useEffect } from 'react';

export function useColorScheme(): [ColorSchemeName, (scheme: ColorSchemeName) => void] {
  const deviceColorScheme = useDeviceColorScheme();
  const [colorScheme, setColorScheme] = useState<ColorSchemeName>(deviceColorScheme);

  useEffect(() => {
    setColorScheme(deviceColorScheme);
  }, [deviceColorScheme]);

  return [colorScheme, setColorScheme];
}
