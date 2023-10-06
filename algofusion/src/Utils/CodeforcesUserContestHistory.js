export default async function CodeforcesUserContestHistory(handle,setContests){
    const response = await fetch(
        "http://localhost:5000/algofusion/codeforces/usercontests",
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
        setContests(json.contests);
      }
}