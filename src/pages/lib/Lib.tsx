import { WithSkeleton } from "../../../src/shared/ui/WithSkeleton";
import TableRate from "../../../src/widgets/TableRate/ui/TableRate";
import cn from "classnames";
import React from "react";
import styles from "./Lib.module.scss";
import { withLayout } from "@ui/layout";
import LibWidget from '../../widgets/Lib/LibWidget';

const Lib = () => {
  return (
    <WithSkeleton isLoading={false} isEmpty={false}>
      <div className={cn(styles.root)}>
        <LibWidget />
      </div>
    </WithSkeleton>
  );
};

export default withLayout(Lib);
