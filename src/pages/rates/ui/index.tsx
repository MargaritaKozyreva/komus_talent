import React, { useEffect } from "react";
import { withLayout } from "@ui/layout";
import { useData } from "@shared/helpers/hooks/useData";
import { ModalContext, ProgramContext, RateContext } from "@shared/api/dataContext";
import { WithSkeleton } from "@shared/ui/WithSkeleton";

import cn from "classnames";
import styles from "./styles.module.scss";
import { RateType } from "@shared/api/types";
import classNames from "classnames";
import TableRate from "@widgets/TableRate/ui/TableRate";
import { useDispatch, useSelector } from "react-redux";
import { userRateModel } from "@entities/RateCard";
import { userGroupModel } from "@entities/GroupCard";
import { modalActions } from '@features/Modal/redux/ModalSlices';
import { ModalKey } from '@features/Modal/components/ModalController';

const Rates: React.FC<any> = props => {
  const { data, isLoading, isError } = useData<RateType>(() =>
    RateContext.getUserRateByUserId({ userId: "1" })
  );

  const userRateResponse = useSelector(
    (state: { userRate: userRateModel.slices.UserRateState }) => state.userRate
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userRateModel.actions.getUserRateByUserId("1"));
  }, [dispatch]);

  const onClickHandler = () => {
    dispatch(
      modalActions.showModal({
        key: ModalKey.NewsWidget,
        withBackground: true,
        payload: {
         onClick: () => ModalContext.getModalInfo({ articleCode: "gemification_rules" }),
        },
      })
    );
  };

  return (
    <WithSkeleton isLoading={isLoading} isEmpty={data === null}>
      <div className={cn(styles.root, classNames)}>
        <TableRate />
        <div className={styles.root__talent_widget}>
          <div className={styles.root__talent_wrapper}>
            <span className={styles.root__talent_wrapper_title}>
              Мои talents
            </span>
            <span className={styles.root__talent_wrapper_place}>
              {userRateResponse?.entity?.placeInRate}
            </span>
            <img src={process.env["PUBLIC"] + "/images/vectors/vector12.svg"} />
          </div>
          <button type='button' onClick={() => onClickHandler()}>Правила геймификации</button>
        </div>
      </div>
    </WithSkeleton>
  );
};

export default withLayout(Rates);
