import * as Yup from "yup";
import "yup-phone";

const phoneRegex = RegExp(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/);
//.matches(/^[A-Za-z ]*$/, 'Please enter valid name') // name validation

const validation = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  photo: Yup.string().url().required("URL is required"),
  // mobile: Yup.number().required("Mobile Number is required"),
//   mobile : Yup.string().phone("IN").required(),
mobile: Yup.string()
.required("Mobile is required")
.matches(/^[0-9]{12}$/, "Invalid mobile number"),
// mobile: Yup.string()
// .required("Mobile is required")
// .matches(/^\+[0-9]{1,3}[0-9]{10}$/, "Invalid mobile number"),
// mobile: Yup.string().test('phone', 'Invalid phone number==', (value) => {
//   return /^\+\d{1,3}\s?\d{6,14}$/.test(value);
// }).required('Mobile is required==='),
  email: Yup.string().email("Invalid email").required("Email is required"),
  company: Yup.string().required("Company Name is required"),
  title: Yup.string().required("Title is required"),
  groupId: Yup.string().required("Select is required"),
});
export default validation;
