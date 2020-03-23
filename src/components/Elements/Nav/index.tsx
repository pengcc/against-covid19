import * as React from "react";
import styles from '../../../styles/elements/nav/index.module.scss';
import { IconLogo, IconLogoOrange } from "../../../components/Icons";
import Message from "../../../components/Message";
import { RouteComponentProps, withRouter } from "react-router";
import { URLS } from "../../../constants/urls";

interface Props extends RouteComponentProps<{}, {}> {

}

interface State {
  collapsed: boolean;
}

class Nav extends React.PureComponent<Props, State>
{
  state: State = {
    collapsed: false,
  };

  handleMenuClick = (e) => {
    this.props.history.push(e.key);
  }
  

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  renderGlobalNav = () => {
    return (
      <div className={`${styles.elementsNav} ${styles.transparent}`}>
        <div onClick={() => this.props.history.push(URLS.CLINICS)} className={styles.left}>
          <IconLogoOrange />
        </div>
        <div className={`${styles.globalTitle}`}>
          <span className={`${styles.title}`}>{Message('GLOBAL_TITLE')}</span>‚
          <span className={`${styles.text}`}>{Message('GLOBAL_TITLE_TEXT')}</span>
        </div>
      </div>
    );
  }

	render() {
    return this.renderGlobalNav();
	};
}

export default withRouter(Nav);
