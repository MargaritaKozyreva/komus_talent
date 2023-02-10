import React, { useEffect, useState } from "react";
import { withLayout } from "@ui/layout";
import { UserWidgets } from "@widgets/UserWidgets/ui";
import { ReviewSection } from "@shared/ui/layout/review";

import { useData } from "@shared/helpers/hooks/useData";
import { INews } from "@shared/api/interfaces";
import { ProgramContext, RateContext } from "@shared/api/dataContext";
import { WithSkeleton } from "@shared/ui/WithSkeleton";

import styles from "./styles.module.scss";
import { RateType } from "@shared/api/types";
import { Search } from "@shared/ui/Search/ui/Search";
import { Table } from "@features/Table";
import { TableFilters } from "@features/Table/ui/components/TableFilters";

import cn from "classnames";
import classNames from "classnames";

import { RateListItemDTO } from "@shared/api/dto";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { userModel } from "@entities/User";

export interface IFilterItems {
  id: number;
  title: string;
}

const FILTER_ITEMS: Array<IFilterItems> = [
  {
    id: 1,
    title: "Общий рейтинг",
  },
  {
    id: 2,
    title: "Мой рейтинг в группе",
  },
  {
    id: 3,
    title: "Рейтинг групп",
  },
];
const Rates: React.FC<any> = props => {
  const [filterData, setFilterData] = useState<Array<any>>([]);
  const [filterItems, setFilterItems] =
    useState<Array<IFilterItems>>(FILTER_ITEMS);
  const [filterItemId, setFilterItemId] = useState<number>(FILTER_ITEMS[0].id);
  const [searchParam, setSearchParam] = useSearchParams();
  const searchQuery = searchParam.get("search") || "";

  const { data, isError, isLoading } = useData<RateListItemDTO[]>(
    () =>
    RateContext.getRateListByRaitingId({
      raitingId: filterItemId,
    }),
    [filterItemId]
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userModel.actions.getUserById(null));
  }, [dispatch]);

  const user = useSelector(
    (state: { user: userModel.slices.UserState }) => state.user
  );

  useEffect(() => {
    const newArr =
      data &&
      data.filter(el => {
        const finderString = [
          el.curator.fullname,
          el.curator.positionName,
          el.groupName,
          el.talentsCount,
          el.placeInRaiting,
        ]
          .join("")
          .toLowerCase();
        return finderString.includes(searchQuery?.trim().toLowerCase() || "");
      });
    setFilterData(newArr);
  }, [searchQuery, data]);

  const changeFilterItem = e => {
    setFilterItemId(+e.target.id);
  };

  return (
    <div>
      <div className={cn(styles.root, classNames as any)}>
        <div className={styles.root__search}>
          <Search
            searchQuery={searchQuery}
            setSearchParam={setSearchParam}
            value={searchQuery}
          />
        </div>
        <div className={styles.root__filter}>
          <TableFilters
            currentFilterItemId={filterItemId}
            filterItems={filterItems}
            changeFilterItem={changeFilterItem}
          />
        </div>

        <WithSkeleton isLoading={isLoading} isEmpty={data === null}>
          {!user.isLoading && filterData && <Table data={filterData} raitingId={filterItemId} user={user.entity}/>}
        </WithSkeleton>
      </div>
    </div>
  );
};

export default Rates;
