import { UserType } from "@api/types";
import { httpService, ResponseResult } from "@shared/service/service";

export class ExpertData {
  getExpertListByGroupId(payload: {
    groupId: string;
  }): ResponseResult<UserType[]> {
    const data = httpService<UserType[]>(
      "GET",
      "get_experts",
      `code=${payload.groupId}`
    );
    return data;
  }
}
