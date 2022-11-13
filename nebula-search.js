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

  query = "is acct 2301 a hard class"

  const query_extraction =
  keyword_extractor.extract(query,{
      language:"english",
      remove_digits: false,
      return_changed_case: true,
      remove_duplicates: true
  });

  console.log(query_extraction)

  //Professor search
  professor_output = null

  //Check first and last name
  if (query_extraction.length >= 2) {
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
    }

  //Check last name
  if (professor_output == null){
    for (let i = 0; i < query_extraction.length; i++) {
      first_keyword = query_extraction[i]

      first_keyword = capitalizeFirstLetter(first_keyword)

      professor_params = { last_name: first_keyword};
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

  // Get professor's classes
  if (professor_output != null) {
    professor_course_sections = professor_output[0].sections
    
    for (let i = 0; i < course_sections.length; i++) {
      section_url = 'https://api.utdnebula.com/section/' + professor_course_sections[i]
      console.log(section_url)

      section_call_nebula = await call_nebula(section_url)
      professor_section_output = section_call_nebula.data
      console.log(professor_section_output)
    }
  }

  //Course prefix + number search
  course_output = null

  for (let i = 0; i < query_extraction.length-1; i++) {
    first_keyword = query_extraction[i]
    last_keyword = query_extraction[i+1]

    first_keyword = first_keyword.toUpperCase()
    last_keyword = last_keyword.toUpperCase()

    course_params = { subject_prefix: first_keyword, course_number: last_keyword};
    course_search_params = new URLSearchParams(course_params);
    course_url = 'https://api.utdnebula.com/course/?' + course_search_params.toString()

    console.log(course_url)
    course_call_nebula = await call_nebula(course_url)

    if (course_call_nebula.data != null){
      course_output = course_call_nebula.data
      break
    }
  }

  console.log(course_output)

  // Get course sections
  if (course_output != null) {
    course_sections = course_output[0].sections
    
    for (let i = 0; i < course_sections.length; i++) {
      section_url = 'https://api.utdnebula.com/section/' + course_sections[i]
      console.log(section_url)

      section_call_nebula = await call_nebula(section_url)
      course_section_output = section_call_nebula.data
      console.log(course_section_output)
    }
  }

}



main()