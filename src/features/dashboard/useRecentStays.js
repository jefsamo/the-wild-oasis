import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";
import { subDays } from "date-fns";

export const useRecentStays = () => {
  const [searchParams] = useSearchParams();

  const numberOfDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));

  const queryDate = subDays(new Date(), numberOfDays).toISOString();

  const { isLoading, data: stays } = useQuery({
    queryFn: () => getStaysAfterDate(queryDate),
    queryKey: ["stays", `last-${numberOfDays}`],
  });

  const confirmedStays = stays?.filter((stay) => stay.status !== "unconfirmed");

  return { isLoading, stays, confirmedStays, numberOfDays };
};
