import React, { useEffect, useState } from "react";
import { ArticleCard, articleModel } from "@entities/Article";
import { AxiosResponse } from "axios";
import { ArticleType } from "@api/types";
import { useData } from "@shared/helpers/hooks/useData";
import { WithSkeleton } from "@ui/WithSkeleton";

import cn from "classnames";
import styles from "./styles.module.scss";
import { useDispatch } from "react-redux";
import { modalActions } from "@features/Modal/redux/ModalSlices";
import { ModalKey } from "@features/Modal/components/ModalController";
import { ProgramContext } from "@shared/api/dataContext";
import { useNavigate } from "react-router-dom";

const Articles = () => {
  const { data, isLoading, isError } = useData<ArticleType[]>(() =>
    articleModel.actions.getArticles()
  );

  const navigate = useNavigate();

  const setCustomStyle = idx => {
    switch (idx) {
      case 0:
        return {
          backgroundImage:
            "url('" + process.env["PUBLIC"] + "/images/vectors/vector1.svg')",
        };
      case 1:
        return {
          backgroundImage:
            'url("' + process.env["PUBLIC"] + '/images/vectors/vector2.svg")',
        };
      case 2:
        return {
          backgroundImage:
            'url("' + process.env["PUBLIC"] + '/images/vectors/vector2.svg")',
        };
      case 3:
        return {
          backgroundImage:
            'url("' + process.env["PUBLIC"] + '/images/vectors/vector4.svg")',
        };
      case 4:
        return {
          backgroundImage:
            'url("' +
            process.env["PUBLIC"] +
            '/images/vectors/vector9.svg"), url("' +
            process.env["PUBLIC"] +
            '/images/vectors/vector10.svg")',
        };
      case 5:
        return {
          backgroundImage:
            'url("' + process.env["PUBLIC"] + '/images/vectors/vector8.svg")',
        };
      case 6:
        return {
          backgroundImage:
            'url("' +
            process.env["PUBLIC"] +
            '/images/vectors/vector6.svg"), url("' +
            process.env["PUBLIC"] +
            '/images/vectors/vector7.svg")',
        };

      default:
        break;
    }

    return {
      backgroundImage:
        'url("' + process.env["PUBLIC"] + '/images/vectors/vector1.svg")',
    };
  };

  const setModal = (articleKey: string) => {
    switch (articleKey) {
      case "curators":
        return { ModalKey: ModalKey.CuratorsWidget, withBackground: false };
      case "contacts":
        return {
          ModalKey: ModalKey.NewsWidget,
          withBackground: true,
          payload: {
            onClick: () => ProgramContext.getContacts(),
          },
        };
      case "instructions":
        return {
          ModalKey: ModalKey.NewsWidget,
          withBackground: true,
          payload: {
            onClick: () => ProgramContext.getInstructions(),
          },
        };
      case "experts":
        return { ModalKey: ModalKey.ExpertsWidget, withBackground: false };
      case "roadmap":
        return { ModalKey: ModalKey.RoadmapWidget, withBackground: true };
      case "about_programm":
        return {
          ModalKey: ModalKey.NewsWidget,
          withBackground: true,
          payload: {
            onClick: () =>
              ProgramContext.getAboutProgram({ programCode: "about_program" }),
          },
        };
      default:
        return { ModalKey: ModalKey.Default, withBackground: true };
    }
  };

  const dispatch = useDispatch();

  const onClickHandler = (groupId: string, articleKey: string) => {
    console.log(articleKey);
    if (articleKey === "lib") {
      navigate("/komus_talents/lib");
    } else {
      dispatch(
        modalActions.showModal({
          key: setModal(articleKey).ModalKey,
          withBackground: setModal(articleKey).withBackground,
          payload: {
            ...setModal(articleKey).payload,
            groupId: groupId,
          },
        })
      );
    }
  };

  return (
    <WithSkeleton isLoading={isLoading} isEmpty={data === null}>
      <div className={cn(styles.root)}>
        {data &&
          data.map((item, i) => (
            <div className={cn(styles[`card-${i}`])} style={setCustomStyle(i)}>
              <ArticleCard
                key={item.articleId}
                hasImage
                onClick={() => onClickHandler("1", item.articleKey)}
              >
                <div className={cn(styles[`card-${i}_position`])}>
                  <h1>{item.title}</h1>
                  <section>{item.shortText}</section>
                </div>
              </ArticleCard>
            </div>
          ))}
      </div>
    </WithSkeleton>
  );
};

export { Articles };
