import { db } from "../firebase";
const COLLECTION_NAME = "routes"

export async function getUserRoutes(userId) {


    try {
    let routes = [];
        const routesRef = await db
          .collection(COLLECTION_NAME)
          .where("userId", "==", userId)
          .get();
        routesRef.forEach((doc) => {
          routes.push({ ...doc.data(), id: doc.id });
        });
        return routes
      } catch (e) {
        console.error(e);
        throw e;
      }
    
}