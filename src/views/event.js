import React, {useEffect, useState} from "react";
import {Button, Col, Container, Form, Row, Dropdown, Alert} from "react-bootstrap";
import {isAuthenticated, userInfo} from "../utils/auth";
import {addEvent} from "../Api/Event";
import {addAdans} from "../Api/AdanTime";
import EventData from "../components/Main/EventData";
import {showSuccess} from "../utils/message";


const Event = () => {
    const [values, setValues] = useState({
        success: false,
    })
    const { success } = values;
    const [adanTime, setAdanTime] = useState({
        eventName: '',
        eventBody: '',
        eventDate: '',
        formData: '',
        eventTime:'',
        success: false
    })

    const {
        eventName, eventBody,  eventDate, formData, eventTime
    } = adanTime

    useEffect(() => {
        setAdanTime({
            ...adanTime,
            formData: new FormData()
        })
    }, [])

    const handleChange = (e, index) => {
        const value = e.target.name === 'image' ? e.target.files[0] : e.target.value;
        formData.set(e.target.name, value);
        setAdanTime({
            ...adanTime,
            [e.target.name]: value,
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        setAdanTime({
            ...adanTime
        })

        addEvent( formData)
            .then(response => {
                setAdanTime({
                    eventName: '',
                    eventBody: '',
                    eventDate: '',
                    eventTime: '',
                })
                setValues({
                    success: true,
                })
            })
            .catch(err => console.log(err))
    }
    const addEvents = () => (
        <Container fluid>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="addCategory">
                            <Form.Label>Event name</Form.Label>
                            <Form.Control type="price" name="eventName" placeholder="End time"
                                          value={eventName} onChange={handleChange}/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="addCategory">
                            <Form.Label>Event Date</Form.Label>
                            <Form.Control type="price" name="eventDate" placeholder="End time"
                                          value={eventDate}onChange={handleChange}/>
                        </Form.Group>

                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="addCategory">
                            <Form.Label>Event Time</Form.Label>
                            <Form.Control type="price" name="eventTime" placeholder="End time"
                                          value={eventTime}onChange={handleChange}/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} value={eventBody} name="eventBody" onChange={handleChange} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Default file input example</Form.Label>
                            <Form.Control type="file" name="image" onChange={handleChange} />
                        </Form.Group>
                    </Col>
                </Row>

                <div>
                    <Button type="submit" variant="primary">
                        Add new Event
                    </Button>
                </div>
            </Form>
            <div className='mt-4'>
                <div className="text-center">All Events</div>
                <EventData />
            </div>

        </Container>
    )
    const showSuccess = () => {
        console.log(success)
        if (success) return (<>
                <Alert variant='success'>
                    Event successfully added
                </Alert>
            </>

        )
    }

    return (
        <div>
            {showSuccess()}
            {addEvents()}
        </div>
    )
}
export default Event
