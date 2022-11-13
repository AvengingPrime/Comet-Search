function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

async function call_nebula(url) {
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

async function main() {

  const keyword_extractor = require("keyword-extractor")

  query = "is professor john Barden hard"

  const query_extraction =
  keyword_extractor.extract(query,{
      language:"english",
      remove_digits: true,
      return_changed_case: true,
      remove_duplicates: true
  });

  console.log(query_extraction)

  professor_output = null

  for (let i = 0; i < query_extraction.length-1; i++) {
      first_keyword = query_extraction[i]
      last_keyword = query_extraction[i+1]

      first_keyword = capitalizeFirstLetter(first_keyword)
      last_keyword = capitalizeFirstLetter(last_keyword)

      professor_params = { first_name: first_keyword, last_name: last_keyword};
      professor_search_params = new URLSearchParams(professor_params);
      professor_url = 'https://api.utdnebula.com/professor/?' + professor_search_params.toString()

      console.log(professor_url)
      professor_call_nebula = await call_nebula(professor_url)

      if (professor_call_nebula.data != null){
        professor_output = professor_call_nebula.data
        break
      }
    }

  if (professor_output = null){
    for (let i = 0; i < query_extraction.length; i++) {
      first_keyword = query_extraction[i]

      first_keyword = capitalizeFirstLetter(first_keyword)

      professor_params = { first_name: first_keyword};
      professor_search_params = new URLSearchParams(professor_params);
      professor_url = 'https://api.utdnebula.com/professor/?' + professor_search_params.toString()

      console.log(professor_url)
      professor_call_nebula = await call_nebula(professor_url)

      if (professor_call_nebula.data != null){
        professor_output = professor_call_nebula.data
        break
      }
    }
  }

  console.log(professor_output)

}


main()
//console.log(professor_output)