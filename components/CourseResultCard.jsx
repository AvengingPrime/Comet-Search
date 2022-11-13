import { useState } from "react"

const CourseResultCard = props => {
    const [sectionList, setSectionList] = useState([])

    return (
        <>
            <p className="nebula-card-title nebula-course-card-title">
                props.title
            </p>
            <p className="nebula-card-subtitle nebula-course-card-number">
                props.subject_prefix + ' ' props.course_number
            </p>
            <p className="nebula-card-text nebula-course-card-desc">
                props.description
            </p>
            <Divider className="nebula-card-title-divider"/>
            <div className="nebula-course-card-sections">
                {props.sections.map((elem) => {
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

export default CourseResultCard