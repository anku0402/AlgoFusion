export default async function CodeforcesPastContestQuestions(ind,setVal,contests,showContests){
    const response = await fetch(
      "http://localhost:5000/algofusion/codeforces/getproblems",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: contests[ind].id,
        }),
      }
    );
    const json = await response.json();
    if (json.success) {
      setVal({ ind: ind, problem: json.output, contest: showContests[ind] });
    }
    return json;
}