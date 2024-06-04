import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getDataFromServer } from "../../../services/contactservices";
import Spinner from "../../spinner/spinner";
import { Formik, useFormik } from "formik";

const EditContact = () => {
  let { contactId } = useParams();
  console.log("contactId", contactId);

  let navigate = useNavigate();
  const [state, setState] = useState({
    loading: false,
    contacts: {
      name: "",
      photo: "",
      company: "",
      email: "",
      title: " ",
      mobile: "",
      groupId: "",
    },
    errorMessage: "",
    groups: [],
  });

  const Fromik = useFormik({
    initialValues: {
      name: "",
      photo: "",
      company: "",
      email: "",
      title: " ",
      mobile: "",
      groupId: "",
    }, 
  });

  useEffect(() => {
    EditData();
  }, [contactId]);

  const EditData = async () => {
    try {
      setState({ ...state, loading: true });
      let EditResponse = await getDataFromServer.getDataById(contactId);
      console.log("EditResponse", EditResponse.data);
      let groupEdit = await getDataFromServer.wholeGroups();
      console.log("groupEdit", groupEdit.data);
      setState({
        ...state,
        loading: false,
        contacts: EditResponse.data,
        groups: groupEdit.data,
      });
    } catch (error) {
      console.log(error);
      setState({
        ...state,
        loading: false,
        error: errorMessage,
      });
    }
  };

  const handleEdit = (event) => {
    setState({
      ...state,
      contacts: {
        ...state.contacts,
        [event.target.name]: event.target.value,
      },
    });
  };

  let submitEditData = async (e) => {
    e.preventDefault();
    try {
      let createResponse = await getDataFromServer.getEditById(
        state.contacts,
        contactId
      );
      console.log("createResponse", createResponse);
      if (createResponse) {
        navigate("/contact/list", { replace: true });
      }
    } catch (error) {
      setState({ ...state, errorMessage: errorMessage });
      navigate(`/contact/edit${contactId}`, { replace: false });
    }
  };

  let { errorMessage, contacts, groups, loading } = state;
  console.log("contacts", contacts);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <section className="contact-add p-2">
            <div className="container">
              <div className="row align-items-center">
                <div className="col">
                  <p className="h4 text-primary fw-bold">Edit-Contact</p>
                  <p className="fst-italic">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Debitis magni quisquam nobis maxime, id cum vero numquam
                    rerum ab sit voluptate expedita voluptatum repudiandae aut
                    necessitatibus asperiores corporis veritatis recusandae.
                  </p>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <form onSubmit={submitEditData}>
                      <div className="mb-2">
                        <input
                          value={contacts.name}
                          name="name"
                          onChange={handleEdit}
                          type="text"
                          className="form-control"
                          placeholder="name"
                        />
                      </div>
                      <div className="mb-2">
                        <input
                          value={contacts.photo}
                          name="photo"
                          onChange={handleEdit}
                          type="text"
                          className="form-control"
                          placeholder="photo url"
                        />
                      </div>
                      <div className="mb-2">
                        <input
                          value={contacts.mobile}
                          name="mobile"
                          onChange={handleEdit}
                          type="number"
                          className="form-control"
                          placeholder="mobile"
                        />
                      </div>
                      <div className="mb-2">
                        <input
                          value={contacts.email}
                          name="email"
                          onChange={handleEdit}
                          type="email"
                          className="form-control"
                          placeholder="email"
                        />
                      </div>
                      <div className="mb-2">
                        <input
                          value={contacts.company}
                          name="company"
                          onChange={handleEdit}
                          type="text"
                          className="form-control"
                          placeholder="company name"
                        />
                      </div>
                      <div className="mb-2">
                        <input
                          required="true"
                          value={contacts.title}
                          name="title"
                          onChange={handleEdit}
                          type="text"
                          className="form-control"
                          placeholder="title"
                        />
                      </div>
                      <div className="mb-2">
                        <select
                          required="true"
                          value={contacts.groupId}
                          name="groupId"
                          onChange={handleEdit}
                          type="text"
                          className="form-control"
                        >
                          {groups.length > 0 &&
                            groups.map((values) => {
                              return (
                                <option key={values.id} value={values.id}>
                                  {values.name}
                                </option>
                              );
                            })}
                        </select>
                      </div>
                      <div className="mb-2">
                        <input
                          type="submit"
                          className="btn btn-primary"
                          value="Update"
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
                  <div className="col-md-6">
                    <img src={contacts.photo} alt="" className="img-icon" />
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
export default EditContact;
