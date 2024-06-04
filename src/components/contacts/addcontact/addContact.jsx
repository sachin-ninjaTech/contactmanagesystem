import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getDataFromServer } from "../../../services/contactservices";
import Spinner from "../../spinner/spinner";
import { useFormik } from "formik";
import validation from "../../../validationSchema/validation";
// import PhoneInput from "react-phone-number-input";
// import "react-phone-number-input";
import "react-phone-input-2";
import PhoneInput from "react-phone-input-2";
// import PhoneInput from "react-phone-number-input";

const AddContact = () => {
  let navigate = useNavigate();
  const [state, setState] = useState({
    loading: false,
    contacts: {
      name: "",
      photo: "",
      company: "",
      email: "",
      title: "",
      mobile: "",
      groupId: "",
    },
    groups: [],
    errorMessage: "",
  });

  const formik = useFormik({
    // ahiya dedtructure nahi direct use karyu she formik kari ne darek jagya a.
    initialValues: {
      name: "",
      photo: "",
      company: "",
      email: "",
      title: "",
      mobile: "",
      groupId: "",
    },
    validationSchema: validation,
    onSubmit: (values) => {
      handleSubmit(values); // Call your existing handleSubmit function with the form values.
      console.log("values", values);
    },
  });

  // const inputUpadate = (event) => {
  //   setState({
  //     ...state,
  //     contacts: {
  //       ...state.contacts,
  //       [event.target.name]: event.target.value,
  //     },
  //   });
  // };

  useEffect(() => {
    GroupsData();
  }, []);
  const GroupsData = async () => {
    try {
      {
        setState({ ...state, loading: true });
      }
      let groupsAll = await getDataFromServer.wholeGroups();
      console.log("groupsId", groupsAll.data);
      setState({
        ...state,
        loading: false,
        groups: groupsAll.data,
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleSubmit = async (values) => {
    try {
      let createResponse = await getDataFromServer.createContact(values);
      console.log("createResponse", createResponse);
      if (createResponse) {
        navigate("/contact/list", { replace: true });
      }
    } catch (error) {
      setState({ ...state, errorMessage: errorMessage });
      navigate("/contact/add", { replace: false });
    }
  };
  let { loading, errorMessage, contacts, groups } = state;
  console.log("contacts", contacts);

  const { errors, touched } = formik; //destructure the object in formik.

  const mystyle = {
    fontFamily: "Shift, sans-serif",
    fontSize: "18px",
    fontWeight: "bold",
    color: "red",
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <section className="contact-add p-2">
            <div className="container">
              <div className="row">
                <div className="col">
                  <p className="h4 text-success fw-bold">Create-Contact</p>
                  <p className="fst-italic">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Debitis magni quisquam nobis maxime, id cum vero numquam
                    rerum ab sit voluptate expedita voluptatum repudiandae aut
                    necessitatibus asperiores corporis veritatis recusandae.
                  </p>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <form>
                      {/* //onSubmit={handleSubmit} */}
                      <div className="mb-2">
                        <input
                          required
                          name="name"
                          value={formik.values.name}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          type="text"
                          className="form-control"
                          placeholder="Name"
                        />
                        {touched.name && errors.name ? (
                          <div style={mystyle}>{errors.name}</div>
                        ) : null}
                      </div>
                      {/* <p>{errors.name}</p> */}

                      <div className="mb-2">
                        <input
                          required
                          name="photo"
                          value={formik.values.photo}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          type="text"
                          className="form-control"
                          placeholder="Photo"
                        />
                        {touched.photo && errors.photo ? (
                          <div style={mystyle}>{errors.photo}</div>
                        ) : null}
                      </div>
                      {/* <p>{errors.photo}</p> */}

                      {/* <div className="mb-2">
                        <input
                          required
                          name="mobile"
                          value={formik.values.mobile}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          type="number"
                          className="form-control"
                          placeholder="Mobile"
                        />
                      </div> */}
                      {console.log("formik.values", formik.values)}
                      <div className="mb-2">
                        <PhoneInput
                          required
                          name="mobile"
                          value={formik.values.mobile}
                          onChange={(e) => formik.setFieldValue("mobile", e)}
                          onBlur={formik.handleBlur}
                          type="text"
                          className="form-control"
                          placeholder="Mobile"
                        />
                        {touched.mobile && errors.mobile ? (
                          <div style={mystyle}>{errors.mobile}</div>
                        ) : null}
                      </div>

                      {/* <p>{errors.mobile}</p> */}

                      <div className="mb-2">
                        <input
                          required
                          name="email"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          type="email"
                          className="form-control"
                          placeholder="Email"
                        />
                        {touched.email && errors.email ? (
                          <div style={mystyle}>{errors.email}</div>
                        ) : null}
                      </div>
                      {/* <p>{errors.email}</p> */}

                      <div className="mb-2">
                        <input
                          required
                          name="company"
                          value={formik.values.company}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          type="company"
                          className="form-control"
                          placeholder="company"
                        />
                        {touched.company && errors.company ? (
                          <div style={mystyle}>{errors.company}</div>
                        ) : null}
                      </div>
                      {/* <p>{errors.company}</p> */}

                      <div className="mb-2">
                        <input
                          required
                          name="title"
                          value={formik.values.title}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          type="text"
                          className="form-control"
                          placeholder="Title"
                        />
                        {touched.title && errors.title ? (
                          <div style={mystyle}>{errors.title}</div>
                        ) : null}
                      </div>
                      {/* <p>{errors.title}</p> */}

                      <select
                        className="form-control mb-2"
                        required
                        name="groupId"
                        value={formik.values.groupId}
                        // onChange={inputUpadate}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        {/* <p>{errors.groupId}</p> */}

                        {groups.length > 0 &&
                          groups.map((groupvalues) => {
                            return (
                              <option
                                key={groupvalues.id}
                                value={groupvalues.id}
                              >
                                {groupvalues.name}
                              </option>
                            );
                          })}
                      </select>
                      {touched.groupId && errors.groupId ? (
                        <div style={mystyle}>{errors.groupId}</div>
                      ) : null}
                      <div className="mt-3">
                        <input
                          type="submit"
                          className="btn btn-success"
                          value="Create"
                          onClick={formik.handleSubmit}
                        />
                        <Link
                          to={"/contact/list"}
                          className="btn btn-dark ms-3"
                        >
                          Cancel
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};
export default AddContact;
