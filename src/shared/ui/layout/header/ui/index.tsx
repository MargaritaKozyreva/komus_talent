import React, { DetailedHTMLProps, HTMLAttributes, useEffect } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";

import styles from "./styles.module.scss";
import { UserType } from "@shared/api/types";
import { useDispatch, useSelector } from "react-redux";
import { userModel } from "@entities/User";
import { WithSkeleton } from "@shared/ui/WithSkeleton";

interface HeaderProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  className?: string;
}

const Header: React.FC<HeaderProps> = props => {
  const { className, style } = props;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userModel.actions.getUserById(null));
  }, [dispatch]);

  const userState = useSelector(
    (state: { user: userModel.slices.UserState }) => state.user
  );

  return (
    <div
      className={cn(styles.root, className)}
      style={{
        backgroundImage:
          'url("' + process.env["PUBLIC"] + '/images/main_header.png")',
      }}
    >
      <div className={styles.mainMenu__wrapper}>
        <div>
          <div className={styles.mainMenu__logo}>
            <Link to="/komus_talents">
              <img
                src={`${process.env["PUBLIC"]}/images/MainLogo.png`}
                alt="logo"
                title="logo"
              />
            </Link>
          </div>
          <div className={styles.mainMenu__item}>
            <img src={`${process.env["PUBLIC"]}/images/bird.svg`} alt="" />
          </div>
        </div>
        <div className={styles.mainMenu__userbar}>
          <div className={styles.mainMenu__userContainer}>
            <WithSkeleton
              isLoading={userState.isLoading}
              isEmpty={userState.entity === null}
            >
              {userState.entity && (
                <a href="/_wt/cabinet" className={styles.mainMenu__userLink}>
                  <div className={styles.mainMenu__userQuest}>
                    Личный кабинет
                  </div>
                  <div
                    className={styles.user_photo}
                    style={{
                      backgroundImage: `url(${process.env["PORTAL"]}${userState.entity.photo})`,
                    }}
                  />
                  <div className={styles.mainMenu__userName}>
                    {userState.entity.fullname}
                  </div>
                </a>
              )}{" "}
            </WithSkeleton>
          </div>
          <div className={styles.mainMenu_bird}>
            <img
              src={`${process.env["PUBLIC"]}/images/icons/logo.png`}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
