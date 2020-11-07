import * as types from "./actionTypes";
import { db, storage } from "../../firebase";

export function loadUserRoutesSuccess(routes) {
  return {
    type: types.LOAD_ROUTES_SUCCESS,
    routes,
  };
}

export function createRouteSuccess(route) {
  return {
    type: types.CREATE_ROUTE_SUCCESS,
    route,
  };
}

export function updateRouteSuccess(route) {
  return {
    type: types.UPDATE_ROUTE_SUCCESS,
    route,
  };
}

export function deleteRouteSuccess(route) {
  return {
    type: types.DELETE_ROUTE_SUCCESS,
    route,
  };
}

export function loadUserRoutes(userId) {
  return async function (dispatch) {
    let routes = [];
    try {
      const routesRef = await db
        .collection("routes")
        .where("userId", "==", userId)
        .get();
      routesRef.forEach((doc) => {
        routes.push({ ...doc.data(), id: doc.id });
      });
      dispatch(loadUserRoutesSuccess(routes));
    } catch (e) {
      console.error(e);
      throw e;
    }
  };
}

async function savePhotosInFirebaseStorage(photos) {
  let uploadPhotoPromiseList = [];
  let uploadedPhotoUrlPromiseList = [];
  return new Promise((resolve, reject) => {
    for (let photo of photos) {
      let fileName = photo.name;
      uploadPhotoPromiseList.push(storage.child(fileName).put(photo));
    }

    Promise.all(uploadPhotoPromiseList)
      .then((uploadedPhotosRef) => {
        for (let ref of uploadedPhotosRef) {
          uploadedPhotoUrlPromiseList.push(ref.ref.getDownloadURL());
        }
        return Promise.all(uploadedPhotoUrlPromiseList);
      })
      .then((uploadedPhotosUrl) => {
        console.log(uploadedPhotosUrl);
        resolve(uploadedPhotosUrl);
      })
      .catch((e) => {
        reject(e);
      });
  });
}

export function savePhotos(route, photosToSave) {
  return async function (dispatch) {
    try {
      const photosUrlArray = await savePhotosInFirebaseStorage(photosToSave);
      const routeToSave = {
        ...route,
        photos: [...route.photos, ...photosUrlArray],
      };
      dispatch(saveRoute(routeToSave));
    } catch (e) {
      console.error(e);
    }
  };
}

export function saveRoute(route, user) {
  return async function (dispatch) {
    try {
      if (route.id !== undefined) {
        await db.collection("routes").doc(route.id).set(route);
        dispatch(updateRouteSuccess(route));
        return route.id;
      } else {
        route = { ...route, userId: user.uid, userEmail: user.email };

        // if (route.photos.length > 0)
        //   route.photos = await savePhotos(route.photos);

        const routesRef = await db.collection("routes").add(route);
        dispatch(createRouteSuccess({ ...route, id: routesRef.id }));
        return routesRef.id;
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
  };
}

export function deleteRoute(route) {
  return async function (dispatch) {
    try {
      await db.collection("routes").doc(route.id).delete();
      dispatch(deleteRouteSuccess(route));
    } catch (e) {
      console.error(e);
      throw e;
    }
  };
}
