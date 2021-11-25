import React, {useEffect, useState} from "react";
import {Button, Col, Container, Form, Row, Dropdown} from "react-bootstrap";
import {isAuthenticated, userInfo} from "../utils/auth";
import {addEvent} from "../Api/Event";


const Event = () => {
    const [adanTime, setAdanTime] = useState({
        eventName: '',
        eventBody: '',
        // announcementImage: "",
        eventDate: ''
    })

    const {
        eventName, eventBody, eventImage, eventDate
    } = adanTime

    // useEffect(() => {
    //     setAdanTime({
    //         ...adanTime,
    //         announcementImage: new FormData()
    //     })
    // }, [])

    const handleChange = (e, index) => {
        const value = e.target.name === 'image' ? e.target.files[0] : e.target.value;
        // announcementImage.set(e.target.name, value);
        setAdanTime({
            ...adanTime,
            [e.target.name]: value,
        })
    }

    // const handleSubmit = e => {
    //     e.preventDefault();
    //     setAdanTime({
    //         ...adanTime
    //     })
    //     const { token } = userInfo();
    //     addAnnouncement(token, setAdanTime)
    //         .then(response => {
    //
    //             setAdanTime({
    //                 announcementName: '',
    //                 announcementBody: '',
    //                 // announcementImage: "",
    //                 announcementDate: '',
    //                 success: true
    //             })
    //         })
    //         .catch(err => console.log(err))
    // }
    function handleSubmit(e) {
        e.preventDefault();
        addEvent({ eventName, eventBody, eventImage, eventDate})
            .then(response => {
                isAuthenticated(response.data.token, () => {
                    setAdanTime({ eventName: '',
                        eventBody: '',
                        // announcementImage: "",
                        eventDate: ''
                    })
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
                        Add new prayer
                    </Button>
                </div>
            </Form>
        </Container>
    )
}
export default Event