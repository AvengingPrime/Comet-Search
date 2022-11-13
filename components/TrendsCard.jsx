import {React} from 'react'
import {Container, Header, Icon, Button, Segment, Image} from 'semantic-ui-react'

export default function GuideCard(props)
{
    const articles = props.articles

    return (
        <Segment.Group size = {'huge'}>
            {articles.map((article) => (
                <Segment key = {article}>
                    <Header href = 'https://dev.guide.utdnebula.com/'>
                        {article.title}<br/><br/>
                    </Header>
                    {/* <Container> */}
                    {article.text}<br/><br/>
                    {/* </Container> */}
                </Segment>))}
        </Segment.Group>
    );
}