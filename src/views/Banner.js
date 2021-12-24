import React, {Fragment, useEffect, useState} from "react";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {addBanners} from "../Api/Banner";
import BannerData from "../components/Main/BannerData";

const Banner = () => {

    const [adanTime, setAdanTime] = useState({
        formData: '',
        success: false
    })

    const {
        formData
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

        addBanners( formData)
            .then(response => {
                setAdanTime({
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
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Default file input example</Form.Label>
                            <Form.Control type="file" name="image" onChange={handleChange} />
                        </Form.Group>
                    </Col>
                </Row>

                <div>
                    <Button type="submit" variant="primary">
                        Add new Banner
                    </Button>
                </div>
            </Form>
            <BannerData/>
        </Container>
    )
}
export default Banner