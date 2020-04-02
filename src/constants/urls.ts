export const ROOT = "";

export const URLS = {
  HOME: ROOT + "/",
  CLINICS: ROOT + "/hospitals",
  CLINIC: ROOT + "/hospital/:cityName/:clinicId",
  REQUEST: ROOT + "/request",
  SUPPLIER: ROOT + "/supplier",
  ABOUT: ROOT + "/about"
};

export const getClinicUrl = (cityName: string, id: number) => {
  return `${ROOT}/hospital/${cityName}/${id}`;
};
