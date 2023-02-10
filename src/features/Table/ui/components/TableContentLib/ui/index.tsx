import {
  LibListItemDTO,
  RateListItemDTO,
  VideoListItemDTO,
} from "@shared/api/dto";
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
  data?: VideoListItemDTO[] | LibListItemDTO[];
  raitingId?: number;
  user: UserType;
}

const useSortableData = (
  items: LibListItemDTO[] | VideoListItemDTO[],
  config = null
) => {
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

const TableContentLib: React.FC<TableProps> = props => {
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
      <tbody className={styles.table__tbody}>
        {data &&
          (items as LibListItemDTO[]).map((item, i) => (
            <tr key={i} className={cn(styles.table__row)}>
              <td>
                <span>{item.title}</span>
              </td>
              <td>
                <p>{item.description}</p>
              </td>
              <td>
                <p>
                  <a href={`${item.link}`} target="_blank">
                    Читать
                  </a>
                </p>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default TableContentLib;
