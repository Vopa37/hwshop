import * as Yup from "yup";

export const UserSchema = Yup.object().shape({
  firstname: Yup.string()
    .min(2, "Přílíš krátké!")
    .max(50, "Příliš dlouhé!")
    .required("Povinné"),
  lastname: Yup.string()
      .min(2, "Přílíš krátké!")
      .max(50, "Příliš dlouhé!")
      .required("Povinné"),
  username: Yup.string()
      .min(2, "Přílíš krátké!")
      .max(50, "Příliš dlouhé!")
      .required("Povinné"),
  email: Yup.string()
      .email("Neplatný email")
      .max(50, "Příliš dlouhé!")
      .required("Povinné"),
  password: Yup.string()
      .min(8, "Přílíš krátké!")
      .max(50, "Příliš dlouhé!")
      .required("Povinné"),
});

export const encode = (data) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};
