import { VideoListItemDTO } from "../../../src/shared/api/dto";
import React from "react";
import styles from "./VideoList.module.scss";

type VideoListProps = {
  videos: VideoListItemDTO[];
};

const VideoList: React.FC<VideoListProps> = props => {
  const { videos } = props;
  return (
    <div className={styles.videoList}>
      {videos.map((video, i) => (
        <div className={styles.videoBox}>
          <div className={styles.videoContent}>
            <video
              key={i}
              src={`${process.env["PORTAL"]}/${video.source}`}
              poster={`${process.env["PORTAL"]}/${video.poster}`}
              style={{ margin: "0 auto", display: "block" }}
              controlsList='nodownload'
              controls
            />
          </div>
          <div className={styles.videoText}>
            <p className={styles.videoTitle}>{video.title}</p>
            <p className={styles.videoDescription}>{video.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoList;
