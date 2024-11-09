import ServiceCard from "./components/service-card.component";
const Services = ({ services }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-left tracking-wider py-3">
        Services
      </h1>
      <hr />
      {services.map((service, index) => {
        return (
          <div>
            <ServiceCard key={index} service={service} />
            <hr />
          </div>
        );
      })}
    </div>
  );
};

export default Services;
