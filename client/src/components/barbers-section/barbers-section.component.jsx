import { useEffect, useState } from 'react'
import axios from 'axios'

import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

import BarberCard from "../barber-card/barber-card.component"

import { BarberDirectorySection } from "./barbers-section.styles"

const API_URL = process.env.REACT_APP_DEV_URL || ""

const BarberSection = () => {
    const [barbersList, setBarbersList] = useState([])
    useEffect(()=>{
        try{
            axios.get(`${API_URL}/api/barbers`)
                .then(res => {
                    setBarbersList(res.data.barbers)
        })
        }
        catch(err){
            console.log(err)
        }
        
    },[])

    return (
        <BarberDirectorySection>
            <div className="titlecontainer">
                <h2 style={{color:"lightgrey"}}>Barbers</h2>
            </div>
            
            <div className="barberscontainer">
                <Row>
                    <Col lg={{span: 10, offset:1}}>
                        {
                            barbersList.map(barber=>
                                <div key={barber._id}>
                                    <BarberCard barber={barber}/>
                                    <br/>
                                </div>
                            )
                        }
                    </Col>
                </Row>
                
            </div>
        </BarberDirectorySection>
    )
}

export default BarberSection;