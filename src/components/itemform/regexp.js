import * as Yup from "yup";

export const ProductSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Přílíš krátké!")
    .max(50, "Příliš dlouhé!")
    .required("Povinné"),
  description: Yup.string()
    .min(2, "Přílíš krátké!")
    .max(500, "Příliš dlouhé!")
    .required("Povinné"),
  price: Yup.number()
    .required("Povinné"),
  image: Yup.string()
    .required("Povinné"),
});

export const encode = (data) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};
