import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Figure from 'react-bootstrap/Figure'

import InstagramFeed from '../instagram-feed/instagram-feed.component'

const InstagramGrid = (props) => {
    const { posts } = props

    return (
        <div className="container">
            <Row>
                { posts ? posts.map((post) => (
                    <Col md={4} key={post.id}>
                        <Figure>
                            <InstagramFeed key={post.id} feed={post} />
                        </Figure>
                    </Col>
                )): <></>
                }
            </Row>
        </div>
    );
}

export default InstagramGrid;