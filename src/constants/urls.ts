export const ROOT = "";

export const URLS = {
  HOME: ROOT + "/",

  CLINICS: ROOT + "/hospitals",
  CLINIC: ROOT + "/hospital/:cityName/:clinicId",

};

export const getClinicUrl = (cityName: string, id: number) => {
  return `${ROOT}/hospital/${cityName}/${id}`;
};
