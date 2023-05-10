import "./create.css";
import Image from "../../assets/Image.png";
import { useState } from "react";
// import { Link } from 'react-router-dom';
import { storage, db, auth } from "../../firebase-config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

const Shareapic = () => {
  //to handle the file upload
  const [file, setFile] = useState(null);
  const [pictureUrl, setPictureUrl] = useState(null); //To show on our website

  const handleUpload = async (e) => {
    // 'file' comes from the Blob or File API
    setFile(() => e.target.files[0]);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPictureUrl(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handlePush = async (e) => {
    e.preventDefault();
    const storageRef = ref(storage, "images/" + file.name);
    console.log("storageRef", storageRef);
    // 'file' comes from the Blob or File API
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    console.log("url", url);

    addDoc(collection(db, "filesUploaded"), {
      userUuid: auth.currentUser.uid,
      fileUrl: url,
      like: 0,
      likeBy: [],
    })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="create section__padding">
        <div className="create-container">
          <h1>Create new Item</h1>
          <p className="upload-file">Upload File</p>
          <div className="upload-img-show">
            <h3>JPG, PNG, GIF, SVG, WEBM, MP3, MP4. Max 100mb.</h3>
            <img src={file ? pictureUrl : Image} alt="banner" />
          </div>
          <form className="writeForm" autoComplete="off" onSubmit={handlePush}>
            <div className="formGroup">
              <input accept="image/*" multiple type="file" onChange={handleUpload} className="custom-file-input" />
              <button type="submit" className="btn btn-primary">
                Upload
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Shareapic;
