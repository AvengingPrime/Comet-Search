import React from 'react'
import {Header, Icon, Button, Segment, Image} from 'semantic-ui-react'

export default function JupiterCard(props)
{
    const orgs = props.orgs
    
    return (
        <Segment.Group>
            {orgs.map((org) => (
                <Segment key = {org}>
                    <Header>
                        <Image circular src = {org.image} href = 'https://dev.jupiter.utdnebula.com/directory'/> {org.name}
                    </Header>
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