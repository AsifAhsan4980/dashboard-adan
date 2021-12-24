import React, {useEffect, useState} from "react";
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import {addAnnouncement, findOneAnnouncement, updateAnnouncement} from "../../Api/Announcement";


const AnnounceUpdate = (data) => {

    const id = data.data
    const [announcement, setAnnouncement] = useState({
            eventName: '',
            eventBody: '',
            eventDate: '',
            formData: '',
            success: false
        }
    )
    const [formData, setFormData] = useState()
    useEffect(async () => {
        await findOneAnnouncement(id).then(res => {
            setAnnouncement(res.data)
        })
    }, []);
    console.log(announcement)


    // useEffect(() => {
    //     setAnnouncement({
    //         ...announcement,
    //         formData: new FormData()
    //     })
    // }, [])
    //
    // const handleInputChange = (e, index) => {
    //     const value = e.target.name === 'image' ? e.target.files[0] : e.target.value;
    //     formData.set(e.target.name, value);
    //     setAnnouncement({
    //         ...announcement,
    //         [e.target.name]: value,
    //     })
    // }

    const update = e => {
        e.preventDefault();
        setAdanTime({
            ...adanTime
        })

        updateAnnouncement(id, formData)
            .then(response => {
                setAdanTime({
                    eventName: '',
                    eventBody: '',
                    eventDate: '',
                    success: true
                })
            })
            .catch(err => console.log(err))
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
                                                          placeholder={announcement.eventName}
                                                          defaultValue={announcement.eventName}
                                                          value={announcement.eventName}
                                                          onChange={e => handleInputChange(e)}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>Start Time</Form.Label>
                                            <Form.Control type="option" name="eventDate"
                                                          placeholder={announcement.eventDate}
                                                          defaultValue={announcement.eventDate}
                                                          value={announcement.eventDate}
                                                // onChange={e => handleInputChange(e)}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>Start Time</Form.Label>
                                            <Form.Control as="textarea" type="option" name="eventBody"
                                                          placeholder={announcement.eventBody}
                                                          defaultValue={announcement.eventBody}
                                                          value={announcement.eventBody}
                                                // onChange={e => handleInputChange(e)}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="formFile" className="mb-3">
                                            <Form.Label>Default file input example</Form.Label>
                                            <Form.Control type="file" name="image"
                                                // onChange={e => handleInputChange(e)}
                                            />
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