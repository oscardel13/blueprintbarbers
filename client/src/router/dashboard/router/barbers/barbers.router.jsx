import PageHeader from "../../compoenents/page-header/page-header.component";
import BarberList from "./components/barbers-list/barbers-list.component";

const Barbers = () => {
    return (
        <div className="container">
            <PageHeader title="Barbers" />
            <BarberList barbers={[{gid: "12345",name:"test", email:"test@gmail.com", phone:"123-456-7890"}]}  />
        </div>
    )
}

export default Barbers;