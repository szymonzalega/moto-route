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

async function savePhotos(photos) {
  let uploadPhotoPromiseList = [];
  let uploadedPhotoUrlPromiseList = [];
  //TODO remove try catch block and catching the errors from promise, what if not all promise resolve correct?
  try {
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
        });
    });
  } catch (e) {
    console.error(e);
  }
}

export function saveRoute(route, { uid, email }) {
  return async function (dispatch) {
    try {
      route = { ...route, userId: uid, userEmail: email };
      if (route.id !== undefined) {
        await db.collection("routes").doc(route.id).set(route);
        dispatch(updateRouteSuccess(route));
      } else {
        if (route.photos.length > 0) {
          let photosUrl = await savePhotos(route.photos);
          route.photos = photosUrl;
        }

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
