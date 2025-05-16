import AsyncStorage from '@react-native-async-storage/async-storage';

export async function saveData(key: string, data: any){
  try {
    const jsonData = JSON.stringify(data);
    await AsyncStorage.setItem(key, jsonData);
    // console.log('Data saved to cache successfully!');
  } catch (error) {
    console.error('Error saving data to cache:', error);
  }
};

export async function loadData(key: string) {
  try {
    const jsonData = await AsyncStorage.getItem(key);
    if (jsonData !== null) {
      const parsedData = JSON.parse(jsonData);
      return parsedData;
    } else {
      console.log('No data found in cache for key:', key);
      return null;
    }
  } catch (error) {
    console.error('Error loading data from cache:', error);
    return null;
  }
};

export async function loadAllData() {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const keyValuePairs = await AsyncStorage.multiGet(keys);

    const allData = keyValuePairs.reduce((acc, [key, value]) => {
      acc[key] = value ? JSON.parse(value) : null;
      return acc;
    }, {} as Record<string, any>);

    return allData;
  } catch (error) {
    console.error('Error loading all data from cache:', error);
    return {};
  }
}

export async function removeData(key: string) {
  try {
    await AsyncStorage.removeItem(key);
    console.log('Data removed from cache for key:', key);
  } catch (error) {
    console.error('Error removing data from cache:', error);
  }
};

export async function editName(oldKey: string, newKey: string) {
  try {
    const jsonData = await AsyncStorage.getItem(oldKey);
    if (jsonData !== null) {
      await AsyncStorage.setItem(newKey, jsonData);
      await AsyncStorage.removeItem(oldKey);
      console.log(`Cache key '${oldKey}' successfully renamed to '${newKey}'`);
    } else {
      console.log(`No data found in cache for key: '${oldKey}'`);
      return false;
    }
    return true;
  } catch (error) {
    console.error('Error renaming cache key:', error);
    return false;
  }
};
