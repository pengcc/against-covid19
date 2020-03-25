import * as React from "react";
import styles from "../../../styles/pages/clinic/list.module.scss";
import Message from "../../Message";
import { Row, Col, Layout } from "antd";
import { withRouter, RouteComponentProps } from "react-router";
import { IClinic } from "../../../types/interfaces";
import { IDataSource } from "../../../store/App";
import ClinicCard from "../../../components/Elements/Clinic/Card";
import Select from "../../../components/Elements/Select";
import Option from "../../../components/Elements/Select/Option";
import Drawer from "../../../components/Elements/Drawer";
import ClinicDetails from "./ClinicDetails";

import { AppState } from "../../../store/App";
import { IntlShape, injectIntl } from "react-intl";
import { isMobile } from "../../../utils/deviceHelper";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
	makeFilteredClinicsSelector,
	ClinicsState
  } from "../../../store/Clinic";
import {
  actionCreators as clinicsActionCreators,
  Actions as ClinicsActions
} from "../../../store/Clinic/actions";
import { IApplicationState } from "../../../store";

interface ConnectedProps {
  actions: ClinicsActions;
  app: AppState;
  clinicsState: ClinicsState;
  loading: boolean;
  demandsList: IClinic[];
  demandData: IDataSource;
  intl: IntlShape;
}

interface Props extends RouteComponentProps {}

interface State {
  selectedClinic?: IClinic;
}

const { Content } = Layout;
class ClinicList extends React.PureComponent<Props, State> {
	public props: ConnectedProps & Props;

	state: State = {}
	fetchDemandsData = () => {
		if (!this.props.clinicsState.demandsList || this.props.clinicsState.demandsList.length === 0) {
			this.props.app.dataSource && this.props.actions.fetchClinicList(this.props.app.dataSource['demandData']);
		}
	}
	componentDidMount() {
		this.fetchDemandsData();
	}
	handleCityChange = (val) => {}
	handleSupplyTypeChange = (val) => {};
	handleRequestTypeChange = (val) => {};
	renderSelect = (styleId='', data=[''], prefix='', defaultText='', handler=(x) => {}) => {
		return (
			<Select
				className={styles[styleId]}
				defaultValue='0'
				onChange={handler}>
				<Option key='0' value='0'>{defaultText}</Option>
				{data.map((item, index) => {
					let key = index + 1;
					return ( <Option key={`${prefix}${key}`} value={item}>{item}</Option>);
				})}
			</Select>
		);
	};

	onViewDetailClick = (clinic: IClinic) => {
		this.setState({selectedClinic: clinic});
	}
	onDrawerClose = () => {
		this.setState({selectedClinic: undefined});
	}
	render() {
		const { demandsList, cities, supplyTypes, requestTypes } = this.props.app.dataSource && this.props.app.dataSource.demandData ;
		
		return (
			<Layout style={{backgroundColor: '#fff', flex: '1 0 auto', minHeight: 'unset'}}>
				<Content>
					<div className={styles.pageClinicList}>
						<div>filter by</div>
						<section className={styles.filters}>
							<Row type='flex' justify='center'
								gutter={[{ xs: 11, sm: 11, md: 20, lg: 20 }, { xs: 13, sm: 13, md: 20, lg: 20 }]}>
								<Col lg={3} md={3} sm={12} xs={12}>
									{this.renderSelect('cityFilter', cities, 'city_', 'Select city', this.handleCityChange)}
								</Col>
								<Col lg={3} md={3} sm={12} xs={12}>
									{this.renderSelect('supplyType', supplyTypes, 'supply_type_', 
										'Select supply type', this.handleSupplyTypeChange)}
								</Col>
								<Col lg={6} md={12} sm={24} xs={24}>
									{this.renderSelect('requestType', requestTypes, 'request_type_', 
										'Select supply type', this.handleRequestTypeChange)}
								</Col>
							</Row>
						</section>
						<section className={styles.listWrapper}>
							<Row type='flex' style={{width: '100%'}} justify='space-between' gutter={isMobile ? [0, 20] : [20, 20]}>
								{demandsList.map((clinic, index) => {
									return (
										<Col style={{maxWidth: '100%'}} key={`clinic_${index}`} lg={8} md={12} sm={24} xs={24}>
											<ClinicCard onViewDetailClick={this.onViewDetailClick} cardData={clinic} />
										</Col>
									);
								})}
							</Row>
						</section>
					</div>
					<Drawer
						title={Message('CLINIC_PAGE_TITLE')}
						placement="right"
						closable={true}
						onClose={this.onDrawerClose}
						visible={!!this.state.selectedClinic}>
							<ClinicDetails clinic={this.state.selectedClinic} />
					</Drawer>
				</Content>
			</Layout>
		)
	}
}

const mapStateToProps = (state: IApplicationState) => {
  const filteredClinicsSelector = makeFilteredClinicsSelector();
  return {
    app: state.app,
    loading: state.app.loading,
    clinicsState: state.clinic,
    clinicList: filteredClinicsSelector(state)
  };
};

const mapActionsToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        ...clinicsActionCreators
      },
      dispatch
    )
  };
};

export default injectIntl(
  connect(mapStateToProps, mapActionsToProps)(withRouter(ClinicList)) as any
) as any;

/* Add this button back when needed
<Button shape='round' type='primary' onClick={() => this.onNewClick}>{Message('NEW_DEMAND')}</Button>
*/
