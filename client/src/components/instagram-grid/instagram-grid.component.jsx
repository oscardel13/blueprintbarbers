import { useState, useEffect, useRef } from 'react'
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Figure from 'react-bootstrap/Figure'
import axios from 'axios'

import InstagramFeed from '../instagram-feed/instagram-feed.component'

const InstagramGrid = (props) => {
    const [feeds, setFeedsData] = useState([])
    //use useRef to store the latest value of the prop without firing the effect
    const tokenProp = useRef(props.token);
    tokenProp.current = props.token;
    useEffect(() => {
        // this is to avoid memory leaks
        const abortController = new AbortController();

        async function fetchInstagramPost () {
          try{
            axios
                .get(`https://graph.instagram.com/me/media?fields=id,media_type,media_url,caption&limit=${props.limit}&access_token=${props.token}`)
                .then((resp) => {
                    setFeedsData(resp.data.data)
                })
          } catch (err) {
              console.log('error', err)
          }
        }
        
        // manually call the fecth function 
        fetchInstagramPost();
  
        return () => {
            // cancel pending fetch request on component unmount
            abortController.abort(); 
        };
    }, [props.limit])

    return (
        <div className="container">
            <Row>
                {feeds.map((feed) => (
                    <Col md={4}>
                        <Figure>
                            <InstagramFeed key={feed.id} feed={feed} />
                        </Figure>
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default InstagramGrid;