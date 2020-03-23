import * as React from "react";
import styles from "../../../styles/pages/clinic/list.module.scss";
import Message from "../../Message";
import { Row, Col, Layout } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  actionCreators as clinicsActionCreators,
  Actions as ClinicsActions
} from "../../../store/Clinic/actions";
import { IApplicationState } from "../../../store";
import { withRouter, RouteComponentProps } from "react-router";
import { IClinic } from "../../../types/interfaces";
import ClinicCard from "../../../components/Elements/Clinic/Card";
import Select from "../../../components/Elements/Select";
import Option from "../../../components/Elements/Select/Option";
import {
  makeFilteredClinicsSelector,
  ClinicsState
} from "../../../store/Clinic";
import { AppState } from "../../../store/App";
import { Search } from "../../Elements/Input";
import { IntlShape, injectIntl } from "react-intl";
import Drawer from "../../../components/Elements/Drawer";
import Clinic from ".";
import { isMobile } from "../../../utils/deviceHelper";

interface ConnectedProps {
  actions: ClinicsActions;
  app: AppState;
  clinicsState: ClinicsState;
  loading: boolean;
  clinicList: IClinic[];
  intl: IntlShape;
}

interface Props extends RouteComponentProps {}

interface State {
  selectedClinic?: IClinic;
}

const { Content } = Layout;
class ClinicList extends React.PureComponent<Props, State>
{
	public props: ConnectedProps & Props;

	state: State = {
	}

	provinces: {key: number, name: string}[] = [
		{key: -1, name: '省市'},
	];

	componentWillMount() {
		// @todo - should allow refreshing??
    if (!this.props.clinicsState.list || this.props.clinicsState.list.length === 0) {
			this.props.app.dataSource && this.props.actions.fetchClinicList(this.props.app.dataSource['hospital']);
		}
	}

	onNewClick = () => {

	}

	onCityFilterChange = (value) => {
		this.props.actions.updateCity(value);
	}

	onClinicSearch = (searchText) => {
		this.props.actions.searchClinic(searchText);
	};
	onViewDetailClick = (clinic: IClinic) => {
		this.setState({selectedClinic: clinic});
	}
	onDrawerClose = () => {
		this.setState({selectedClinic: undefined});
	}
	handleCityChange = (val) => {}
	handleSupplyTypeChange = (val) => {};
	handleRequestTypeChange = (val) => {};
	renderSelect = (styleId='', data=[{key: '', option: ''}], prefix='', defaultText='', handler=(x) => {}) => {
		return (
			<Select
				className={styles[styleId]}
				defaultValue='0'
				onChange={handler}>
				<Option key='0' value='0'>{defaultText}</Option>
				{data.map((d, index) => {
					let {key = '', option = ''} = d;
					return (
						<Option key={`${prefix}${index}`} value={key}>{option}</Option>
					);
				})}
			</Select>
		);
	};
	render() {
		const {clinicsState} = this.props;
		const mockData = {
			clinicList: [],
			cities: [],
			supplyTypes: [],
			requestTypes: []
		};

		const { clinicList, cities, supplyTypes, requestTypes } = mockData;

		
		return (
			<Layout style={{backgroundColor: '#fff', flex: '1 0 auto', minHeight: 'unset'}}>
				<Content>
					<div className={styles.pageClinicList}>
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
								{clinicList.map((clinic, index) => {
									return (
										<Col style={{maxWidth: '100%'}} key={`clinic_${index}`} lg={8} md={12} sm={24} xs={24}>
											<ClinicCard onViewDetailClick={this.onViewDetailClick} clinic={clinic} />
										</Col>
									);
								})}
							</Row>
						</section>
					</div>
					<Drawer
						title={Message('HOSPITAL_SUPPLY_DETAIL')}
						placement="right"
						closable={true}
						onClose={this.onDrawerClose}
						visible={!!this.state.selectedClinic}>
							<Clinic clinic={this.state.selectedClinic} />
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
