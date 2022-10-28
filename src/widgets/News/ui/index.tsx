import React, { DetailedHTMLProps, HTMLAttributes } from "react";
import { useData } from "@shared/helpers/hooks/useData";
import { WithSkeleton } from "@ui/WithSkeleton";

import cn from "classnames";
import styles from "./styles.module.scss";
import { INews } from "@shared/api/interfaces";
import { AxiosResponse } from "axios";

interface NewsWidgetProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  className?: string;
  onClick?: <T>() => Promise<AxiosResponse<T>>;
}

const NewsWidget: React.FC<NewsWidgetProps> = props => {
  const { onClick } = props;
  const { data, isLoading, isError } = useData<INews[]>(onClick);

  return (
    <WithSkeleton isLoading={isLoading} isEmpty={data === null}>
      <div className={cn(styles.root)}>
        {data &&
          data.map(programItem => {
            return (
              <>
                <h1>{programItem.header}</h1>
                {programItem.video_arr && (
                  <div className={styles.videoBox}>
                    {programItem.video_arr.map(programVideoItem => (
                      <video
                        src={programVideoItem.source}
                        poster={programVideoItem.poster}
                        style={{ margin: '0 auto', display: 'block' }}
                        controls
                      />
                    ))}
                  </div>
                )}
                <main>
                  <div
                    dangerouslySetInnerHTML={{ __html: programItem.main_text }}
                  />
                </main>
              </>
            );
          })}
      </div>
    </WithSkeleton>
  );
};

export default NewsWidget;
