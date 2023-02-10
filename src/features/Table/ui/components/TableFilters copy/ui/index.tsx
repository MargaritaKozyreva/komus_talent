import React, {
  DetailedHTMLProps,
  HTMLAttributes,
  MouseEventHandler,
} from "react";

import cn from "classnames";
import styles from "./styles.module.scss";
import { IFilterItems } from "@widgets/TableRate/ui/TableRate";

interface ITableFiltersBody
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLTableElement>,
    HTMLTableElement
  > {
  className?: string;
  filterItems?: Array<IFilterItems>;
  currentFilterItemId?: number;
  changeFilterItem?: (event: any) => void;
}

const TableLibFilters: React.FC<ITableFiltersBody> = props => {
  const { className, filterItems, currentFilterItemId, changeFilterItem } =
    props;

  return (
    <div className={styles.root}>
      {filterItems.map(filterItem => {
        return (
          <button
            className={
              currentFilterItemId === filterItem.id
                ? styles.root__btn_active
                : styles.root__btn
            }
            type="button"
            key={filterItem.id}
            onClick={changeFilterItem}
            id={String(filterItem.id)}
          >
            {filterItem.title}
          </button>
        );
      })}
    </div>
  );
};

export default TableLibFilters;
