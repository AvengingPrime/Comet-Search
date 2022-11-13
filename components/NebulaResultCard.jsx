import { useEffect, useState } from "react"
import { Divider } from "semantic-ui-react"
import { call_nebula } from "../nebula-search"
import Link from "next/link"

export const ResultType = {
    COURSE: 'COURSE',
    PROF: 'PROF'
}

const NebulaCourseResultCard = props => {
    const [sectionList, setSectionList] = useState([])
    const [profList, setProfList] = useState(null)
    const data = props.data

    useEffect(() => {
        Promise.all(data.sections.map(elem =>
            call_nebula(
                'https://api.utdnebula.com/section/' +
                elem
            ).then(json => json.data)
        )).then(values => {
            const filtered = values.filter(elem => elem.academic_session.name == '20S')
            setSectionList(filtered)
        })
    }, [])

    useEffect(() => {
        Promise.all(sectionList.map(elem =>
            call_nebula(
                'https://api.utdnebula.com/professor/' + elem.professors[0]
            ).then(json => json.data)
        )).then(values => setProfList(values))
    }, [sectionList])

    return (
        <>
            <p className="nebula-card-title nebula-course-card-title">
                {data.title}
            </p>
            <p className="nebula-card-subtitle nebula-course-card-number">
                {data.subject_prefix + ' ' + data.course_number}
            </p>
            <p className="nebula-card-text nebula-course-card-desc">
                {data.description}
            </p>
            <Divider className="nebula-card-divider" />
            <div className="nebula-course-card-sections">
                {sectionList.map((elem, i) =>
                    (<div className="nebula-course-card-section">
                        <p className="nebula-course-card-section-num">
                            {elem.section_number}
                        </p>
                        <p className="nebula-course-card-section-time">
                            {
                                elem.meetings[0].meeting_days[0] == 'Monday' ?
                                    <>MW </>
                                    : elem.meetings[0].meeting_days[0] == 'Tuesday' ?
                                        <>TTh </>
                                        : <>F </>
                            }
                            {elem.meetings[0].start_time}-{elem.meetings[0].end_time}
                        </p>
                        {profList[i] &&
                            <Link
                                href={{ pathname: 'search_results', query: { query: profList[i].first_name + ' ' + profList[i].last_name } }}
                                as={'search_results/' + profList[i].first_name + ' ' + profList[i].last_name}
                            >
                                <p className="nebula-course-card-section-prof">
                                    {profList[i].first_name + ' ' + profList[i].last_name}
                                </p>
                            </Link>
                        }
                    </div>)
                )}
            </div>
        </>
    )
}

const NebulaProfessorResultCard = props => {
    const [courses, setCourses] = useState([])
    const data = props.data

    useEffect(() => {
        Promise.all(data.sections.slice(0, 5).map(elem =>
            call_nebula('https://api.utdnebula.com/section/' + elem)
            .then(json => call_nebula('https://api.utdnebula.com/course/' + json.data.course_reference))
            .then(json => json.data.subject_prefix + ' ' + json.data.course_number)
        )).then(values => setCourses(values.filter((item,index) => values.indexOf(item) === index)))
    }, [])

    return (
        <>
            <div className="nebula-prof-card-head">
                <img src={data.image_uri} alt="professor image" loading="lazy" />
                <div className="nebula-prof-card-desc">
                    <p className="nebula-prof-card-title">
                        {data.first_name} {data.last_name}
                    </p>
                    <p className="nebula-prof-card-email">
                        {data.email}
                    </p>
                    <p className="nebula-prof-card-phone">
                        {data.phone_number}
                    </p>
                </div>
            </div>
            <Divider className="nebula-card-divider" />
            {courses.map(elem =>
                <Link
                    href={{ pathname: 'search_results', query: { query: elem } }}
                    as={'search_results/' + elem}
                >
                    <p className="nebula-prof-card-course">
                        {elem}
                    </p>
                </Link>
            )}
        </>
    )
}

export const NebulaResultCard = props => {
    const data = props.data
    let card = null

    switch (props.resultType) {
        case ResultType.COURSE:
            card = <NebulaCourseResultCard data={data} />
            break
        case ResultType.PROF:
            card = <NebulaProfessorResultCard data={data} />
            break
    }

    return (
        <div className="nebula-result-card">
            {card}
        </div>
    )
}