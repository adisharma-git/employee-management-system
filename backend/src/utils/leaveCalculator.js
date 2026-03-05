
const calculateAppliedDays = (startDate, endDate, holidays = [], isHalfDay = false) => {
  let count = 0;
  
  // 1. Normalize dates to midnight to prevent timezone bugs
  let currentDate = new Date(startDate);
  currentDate.setHours(0, 0, 0, 0);
  
  const end = new Date(endDate);
  end.setHours(0, 0, 0, 0);

  // 2. Convert database holidays into an array of simple timestamps for fast searching
  const holidayTimestamps = holidays.map(holiday => {
    const d = new Date(holiday.date);
    d.setHours(0, 0, 0, 0);
    return d.getTime();
  });

  // 3. Loop through every single day from Start to End
  while (currentDate <= end) {
    const dayOfWeek = currentDate.getDay(); // 0 = Sunday, 6 = Saturday
    
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const isHoliday = holidayTimestamps.includes(currentDate.getTime());

    // If it's a standard working day, count it
    if (!isWeekend && !isHoliday) {
      count++;
    }

    // Move to the next day
    currentDate.setDate(currentDate.getDate() + 1);
  }

  // 4. Handle Half Days, deduct 0.5 from the total working days
  if (isHalfDay && count > 0) {
    count -= 0.5;
  }

  return count;
};

module.exports = { calculateAppliedDays };