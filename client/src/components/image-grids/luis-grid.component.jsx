import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Figure from 'react-bootstrap/Figure'

import image1 from "../../assets/Barbers/Luis/1.jpg"
import image2 from "../../assets/Barbers/Luis/2.jpg"
import image3 from "../../assets/Barbers/Luis/3.jpg"
import image4 from "../../assets/Barbers/Luis/4.jpg"
import image5 from "../../assets/Barbers/Luis/5.jpg"
import image6 from "../../assets/Barbers/Luis/6.jpg"

const InstagramGrid = (props) => {
    const { name } = props
    

    const imageFilenames = [
        image1,
        image2,
        image3,
        image4,
        image5,
        image6
      ];

    return (
        <div className="container">
            <Row>
                { imageFilenames.map((img, index) => (
                    <Col md={4} key={index}>
                        <Figure>
                            <Figure.Image
                                src={img}
                                alt={`Image ${index + 1}`}
                            />
                        </Figure>
                    </Col>
                ))
                }
            </Row>
        </div>
    );
}

export default InstagramGrid;