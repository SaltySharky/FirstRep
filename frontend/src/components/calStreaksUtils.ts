// streakUtils.ts
export const calculateStreak = (workouts) => {
    if (!workouts || workouts.length === 0) {
        return 0;
    }

    // Sort workouts by date (oldest to newest)
    workouts.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    let streak = 1; // Start with the first workout
    for (let i = 1; i < workouts.length; i++) {
        const prevDate = new Date(workouts[i - 1].date);
        const currDate = new Date(workouts[i].date);

        // Check if the current workout is on the next consecutive day
        const diffInTime = currDate.getTime() - prevDate.getTime();
        const diffInDays = diffInTime / (1000 * 3600 * 24);

        if (diffInDays === 1) {
            streak++;
        } else if (diffInDays > 1) {
            streak = 1; // Reset streak if days are not consecutive
        }
    }

    return streak;
};
