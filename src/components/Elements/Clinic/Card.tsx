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
import { convertObjToArray } from "../../../utils/mapHelper";
import { getCleanAmount } from "../../../utils/stringHelper";

import { IconVerified, 
        IconUser,
        IconEdit,
        IconLocation
       } from '../../../components/Icons';

interface ClinicCardProps {
  cardData: IClinic;
  onViewDetailClick: (clinic: IClinic) => void;
}

import { splitCamelCaseStr } from '../../../utils/stringHelper';

export default class ClinicCard extends React.PureComponent<ClinicCardProps, {}> {
  onViewDetailClick = () => {
    this.props.onViewDetailClick && this.props.onViewDetailClick(this.props.cardData);
  }

  renderMoreSupplies = (length) => {
    return (
      length > 3 && 
      <div className={`${styles.otherSupplies} ${styles.supplyRow}`}>+{length - 3 } {Message('OTHER_SUPPLIES')}</div>
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

    const supplyArray = convertObjToArray({...supplyList});
    const supplyArrayLength = supplyArray.length;

    return (
      <Card className={styles.elementsClinicCard} bodyStyle={{padding: '20px'}}>
        <div className={styles.contentWrapper}>
          <div className={styles.verificationBadge}>
          {isVerified === 'Yes' ?
            <IconVerified /> :
            <IconUser />
          }
          </div>
          <div className={styles.basicInfo}>
            <div className={styles.name}>{hospital.name}</div>
            <div className={styles.location}>
              <IconLocation /> {hospital.city}, {hospital.state}
            </div>
            <div className={styles.timestamp}>
              <IconEdit />published {this.getPublishedHours(timestamp)} hour(s) ago
            </div>
          </div>
          <div className={styles.supplyList}>
            {supplyArrayLength > 0 && [...supplyArray].slice(0, 3).map((supply, index) => {
                return (
                  <Row className={styles.supplyRow} key={`supply_${index}`} type='flex' justify='space-between'>
                    <div className={styles.supplyType}>{splitCamelCaseStr(supply.type)}</div>
                    <div className={styles.supplyAmount}>{getCleanAmount(supply.amount)}</div>
                  </Row>
                )
            })}
            {this.renderMoreSupplies(supplyArrayLength)}
          </div>
          <Button
            onClick={this.onViewDetailClick}
            style={{alignSelf: 'center', width: '140px'}}
            >
              {Message('VIEW_DETAIL')}
            </Button>
        </div>
      </Card>
    );
	}
}