import { useState, useEffect } from 'react';
import axios from 'axios'

import Tab from 'react-bootstrap/Tab';

import BarberCard from "../barber-card/barber-card.component"

import { BarbersTab } from './barbers-tabs.styles';

const API_URL = process.env.REACT_APP_DEV_URL || ""

function BarbersTabs() {
    const [key, setKey] = useState('Enrique');
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
        <BarbersTab
        id="controlled-tab-example"
        variant='underline'
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="xs-auto"
        >
        {
            barbersList.map(barber=>
                <Tab key={barber._id} eventKey={barber.name} title={barber.name}>
                    <BarberCard barber={barber}/>
                </Tab>
            )
        }
        </BarbersTab>
    );
}

export default BarbersTabs;