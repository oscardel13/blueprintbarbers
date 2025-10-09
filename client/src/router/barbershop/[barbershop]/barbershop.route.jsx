import { useParams } from "react-router-dom";

export default function Barbershop() {
  let { barbershopId } = useParams();
  return (
    <div className="flex h-screen justify-center items-center">
      <h1 className="text-xl">Barbershop: {barbershopId}</h1>
    </div>
  );
}
