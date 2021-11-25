import React, {useEffect, useState} from "react";
import {Button, Col, Container, Form, Row, Dropdown} from "react-bootstrap";
import {isAuthenticated, userInfo} from "../utils/auth";
import {addAnnouncement} from "../Api/Announcement";


const Announcement = () => {
    const [adanTime, setAdanTime] = useState({
        announcementName: '',
        announcementBody: '',
        // announcementImage: "",
        announcementDate: ''
    })

    const {
        announcementName, announcementBody, announcementImage, announcementDate
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
        addAnnouncement({ announcementName, announcementBody, announcementDate})
            .then(response => {
                isAuthenticated(response.data.token, () => {
                    setAdanTime({announcementName: '',
                        announcementBody: '',
                        announcementDate: "",
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
                            <Form.Label>Announcement name</Form.Label>
                            <Form.Control type="price" name="announcementName" placeholder="End time"
                                          value={announcementName} onChange={handleChange}/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="addCategory">
                            <Form.Label>Announcement Date</Form.Label>
                            <Form.Control type="price" name="announcementDate" placeholder="End time"
                                          value={announcementDate}onChange={handleChange}/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} value={announcementBody} name="announcementBody" onChange={handleChange} />
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
export default Announcement