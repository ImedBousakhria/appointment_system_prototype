export const OPENING_TIME_MORNING = 9; // in hours
export const CLOSING_TIME_MORNING = 12; // in hours
export const OPENING_TIME_AFTERNOON = 13; // in hours
export const CLOSING_TIME_AFTERNOON = 16; // in hours
export const INTERVAL = 30; // every 30 minutes

export const getDaysArray = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();

  const daysArray = [];
  const daysToGenerate = 30;

  for (let dayOffset = 0; dayOffset < daysToGenerate; dayOffset++) {
    const date = new Date(currentYear, currentMonth, currentDay + dayOffset);
    daysArray.push({
      date,
      morning: {
        openingTime: OPENING_TIME_MORNING,
        closingTime: CLOSING_TIME_MORNING,
      },
      afternoon: {
        openingTime: OPENING_TIME_AFTERNOON,
        closingTime: CLOSING_TIME_AFTERNOON,
      },
    });
  }

  return daysArray;
};
