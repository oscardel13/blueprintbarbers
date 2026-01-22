import { useEffect, useMemo, useState } from "react";
import PageHeader from "../components/page-header/page-header.component";
import { getAPI, putAPI } from "../../../utils/api";
// import { selectCurrentUser } from "../../../store/user/user.selector";
// import { useSelector } from "react-redux";

import PersonalInfoComponent from "./components/personal-info/personal-info.component";
import ContactInfoComponent from "./components/contact-info/contact-info.component";
import PortfolioInfoComponent from "./components/portfolio-info/portfolio-info.component";
import ServicesInfoComponent from "./components/services-info/services-info.component";
import WorkingHoursComponent from "./components/working-hours/working-hours.component";

// Simple deep compare for "dirty" tracking.
// Good enough for your current data; if you later store File objects, we ignore them.
const safeStringify = (obj) =>
  JSON.stringify(obj, (key, value) => {
    if (value instanceof File) return "__file__";
    return value;
  });

const EditPage = () => {
  const user = ""; // useSelector(selectCurrentUser);

  const [barberData, setBarberData] = useState({});
  const [initialBarberData, setInitialBarberData] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const barberId = user?._id || "673d705ba640e23e6a4ecf70";

  useEffect(() => {
    const fetchBarberData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getAPI(`/barbers/${barberId}`);
        setBarberData(response.data);
        setInitialBarberData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    fetchBarberData();
  }, [barberId]);

  const isDirty = useMemo(() => {
    return safeStringify(barberData) !== safeStringify(initialBarberData);
  }, [barberData, initialBarberData]);

  // Optional: warn when leaving with unsaved changes
  useEffect(() => {
    const onBeforeUnload = (e) => {
      if (!isDirty) return;
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [isDirty]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600">Error loading profile.</div>;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBarberData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setBarberData((prev) => ({
      ...prev,
      picture: imageUrl,
      pictureFile: file, // later: upload separately
    }));
  };

  const handleDiscard = () => {
    setBarberData(initialBarberData);
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);

    try {
      // For now: send everything except File objects
      const payload = JSON.parse(safeStringify(barberData));

      // TODO later:
      // - Upload pictureFile/gallery files to special endpoints
      // - Replace picture/gallery urls with hosted urls
      // - Remove pictureFile from payload
      delete payload.pictureFile;

      // If you have a patch/put helper, use it here.
      // Assuming getAPI is axios-like; you likely also have patchAPI/putAPI.
      // If not, you can do: await getAPI().patch(...) depending on your util.

      // await putAPI(`/barbers/${barberId}`, {
      //   method: "PATCH",
      //   data: payload,
      // });

      // After save, update initial snapshot so dirty resets
      setInitialBarberData(barberData);
      setSaving(false);
    } catch (err) {
      setError(err);
      setSaving(false);
    }
  };

  return (
    <div className="container px-4 pb-28">
      <PageHeader title="Edit Profile" />

      <div className="flex flex-col gap-3">
        <PersonalInfoComponent
          barberData={barberData}
          handleInputChange={handleInputChange}
          handleImageChange={handleImageChange}
        />

        <ContactInfoComponent
          barberData={barberData}
          handleInputChange={handleInputChange}
        />

        <ServicesInfoComponent
          barberData={barberData}
          handleInputChange={handleInputChange}
        />

        <PortfolioInfoComponent
          barberData={barberData}
          handleInputChange={handleInputChange}
        />

        <WorkingHoursComponent
          barberData={barberData}
          handleInputChange={handleInputChange}
        />
      </div>

      {/* Sticky Save Bar */}
      {/* Sticky Save Bar (stays within this container/column) */}
      {isDirty && (
        <div className="sticky bottom-4 z-10">
          <div className="border rounded-2xl shadow-md bg-white p-4 flex items-center justify-between gap-4">
            <div className="flex flex-col">
              <p className="font-semibold text-gray-800">
                You have unsaved changes
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleDiscard}
                disabled={saving}
                className="px-4 py-2 rounded border font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-60"
              >
                Discard
              </button>

              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="px-4 py-2 rounded font-medium text-white bg-blue-500 hover:bg-blue-600 disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditPage;
