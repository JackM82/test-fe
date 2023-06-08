import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Toast } from "../utilities/notification";
import { getPosts } from "../Reducer/postsSlice";
import '../style/modal.css'
import { postSendResponse, postSendLoading, addPost} from "../Reducer/addPostSlice"

const AddPostForm = ({close}) => {
  const toast = new Toast("Post salvato con successo");
  const noFile = new Toast("File mancante, seleziona almeno un file");

  const [file, setFile] = useState(null);
  //console.log(file);
  const [formData, setFormData] = useState({});
  //console.log(formData);
  const dispatch = useDispatch();

  const onChangeHandleFile = (e) => {
    setFile(e.target.files[0]); //upload in modalita "single" è SEMPRE all'indice 0 di un array
  };

  //handler per gestione upload file
  const uploadFile = async (file) => {
    const fileData = new FormData(); //istanziamo metodo FormData
    fileData.append("img", file); //appendiamo proprietà 'img' con il file
    try {
      const response = await fetch("http://localhost:5050/posts/uploadImg", {
        method: "POST",
        body: fileData,
      });
      return await response.json(); //stringa del file da salvare, restituita
    } catch {
      console.error("file upload error occured");
    }
  };

  const submitPost = async (e) => {
    //funzione asincrona perchè dobbiamo attendere il caricamento del file su server
    e.preventDefault();

    if (file) {
      try {
        const uploadedFile = await uploadFile(file); //inviamo il file
        const postFormData = {
          ...formData,
          img: uploadedFile.img, //qui ci va la stringa del file img:`${url}/uploads/${imgUrl}`
        };
        dispatch(addPost(postFormData)).then(() => {
          toast.success();
          dispatch(getPosts({ page: 1, pageSize: 8 }));
        });
        return
      } catch (error) {
        console.error("Failed to save the post", error);
      }
    } else {
      console.error("Please select at least one file");
      noFile.missedfile();  
      return    
    }

    dispatch(addPost(formData)).then(() => {
      toast.success();
      dispatch(getPosts({}));
    });
  };

  return (
    <div className="myModal">
      {/*encType='multipart/form-data' è ESSENZIALE per farsì che la form 
      accetti sia normali input sia file*/}
      <form onSubmit={submitPost} encType="multipart/form-data">
        <div className="sm:flex md:flex justify-center item-center gap-2">
          <input
            type="text"
            name="title"
            placeholder="titolo"
            className="p-2 text-black w-full rounded mb-2"
            onChange={(e) =>
              setFormData({
                ...formData,
                title: e.target.value,
              })
            }
          />
          <input
            type="text"
            name="category"
            placeholder="category"
            className="p-2 text-black w-full rounded mb-2"
            onChange={(e) =>
              setFormData({
                ...formData,
                category: e.target.value,
              })
            }
          />
          <input
            type="text"
            name="author"
            placeholder="autore"
            className="p-2 text-black w-full rounded mb-2"
            onChange={(e) =>
              setFormData({
                ...formData,
                author: {
                  name:e.target.value,
                  avatar:'https://picsum.photos/100/100'
                },
              })
            }
          />
          <select
            name="rate"
            placeholder="voto"
            className="p-2 text-black w-full rounded mb-2"
            onChange={(e) =>
              setFormData({
                ...formData,
                rate: Number(e.target.value),
              })
            }
          >
            <option>Dai un Voto</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div>
          <textarea
            placeholder="Testo del post..."
            className="p-2 text-black w-full rounded mb-2"
            rows={8}
            onChange={(e) =>
              setFormData({
                ...formData,
                content: e.target.value,
              })
            }
          />
        </div>
        <div>
          <input
            type="file"
            name="img"
            className="p-2 text-black w-full rounded mb-2"
            onChange={onChangeHandleFile}
          />
        </div>
        <div className="mt-8">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-black font-bold py-1 px-4 rounded inline-flex items-center"
          >
            Salva
          </button>
          <button
            onClick={close}
            className="bg-red-500 hover:bg-red-600 text-black font-bold py-1 px-4 rounded inline-flex items-center ml-2"
          >
            Chiudi
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPostForm;
