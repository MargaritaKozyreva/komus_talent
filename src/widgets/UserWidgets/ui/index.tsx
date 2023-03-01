import React, { DetailedHTMLProps, HTMLAttributes, useEffect } from "react";
import { userModel } from "@entities/User";
import { UserGroupCard, userGroupModel } from "@entities/GroupCard";
import { UserRateCard, userRateModel } from "@entities/RateCard";
import { WithSkeleton } from "@ui/WithSkeleton";
import { useDispatch, useSelector } from "react-redux";

import cn from "classnames";
import styles from "./styles.module.scss";
import EllipseSvg from "../assets/ellipse.svg";
import RedCircleSvg from "../assets/redCircle.svg";
import PlaceInGroupSvg from "../assets/placeInGroup.svg";
import Button from "@shared/ui/Button/ui";
import { modalActions } from "@features/Modal/redux/ModalSlices";
import { ModalKey } from "@features/Modal/components/ModalController";
import { Link } from "react-router-dom";
import { UserTalentState } from "@entities/GroupCard/model/talent/slices";

interface userWidgetsProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  className?: string;
}

const UserWidgets: React.FC<userWidgetsProps> = props => {
  const { className } = props;

  const dispatch = useDispatch();

  const onClickGroupHandler = (groupId: string) => {
    dispatch(
      modalActions.showModal({
        key: ModalKey.UserGroupWidget,
        withBackground: true,
        payload: {
          groupId: groupId,
        },
      })
    );
  };

  const user = useSelector(
    (state: { user: userModel.slices.UserState }) => state.user
  );
  const userGroupResponse = useSelector(
    (state: { userGroup: userGroupModel.GroupSlices.UserGroupState }) =>
      state.userGroup
  );
  const userRateResponse = useSelector(
    (state: { userRate: userRateModel.slices.UserRateState }) => state.userRate
  );
  const userTalentResponse = useSelector(
    (state: { userTalent: UserTalentState }) => state.userTalent
  );

  useEffect(() => {
    dispatch(userModel.actions.getUserById(null));
  }, [dispatch]);
  useEffect(() => {
    if (user.entity) {
      dispatch(userGroupModel.actions.getUserGroupByUserId(user.entity.id));
    }
  }, [dispatch, user.entity]);
  useEffect(() => {
    if (user.entity) {
      dispatch(userRateModel.actions.getUserRateByUserId(user.entity.id));
    }
  }, [dispatch, user.entity]);
  useEffect(() => {
    if (user.entity) {
      dispatch(userGroupModel.actions.getUserTalentsByUserId(user.entity.id));
    }
  }, [dispatch, user.entity]);

  return (
    <div className={cn(styles.root, className)}>
      <WithSkeleton
        isEmpty={userGroupResponse.entity === null}
        isLoading={userGroupResponse.isLoading}
      >
        <UserGroupCard
          className={styles.groupCard}
         
        >
          <div className={styles.groupCardbox}>
            <div className={styles.groupCardbox__text}>
              <h2>Моя группа</h2>
              <span>{userGroupResponse.entity?.shortText}</span>
            </div>

            <Button mode="red"  onClick={() => onClickGroupHandler("1")} withCircle>
              Посмотреть
            </Button>
          </div>
          <div className={styles.placeInTalentSelection}>
            <EllipseSvg />
            <div className={styles.placeInTalentSelection__wrapper}>
              <span style={{ fontWeight: "700", fontSize: "72px" }}>
                {userTalentResponse?.entity?.talents}
              </span>
              <br />
              <span>Мои таланты</span>
            </div>
          </div>
        </UserGroupCard>
      </WithSkeleton>
      <WithSkeleton
        isEmpty={userRateResponse.entity === null}
        isLoading={userRateResponse.isLoading}
      >
        <UserRateCard
          data={userRateResponse?.entity}
          className={styles.rateCard}
        >
          <div>
            <div className={styles.placeInRateSelection}>
              <RedCircleSvg className={styles.redCircle} />
              <div className={styles.placeInRateSelection__place_wrapper}>
                <span className={styles.placeInRateSelection__place}>
                  {userRateResponse?.entity?.placeInRate}
                </span>
                <br />
                <span className={styles.placeInRateSelection__place_title}>
                  место
                  <br />в рейтинге
                </span>
              </div>
            </div>
            <div className={styles.placeInGroupSelection}>
              <PlaceInGroupSvg />
              <div>
                <span style={{ fontWeight: "700", fontSize: "50px" }}>
                  {userRateResponse?.entity?.placeInGroup}
                </span>
                <br />
                <span>место</span>
                <br />
                <span>в группе</span>
              </div>
            </div>
          </div>
          <div className={styles.rateCardbox}>
            <Link to={"/komus_talents/rates"}>
              <Button type="button" mode="red" withCircle>
                Подробнее
              </Button>
            </Link>
          </div>
        </UserRateCard>
      </WithSkeleton>
    </div>
  );
};

export { UserWidgets };
