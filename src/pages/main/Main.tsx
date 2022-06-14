import React from "react";
import { withLayout } from "@ui/layout";
import { UserWidgets } from "@widgets/UserWidgets/ui";
import { Articles } from "../../widgets/Articles/ui/Articles";
import { ReviewSection } from "@shared/ui/layout/review";

import cn from "classnames";
import styles from "./styles.module.scss";

const Main: React.FC<any> = () => {
  return (
    <div>
      <div className={cn(styles.userWidgetWrapper)}>
        <UserWidgets />
      </div>
      
      <Articles />
      <div className={cn(styles.reviewWrapper)}>
        <ReviewSection
          text="Помогите нам стать лучше"
          buttonText="Оставить отзыв"
          onClick={() => {}}
        />
      </div>
    </div>
  );
};

export default withLayout(Main);
