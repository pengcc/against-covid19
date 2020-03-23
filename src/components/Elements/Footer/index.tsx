import * as React from 'react';
import styles from '../../../styles/elements/footer/index.module.scss';
import Message from '../../../components/Message';
import { URLS } from '../../../constants/urls';
import { Row, Col } from 'antd';
// import Button from '../Button';
import { withRouter, RouteComponentProps } from 'react-router';
import { IconMainIconWhite } from '../../../components/Icons';

interface Props extends RouteComponentProps {}
class Footer extends React.PureComponent<Props, {}> {
  render() {
    const items: any[] = [
      {
        name: Message('CLINIC'),
        link: URLS.CLINICS,
      },
    ];
    return (
      <div className={styles.elementsFooter}>
        <Row type="flex" justify="space-between" style={{ width: '100%' }}>
          <IconMainIconWhite width={100} height={100} />
          <div className={styles.siteMap}>
            <Row className={styles.siteMapItemWrapper} type="flex">
              {items.map((item, index) => {
                return (
                  <span
                    style={{ flex: '0 0 auto', color: '#ffffff', cursor: 'pointer', margin: 10 }}
                    key={`footer_item_${index}`}
                    className="grey"
                    onClick={() => void this.props.history.push(item.link)}
                  >
                    {item.name}
                  </span>
                );
              })}
            </Row>
          </div>
          <div></div>
        </Row>
      </div>
    );
  }
}

export default withRouter(Footer);
