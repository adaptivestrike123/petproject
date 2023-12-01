import React, {
  FC,
  useState,
  useRef,
  MutableRefObject,
  useEffect,
} from "react";
import "../createPost/CreatePost.css";
import ImageIcon from "@mui/icons-material/Image";
import { useAppSelector } from "../../store/hook";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Image } from "../pages/posts/Posts";

interface Props {
  setModal: (modal: boolean) => void;
  modal: boolean;
  handleEditPost: (formData: FormData) => any;
  postId: number;
  images: Image[];
}

export const EditPost: FC<Props> = ({
  setModal,
  modal,
  handleEditPost,
  postId,
  images,
}) => {
  const [text, setText] = useState<string>("");
  const [files, setFiles] = useState<Image[] | any>([]);
  const [isClear, setIsClear] = useState<boolean>(false);

  const user = useAppSelector((state) => state.persist.userSlice.user);
  const imageUpload = useRef() as MutableRefObject<HTMLInputElement>;

  const uploadFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target?.files && e.target.files.length !== 0) {
      const filesArray = Array.from(e.target.files);
      const filesUrl = filesArray.map((elem) => ({
        imageUrl: URL.createObjectURL(elem),
      }));
      console.log(filesUrl);
      setFiles([...filesUrl]);
    }
  };
  const preparePost = async () => {
    if (imageUpload.current.files?.length !== 0 && imageUpload.current.files) {
      const formData = new FormData();
      for (let index in imageUpload.current.files) {
        formData.append(`file`, imageUpload.current.files[index]);
      }

      formData.append("text", text);
      formData.append("id", String(user?.id));
      formData.append("postId", String(postId));
      formData.append("deletePrev", "true");

      await handleEditPost(formData);
    } else {
      const formData = new FormData();
      formData.append("text", text);
      formData.append("id", String(user?.id));
      formData.append("postId", String(postId));
      formData.append("deletePrev", String(isClear));

      await handleEditPost(formData);
    }
  };
  const clearFiles = () => {
    setFiles([]);
    setIsClear(true);
    imageUpload.current.value = "";
  };

  useEffect(() => {
    setFiles(
      images.map((elem) => ({
        imageUrl: `http://localhost:5000/static/post_images/${elem.imageUrl}`,
      }))
    );
  }, []);
  return (
    <div className="create-post" onClick={() => setModal(!modal)}>
      <div className="create-post-align" onClick={(e) => e.stopPropagation()}>
        <h2>Редактировать пост</h2>
        <div className="add-image">
          <div
            className="add-image-align"
            onClick={() => imageUpload.current.click()}
          >
            {files.length > 0 ? (
              files.map((elem: any) => (
                <div className="add-image-item">
                  <img src={elem.imageUrl} className="create-post-image"></img>
                </div>
              ))
            ) : (
              <ImageIcon style={{ width: "90px", height: "90px" }}></ImageIcon>
            )}
          </div>
          {files.length > 0 ? (
            <div className="delete-image" onClick={(e) => e.stopPropagation()}>
              <DeleteForeverIcon
                onClick={() => clearFiles()}
                style={{ width: "39px", height: "39px" }}
              ></DeleteForeverIcon>
            </div>
          ) : null}
        </div>
        <input
          multiple
          type="file"
          ref={imageUpload}
          hidden
          onChange={(e) => uploadFiles(e)}
        ></input>
        <input
          onChange={(e) => setText(e.target.value)}
          placeholder="Текст поста"
        ></input>
        <button onClick={() => preparePost()}>Отправить</button>
      </div>
    </div>
  );
};
