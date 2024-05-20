import { useState, useRef } from "react";
import axios from "axios";
import styled from "styled-components";

const ImageContainer = styled.div`
  width: 100%;
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  border: 1px solid #000000;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const ImageBox = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    max-width: 100%;
    max-height: 100%;
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const ButtonBox = styled.div`
  margin: 0 10px;
`;

const Button = styled.div`
  background-color: white;
  border: 2px solid #c35050;
  border-radius: 2vh;
  font-size: 3vh;
  color: #c35050;
  padding: 2vw;
  margin-top: 2vh;
  display: flex;
  font-weight: bold;
  align-items: center;
  gap: 1vh;
  transition: transform 0.2s;

  &:hover {
    transform: scale(0.95);
  }
`;

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const inputRef = useRef(null);

  const onImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  // 이미지 파일 서버로 전송
  const onUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("image", image);
      await axios.post("http://localhost:8080/images", formData);
      console.log(image);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <input
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={onImageUpload}
        ref={inputRef}
        style={{ display: "none" }}
      />

      {/*이미지가 있을 때*/}
      {image && (
        <div>
          <ImageContainer>
            <ImageBox>
              <img src={URL.createObjectURL(image)} alt="SelectedImage" />
            </ImageBox>
          </ImageContainer>
          <ButtonContainer>
            <ButtonBox>
              <Button onClick={onUpload}>Send Image</Button>
            </ButtonBox>
          </ButtonContainer>
        </div>
      )}

      {/*이미지가 없을 때*/}
      {!image && (
        <div>
          <ImageContainer>{}</ImageContainer>
          <ButtonContainer>
            <ButtonBox>
              <Button onClick={() => inputRef.current.click()}>
                Select Image
              </Button>
            </ButtonBox>
          </ButtonContainer>
        </div>
      )}
    </>
  );
};

export default ImageUpload;
