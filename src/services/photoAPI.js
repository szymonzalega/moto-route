import { db, storage } from "../firebase";

export const savePhotosInFirebaseStorage = async (photos) => {
  const savePhotoInStorage = (photo) => {
    return storage.child(photo.name).put(photo);
  };

  const getPhotoUrl = (photo) => {
    return photo.ref.getDownloadURL();
  };

  const uploadedPhotosListRef = await Promise.all(
    photos.map(async (photo) => {
      return await savePhotoInStorage(photo);
    })
  );

  const uploadedPhotosUrl = await Promise.all(
    uploadedPhotosListRef.map(async (photo) => {
      return await getPhotoUrl(photo);
    })
  );

  return uploadedPhotosUrl;
};

export const getPhotoById = async (id) => {
  const photo = await db.collection("routesGallery").doc(id).get();
  return { photo, id };
};
