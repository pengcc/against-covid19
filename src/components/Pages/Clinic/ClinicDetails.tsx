import * as React from "react";
import styles from '../../../styles/pages/clinic/index.module.scss';
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
import { copyStringToClipboard } from "../../../utils/stringHelper";
import { IntlShape, injectIntl } from "react-intl";
import { GAODE_SEARCH_PREFIX } from "../../../constants/globals";
import { isMobile, isTablet } from "../../../utils/deviceHelper";

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
        render: text => <span>{text}</span>
      },
      {
        title: Message('SUPPLY_STANDARD'),
        dataIndex: 'standard',
        key: 'standard',
        render: text => <span>{text}</span>
      },
      {
        title: Message('SUPPLY_AMOUNT'),
        dataIndex: 'amount',
        key: 'amount',
        className: styles.lastColumn,
        render: text => <span>{text}</span>
      },
    ]
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
    return `Published ${clinic?.isVerified ? 'and verified by volunteer' : ''}a few hours ago`;
  }
	render()
	{
    const {clinic} = this.props;
		return (
			<Layout style={{backgroundColor: '#fff', flex: '1 0 auto', minHeight: 'unset'}}>
				<Content>
					{clinic && <div className={styles.pageClinic}>
            {clinic.isVerified && 
              <Row>
                <Col lg={24}>
                  <div className={styles.title}>{Message('CLINIC_IS_VERIFIED')}</div>
                </Col>
              </Row>}
            <Row>
              <Col lg={24}>
                <div className={styles.clinicName}>{clinic.hospital.name}</div>
              </Col>
            </Row>
            <Row>
              <Col lg={24}>
                <div className={styles.location}>{clinic.hospital.address}</div>
              </Col>
            </Row>
            <Row>
              <Col lg={24}>
                <div className={styles.contact}>{clinic.delivery.contact}</div>
              </Col>
            </Row>
            <Row>
              <Col lg={24}>
              <div className={styles.publish}>{this.getPublishInfo()}</div>
              </Col>
            </Row>
            <Table columns={this.getTableColumns()} dataSource={clinic.supplyList} />
            <Divider />
            <Row>
              <Col lg={24}>
                <div className={styles.deliveryDetails}>
                  <div className={styles.deliverInstructions}>
                    {Message('DELIVERY_INSTRUCTIONS')}
                  </div>
                  {clinic.delivery.details.length > 0 ? 
                      <div className={styles.deliveryDetails}>
                        {clinic.delivery.details}
                      </div> :
                      (<>
                        <div className={styles.noInstruction}>
                          {Message('NO_DELIVERY_INSTRUCTION')}
                        </div>
                        <div className={styles.deliveryRecommendation}>
                          {Message('DELIVERY_RECOMMENDATION')}
                        </div>
                        </>)
                    }
                  </div>

              </Col>
            </Row>
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