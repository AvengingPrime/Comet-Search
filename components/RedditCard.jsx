import { useEffect, useState } from "react"
import { Divider } from "semantic-ui-react"
import { call_reddit, getRedditPosts } from "../reddit-search"

const RedditCard = props => {
    const [redditPostList, setRedditPostList] = useState([])
    {/*const [commentsList, setCommentsList] = useState([])*/}
    const data = props.data

    const query = 'classes-to-take'

    useEffect(() => {
       getRedditPosts(query)
       .then(json => {
            console.log(json.data)
            Promise.all(json.data.map(elem =>
                call_reddit(
                    'http://localhost:5000/query/' +
                    query
                ).then(values => {
                    setRedditPostList(values.data)
                })
            ))
        })
    }, [])

    return (
        <>
            <Divider className="reddit-card-divider" />
            <div className="reddit-card-post">
                {redditPostList.map((elem) => {
                    (<div className="reddit-post">
                        <p className="reddit-title">
                            {elem.title}
                        </p>
                    </div>)
                })}
            </div>
            {/* <Divider className="reddit-card-divider" />
            <div className="reddit-card-comments">
                {commentsList.map((elem, i) => {
                    (<div className="reddit-card-comment">
                        <p className="nebula-course-comment-text">
                            {elem.comments[i]}
                        </p>
                    </div>)
                })}
            </div>*/}
        </>
    )
}

export default RedditCard