import { useEffect, useState } from "react";
import { db } from "../firebase-config";
import { collection, getDocs, query, where, doc, updateDoc } from "firebase/firestore";
import { auth } from "../firebase-config";
import { useContext } from "react";
import {ToastsContext} from "./useToasts";

export function usePictures() {

  const { errorNotify } = useContext(ToastsContext);

    const [pictureList, setPictureList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleLike = async (key) => {
       if (!auth?.currentUser) {
        const errorMessage = "user not connected and have no access";
        errorNotify(errorMessage);
        throw new Error(errorMessage);
       };
        const userConnected = auth.currentUser.uid;
        const filesUploadedRef = collection(db, "filesUploaded");
        const q = query(filesUploadedRef, where("fileUrl", "==", key));
        getDocs(q).then((querySnapshot) => {
          if (querySnapshot.size === 0) console.log("No matching documents!");
          else {
            // If the picture exists
            const docRef = doc(db, "filesUploaded", querySnapshot.docs[0].id);
            if (!querySnapshot.docs[0].data().likeBy.includes(userConnected)) {
            // If the user has not liked the picture yet
            updateDoc(docRef, {
              likeBy: [...querySnapshot.docs[0].data().likeBy, userConnected], // add the user to the likeBy array
              like: querySnapshot.docs[0].data().like + 1, // increase the like count by 1
            })
                .catch((error) => {
                console.log("An error occurred", error);
                });
            } else {
                // If the user has already liked the picture
                updateDoc(docRef, {
                    likeBy: querySnapshot.docs[0].data().likeBy.filter((item) => item !== userConnected), // remove the user from the likeBy array
                    like: querySnapshot.docs[0].data().like - 1, // decrease the like count by 1
                    })
                    .catch((error) => {
                        console.log("An error occurred", error);
                        }
                    );
            }
            getPictures();
          }
        });
      };
    

    const getPictures = async () => {
    const filesUploadedRef = collection(db, "filesUploaded");
    const filesUploadedSnapshot = await getDocs(filesUploadedRef);
    const result = await filesUploadedSnapshot.docs.map((doc) => doc.data());
    setPictureList(()=>result);
    setIsLoading(true);
    };

    useEffect(() => {
        getPictures();
    }, []);
    
    return {pictureList, isLoading, handleLike};
  }