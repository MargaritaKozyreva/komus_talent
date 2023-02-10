import { UserData } from './user';
import { ArticleData } from './article';
import { GroupData } from "./userGroup";
import { RateData } from "./userRate";
import { TalentData } from "./userTalent";
import { RoadmapData } from './roadmap';
import { FooterData } from './footer';
import { CuratorData } from './curators';
import { ExpertData } from './experts';
import { ProgramData } from './program';
import { ModalData } from './modal';
import { LibData } from './lib';

export const GroupContext = new GroupData();
export const RateContext = new RateData();
export const LibContext = new LibData();
export const TalentContext = new TalentData();
export const ArticlesContext = new ArticleData();
export const UserContext = new UserData();
export const RoadmapContext = new RoadmapData();
export const FooterContext = new FooterData();
export const CuratorContext = new CuratorData();
export const ExpertContext = new ExpertData();
export const ProgramContext = new ProgramData();
export const ModalContext = new ModalData();

