import React, {
  FC,
  useState,
  useRef,
  MutableRefObject,
  useEffect,
} from "react";
import "./CreatePost.css";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { apiAxios } from "../axios/apiAxios";
import { useAppSelector } from "../../store/hook";

interface Props {
  setModal: (modal: boolean) => void;
  modal: boolean;
  handleCreatePost: (formData: FormData) => any;
}

export const CreatePost: FC<Props> = ({
  setModal,
  modal,
  handleCreatePost,
}) => {
  const [text, setText] = useState<string>("");
  const [files, setFiles] = useState<string[]>([]);
  const user = useAppSelector((state) => state.persist.userSlice.user);
  const imageUpload = useRef() as MutableRefObject<
    HTMLInputElement & HTMLFormElement
  >;

  const uploadFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target?.files && e.target.files.length !== 0) {
      const filesArray = Array.from(e.target.files);
      const filesUrl = filesArray.map((elem) => URL.createObjectURL(elem));
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

      await handleCreatePost(formData);
    } else {
      const formData = new FormData();
      formData.append("text", text);

      await handleCreatePost(formData);
    }
  };
  const clearFiles = () => {
    setFiles([]);
    imageUpload.current.value = "";
    console.log(imageUpload.current.files);
  };
  return (
    <div className="create-post" onClick={() => setModal(!modal)}>
      <div className="create-post-align" onClick={(e) => e.stopPropagation()}>
        <h2>Создать пост</h2>
        <div className="add-image" onClick={() => imageUpload.current.click()}>
          <div className="add-image-align">
            {files.length > 0 ? (
              files.map((elem) => (
                <div className="add-image-item">
                  <img src={elem} className="create-post-image"></img>
                </div>
              ))
            ) : (
              <AddPhotoAlternateIcon
                style={{ width: "90px", height: "90px" }}
              ></AddPhotoAlternateIcon>
            )}
          </div>
          <div onClick={(e) => e.stopPropagation()}>
            <p onClick={() => clearFiles()}>Очистить</p>
          </div>
        </div>

        <input
          multiple
          type="file"
          ref={imageUpload}
          hidden
          onChange={(e) => uploadFiles(e)}
        ></input>
        <p>{text}</p>
        <input
          onChange={(e) => setText(e.target.value)}
          placeholder="Текст поста"
        ></input>
        <button onClick={() => preparePost()}>Отправить</button>
      </div>
    </div>
  );
};
