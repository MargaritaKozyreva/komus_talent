import { LibListItemDTO, VideoListItemDTO } from "@api/dto";
import { httpServiceMock, ResponseResult } from "@shared/service/service";
import { libMockData } from "./items/lib";
import { videoMockData } from "./items/video";

export class LibData {
  getLibList(): ResponseResult<LibListItemDTO[]> {
    const data = httpServiceMock<LibListItemDTO[]>(libMockData);
    return data;
  }

  getVideoList(): ResponseResult<VideoListItemDTO[]> {
    const data = httpServiceMock<VideoListItemDTO[]>(videoMockData);
    return data;
  }
}
