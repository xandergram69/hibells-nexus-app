
import { Preferences } from '@capacitor/preferences';

export const setItem = async (key: string, value: string) => {
  try {
    await Preferences.set({
      key,
      value,
    });
  } catch (error) {
    console.error('Error storing data:', error);
  }
};

export const getItem = async (key: string): Promise<string | null> => {
  try {
    const { value } = await Preferences.get({ key });
    return value;
  } catch (error) {
    console.error('Error retrieving data:', error);
    return null;
  }
};

export const removeItem = async (key: string) => {
  try {
    await Preferences.remove({ key });
  } catch (error) {
    console.error('Error removing data:', error);
  }
};

export const clear = async () => {
  try {
    await Preferences.clear();
  } catch (error) {
    console.error('Error clearing storage:', error);
  }
};
