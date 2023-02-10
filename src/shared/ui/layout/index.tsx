import React, {
  DetailedHTMLProps,
  HTMLAttributes,
  ReactNode,
  useEffect,
} from "react";
import { Header } from "./header";
import { Footer } from "./footer";
import { NewsSection } from "@entities/NewsSection/ui";
import { userModel } from "@entities/User";
import { useDispatch } from "react-redux";

import cn from "classnames";
import styles from "./styles.module.scss";
import { useLocation } from "react-router";

export interface LayoutProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

const Layout: React.FC<LayoutProps> = props => {
  const { children, className, ...attr } = props;
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(userModel.actions.getCurrentUser());
  }, [dispatch]);

  return (
    <div>
      <Header />
      <div className={cn(styles.root, className)}>
        {location.pathname === "/komus_talents" && <NewsSection />}
        {children}
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export const withLayout = <T extends Record<string, unknown>>(
  Component: React.FC<T>
) => {
  return function withLayoutComponent(props: T): JSX.Element {
    return (
      <Layout>
        <Component {...props} />
      </Layout>
    );
  };
};
