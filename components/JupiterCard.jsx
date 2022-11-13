import React from 'react'
import {Container, Header, Icon, Button, Segment, Image} from 'semantic-ui-react'

export default function JupiterCard(props)
{
    const orgs = props.orgs

    return (
        <Segment.Group>
            {orgs.map((org) => (
                <Segment key = {org}>
                    <Header>
                        <Image circular src = {org.logo} href = 'https://dev.jupiter.utdnebula.com/directory'/> {org.name}
                    </Header>
                    {/* <Container> */}
                    {org.description}<br/><br/>
                    {/* </Container> */}
                    <Button 
                        icon labelPosition='left' 
                        href = {org.url}>
                        <Icon name='discord'/>
                        Join
                    </Button>
                </Segment>))}
        </Segment.Group>
    );
}