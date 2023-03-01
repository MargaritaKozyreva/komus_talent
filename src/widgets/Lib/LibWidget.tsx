import React, { useEffect, useState } from "react";
import { useData } from "@shared/helpers/hooks/useData";
import { LibContext } from "@shared/api/dataContext";
import { WithSkeleton } from "@shared/ui/WithSkeleton";
import styles from "./styles.module.scss";
import { Search } from "@shared/ui/Search/ui/Search";
import { Table } from "@features/Table";
import cn from "classnames";
import classNames from "classnames";
import {
  LibListItemDTO,
  RateListItemDTO,
  ResponseDTO,
  VideoListItemDTO,
} from "@shared/api/dto";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userModel } from "@entities/User";
import TableContentLib from "../../../src/features/Table/ui/components/TableContentLib/ui";
import { TableLibFilters } from "../../../src/features/Table/ui/components/TableFilters copy";
import VideoList from "../VideoList/VideoList";
import { ResponseResult } from "../../../src/shared/service/service";
import { AxiosResponse } from "axios";

export interface IFilterItems {
  id: number;
  title: string;
}

const FILTER_ITEMS: Array<IFilterItems> = [
  {
    id: 1,
    title: "Книги",
  },
  {
    id: 2,
    title: "Вебинары",
  },
];
const LibWidget: React.FC<any> = props => {
  const [filterData, setFilterData] = useState<
    LibListItemDTO[] | VideoListItemDTO[]
  >([]);
  const [filterItems, setFilterItems] =
    useState<Array<IFilterItems>>(FILTER_ITEMS);
  const [filterItemId, setFilterItemId] = useState<number>(FILTER_ITEMS[0].id);
  const [searchParam, setSearchParam] = useSearchParams();
  const searchQuery = searchParam.get("search") || "";

  function getList(filter: number) {
    switch (filter) {
      case 1:
        return () => LibContext.getLibList();
      case 2:
        return () => LibContext.getVideoList();

      default:
        return null;
    }
  }

  const { data, isError, isLoading } = useData<
    | (ResponseDTO & {
        files: LibListItemDTO[];
      })
    | (ResponseDTO & {
        files: VideoListItemDTO[];
      })
  >(getList(filterItemId), [filterItemId]);

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
      (data.files as LibListItemDTO[]).filter(el => {
        const finderString = [el.description, el.title].join("").toLowerCase();
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
          <TableLibFilters
            currentFilterItemId={filterItemId}
            filterItems={filterItems}
            changeFilterItem={changeFilterItem}
          />
        </div>

        <WithSkeleton
          isLoading={isLoading && user.isLoading && filterData !== null}
          isEmpty={data === null}
        >
          {filterItemId === 1 && (
            <>
              <p>
                <a
                  href={`${process.env["PORTAL"]}/download_file.html?file_id=7186911731782072007`}
                  style={{ color: "#1757ae", fontSize: "14px" }}
                >
                  Инструкция по работе с личным кабинетом mybook
                </a>
              </p>
              <p>
                <a
                  href={`${process.env["PORTAL"]}/download_file.html?file_id=7199945199466723803`}
                  style={{ color: "#1757ae", fontSize: "14px" }}
                >
                 Инструкция по работе с личным кабинетом ЛитРес
                </a>
              </p>

              <div className={styles.root__title}>
                <h3>Список книг</h3>
              </div>

              <TableContentLib
                data={filterData}
                raitingId={filterItemId}
                user={user.entity}
              />
            </>
          )}
          {filterItemId === 2 && (
            <>
              {filterData.length ? (
                <>
                  <div className={styles.root__title}>
                    <h3>Список вебинаров</h3>
                  </div>
                  <VideoList videos={filterData as VideoListItemDTO[]} />
                </>
              ) : (
                <div className={styles.root__default_img}>
                  <img
                    src={
                      process.env["PUBLIC"] +
                      "/images/content/vebinar_default_pic.jpg"
                    }
                  />
                </div>
              )}
            </>
          )}
        </WithSkeleton>
      </div>
    </div>
  );
};

export default LibWidget;
