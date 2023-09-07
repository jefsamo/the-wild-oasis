import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import { useBookings } from "./useBookings";
import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";

function BookingTable() {
  const { bookings, isLoading, count } = useBookings();
  // console.log(bookings);

  if (isLoading) return <Spinner />;

  if (!bookings.length) return <Empty resourceName="bookings" />;

  // const [searchParams] = useSearchParams();
  // let sortValue = searchParams.get("status") || "all";

  // let filteredBookings;

  // if (sortValue === "all") filteredBookings = bookings;

  // if (sortValue === "checked-out")
  //   filteredBookings = bookings.filter(
  //     (booking) => booking.status === "checked-out"
  //   );
  // if (sortValue === "checked-in")
  //   filteredBookings = bookings.filter(
  //     (booking) => booking.status === "checked-in"
  //   );
  // if (sortValue === "unconfirmed")
  //   filteredBookings = bookings.filter(
  //     (booking) => booking.status === "unconfirmed"
  //   );

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
