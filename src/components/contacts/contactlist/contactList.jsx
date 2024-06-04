import { Link } from "react-router-dom";
import "./contactlist.css";
import { useEffect, useState } from "react";
import { getDataFromServer } from "../../../services/contactservices";
import Spinner from "../../spinner/spinner";

const ContactList = () => {
  const [state, setState] = useState({
    loading: false,
    contacts: [],
    errormessage: "",
  });

  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setState({ ...state, loading: true });
      const response = await getDataFromServer.getApiData();
      console.log("response.data", response.data);
      setState({
        ...state,
        loading: false,
        contacts: response.data,
      });
    } catch (error) {
      setState({
        ...state,
        loading: false,
        errormessage: error.errormessage,
      });
    }
  };

  //delete function
  const handleDelete = async (contactId) => {
    try {
      setState({ ...state, loading: true });
      let response = await getDataFromServer.getDeleteById(contactId);
      console.log("response", response.data);
      if (response) {
        const response = await getDataFromServer.getApiData();
        console.log(response.data);
        setState({
          ...state,
          loading: false,
          contacts: response.data,
        });
      }
    } catch (error) {
      console.log("error", error);
      setState({
        ...state,
        errormessage: error.errormessage,
      });
    }
  };

  //search inputData
  const searchInputData = state.contacts.filter((item) => {
    if (searchValue === "") {
      return item;
    } else if (item.name.toLowerCase().includes(searchValue.toLowerCase())) {
      return item;
    }
  });
  console.log("searchInputData", searchInputData);

  //getDistructureData
  let { loading, contacts, errormessage } = state;

  return (
    <>
      <section>
        <div className="container p-3">
          <div className="grid">
            <div className="row">
              <div className="col">
                <p className="h3 fw-bold">
                  Contact Manager
                  <Link to={"/contact/add"} className="btn btn-primary ms-3">
                    <i className="fa fa-plus-circle me-2" />
                    New
                  </Link>
                </p>
                <p className="fst-italic">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Quibusdam ullam debitis minus expedita velit nam corporis.
                  Sunt a impedit qui non, consectetur voluptatem deserunt,
                  itaque, architecto iure molestiae harum et.
                </p>
                <div className="row">
                  <div className="col-md-6">
                    <form className="row">
                      <div className="col">
                        <div className="mb-6">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="search Names"
                            onChange={(event) =>
                              setSearchValue(event.target.value)
                            }
                          />
                        </div>
                      </div>
                      <div className="col">
                        {/* <div className="mb-2">
                          <input
                            type="submit"
                            className="btn btn-outline-dark"
                          />
                        </div> */}
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {loading ? (
        <Spinner />
      ) : (
        <section className="contact-list">
          <div className="container">
            <div className="grid">
              <div className="row">
                {searchInputData.length === 0 ? (
                  <div className="text-center fw-bold">
                    Opps search not found!!!
                  </div>
                ) : (
                  searchInputData.map((values) => {
                    return (
                      <div className="col-md-6" key={values.id}>
                        <div className="card mt-2 mb-2">
                          <div className="card-body">
                            <div className="row align-items-center d-flex justify-content-around">
                              <div className="col-md-4">
                                <img
                                  src={values.photo}
                                  alt=""
                                  className="img-icon"
                                />
                              </div>
                              <div className="col-md-7">
                                <ul className="list-group">
                                  <li className="list-group-item list-group-item-action">
                                    Name :
                                    <span className="fw-bold">
                                      {values.name}
                                    </span>
                                  </li>
                                  <li className="list-group-item list-group-item-action">
                                    mobile :
                                    <span className="fw-bold">
                                      {values.mobile}
                                    </span>
                                  </li>
                                  <li className="list-group-item list-group-item-action">
                                    Email :
                                    <span className="fw-bold">
                                      {values.email}
                                    </span>
                                  </li>
                                </ul>
                              </div>
                              <div className="col-md-1 d-flex flex-column align-items-center">
                                <Link
                                  to={`/contact/view/${values.id}`}
                                  className="btn btn-warning my-1"
                                >
                                  <i className="fa fa-eye" />
                                </Link>
                                <Link
                                  to={`/contact/edit/${values.id}`}
                                  className="btn btn-primary my-1"
                                >
                                  <i className="fa fa-pen" />
                                </Link>
                                <button
                                  className="btn btn-danger my-1"
                                  onClick={() => handleDelete(values.id)}
                                >
                                  <i className="fa fa-trash" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};
export default ContactList;

//second type 2
// useEffect(() => {
//   getDataFromServer.getApiData()
//     .then(response => {
//       console.log(response.data);
//     })
//     .catch(error => {
//       // console.log("error", error);
//     });
// }, []);

//third type 3
// useEffect(() => {
//   async function handleResp() {
//     try {
//       let response = await getDataFromServer.getApiData();
//       console.log("response", response.data);
//     } catch (error) {
//       console.log("error", error);
//     }
//   }
//   handleResp();
// }, []);
