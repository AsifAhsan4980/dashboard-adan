import React, {useEffect, useState} from "react";
import {Button, Col, Container, Form, Row, Dropdown} from "react-bootstrap";
import {addAnnouncement} from "../Api/Announcement";
import {addEvent} from "../Api/Event";
import AnnouncementData from "../components/Main/AnnouncementData";
import {showSuccess} from "../utils/message";


const Announcement = () => {
    const [adanTime, setAdanTime] = useState({
        eventName: '',
        eventBody: '',
        eventDate: '',
        eventTime:'',
        formData: '',
        success: false
    })

    const {
        eventName, eventBody,  eventDate, eventTime, formData
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

        addAnnouncement(formData)
            .then(response => {
                setAdanTime({
                    eventName: '',
                    eventBody: '',
                    eventDate: '',
                    eventTime:'',
                    success: true
                })
            })
            .catch(err => console.log(err))
    }
    console.log(adanTime)
    return (
        <Container fluid>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="addCategory">
                            <Form.Label>Announcement name</Form.Label>
                            <Form.Control type="price" name="eventName" placeholder="End time"
                                          value={eventName} onChange={handleChange}/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="addCategory">
                            <Form.Label>Announcement Date</Form.Label>
                            <Form.Control type="price" name="eventDate" placeholder="End time"
                                          value={eventDate}onChange={handleChange}/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="addCategory">
                            <Form.Label>Announcement Time</Form.Label>
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
                            <Form.Label>Upload Image</Form.Label>
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
            <AnnouncementData/>
        </Container>
    )
}

export default Announcement
