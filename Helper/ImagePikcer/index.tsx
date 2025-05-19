// Import necessary types from 'react-native-image-picker'
import {
  CameraOptions,
  ImageLibraryOptions,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';

import {PERMISSIONS, RESULTS, request} from 'react-native-permissions';
export interface ImageInfo {
  name: string | undefined;
  type: string | undefined;
  uri: string | undefined;
  // size: number | string | undefined;
}

const requestPermissions = async () => {
  try {
    const cameraPermission = await request(PERMISSIONS.ANDROID.CAMERA);
    const photoLibraryPermission = await request(
      PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    );

    if (
      cameraPermission === RESULTS.GRANTED &&
      photoLibraryPermission === RESULTS.GRANTED
    ) {
      console.log('Permissions granted');
    } else {
      console.log('Permissions denied');
    }
  } catch (error) {
    console.error('Error requesting permissions:', error);
  }
};

export class ImageService {
  static async getImage(params?: ImageLibraryOptions): Promise<ImageInfo> {
    return new Promise((resolve, reject) => {
      launchImageLibrary({
        mediaType: 'photo',
        quality: 0.5,
        ...params,
      })
        .then((image: ImagePickerResponse) => {
          if (image.didCancel) {
            //@ts-ignore
            resolve('user cancelled image request');
          } else if (image.errorCode) {
            //@ts-ignore
            resolve(image.errorCode);
          } else if (image.errorMessage) {
            //@ts-ignore
            resolve(image.errorMessage);
          } else if (image.assets && image.assets[0]?.fileSize) {
            const maxSizeBytes = 10 * 1024 * 1024;

            if (image.assets[0].fileSize > maxSizeBytes) {
              showSnackbar({
                type: 'error',
                header: 'Large image size',
                body: 'Image size exceeds the maximum allowed limit.',
              });
              reject('Image size exceeds the maximum allowed limit.');
            } else {
              const response = {
                uri: image.assets[0].uri,
                name: image.assets[0].fileName,
                type: image.assets[0].type,
                size: image.assets[0].fileSize / (1024 * 1024), // Convert bytes to MB
              };
              resolve(response);
            }
          }
        })
        .catch(error => {
          console.log(error);
          reject(error);
        });
    });
  }

  static async getCamera(params?: CameraOptions): Promise<ImageInfo> {
    await requestPermissions();
    return new Promise((resolve, reject) => {
      launchCamera({
        mediaType: 'photo',
        quality: 0.5,
        ...params,
      })
        .then(image => {
          if (image.didCancel) {
            //@ts-ignore
            resolve('user cancelled image request');
          } else if (image.errorCode) {
            //@ts-ignore
            resolve(image.errorCode);
          } else if (image.errorMessage) {
            //@ts-ignore
            resolve(image.errorMessage);
          } else if (image.assets && image.assets[0]?.fileSize) {
            const maxSizeBytes = 10 * 1024 * 1024;
            if (image.assets[0].fileSize > maxSizeBytes) {
              showSnackbar({
                type: 'error',
                header: 'Large image size',
                body: 'Image size exceeds the maximum allowed limit.',
              });
              reject('Image size exceeds the maximum allowed limit.');
            } else {
              const response = {
                uri: image.assets[0].uri,
                name: image.assets[0].fileName,
                type: image.assets[0].type,
                size: image.assets[0].fileSize / (1024 * 1024), // Convert bytes to MB
              };
              resolve(response);
            }
          }
        })
        .catch(error => {
          console.log({error});
          reject(error);
        });
    });
  }
}
