import { useEffect, useState } from "react"
import { Divider } from "semantic-ui-react"

export const ResultType = {
    COURSE: 'COURSE',
    PROF: 'PROF'
}

const NebulaCourseResultCard = props => {
    const [sectionList, setSectionList] = useState([])

    const data = props.data

    return (
        <>
            <p className="nebula-card-title nebula-course-card-title">
                data.title
            </p>
            <p className="nebula-card-subtitle nebula-course-card-number">
                data.subject_prefix + ' ' data.course_number
            </p>
            <p className="nebula-card-text nebula-course-card-desc">
                data.description
            </p>
            <Divider className="nebula-card-title-divider"/>
            <div className="nebula-course-card-sections">
                {data.sections.map((elem) => {
                    (<>
                        <p className="nebula-course-card-section-num">
                            elem.section_number
                        </p>
                        <p className="nebula-course-card-section-time">
                            {
                                elem.meetings[0].meeting_days[0] == 'Monday'?
                                    (MW )
                                    : elem.meetings[0].meeting_days[0] == 'Tuesday'?
                                        (TTh )
                                        : (F )
                            }
                            {elem.meetings[0].start_time}-{elem.meetings[0].end_time}
                        </p>
                        <p className="nebula-course-card-section-prof">
                            blah
                        </p>
                    </>)
                })}
            </div>
        </>
    )
}

const NebulaProfessorResultCard = props => {
    const data = props.data

    return (
        <>
            <p className="nebula-card-title nebula-prof-card-title">
                {data.first_name} {data.last_name}
            </p>
            <div>
                
            </div>
        </>
    )
}

export const NebulaResultCard = props => {
    const data = props.data
    let card = null

    switch (props.resultType) {
        case ResultType.COURSE:
            card = <NebulaCourseResultCard data={data}/>
            break
        case ResultType.PROF:
            card = <NebulaProfessorResultCard data={data}/>
            break
    }

    return (
        <div className="nebula-result-card">
            {card}
        </div>
    )
}