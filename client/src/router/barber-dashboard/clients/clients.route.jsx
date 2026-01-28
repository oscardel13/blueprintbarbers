import { useEffect, useMemo, useState } from "react";
import PageHeader from "../components/page-header/page-header.component";
import { getAPI } from "../../../utils/api";
import ClientsToolbar from "./components/clients-toolbar.component";
import ClientsTable from "./components/clients-table.component";
import { selectCurrentBarber } from "../../../store/barber/barber.selector";
import { useSelector } from "react-redux";

const normalize = (v) => (v || "").toString().trim().toLowerCase();

const ClientsPage = () => {
  const barber = useSelector(selectCurrentBarber);

  const [clients, setClients] = useState(barber?.clients || []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // UI state (local)
  const [search, setSearch] = useState("");
  const [hasAddress, setHasAddress] = useState(false);
  const [sort, setSort] = useState("lastAppointmentAt:desc");

  useEffect(() => {
    const fetchClients = async () => {
      setLoading(true);
      setError(null);
      try {
        // adjust endpoint to your API
        const res = await getAPI("/barbers/me/clients");
        setClients(res.data.clients || []);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, [barber]);

  const filteredClients = useMemo(() => {
    const q = normalize(search);

    let list = [...clients];

    if (q) {
      list = list.filter((c) => {
        const haystack = [
          c.name,
          c.email,
          c.phone,
          c.address?.formatted,
          c.address?.street1,
          c.address?.city,
          c.address?.state,
          c.address?.zip,
        ]
          .filter(Boolean)
          .map(normalize)
          .join(" ");

        return haystack.includes(q);
      });
    }

    if (hasAddress) {
      list = list.filter((c) => {
        const a = c.address || {};
        return Boolean(a.street1 || a.city || a.state || a.zip || a.formatted);
      });
    }

    const [sortKey, sortDir] = sort.split(":");
    const dir = sortDir === "asc" ? 1 : -1;

    list.sort((a, b) => {
      if (sortKey === "name") {
        const an = normalize(a.name);
        const bn = normalize(b.name);
        return an.localeCompare(bn) * dir;
      }

      if (sortKey === "lastAppointmentAt") {
        const ad = a.lastAppointmentAt
          ? new Date(a.lastAppointmentAt).getTime()
          : 0;
        const bd = b.lastAppointmentAt
          ? new Date(b.lastAppointmentAt).getTime()
          : 0;
        return (ad - bd) * dir;
      }

      // fallback
      return 0;
    });

    return list;
  }, [clients, search, hasAddress, sort]);

  return (
    <div className="container px-4 pb-10">
      <PageHeader title="Clients" />

      <ClientsToolbar
        search={search}
        setSearch={setSearch}
        hasAddress={hasAddress}
        setHasAddress={setHasAddress}
        sort={sort}
        setSort={setSort}
        total={filteredClients.length}
        loading={loading}
      />

      {error ? (
        <div className="text-red-600 mt-4">Error loading clients.</div>
      ) : (
        <ClientsTable clients={filteredClients} loading={loading} />
      )}
    </div>
  );
};

export default ClientsPage;
