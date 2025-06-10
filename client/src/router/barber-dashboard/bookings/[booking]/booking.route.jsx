import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getAPI, putAPI } from "../../../../utils/api";

import PageHeader from "../../components/page-header/page-header.component";
import UpdateBooking from "../../../../components/update_booking/update_booking.comonent";
import Alert from "../components/alert/alert.component";

// bug not showing color properly
const STATUS_COLOR = {
  "pending" : "yellow-700",
  "confirmed" : "green-500",
  "canceled": "red-400",
  "finished": "gray-600"
}

// if pending it should have 2 bottons: confirm and deny
const BookingPage = () => {
  let { bookingId } = useParams();
  const [booking, setBooking] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [updatePopover, setUpdatePopover] = useState(false)

  const triggerCancelBooking = async() => {
    setShowAlert((prev) => !prev)
  }

  const triggerUpdateBooking = () => {
    setUpdatePopover((prev) => !prev)
  };

  const cancelBooking = async() => {
    setWaiting(true)
    try{
      const body = {
        status: "canceled"
      }
      const res = await putAPI(`/bookings/${booking._id}`, body)
      setShowAlert(false)
      setWaiting(false)
      setBooking(res.data)
    }
    catch(err){
      alert(err)
    }
  }

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await getAPI(`/bookings/${bookingId}`);
        setBooking(res.data);
      } catch (err) {
        if (err.response.data.error === "Not the owner")
          window.alert("You are not the owner of this booking");
        else window.alert("Could not find booking");
      }
    };
    fetchBooking();
  }, [bookingId]);

  if (!booking)
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="font-semibold text-5xl">Loading...</h1>
      </div>
    );

  return (
    <div className="container">
      <PageHeader title="Booking" />
      {
        showAlert && 
          <Alert closeAlert={triggerCancelBooking} confirmAlert={cancelBooking}>
              {
                waiting ? <div><h1 className="text-xl font-semibold">Cancel Booking</h1>
              <p>Waiting...</p></div> : <div><h1 className="text-xl font-semibold">Cancel Booking</h1>
              <p>{`Are you sure you want to cancel booking for ${booking.customer.name} - ${booking.service.name} for ${booking.startTime}`}</p></div>
              }
          </Alert>
      }
      {
        updatePopover && <UpdateBooking service={booking.service} barber={booking.barber} closeBooking={triggerUpdateBooking}/>
      }
      <div className="flex flex-col gap-3 w-96">
        <div className="flex justify-center">
          <span className={`w-60 px-5 py-2 text text-center text-white bg-${STATUS_COLOR[booking.status]} rounded-full shadow-md`}>
            {booking.status}
          </span>
        </div>
        <div className="flex flex-row p-3 border border-gray-200 bg-white shadow-lg rounded-lg gap-5">
          <div className="flex flex-col">
            <span className="text-sm text-gray-400">Start</span>
            <span>10:00 AM</span>
          </div>

          <div className="w-px bg-gray-300 mx-" />

          <div className="flex flex-col items-start">
            <span className="text-sm text-gray-400">Date</span>
            <span>Thur, November 20, 2025</span>
          </div>
        </div>
        <div className="flex flex-row p-2 items-center">
          <div className="w-1/6">
          <img
              src={booking.customer.picture}
              className="w-10 h-10 rounded-full"
              alt=""
            />
          </div>
          <div className="w-4/6 flex flex-col justify-start">
            <span className="font-semibold">{booking.customer.name}</span>
            <span className="text-sm text-gray-600">{booking.customer.phone}</span>
          </div>
          <div className="w-1/6">0</div>
          <div></div>
        </div>

        <hr/>

        <div className="flex flex-row justify-between">
        <div className="flex flex-col gap-1">
          <h6 className="font-semibold">{booking.service.name}</h6>
          <span className="text-sm text-gray-600">
            {new Date(booking.startTime).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}{" "}
            -{" "}
            {new Date(booking.endTime).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
        <div className="flex flex-col justify-center text-right">
          <span className="text-lg font-semibold">${booking.service.price}.00</span>
        </div>
      </div>

      <hr/>

      <div className="flex flex-row gap-1">
        <div className="w-1/2 text-white">
            <button className="flex w-full h-10 rounded-lg justify-center items-center bg-red-500 shadow-lg" onClick={triggerCancelBooking}>Cancel</button
            
            
            
            >
        </div>
        <div className="w-1/2 text-white">
          <button className="flex w-full h-10 rounded-lg justify-center items-center bg-gray-600 shadow-lg" onClick={triggerUpdateBooking}>Edit</button>
        </div>
      </div>

      </div>
    </div>
  );
};

export default BookingPage;
