import React, {useEffect, useState} from "react";
import {Button, Card, Form} from "react-bootstrap";
import {addBanners} from "../Api/Banner";
import {userInfo} from "../utils/auth";
import BannerData from "../components/Main/BannerData";

const Banner = ()=> {

    const [addBanner, setAddBanner] = useState({
        firstTitle: '',
        secondTitle: '',
        formData: '',
        success: false
    });

    const { firstTitle, secondTitle, formData } = addBanner

    useEffect(() => {
        setAddBanner({
            ...addBanner,
            formData: new FormData()
        })
    }, [])

    const handleChange = (e, index) => {
        const value = e.target.name === 'image' ? e.target.files[0] : e.target.value;
        formData.set(e.target.name, value);
        setAddBanner({
            ...addBanner,
            [e.target.name]: value,
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        setAddBanner({
            ...addBanner
        })
        const { token } = userInfo();
        addBanners(token, formData)
            .then(response => {
                setAddBanner({
                    firstTitle: '',
                    secondTitle: '',
                    success: true,
                })
            })
            .catch(err => console.log(err))
    }
    return(
        <>
            <Card>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Default file input example</Form.Label>
                            <Form.Control type="file" name="image" onChange={handleChange} />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Add
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            <BannerData/>
        </>
    )
}
export default Banner