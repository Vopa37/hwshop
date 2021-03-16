import * as Yup from "yup";

export const UserSchema = Yup.object().shape({
  username: Yup.string()
      .required("Povinné"),
  password: Yup.string()
      .required("Povinné"),
});

export const encode = (data) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};
