import React, { DetailedHTMLProps, HTMLAttributes } from "react";
import styles from "./styles.module.scss";
import { useData } from "@shared/helpers/hooks/useData";
import { UserType } from "@shared/api/types";
import { userGroupModel } from "@entities/GroupCard";
import { WithSkeleton } from "@shared/ui/WithSkeleton";
import cn from "classnames";
import { PersonCard } from "@shared/ui/PersonCard";

interface UsersProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  className?: string;
  groupId?: string;
}

const UserGroupWidget: React.FC<UsersProps> = props => {
  const { className, groupId } = props;

  const {
    data: groupCollaborators,
    isLoading: groupCollaboratorsIsLoading,
    isError: groupCollaboratorsIsError,
  } = useData<UserType[]>(() =>
    userGroupModel.requests.getGroupCollaboratorsByGroupId(groupId)
  );

  const {
    data: tutorData,
    isLoading: tutorIsLoading,
    isError: tutorIsError,
  } = useData<UserType>(() =>
    userGroupModel.requests.getGroupTutorByGroupId(groupId)
  );

  return (
    <div className={cn(styles.root, className)}>
      <div className={styles.img}>
        <img src={process.env["PUBLIC"] + '/images/vectors/vector11.svg'}/>
      </div>
      
      <WithSkeleton
        isEmpty={tutorData === null}
        isLoading={tutorIsLoading === true}
      >
        <h1>Мой куратор</h1>
        {tutorData && (
          <div className={styles.root__person_card_wrapper}>
            <PersonCard
              userPicLink={tutorData.photo}
              userFullname={tutorData.fullname}
              userPosition={tutorData.positionName}
              className={styles.root__person_card}
              showAvatar
            />
          </div>
        )}
      </WithSkeleton>
      <WithSkeleton
        isEmpty={groupCollaborators === null}
        isLoading={groupCollaboratorsIsLoading === true}
      >
        <h1>Моя группа</h1>
        {groupCollaborators && (
          <div className={styles.root__group_collaborators}>
            {groupCollaborators.map((person, i) => (
              <PersonCard
                userPicLink={person.photo}
                userFullname={person.fullname}
                userPosition={person.positionName}
                className={styles.root__group_collaborator_card}
              />
            ))}
          </div>
        )}
      </WithSkeleton>
    </div>
  );
};

export { UserGroupWidget };
