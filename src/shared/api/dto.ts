import {
  ArticleType,
  GroupType,
  RateType,
  UserTalentType,
  UserType,
} from "./types";

export interface ResponseDTO {
  success: boolean;
  error_text: string;
}

export interface GroupDTO {
  tutor: UserType;
  groupUsers: UserType[];
}
export interface RateListItemDTO {
  placeInRaiting: number;
  groupName: string;
  groupId: string;
  curator: UserType;
  talentsCount: UserTalentType["talents"];
}

export interface LibListItemDTO {
  title: string;
  description: string;
  id: string;
  link: string;
}

export interface VideoListItemDTO {
  title: string;
  description: string;
  id: string;
  poster: string;
  source: string;
  alt: string;
}
export interface CuratorItemDTO {
  tutors: UserType[];
}

export interface ArticleDTO {
  articles: ArticleType[];
}

export interface userWidgetsDTO {
  group: GroupType;
  rate: RateType;
}
