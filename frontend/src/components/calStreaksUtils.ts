// streakUtils.ts
export const calculateStreak = (workouts) => {
    if (!Array.isArray(workouts)) {
        //console.error("Invalid input: workouts must be an array");
        return 0;
      }
  
      const sortedDates = [...new Set(workouts.map(w => w.date))].sort();
      console.log(sortedDates);
      let streak = 0;
      const today = new Date();
      today.setTime(today.getTime() - 480*60*1000); //time zone adjusted
      const yesterday = new Date(today.getTime() - 24*60*60*1000);
  
      const today_string = today.toISOString().substring(0,10);
      const yesterday_string = yesterday.toISOString().substring(0,10);

      if(sortedDates.includes(yesterday_string)) {
          streak = 1;
          const dateDifferenceInDays = (date1: string, date2: string): number => {
              const d1 = new Date(date1);
              const d2 = new Date(date2);
              return Math.round((d1.getTime() - d2.getTime()) / (24 * 60 * 60 * 1000));
          };
          
          for (let i = sortedDates.indexOf(yesterday_string); i>0; i--) {
  
              const daysDifference = dateDifferenceInDays(sortedDates[i], sortedDates[i - 1]);
              if (daysDifference === 1) {
                  streak ++;
              }
              else {
                break;
              }
          }
      }
  
      if (sortedDates.includes(today_string)) {
          streak++;
      }
      return streak;
};
