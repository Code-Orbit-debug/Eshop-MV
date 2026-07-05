import React, { useEffect } from "react";
import EventCard from "./EventCard";
import styles from "../../styles/styles";
import { useSelector, useDispatch } from "react-redux";
import { getAllEvents } from "../../redux/actions/event"; // adjust if needed

const Events = () => {
  const dispatch = useDispatch();

  const { allEvents = [], isLoading } = useSelector(
    (state) => state.events || {}
  );

  useEffect(() => {
    dispatch(getAllEvents());
  }, [dispatch]);

  return (
    <div className={`${styles.section}`}>
      <div className={`${styles.heading}`}>
        <h1>Events</h1>
      </div>

      {/* Loading state */}
      {isLoading && (
        <p className="text-center text-gray-500">Loading events...</p>
      )}

      {/* Events */}
      {!isLoading && allEvents?.length > 0 && (
        <div className="w-full grid place-items-center">
          {allEvents.map((event) => (
            <EventCard key={event._id} data={event} />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!isLoading && allEvents?.length === 0 && (
        <div className="bg-white shadow rounded-xl p-6 w-[320px] text-center mt-6 mx-auto">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
            alt="No Events"
            className="w-24 h-24 mx-auto mb-4 opacity-60"
          />
          <h2 className="text-lg font-semibold text-gray-700 mb-1">
            No Events Found
          </h2>
          <p className="text-sm text-gray-500">
            Currently there are no events to display.
          </p>
        </div>
      )}
    </div>
  );
};

export default Events;