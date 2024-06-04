import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getDataFromServer } from "../../../services/contactservices";
import Spinner from "../../spinner/spinner";
import React from "react";
const ViewContact = () => {
  let { contactId } = useParams();

  const [state, setState] = useState({
    loading: false,
    contacts: {},
    errormessage: "",
    group: {},
  });

  useEffect(() => {
    viewData();
  }, [contactId]);

  const viewData = async () => {
    try {
      setState({ ...state, loading: true });
      let viewWholeData = await getDataFromServer.getDataById(contactId);
      console.log("viewWholeData", viewWholeData.data);
      let groupsId = await getDataFromServer.groupsId(viewWholeData.data);
      console.log("groupsId", groupsId);
      setState({
        ...state,
        loading: false,
        contacts: viewWholeData.data,
        group: groupsId.data,
      });
    } catch (error) {
      setState({
        ...state,
        loading: false,
        errormessage: error.errormessage,
      });
    }
  };

  let { loading, contacts, errormessage, group } = state;
  console.log("group", group);
  return (
    <>
      <section className="view-contact-intro p-3">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h3 text-warning">View-Contact</p>
              <p className="fst-italic">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Corporis, dolorum illum repellat voluptate dolor error ullam
                dicta velit praesentium odio. Nihil, unde error animi quis
                ducimus exercitationem maiores nisi excepturi?
              </p>
            </div>
          </div>
        </div>
      </section>

      {loading ? (
        <Spinner />
      ) : (
        <React.Fragment>
          {Object.keys(contacts).length > 0 &&
            Object.keys(group).length > 0 && (
              <section className="view-contact mt-4">
                <div className="container">
                  <div className="row align-items-center">
                    <div className="col-md-4">
                      <img src={contacts.photo} alt="" className="img-icon" />
                    </div>
                    <div className="col-md-8">
                      <ul className="list-group">
                        <li className="list-group-item list-group-item-action">
                          Name :<span className="fw-bold">{contacts.name}</span>{" "}
                        </li>
                        <li className="list-group-item list-group-item-action">
                          mobile :
                          <span className="fw-bold">{contacts.mobile}</span>{" "}
                        </li>
                        <li className="list-group-item list-group-item-action">
                          Email :
                          <span className="fw-bold">{contacts.email}</span>{" "}
                        </li>
                        <li className="list-group-item list-group-item-action">
                          Company :
                          <span className="fw-bold">{contacts.company}</span>{" "}
                        </li>
                        <li className="list-group-item list-group-item-action">
                          Title :
                          <span className="fw-bold">{contacts.title}</span>{" "}
                        </li>
                        <li className="list-group-item list-group-item-action">
                          Group :<span className="fw-bold">{group.name}</span>{" "}
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <Link to={"/contact/list"} className="btn btn-warning">
                        Back
                      </Link>
                    </div>
                  </div>
                </div>
              </section>
            )}
        </React.Fragment>
      )}
    </>
  );
};
export default ViewContact;
