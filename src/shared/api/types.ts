export type UserType = {
  id: string;
  fullname: string;
  positionName: string;
  photo?: string;
};

export type ArticleType = {
  articleId: string;
  articleKey: string;
  createDate: string;
  title: string;
  shortText: string;
  fullText: string;
};

export type GroupType = {
  id: string;
  title: string;
  shortText: string;
};

export type RateType = {
  placeInRate: number;
  placeInGroup: number;
  userScore: number;
};

export type UserTalentType = {
  talents: string;
};
export type FooterLinkType = {
  title: string;
  url: string;
  link: string;
};

export type ModuleType = {
  id: string;
  title: string;
  shortText: string;
  date: string;
  link: string;
  disabled?: boolean;
};
