export async function call_reddit(url) {
    let response = await fetch(url, {
        method: "GET",
        headers: {
            'x-api-key': 'AIzaSyAKIqaC9qWVty-v2kp5pAOfeEWmsdDjWS4',
            'Accept': 'application/json',
        }
    })

    let data = await response.json()
    return data;
};

export async function getRedditPosts(query) {

    const reddit_url = 'http://localhost:5000/query/' + query

    const call_reddit_results = await call_reddit(reddit_url)

    const reddit_output = call_reddit_results.data[0]

    return { reddit_output }

}
    