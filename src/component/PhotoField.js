import styled from "styled-components";



const PhotoField = () => {
  return (
    <div>
      <div></div>
      <p>사진 찍기 </p>
    </div>
    <div>
        <input type="file" accept=".jpg,.png,.jpeg" style={{ display: "none" }} />
    </div>
  );
};

export default PhotoField;
