export default async function CodeforcesSearchUsers(handle,setUserInfo) {
    const response = await fetch(
        "http://localhost:5000/algofusion/codeforces/searchuser",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                handle: handle,
            }),
        }
    );
    const json = await response.json();
    if (json.success) {
        const currentTimestamps = Math.floor(Date.now() / 1000);
        const d = currentTimestamps - json.result[0].lastOnlineTimeSeconds;
        const d2 = currentTimestamps - json.result[0].registrationTimeSeconds;
        const daysEarlier = Math.ceil(d2 / 2592000);
        const hours = Math.floor(d / 3600);
        let str;
        if (hours === 0) {
            str = "recently";
        } else if (hours > 24 * 30) {
            str = "";
            str += Math.ceil(hours / 720);
            str += " Months earlier";
        } else if (hours > 24) {
            str = "";
            str += Math.ceil(hours / 24);
            str += " Days earlier";
        } else {
            str = "";
            str += hours;
            str += " Hours earlier";
        }
        setUserInfo({
            rating: json.result[0].rating,
            friends: json.result[0].friendOfCount,
            maxRating: json.result[0].maxRating,
            titlePhoto: json.result[0].titlePhoto,
            rank: json.result[0].rank,
            handle: json.result[0].handle,
            avatar: json.result[0].avatar,
            maxRank: json.result[0].maxRank,
            contribution: json.result[0].contribution,
            registered: daysEarlier,
            lastOnline: str,
        });
    }
    return json;
}