interface DateSubmittedCellProps {
  date: string | Date; // date might be a string or Date object
}

const DateSubmittedCell: React.FC<DateSubmittedCellProps> = ({ date }) => {
  const dateObj = new Date(date); // Ensure date is a Date object

  // Format the date as "MMM/dd/yyyy"
  const formattedDate = dateObj.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  // Get the current date and calculate the difference in days
  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - dateObj.getTime();
  const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24)); // Convert milliseconds to days

  // Determine the text color based on the age of the date
  let textColor = "text-red-600";
  if (daysDifference < 10) {
    textColor = "text-green-600";
  } else if (daysDifference <= 14) {
    textColor = "text-orange-400";
  }

  return <span className={textColor}>{formattedDate}</span>;
};

export default DateSubmittedCell;
