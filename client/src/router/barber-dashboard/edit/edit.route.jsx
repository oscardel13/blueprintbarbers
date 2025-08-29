import PageHeader from "../components/page-header/page-header.component";

const EditPage = () => {
  return (
    <div className="container">
    <PageHeader title="Edit Profile" />
       {/* Personal Info */}
      <div className="flex flex-col gap-3">
        <section className="bg-white shadow-md rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-semibold">Personal Info</h2>
          <input type="text" placeholder="Name" className="w-full border p-2 rounded" />
          <input type="text" placeholder="Nickname" className="w-full border p-2 rounded" />
          <input type="file" className="w-full border p-2 rounded" />
          <textarea placeholder="About" className="w-full border p-2 rounded" />
        </section>

        {/* Contact Info */}
        <section className="bg-white shadow-md rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-semibold">Contact Info</h2>
          <input type="text" placeholder="Phone" className="w-full border p-2 rounded" />
          <input type="text" placeholder="Address" className="w-full border p-2 rounded" />
          <input type="url" placeholder="Instagram URL" className="w-full border p-2 rounded" />
          <input type="url" placeholder="Booksy URL" className="w-full border p-2 rounded" />
        </section>

        {/* Portfolio */}
        <section className="bg-white shadow-md rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-semibold">Portfolio & Services</h2>
          <input type="file" multiple className="w-full border p-2 rounded" />
          <button className="px-4 py-2 bg-black text-white rounded">+ Add Service</button>
        </section>

        {/* Working Hours */}
        <section className="bg-white shadow-md rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-semibold">Working Hours</h2>
          <div className="grid grid-cols-2 gap-4">
            {["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"].map(day => (
              <div key={day}>
                <label className="font-medium">{day}</label>
                <input type="text" placeholder="e.g. 9:00 - 17:00" className="w-full border p-2 rounded" />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default EditPage;
