export const OPENING_TIME_MORNING = 9 // in hours
export const CLOSING_TIME_MORNING = 12 // in hours
export const OPENING_TIME_AFTERNOON = 13 // in hours
export const CLOSING_TIME_AFTERNOON = 16 // in hours
export const INTERVAL = 30 // every 30 minutes


const getDaysArray = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  
    const daysArray = [];
  
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
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
  