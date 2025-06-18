
import { Storage } from '@capacitor/storage';

export const saveData = async (key: string, value: any) => {
  try {
    await Storage.set({
      key,
      value: JSON.stringify(value)
    });
  } catch (error) {
    console.error('Error saving data:', error);
  }
};

export const getData = async (key: string) => {
  try {
    const result = await Storage.get({ key });
    return result.value ? JSON.parse(result.value) : null;
  } catch (error) {
    console.error('Error getting data:', error);
    return null;
  }
};

export const removeData = async (key: string) => {
  try {
    await Storage.remove({ key });
  } catch (error) {
    console.error('Error removing data:', error);
  }
};
