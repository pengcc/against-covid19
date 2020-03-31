
export interface IContact {
  name?: string;
  tel?: string;
}

export interface SupplyList {
  type: string;
  amount: string;
  standard: string;
}

export interface Hospital {
  name: string;
  city: string;
  state: string;
  address: string;
}

export interface Delivery {
  contact: string;
  details: string;
} 

export interface IClinic {
  id: number;
  timestamp: string;
  isVerified: string;
	isFulfilled: boolean;
  hospital: Hospital;
  delivery: Delivery;
  requestType: string;
  supplyList: SupplyList[];
}

export interface IDemandsData {
  demandsList: IClinic[];
  cities: string[];
  requestTypes: string[];
  supplyTypes: string[];
}