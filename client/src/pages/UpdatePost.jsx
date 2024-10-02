import React, { useEffect, useState } from "react";
import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  getStorage,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate ,useParams } from "react-router-dom";
import {useSelector} from "react-redux"

export default function UpdatePost() {
    const {currentuser} = useSelector((state) =>state.user)
  const [file, setFile] = useState(null);
  const [imageUploadProgress, SetImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError ,  setPublishError] =useState(null)
  const navigate = useNavigate()
  const {postId} =useParams()

  useEffect(() =>{
    try {
        const fetchData = async() =>{  
            const res = await fetch(`/api/getposts?postId=${postId}`)
            const data = await res.json()
            if (!res.ok) {
                setPublishError(data.message)
                
            }else{
                setPublishError(null)
                setFormData(data.posts[0])
            }
        }
        fetchData()
    } catch (error) {
        console.log(error.message);
        
    }
  },[postId])
  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("Image not uploaded");
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          SetImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError("Image upload failed");
          SetImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            setImageUploadError(null);
            SetImageUploadProgress(null);
            setFormData({ ...formData, image: downloadUrl });
          });
        }
      );
    } catch (error) {
      setImageUploadError(null);
      SetImageUploadProgress(null);
      console.log(error);
    }
  };
    const handleSubmit =async(e) =>{
      e.preventDefault()
      try {
        const res =await fetch(`/api/updatepost/${formData._id}/${currentuser._id}` , {
          method:"PUT" ,
          headers: { "content-type": "application/json" },
          body:JSON.stringify(formData)
        })
        const data= await res.json() 
        if (!res.ok) {
          setPublishError(data.message)
          return
        }
        if (res.ok) {
          setPublishError(null)
          navigate(`/posts/${data.slug}`)
        }

      } catch (error) {
        setPublishError(error.message)
        console.log(error.message);
        
      }
    }
  return (
    <div className="min-h-screen max-w-3xl mx-auto p-3">
      <h1 className="text-center text-3xl font-semibold my-7">Update a post</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 justify-between sm:flex-row">
          <TextInput
            type="text"
            placeholder="title..."
            id="title"
            required
            className="flex-1"
            onChange={(e)=>{
              setFormData({...formData , title :e.target.value})
            }}
            value={formData.title}
          />
          <Select onChange={(e) =>{
            setFormData({...formData , category:e.target.value})
          }} value={formData.category}>
            <option value="uncategorized">Select a Category</option>
            <option value="javascript">JavaScript</option>
            <option value="react.js">React.Js</option>
            <option value="next.js">Next.Js</option>
            <option value="lifestyle">LifeStyle</option>
            <option value="othere">Others</option>
            
          </Select>
        </div>
        <div className="flex justify-between items-center gap-4 border-2 p-3 rounded-xl">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />
          <Button
            type="button"
            size="sm"
            gradientMonochrome="success"
            outline
            onClick={handleUploadImage}
            disabled={imageUploadProgress}
          >
            {imageUploadProgress ? (
              <div className=" w-10 h-10">
                <CircularProgressbar
                  value={imageUploadError}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              "upload image"
            )}
          </Button>
        </div>
          {imageUploadError && (<Alert color="failure">{imageUploadError}</Alert>)}
          {
            formData.image && (
              <img src={formData.image} alt="image" className="w-full h-72 object-cover"  />
            )
          }
        <ReactQuill
          placeholder="write something..."
          value={formData.content}
          theme="snow"
          className="h-72 mb-12 dark:text-white"
          required
          onChange={(value) =>{
            setFormData({...formData, content:value})
          }}
        />
        <Button type="submit" gradientMonochrome="success" outline >
          Update
        </Button>
        {
          publishError && (<Alert color="failure" className="mt-4">{publishError}</Alert>)
        }
      </form>
    </div>
  );
}
