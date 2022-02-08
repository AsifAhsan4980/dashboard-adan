import React, {Fragment, useEffect, useState} from "react";
import {Alert, Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {addBanners} from "../Api/Banner";
import BannerData from "../components/Main/BannerData";
import {useHistory} from "react-router-dom";

const Banner = () => {
    const [values, setValues] = useState({
        success: false,
    })
    const { success } = values;
    const [adanTime, setAdanTime] = useState({
        formData: '',
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
    const history = useHistory();
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
                setValues({
                    success: true,
                })
                window.location.reload();
            })
            .catch(err => console.log(err))
    }

    const addNewBanner = () => (
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
    console.log(adanTime)
    const showSuccess = () => {
        console.log(success)
        if (success) return (<>
                <Alert variant='success'>
                    Banner successfully added
                </Alert>
            </>

        )
    }

    return (
        <div>
            {showSuccess()}
            {addNewBanner()}
        </div>
    )
}
export default Banner