import * as React from "react";
import styles from '../../../styles/elements/clinic/card.module.scss';
import Card from "../Card";
import { IClinic } from "../../../types/interfaces";
import { Row, Col } from "antd";
import UrgentIndicator from "../UrgentIndicator";
import Button from "../Button";
import Message from "../../../components/Message";
import { History } from "history";
import { getClinicUrl } from "../../../constants/urls";

interface ClinicCardProps {
  cardData: IClinic;
  onViewDetailClick: (clinic: IClinic) => void;
}

export default class ClinicCard extends React.PureComponent<ClinicCardProps, {}> {
  onViewDetailClick = () => {
    this.props.onViewDetailClick && this.props.onViewDetailClick(this.props.cardData);
  }

  renderMoreSupplies = (length) => {
    return (
      length > 3 && 
      <div className={styles.otherSupplies}>+{length - 3 }{Message('OTHER_SUPPLIES')}</div>
    )
  }

  getPublishedHours = (timestamp: string) => {return 'a few';};

	render(){
    const {
      cardData: { 
        timestamp,
        isVerified,
        hospital,
        supplyList
      }
    } = this.props;

    const supplyListLength = supplyList.length;

    return (
      <Card className={styles.elementsClinicCard} bodyStyle={{padding: '20px'}}>
        <div className={styles.contentWrapper}>
          {isVerified && <div className={styles.verificationBadge}>checked</div>}
          <div className={styles.basicInfo}>
            <div className={styles.name}>{hospital.name}</div>
            <div className={styles.location}>
              <div>{hospital.city}, {hospital.state}</div>
            </div>
            <div className={styles.timestamp}>
              <div>published {this.getPublishedHours(timestamp)} hour(s) ago</div>
            </div>
          </div>
          <div className={styles.supplyList}>
            {supplyListLength > 0 && [...supplyList].slice(0, 3).map((supply, index) => {
                return (
                  <Row key={`supply_${index}`} type='flex' justify='space-between' style={{marginBottom: '20px', alignItems: 'center'}}>
                    <div className={styles.supplyType}>{supply.type}</div>
                    <div className={styles.supplyAmount}>{supply.amount}</div>
                  </Row>
                )
            })}
            {this.renderMoreSupplies(supplyListLength)}
          </div>
          <Button
            onClick={this.onViewDetailClick}
            style={{alignSelf: 'center', width: '89px', height: '28px', fontSize: '12px', marginTop: '26px', marginBottom: '6px'}}
            type='ghost'
            shape='round'>
              {Message('VIEW_DETAIL')}
            </Button>
        </div>
      </Card>
    );
	}
}