import ServiceCard from "./components/service-card.component";
const Services = ({ services, booksyUrl }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-left tracking-wider py-3">
        Services
      </h1>
      <hr />
      {services.map((service, index) => {
        return (
          <div key={index}>
            <ServiceCard service={service} booksyUrl={booksyUrl} />
            <hr />
          </div>
        );
      })}
    </div>
  );
};

export default Services;
