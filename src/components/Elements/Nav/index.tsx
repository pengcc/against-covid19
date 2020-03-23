import * as React from "react";
import styles from '../../../styles/elements/nav/index.module.scss';
import { IconLogoOrange } from "../../../components/Icons";
import Message from "../../../components/Message";
import { RouteComponentProps, withRouter } from "react-router";
import { URLS } from "../../../constants/urls";

interface Props extends RouteComponentProps<{}, {}> {

}

const Nav: React.FC<Props> = () => {
  
  return (
    <div className={`${styles.elementsNav} ${styles.transparent}`}>
      <div className={styles.logo}>
        <IconLogoOrange />
      </div>
      <div className={`${styles.globalTitle}`}>
        <span className={`${styles.title}`}>{Message('GLOBAL_TITLE')}</span>
        <span className={`${styles.text}`}>{Message('GLOBAL_TITLE_TEXT')}</span>
      </div>
    </div>
  );
};

export default withRouter(Nav);
