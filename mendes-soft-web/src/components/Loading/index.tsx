import React from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

interface LoadingProps {
  height?: number;
  width?: number;
}

const Loading: React.FC<LoadingProps> = ({ height, width }) => {
  return (
    <div style={{ marginTop: 30 }}>
      <Loader
        type="ThreeDots"
        color="#07f"
        height={height || 50}
        width={width || 50}
        timeout={10000}
      />
    </div>
  );
};

export default Loading;
