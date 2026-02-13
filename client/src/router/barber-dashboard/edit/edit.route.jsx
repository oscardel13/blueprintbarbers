import { useCallback, useEffect, useMemo, useState } from "react";
import PageHeader from "../components/page-header/page-header.component";
import { getAPI, putAPIMultipart } from "../../../utils/api";

import PersonalInfoComponent from "./components/personal-info/personal-info.component";
import ContactInfoComponent from "./components/contact-info/contact-info.component";
import PortfolioInfoComponent from "./components/portfolio-info/portfolio-info.component";
import ServicesInfoComponent from "./components/services-info/services-info.component";
import WorkingHoursComponent from "./components/working-hours/working-hours.component";

import { useDispatch, useSelector } from "react-redux";
import { setCurrentBarber } from "../../../store/barber/barber.reducer";
import { selectCurrentBarber } from "../../../store/barber/barber.selector";

import {
  safeClone,
  safeStringify,
  setByPath,
  validatePersonal,
  validateContact,
  validateServices,
  validateHours,
} from "./edit.helper.jsx";

// --- page ---
const EditPage = () => {
  const dispatch = useDispatch();
  const barber = useSelector(selectCurrentBarber);

  const [barberData, setBarberData] = useState({});
  const [initialBarberData, setInitialBarberData] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const [saveAttempted, setSaveAttempted] = useState(false);
  const [openSection, setOpenSection] = useState(null); // "personal" | "contact" | "services" | "gallery" | "hours"
  const [sectionErrors, setSectionErrors] = useState({
    personal: [],
    contact: [],
    services: [],
    gallery: [],
    hours: [],
  });

  useEffect(() => {
    const fetchBarberData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getAPI(`/barbers/me`);
        const data = response.data.barber;

        setBarberData(safeClone(data));
        setInitialBarberData(safeClone(data));
        dispatch(setCurrentBarber(data));
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBarberData();
  }, [dispatch]);

  // basic legacy handler still fine for simple top-level inputs
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setBarberData((prev) => ({ ...prev, [name]: value }));
  }, []);

  // ✅ universal nested setter
  const setField = useCallback((path, value) => {
    setBarberData((prev) => setByPath(prev, path, value));
  }, []);

  const handleImageChange = useCallback((e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setBarberData((prev) => ({
      ...prev,
      picture: imageUrl,
      pictureFile: file,
    }));
  }, []);

  const initialHash = useMemo(
    () => safeStringify(initialBarberData),
    [initialBarberData],
  );
  const draftHash = useMemo(() => safeStringify(barberData), [barberData]);
  const isDirty = useMemo(
    () => draftHash !== initialHash,
    [draftHash, initialHash],
  );

  useEffect(() => {
    const onBeforeUnload = (e) => {
      if (!isDirty) return;
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [isDirty]);

  const recomputeErrors = useCallback((draft) => {
    const next = {
      personal: validatePersonal(draft),
      contact: validateContact(draft),
      services: validateServices(draft.services || []),
      gallery: [], // wire later if you want (min images, cover, etc.)
      hours: validateHours(draft.hours || {}),
    };
    setSectionErrors(next);
    return next;
  }, []);

  useEffect(() => {
    if (!saveAttempted) return;
    recomputeErrors(barberData);
  }, [barberData, saveAttempted, recomputeErrors]);

  const handleDiscard = () => {
    setBarberData(safeClone(initialBarberData));
    setSaveAttempted(false);
    setSectionErrors({
      personal: [],
      contact: [],
      services: [],
      gallery: [],
      hours: [],
    });
    setOpenSection(null);
  };

  const scrollToFirstError = (errs) => {
    const flat = [
      ...errs.personal,
      ...errs.contact,
      ...errs.services,
      ...errs.gallery,
      ...errs.hours,
    ];
    const first = flat[0];
    if (!first) return;

    const id = first.id;

    const section = id.startsWith("services")
      ? "services"
      : id.startsWith("hours")
        ? "hours"
        : id.startsWith("gallery")
          ? "gallery"
          : id.startsWith("contact")
            ? "contact"
            : id.startsWith("personal")
              ? "personal"
              : null;

    if (section) setOpenSection(section);

    // try to scroll to a field marked with data-error-id
    setTimeout(() => {
      const el = document.querySelector(`[data-error-id="${id}"]`);
      if (el?.scrollIntoView)
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      if (el?.focus) el.focus();
    }, 60);
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSaveAttempted(true);

    try {
      const errs = recomputeErrors(barberData);
      const total =
        errs.personal.length +
        errs.contact.length +
        errs.services.length +
        errs.gallery.length +
        errs.hours.length;

      if (total > 0) {
        scrollToFirstError(errs);
        return;
      }

      const barberFormData = new FormData();
      const safeBarberData = safeClone(barberData);
      // handle profile picture file
      if (barberData.pictureFile) {
        // barberFormData.append("picture", barberData.pictureFile);
      }
      safeBarberData.address.formatted = `${safeBarberData.address.street1}, ${safeBarberData.address.city}, ${safeBarberData.address.state} ${safeBarberData.address.zip}, ${safeBarberData.address.country}`;

      barberFormData.append("form", JSON.stringify(safeBarberData));

      barberData.gallery.forEach((image) => {
        barberFormData.append("images", image.file);
      });

      const response = await putAPIMultipart(`/barbers/me`, barberFormData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setInitialBarberData(response.data);
      setBarberData(response.data);
      dispatch(setCurrentBarber(response.data));
    } catch (err) {
      setError(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600">Error loading profile.</div>;

  return (
    <div className="container px-4 pb-28">
      <PageHeader title="Edit Profile" />

      <div className="flex flex-col gap-3">
        <PersonalInfoComponent
          barberData={barberData}
          handleInputChange={handleInputChange}
          handleImageChange={handleImageChange}
          setField={setField}
          errors={sectionErrors.personal}
          errorCount={sectionErrors.personal.length}
          forceOpen={openSection === "personal"}
          onOpenChange={(open) => open && setOpenSection("personal")}
        />

        <ContactInfoComponent
          barberData={barberData}
          handleInputChange={handleInputChange}
          setField={setField}
          errors={sectionErrors.contact}
          errorCount={sectionErrors.contact.length}
          forceOpen={openSection === "contact"}
          onOpenChange={(open) => open && setOpenSection("contact")}
        />

        <ServicesInfoComponent
          barberData={barberData}
          setField={setField}
          errors={sectionErrors.services}
          errorCount={sectionErrors.services.length}
          forceOpen={openSection === "services"}
          onOpenChange={(open) => open && setOpenSection("services")}
        />

        <PortfolioInfoComponent
          barberData={barberData}
          setField={setField}
          errors={sectionErrors.gallery}
          errorCount={sectionErrors.gallery.length}
          forceOpen={openSection === "gallery"}
          onOpenChange={(open) => open && setOpenSection("gallery")}
        />

        <WorkingHoursComponent
          barberData={barberData}
          setField={setField}
          errors={sectionErrors.hours}
          errorCount={sectionErrors.hours.length}
          forceOpen={openSection === "hours"}
          onOpenChange={(open) => open && setOpenSection("hours")}
        />
      </div>

      {isDirty && (
        <div className="sticky bottom-4 z-10">
          <div className="border rounded-2xl shadow-md bg-white p-4 flex items-center justify-between gap-4">
            <div className="flex flex-col">
              <p className="font-semibold text-gray-800">
                You have unsaved changes
              </p>

              {saveAttempted ? (
                <p className="text-sm text-gray-600">
                  {sectionErrors.contact.length +
                    sectionErrors.services.length +
                    sectionErrors.hours.length >
                  0
                    ? "Fix the highlighted issues before saving."
                    : ""}
                </p>
              ) : null}
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
                className="px-4 py-2 rounded font-medium text-white bg-gray-800 hover:bg-gray-700 disabled:opacity-60"
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
