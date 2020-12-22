import { db } from "../firebase";
import { savePhotosInFirebaseStorage, getPhotoById } from "./photoAPI";

export const getRoutesByUserId = async (userId) => {
  const routes = [];
  const routesRef = await db
    .collection("routes")
    .where("userId", "==", userId)
    .get();
  routesRef.forEach((doc) => {
    routes.push({ ...doc.data(), id: doc.id });
  });
  return routes;
};

export const getRoutePhotosByRouteId = async (routeId, limit, lastPhoto) => {
  const photos = [];
  let photosRef = [];

  const query = db
    .collection("routesGallery")
    .where("routeId", "==", routeId)
    .orderBy("createdDate", "asc")
    .limit(limit);

  if (!lastPhoto) {
    photosRef = await query.get();
  } else {
    photosRef = await query.startAfter(lastPhoto).get();
  }

  photosRef.forEach((doc) => {
    photos.push({ ...doc.data(), id: doc.id });
  });

  const lastPhotoRef = photosRef.docs[photosRef.docs.length - 1];
  const newLastVisible = photos.length < limit ? false : lastPhotoRef;

  return { photos, newLastVisible };
};

export const createRoute = async (user, route) => {
  const routeToSave = { ...route, userId: user.uid, userEmail: user.email };
  const savedRouteRef = await db.collection("routes").add(routeToSave);
  return { ...routeToSave, id: savedRouteRef.id };
};

export const updateRoute = async (route) => {
  return await db.collection("routes").doc(route.id).set(route);
};

export const removeRouteById = async (routeId) => {
  return await db.collection("routes").doc(routeId).delete();
};

export const savePhotosInRoute = async (routeId, photosToSave) => {
  const savePhotoInRoutes = (photoUrl) => {
    return db
      .collection("routesGallery")
      .add({ routeId, photoUrl, createdDate: new Date() });
  };

  try {
    const photosUrlFromFirebaseStorage = await savePhotosInFirebaseStorage(
      photosToSave
    );

    let uploadedPhotosId = await Promise.all(
      photosUrlFromFirebaseStorage.map(async (photoUrl) => {
        return await savePhotoInRoutes(photoUrl);
      })
    );

    //firebase don't return saved value, so i have to fetch again
    let uploadedPhotosData = await Promise.all(
      uploadedPhotosId.map(async ({ id }) => {
        return await getPhotoById(id);
      })
    );

    return uploadedPhotosData.map(({ photo, id }) => ({ ...photo.data(), id }));
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
};
