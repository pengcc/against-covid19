import React, {useState} from "react";
import { useHistory, useLocation } from 'react-router-dom';
import styles from '../../../styles/elements/nav/index.module.scss';
import { IconLogoOrange } from "../../../components/Icons";
import Message from "../../../components/Message";
import { RouteComponentProps, withRouter } from "react-router";
import { URLS } from "../../../constants/urls";
import Button from "../Button";

import MenuItem from "../Menu/Item";
import Menu from "../Menu";
import { Icon, Dropdown } from "antd";

interface Props extends RouteComponentProps<{}, {}> {

}

const itemsArray: any[] = ['home', 'request', 'supplier', 'about'];
const menuItems: any[] = itemsArray.map(item => {
  let itemKey = item.toUpperCase();
  return { 
    name: Message(itemKey),
    link: URLS[itemKey]
  };
});

const Nav: React.FC<Props> = (props) => {
  let [collapsed, setCollapsed] = useState(true);
  
  const history = useHistory();
  const location = useLocation();

  const mobileMenu = (
    <Menu
      onClick={(e) => history.push(e.key)}>
      {menuItems.map((item) => {
        return <MenuItem key={item.link}>{item.name}</MenuItem>;
      })}
    </Menu>
  );

  return (
    <div className={`${styles.elementsNav} ${styles.transparent}`}>
      <div className={styles.logo}>
        <IconLogoOrange />
      </div>
      <div className={`${styles.globalTitle}`}>
        <span className={`${styles.title}`}>{Message('GLOBAL_TITLE')}</span>
      </div>
      <div className={styles.right}>
          <Menu
            selectedKeys={[location.pathname]}
            onClick={(e) => history.push(e.key)} mode='horizontal'>
            {menuItems.map((item) => {
              return <MenuItem key={item.link}>{item.name}</MenuItem>;
            })}
          </Menu>
        </div>
        <div className={styles.mobileMenu}>
          <Dropdown overlay={mobileMenu} trigger={['click']}>
            <Button
              icon='menu'
              type='ghost'
              onClick={(collapsed) => setCollapsed(!collapsed)}>
            </Button>
          </Dropdown>
        </div>
    </div>
  );
};

export default withRouter(Nav);
