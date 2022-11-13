const keyword_extractor = require("keyword-extractor")

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
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

async function getCoursesAndProfs(query) {
    const query_extraction = keyword_extractor.extract(query, {
        language: "english",
        remove_digits: false,
        return_changed_case: true,
        remove_duplicates: true
    });

    console.log(query_extraction)

    //Professor search
    let professor_output = null

    //Check first and last name
    if (query_extraction.length >= 2) {
        for (let i = 0; i < query_extraction.length - 1; i++) {
            let first_keyword = query_extraction[i]
            let last_keyword = query_extraction[i + 1]

            first_keyword = capitalizeFirstLetter(first_keyword)
            last_keyword = capitalizeFirstLetter(last_keyword)

            const professor_params = { first_name: first_keyword, last_name: last_keyword };
            const professor_search_params = new URLSearchParams(professor_params);
            const professor_url = 'https://api.utdnebula.com/professor?' + professor_search_params.toString()

            console.log(professor_url)
            
            const professor_call_nebula = await call_nebula(professor_url)

            if (professor_call_nebula.data != null) {
                professor_output = professor_call_nebula.data[0]
                break
            }
        }
    }

    //Check last name
    if (professor_output == null) {
        for (let i = 0; i < query_extraction.length; i++) {
            let first_keyword = query_extraction[i]
            first_keyword = capitalizeFirstLetter(first_keyword)
            console.log(first_keyword)

            const professor_params = { last_name: first_keyword };
            const professor_search_params = new URLSearchParams(professor_params);
            const professor_url = 'https://api.utdnebula.com/professor?' + professor_search_params.toString()

            console.log(professor_url)
            
            const professor_call_nebula = await call_nebula(professor_url)

            if (professor_call_nebula.data != null) {
                professor_output = professor_call_nebula.data[0]
                break
            }
        }
    }

    console.log(professor_output)

    /* Get professor's classes
    course_sections = course_output[0].sections
    course_internal_class_number = course_output[0].internal_course_number	
  
    for (let i = 0; i < course_sections.length; i++) {
      section_params = { internal_class_number: course_internal_class_number};
      section_search_params = new URLSearchParams(section_params);
      section_url = 'https://api.utdnebula.com/section/?' + section_search_params.toString()
  
      section_call_nebula = await call_nebula(section_url)
      section_output = section_call_nebula.data
      console.log(section_output)
    }*/

    //Course prefix + number search
    let course_output = null

    for (let i = 0; i < query_extraction.length - 1; i++) {
        let first_keyword = query_extraction[i]
        let last_keyword = query_extraction[i + 1]

        first_keyword = first_keyword.toUpperCase()
        last_keyword = last_keyword.toUpperCase()

        const course_params = { subject_prefix: first_keyword, course_number: last_keyword };
        const course_search_params = new URLSearchParams(course_params);
        const course_url = 'https://api.utdnebula.com/course?' + course_search_params.toString()

        console.log(course_url)

        const course_call_nebula = await call_nebula(course_url)

        if (course_call_nebula.data != null) {
            course_output = course_call_nebula.data[0]
            break
        }
    }

    console.log(course_output)

    /* Get course sections
    course_sections = course_output[0].sections
    course_internal_class_number = course_output[0].internal_course_number	
  
    for (let i = 0; i < course_sections.length; i++) {
      section_params = { internal_class_number: course_internal_class_number};
      section_search_params = new URLSearchParams(section_params);
      section_url = 'https://api.utdnebula.com/section/?' + section_search_params.toString()
  
      section_call_nebula = await call_nebula(section_url)
      section_output = section_call_nebula.data
      console.log(section_output)
    }*/

    return { prof: professor_output, course: course_output }
}

export default getCoursesAndProfs