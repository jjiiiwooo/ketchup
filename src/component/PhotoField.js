import { useState, useRef, forwardRef, useImperativeHandle } from "react";
import axios from "axios";
import { FiCamera } from "react-icons/fi";
import { IoMdCloseCircle } from "react-icons/io";
import styled from "styled-components";

const NameBox = styled.div`
  margin-top: 6vh;
  display: flex;
  margin-bottom: 3vh;

  .photo {
    font-size: 3vh;
    font-weight: bold;
    color: #c35050;
    margin-left: 3vw;
  }
`;

const Box = styled.div`
  position: relative;
  height: 30vh;
  width: 100%;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  img {
    max-width: 100%;
    max-height: 100%;
  }

  .guide {
    color: gray;
    font-size: 3vh;
  }
`;

const CameraIcon = styled(FiCamera)`
  font-size: 4vh;
  color: #c35050;
`;

const CloseIcon = styled(IoMdCloseCircle)`
  font-size: 4vh;
  position: absolute;
  top: 0.5vh;
  right: 2vw;
  cursor: pointer;
`;

const PhotoField = forwardRef((props, ref) => {
  const [Image, setImage] = useState(null);
  const InputRef = useRef(null);

  //이미지 첨부
  const handleImage = (e) => {
    const imageFile = e.target.files[0];
    if (imageFile) {
      const imageURL = URL.createObjectURL(imageFile);
      setImage(imageURL);
    }
  };

  //첨부한 이미지 제거
  const cancleImage = () => {
    setImage(null);
    InputRef.current.value = "";
  };

  //이미지 서버 업로드
  //TextField에서 useRef를 통해 접근
  // eslint-disable-next-line
  const uploadImage = async () => {
    try {
      const formData = new FormData();
      formData.append("image", InputRef.current.files[0]);
      const res = await axios.post(
        "http://localhost:8080/RestrauntReview",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("이미지 업로드 성공:", res.data);
      return res.data.imageUrl;
    } catch (error) {
      console.error("이미지 업로드 에러:", error);
      throw error;
    }
  };

  useImperativeHandle(ref, () => ({
    uploadImage: async () => {
      return await uploadImage();
    },
  }));

  return (
    <div ref={ref}>
      <NameBox>
        <CameraIcon>
          <FiCamera />
        </CameraIcon>
        <div className="photo">사진 추가</div>
      </NameBox>
      <input
        type="file"
        accept=".jpg,.png,.jpeg"
        ref={InputRef}
        onChange={handleImage}
        style={{ display: "none" }}
      />
      {Image ? (
        <Box>
          <img src={Image} alt="이미지" />
          <CloseIcon onClick={cancleImage}>
            <IoMdCloseCircle />
          </CloseIcon>
        </Box>
      ) : (
        <Box>
          <div className="guide" onClick={() => InputRef.current.click()}>
            사진을 첨부해주세요
          </div>
        </Box>
      )}
    </div>
  );
});

export default PhotoField;
