import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

export default function Calendar() {
  const timeOffArray = [
    {
      id: 1,
      description: "Time Off 1",
      startDate: new Date("2023-01-01"),
      endDate: new Date("2023-01-03"),
      totalDays: 3,
      status: "Approved",
      createdAt: new Date(),
      userId: "user1",
    },
    {
      id: 2,
      description: "Time Off 2",
      startDate: new Date("2023-01-22"),
      endDate: new Date("2023-01-24"),
      totalDays: 3,
      status: "Approved",
      createdAt: new Date(),
      userId: "user2",
    },
    {
      id: 3,
      description: "Time Off 3",
      startDate: new Date("2023-01-30"),
      endDate: new Date("2023-02-01"),
      totalDays: 3,
      status: "Approved",
      createdAt: new Date(),
      userId: "user3",
    },
  ];

  const transformedData = timeOffArray.reduce<
    { date: string; count: number }[]
  >((result, timeOff) => {
    const { startDate, endDate, totalDays } = timeOff;
    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      const currentDateStr = currentDate.toISOString().split("T")[0];
      const existingData = result.find((item) => item.date === currentDateStr);
      if (existingData) {
        existingData.count += totalDays;
      } else {
        result.push({
          date: currentDateStr,
          count: totalDays,
        });
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return result;
  }, []);

  return (
    <CalendarHeatmap
      startDate={new Date(new Date().getFullYear(), 0, 1)}
      endDate={new Date(new Date().getFullYear(), 11, 31)}
      values={transformedData}
      showWeekdayLabels
      weekdayLabels={["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"]}
      monthLabels={[
        "Ocak",
        "Şubat",
        "Mart",
        "Nisan",
        "Mayıs",
        "Haziran",
        "Temmuz",
        "Agustos",
        "Eylül",
        "Ekim",
        "Kasım",
        "Aralık",
      ]}
      showOutOfRangeDays
      gutterSize={3}
    />
  );
}
