export default async function LeetcodeRoute(u,setData) {
    const response = await fetch("http://localhost:5000/algofusion/leetcode", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: u
        }),
    });
    const json = await response.json();
    if (json.success) {
        let dates = Object.keys(json.data.submissionCalendar).reverse();
        let values = Object.values(json.data.submissionCalendar).reverse();
        setData({
            username: u,
            totalSolve: json.data.totalSolved,
            totalQues: json.data.totalQuestions,
            easyS: json.data.easySolved,
            totalEasy: json.data.totalEasy,
            mediumS: json.data.mediumSolved,
            totalMed: json.data.totalMedium,
            hardS: json.data.hardSolved,
            totalHard: json.data.totalHard,
            rank: json.data.ranking,
            acceptance: json.data.acceptanceRate,
            date: dates,
            submissions: values,
        });
    }
    return json;
}