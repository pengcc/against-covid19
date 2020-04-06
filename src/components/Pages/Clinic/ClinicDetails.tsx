import * as React from "react";
import styles from '../../../styles/pages/clinic/details.module.scss';
import Message from "../../Message";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { IApplicationState } from "../../../store";
import { withRouter, RouteComponentProps } from "react-router";
import { Layout, Row, Col, Divider, Table, message } from "antd";
import { ClinicsState } from "../../../store/Clinic";
import { actionCreators as clinicsActionCreators, Actions as ClinicsActions } from "../../../store/Clinic/actions";
import { AppState } from "../../../store/App";
import { IClinic } from "../../../types/interfaces";
import Button from "../../Elements/Button";
import { copyStringToClipboard, getCleanAmount } from "../../../utils/stringHelper";
import { IntlShape, injectIntl } from "react-intl";
import { GAODE_SEARCH_PREFIX } from "../../../constants/globals";
import { isMobile, isTablet } from "../../../utils/deviceHelper";
import { convertObjToArray } from "../../../utils/mapHelper";
import { IconVerified, 
  IconUser,
  IconEdit,
  IconLocation,
  IconPhone,
  IconDelivery
 } from '../../../components/Icons';

import { splitCamelCaseStr } from '../../../utils/stringHelper';

interface ConnectedProps {
  loading: boolean;
  app: AppState;
  clinicsState: ClinicsState;
  actions: ClinicsActions;
	intl: IntlShape;
}

interface Props extends RouteComponentProps {
  clinic?: IClinic;
}

const { Content } = Layout;
class ClinicDetails extends React.PureComponent<Props, {}>
{
  public props: ConnectedProps & Props;

  getTableColumns = (): any[] => {
    return [
      {
        title: Message('SUPPLY_ITEM'),
        dataIndex: 'type',
        key: 'type',
        className: styles.tHeaderType,
        render: text => <span className={styles.type}>{splitCamelCaseStr(text)}</span>
      },
      {
        title: Message('SUPPLY_STANDARD'),
        dataIndex: 'standard',
        key: 'standard',
        className: styles.tHeaderStandard,
        render: text => <span className={styles.standard}>{text}</span>
      },
      {
        title: Message('SUPPLY_AMOUNT'),
        dataIndex: 'amount',
        key: 'amount',
        className: styles.tHeaderAmount,
        render: text => <span className={styles.amount}>{getCleanAmount(text)}</span>
      },
    ]
  }

  getTableDataSource = (list: any[]): any[] => {
   return list.map((item, idx) => ({...item, key: idx}));
  } 

  onCopyAddress = (address: string) => {
    copyStringToClipboard(address);
    message.success(this.props.intl.formatMessage({ id: 'COPIED_TO_CLIPBOARD' }));
  }
  onViewMap = (address: string) => {
    window.open(`${GAODE_SEARCH_PREFIX}${address}`);
  }

  getPublishInfo = (): any => {
    const {clinic} = this.props;
    return `Published ${clinic?.isVerified ? 'and verified by volunteer ' : ''}a few hours ago`;
  }

  handleReportOnClick = (): any => {}

  handleShareOnClick = (): any => {}

  handleDonateOnClick = (): any => {}

  renderButtonRow = (): any => {
    const buttonList = [
      {name: 'report', handler: this.handleReportOnClick}, 
      {name: 'share', handler: this.handleShareOnClick}, 
      {name: 'donate', handler: this.handleDonateOnClick}
    ];
    return buttonList.map((item, index) => {
      const {name, handler} = item;
      return (
          <Button
            key={`btn_${index}`}
            onClick={handler}
            className={styles[name]}>
            {Message(`BUTTON_${name.toUpperCase()}`)}
          </Button>
      )
    });
  }
	render()
	{
    const {clinic} = this.props;
    const supplyArray = convertObjToArray({...clinic?.supplyList}).
                          filter((item) => item.amount && item.amount.trim().length > 0);
		return (
			<Layout style={{backgroundColor: '#fff', flex: '1 0 auto', minHeight: 'unset'}}>
				<Content>
					{clinic && <div className={styles.pageClinic}>
            {clinic.isVerified && 
                <Row>
                  <Col lg={24}>
                    <div className={styles.verification}><IconVerified /> {Message('CLINIC_IS_VERIFIED')}</div>
                  </Col>
                </Row>
            }
            <div className={styles.detailsWrapper}>
              <Row>
                <Col lg={24}>
                  <div className={styles.clinicName}>{clinic.hospital.name}</div>
                </Col>
              </Row>
              <Row>
                <Col lg={24}>
                  <div className={styles.location}><IconLocation /> {clinic.hospital.address}</div>
                </Col>
              </Row>
              <Row>
                <Col lg={24}>
                  <div className={styles.contact}><IconPhone /> {clinic.delivery.contact}</div>
                </Col>
              </Row>
              <Row>
                <Col lg={24}>
                <div className={styles.publishment}><IconEdit /> {this.getPublishInfo()}</div>
                </Col>
              </Row>
              
              <Table className={styles.supplyList} columns={this.getTableColumns()} dataSource={this.getTableDataSource(supplyArray)} />
              <Divider />
              <Row>
                <Col lg={24}>
                  <div className={styles.deliveryDetailsWrapper}>
                    <div className={styles.deliveryTitle}>
                      <IconDelivery /> {Message('DELIVERY_INSTRUCTIONS')}
                    </div>
                    <div className={styles.deliveryDetails}>
                      {clinic.delivery.details.length > 0 ? 
                          clinic.delivery.details
                         :
                        (<>
                          <div className={styles.noInstruction}>
                            {Message('NO_DELIVERY_INSTRUCTIONS')}
                          </div>
                          <div className={styles.deliveryRecommendation}>
                            {Message('DELIVERY_RECOMMENDATION')}
                          </div>
                          </>)
                      }
                    </div>
                  </div>
                </Col>
              </Row>
              <Row className={styles.buttonList}>
                  {false && this.renderButtonRow()}
              </Row>
            </div>
					</div>}
				</Content>
			</Layout>
		)
	}
}

const mapStateToProps = (state: IApplicationState) =>
{
	return {
		loading: state.app.loading,
		app: state.app,
		clinicsState: state.clinic,
	};
};

const mapActionsToProps = dispatch =>
{
	return {
		actions: bindActionCreators(
			{
        ...clinicsActionCreators,
			},
			dispatch
		),
	};
};

export default injectIntl(connect(
	mapStateToProps,
	mapActionsToProps
)(withRouter(ClinicDetails)) as any) as any;