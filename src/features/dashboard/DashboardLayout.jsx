import styled from "styled-components";
import { useRecentBooking } from "./useRecentBooking";
import Spinner from "../../ui/Spinner";
import { useRecentStays } from "./useRecentStays";
import Stats from "./Stats";
import { useCabins } from "../cabins/useCabins";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

const DashboardLayout = () => {
  const { bookings, isLoading: isLoadingRecentBookings } = useRecentBooking();
  const {
    stays,
    isLoading: isLoadingRecentStays,
    confirmedStays,
    numberOfDays,
  } = useRecentStays();
  const { cabins, isLoading } = useCabins();

  const cabinCount = cabins?.length;

  if (isLoadingRecentBookings || isLoadingRecentStays) return <Spinner />;
  console.log(bookings);
  console.log(stays);
  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        numberOfDays={numberOfDays}
        confirmedStays={confirmedStays}
        cabinCount={cabinCount}
      />
      {/* <div>Activity</div> */}
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numberOfDays={numberOfDays} />
    </StyledDashboardLayout>
  );
};

export default DashboardLayout;
