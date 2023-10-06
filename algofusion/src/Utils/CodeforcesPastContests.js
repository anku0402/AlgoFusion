export default async function CodeforcesPastContests(c, setContests, setShowContests) {
    const response = await fetch(
        "http://localhost:5000/algofusion/codeforces/getpastcontests",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                count: c,
            }),
        }
    );
    const json = await response.json();
    if (json.success) {
        setContests(json.output);
        const arr = json.output.splice(0, 50);
        setShowContests(arr);
    }
    return json;
}