import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useSelector } from "react-redux";

moment.locale("en-US");
const localizer = momentLocalizer(moment);

const NannySchedule = () => {
  const userId = useSelector((state) => state.user?.user?.nanny?.id);

  const [eventsData, setEventsData] = useState([]);

  const handleSelect = ({ start, end }) => {
    console.log(start);
    console.log(end);
  };

  async function fetchBookings() {
    try {
      await axios
        .post(`${process.env.REACT_APP_API_URL}/filter_bookings/`, {
          id: userId,
          is_nanny: true,
        })
        .catch((_) => {})
        .then((response) => {
          if (response && response.status === 200) {
            let eventsList = [];
            for (const booking of response.data) {
              eventsList.push({
                id: booking.id,
                title:
                  "Status : " +
                  booking.status +
                  ", Family : " +
                  booking?.user?.first_name +
                  " " +
                  booking?.user?.last_name +
                  ", Location : " +
                  booking?.user?.location?.address +
                  ", " +
                  booking?.user?.location?.town,
                start: new Date(booking.start_time),
                end: new Date(booking.end_time),
              });
            }
            setEventsData(eventsList);
          }
        });
    } catch (_) {}
  }

  // on select event show booking details
  useEffect(() => {
    fetchBookings();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="schedule">
      <Calendar
        views={["day", "agenda", "work_week", "month"]}
        selectable
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={eventsData}
        style={{ height: "70vh" }}
        onSelectEvent={(event) => alert(event.title)}
        onSelectSlot={handleSelect}
      />
    </div>
  );
};

export default NannySchedule;
