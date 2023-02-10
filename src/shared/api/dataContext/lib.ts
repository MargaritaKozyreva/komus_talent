import { LibListItemDTO, ResponseDTO, VideoListItemDTO } from "@api/dto";
import { httpService, ResponseResult } from "@shared/service/service";

export class LibData {
  getLibList(): ResponseResult<ResponseDTO & { files: LibListItemDTO[] }> {
    const data = httpService<ResponseDTO & { files: LibListItemDTO[] }>(
      "GET",
      "get_lib_data"
    );
    return data;
  }
  getVideoList(): ResponseResult<ResponseDTO & { files: VideoListItemDTO[] }> {
    const data = httpService<ResponseDTO & { files: VideoListItemDTO[] }>(
      "GET",
      "get_video_data"
    );
    return data;
  }
}
