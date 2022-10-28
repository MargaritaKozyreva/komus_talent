import { RateListItemDTO } from "@shared/api/dto";
import Arrow from "@shared/ui/icons/Arrow";
import React, { DetailedHTMLProps, HTMLAttributes } from "react";
import cn from "classnames";
import styles from "./styles.module.scss";
import { useSelector } from "react-redux";
import { userModel } from "@src/entities/User";
import { UserType } from "@src/shared/api/types";

interface TableProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLTableElement>,
    HTMLTableElement
  > {
  className?: string;
  data?: RateListItemDTO[];
  raitingId?: number;
  user: UserType;
}

const useSortableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = React.useState<any>(config);

  const sortedItems = React.useMemo(() => {
    let sortableItems = (items && [...items]) || [];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        let first = a[sortConfig.key];
        let second = b[sortConfig.key];

        if (
          typeof a[sortConfig.key] === "object" &&
          sortConfig.param !== null
        ) {
          first = a[sortConfig.key][sortConfig.param];
          second = b[sortConfig.key][sortConfig.param];
        }
        if (first < second) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (first > second) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key: any, param: any = null) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction, param });
  };

  return { items: sortedItems, requestSort, sortConfig };
};

const TableContent: React.FC<TableProps> = props => {
  const { className, data, raitingId, user } = props;

  const { items, requestSort, sortConfig } = useSortableData(data);

  const getClassNamesFor = name => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  return (
    <table className={styles.table}>
      <thead className={styles.table__thead}>
        <tr>
          <th>
            <span onClick={() => requestSort("placeInRaiting")} style={{ fontSize: '16px'}}>
              Место в рейтинге
              <img
                src={`${process.env["PUBLIC"]}/images/icons/arrows.png`}
                onClick={() => requestSort("placeInRaiting")}
                className={cn(
                  styles.direction,
                  getClassNamesFor("placeInRaiting")
                )}
              />
            </span>
          </th>
          <th className={styles.table__thead__th__flex}>
            <div>
              <span onClick={() => requestSort("groupName")} style={{ fontSize: '16px'}}>
                Название группы
                {raitingId !== 2 && (
                  <img
                    src={`${process.env["PUBLIC"]}/images/icons/arrows.png`}
                    onClick={() => requestSort("groupName")}
                    className={cn(
                      styles.direction,
                      getClassNamesFor("groupName")
                    )}
                  />
                )}
              </span>
            </div>
            {raitingId !== 2 && (
              <div>
                <span onClick={() => requestSort("curator", "fullname")} style={{ fontSize: '16px'}}>
                  Куратор
                  <img
                    src={`${process.env["PUBLIC"]}/images/icons/arrows.png`}
                    onClick={() => requestSort("curator", "fullname")}
                    className={cn(
                      styles.direction,
                      getClassNamesFor("fullname")
                    )}
                  />
                </span>
              </div>
            )}
          </th>
          <th>
            <span onClick={() => requestSort("talentsCount")} style={{ fontSize: '16px'}}>
              Баллы
              <img
                src={`${process.env["PUBLIC"]}/images/icons/arrows.png`}
                onClick={() => requestSort("talentsCount")}
                className={cn(
                  styles.direction,
                  getClassNamesFor("talentsCount")
                )}
              />
            </span>
          </th>
        </tr>
      </thead>
      <tbody className={styles.table__tbody}>
        {data &&
          items.map((item, i) => (
            <tr
              key={i}
              className={cn(styles.table__row, {
                [styles.table__row__my]: item.curator.id === user.id,
              })}
            >
              <td className={styles.table__place_td}>
                <span className={styles.table__place_td__place_num}>
                  {item.placeInRaiting}
                </span>
              </td>
              <td>
                <p>{item.groupName}</p>
                <p>{item.curator.fullname}</p>
              </td>
              <td>
                <p>{item.talentsCount}</p>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default TableContent;
