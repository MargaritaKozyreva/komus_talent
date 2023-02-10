import React, { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";
import styles from "./styles.module.scss";
import cn from "classnames";

interface PersonCardProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  className?: string;
  userPicLink?: string;
  userFullname?: string;
  userPosition?: string;
  showAvatar?: boolean;
  onClick?: (event: any) => void;
}

const PersonCard: React.FC<PersonCardProps> = props => {
  const {
    className,
    userFullname,
    userPosition,
    userPicLink,
    onClick,
    showAvatar = false,
  } = props;
  return (
    <div className={cn(styles.root, className)}>
      <div className={cn(styles.root__wrapper, className)}>
        {showAvatar && (
          <div className={styles.userPicWrapper}>
            <div
              className={styles.userPic}
              style={{
                backgroundImage: `url(${process.env["PORTAL"]}${userPicLink})`,
              }}
            />
          </div>
        )}
        <div className={styles.userData}>
          <p className={styles.userData__fullname}>{userFullname}</p>
          <p className={styles.userData__position}>{userPosition}</p>
        </div>
      </div>
    </div>
  );
};

export default PersonCard;
