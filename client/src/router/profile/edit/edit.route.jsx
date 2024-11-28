import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { selectCurrentUser } from "../../../store/user/user.selector";
import PageHeader from "../../../components/page-header/page-header.component";
import { putAPI } from "../../../utils/api";

const EditPage = () => {
  const user = useSelector(selectCurrentUser);
  const [userForm, setUserForm] = useState({});

  useEffect(() => {
    // format phone with -
    const phone = user?.phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
    setUserForm({ ...user, phone });
  }, [user]);

  if (!user) {
    return <div>Need to be logged in to view this page</div>;
  }

  const handleChange = (e) => {
    let { name, value } = e.target;
    // phone remove all non-numeric characters and -
    if (name === "phone") {
      value = value.replace(/[^0-9-]/g, "");
    }
    setUserForm({ ...userForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // remove - from phone number
    const body = {
      ...userForm,
      phone: userForm.phone.replace(/-/g, ""),
    };
    try {
      console.log(body);
      const res = await putAPI(`/users/${user._id}`, body);
      if (res.status === 200) {
        console.log("success");
      }
    } catch (err) {}
  };

  return (
    <div className="flex flex-col">
      <PageHeader title="Edit" />
      <div className="flex flex-row py-5 gap-5">
        <img
          className="w-16 h-16 rounded-full"
          src={userForm?.picture}
          alt=""
        />
        <div className="flex flex-col justify-center">
          <h6>{userForm?.name}</h6>
          <span>{userForm?.email}</span>
          <span>{userForm?.phone}</span>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-row gap-3">
          <label className="rounded" htmlFor="">
            Name:{" "}
          </label>
          <input
            className="p-1 rounded"
            type="text"
            name="name"
            id=""
            value={userForm?.name}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-row gap-3">
          <label htmlFor="">Phone: </label>
          <div className="flex flex-col">
            <input
              className="p-1 rounded"
              type="text"
              name="phone"
              value={userForm?.phone}
              onChange={handleChange}
            />
            <span className="text-sm text-gray-700">123-456-7890</span>
          </div>
        </div>
      </div>
      <button
        className="mt-5 bg-gray-800 text-white border shadow p-2 rounded-lg"
        onClick={handleSubmit}
      >
        Update
      </button>
    </div>
  );
};

export default EditPage;
