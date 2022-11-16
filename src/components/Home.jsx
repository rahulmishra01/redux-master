import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { readData, deleteData } from "../redux/actions";

const Home = () => {
  const [data, setData] = useState([]);

  const [find, setFind] = useState("");

  // Called dispatch method
  const dispatch = useDispatch();

  // Called selector method
  const selector = useSelector((state) => state.data);

  useEffect(() => {
    // getData();
    dispatch(readData());
  }, []);

  useEffect(() => {
    setData(selector);
  }, [selector !== data]);

 

  const clearData = async (id) => {
    dispatch(deleteData(id));
    dispatch(readData());
  };

  const inputSearch = (e) => {
    setFind(e.target.value);
  };

  const filterSearch = !find
    ? data
    : data.filter((item) =>
      item.fname.toLowerCase().includes(find.toLowerCase())
    );

  return (
    <>
      <h3 className="d-flex justify-content-center p-2"> This is Home Page </h3>
      <div className="d-flex justify-content-center mb-2">
        <input type="search" placeholder="Search" onChange={inputSearch} />
      </div>

      <table class="table">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Address</th>
            <th scope="col">Birthday</th>
            <th scope="col">Gender</th>
            <th scope="col">Action</th>
          </tr>
        </thead>

        <tbody>
          {filterSearch.map((value, index) => {
            return (
              <>
                <tr>
                  <th scope="row" key={value.id}>
                    {index + 1}
                  </th>
                  <td>{value.fname}</td>
                  <td>{value.lname}</td>
                  <td>{value.email}</td>
                  <td>{value.phone}</td>
                  <td>{value.address}</td>
                  <td>{value.birthday}</td>
                  <td>{value.gender}</td>
                  <td>
                    <Link className="btn btn-primary" to={`/edit/${value.id}`}>
                      Edit
                    </Link>

                    <Link className="btn btn-danger ms-2" onClick={() => { clearData(value.id)}}>
                      Delete
                    </Link>
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Home;
