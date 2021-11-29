import React, {useEffect, useState} from "react";
import {Button, Card, Col, Form, Row} from "react-bootstrap";



const AnnounceUpdate = (datas) => {
    console.log(datas.datas)

    const [events, setEvents] = useState({
        eventName: '',
        eventBody: '',
        eventDate: '',
        formData: '',
        success: false
    })
    const {eventName, eventBody, eventDate, formData} = events

    useEffect(() => {
        setEvents({
            ...events,
            formData: new FormData()
        })
    }, [])

    useEffect(async () => {
        setEvents(datas.datas)
    },[events])


    function handleInputChange(e) {
        setEvents({ ...eventName, [e.target.name]: e.target.value });
    }

    function update() {

    }

    return (
        <>
            <Row className="mt-4">
                <Col>
                    <Form>
                        <Card>
                            <Card.Body>
                                <Row>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>Start Time</Form.Label>
                                            <Form.Control type="option" name="eventName"
                                                          placeholder={eventName}
                                                          defaultValue={eventName}
                                                          value={eventName}
                                                          onChange={e => handleInputChange(e)}/>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>Start Time</Form.Label>
                                            <Form.Control type="option" name="eventDate"
                                                          placeholder={eventDate}
                                                          defaultValue={eventDate}
                                                          value={eventDate}
                                                          onChange={e => handleInputChange(e)}/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>Start Time</Form.Label>
                                            <Form.Control as="textarea" type="option" name="eventBody"
                                                          placeholder={eventBody}
                                                          defaultValue={eventBody}
                                                          value={eventBody}
                                                          onChange={e => handleInputChange(e)}/>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="formFile" className="mb-3">
                                            <Form.Label>Default file input example</Form.Label>
                                            <Form.Control type="file" name="image"
                                                          onChange={e => handleInputChange(e)}/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <div className="d-flex justify-content-around">
                                    <div>
                                        <Button variant="outline-danger" onClick={update}>Update?</Button>
                                    </div>
                                </div>

                            </Card.Body>
                        </Card>
                    </Form>
                </Col>

            </Row>
        </>
    )
}
export default AnnounceUpdate