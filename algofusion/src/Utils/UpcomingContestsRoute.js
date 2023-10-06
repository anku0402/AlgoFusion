export default async function UpcomingContestsRoute(setContests) {
    const response = await fetch(
        "http://localhost:5000/algofusion/codeforces/upcomingcontests",
        {
            method: "POST",
        }
    );
    const json = await response.json();
    if (json.success) {
        setContests(json.contests);
    }
    return json;
}