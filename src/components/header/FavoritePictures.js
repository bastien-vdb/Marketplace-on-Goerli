import { usePictures } from "../../hooks/usePictures";

export default function FavoritePictures() {

  //check if user exists in firestore
    const {pictureList, handleLike} = usePictures();

  return (
    <div className="w-full flex justify-center items-center gap-6">
      {pictureList &&
        pictureList.map((picture) => (
          <div key={picture.fileUrl} className="flex">
            <img className="w-80 h-fit" src={picture.fileUrl} alt={picture.fileUrl} />
            <p className="bg-red-600 cursor-pointer text-xl absolute rounded-full px-2 m-2">
              {picture.like} <span></span>
            </p>
            <p onClick={() => handleLike(picture.fileUrl)} className="cursor-pointer text-xl absolute bottom-10 bg-green-500 rounded-full px-2 m-2">
              Like
            </p>
          </div>
        ))}
    </div>
  );
}
