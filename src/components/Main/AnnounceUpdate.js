import React, {useEffect, useState} from "react";
import {Alert, Button, Card, Col, Form, Row} from "react-bootstrap";
import {findOneAnnouncement, updateAnnouncement, updateAnnouncementImage} from "../../Api/Announcement";
import {useForm} from "react-hook-form";


const AnnounceUpdate = (data) => {
    const {register, handleSubmit} = useForm({shouldUseNativeValidation: true});
    const id = data.data

    const [defaultData, setDefaultData] = useState({})
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        findOneAnnouncement(id).then(res => {
            setDefaultData(res.data)
        })
    }, [])

    console.log(defaultData)

    const onSubmit = async data => {
        try {
            await updateAnnouncement(id, data).then((res) => {
                if (res) {
                    setSuccess(true)
                } else {
                    setSuccess(false)
                }
            })
        } catch (err) {
            setSuccess(false)
        }

    };

    const [image, setImage] = useState({})
    const {eventImage} = image
    const formData = new FormData
    function handleChange(e) {
        const value = e.target.name === 'image' ? e.target.files[0] : e.target.value;
        console.log(value)
        setImage({
            ...image,
            [e.target.name]: value,
        })
    }

    function uploadImage() {
        console.log(image)
        // formData.append('eventImage', [image])
        updateAnnouncementImage(id, image).then(r => console.log(r.data))
    }



    return (
        <>
            <Row>
                <Col>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        {success && (<Alert> Ok</Alert>)}
                        {!success && (<Alert> Something went Wrong</Alert>)}
                        <Card>
                            <Card.Body>
                                <Row>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>Announcement Name</Form.Label>
                                            <Form.Control type="name"
                                                          name="eventName"
                                                          placeholder='Announcement Name'
                                                          value={defaultData.eventName}

                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>Announcement Date</Form.Label>

                                            <Form.Control type="dates"
                                                          name="eventImage"
                                                          placeholder='Announcement Date'
                                                          defaultValue={defaultData.eventDate}
                                                          {...register("eventImage ")}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>Announcement Time</Form.Label>

                                            <Form.Control type="option"
                                                          time="eventDate"
                                                          placeholder='Announcement Time'
                                                          defaultValue={defaultData.eventTime}
                                                          {...register("eventTime")}

                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>Announcement Body</Form.Label>
                                            <Form.Control as="textarea"
                                                          type="option"
                                                          name="eventBody"
                                                          placeholder='Announcement Body'
                                                          defaultValue={defaultData.eventBody}
                                                          {...register("eventBody")}
                                            />
                                        </Form.Group>
                                    </Col>

                                </Row>
                                <div className="d-flex justify-content-around">
                                    <div>
                                        <Button variant="outline-danger" type='submit'>Update?</Button>
                                    </div>
                                </div>

                            </Card.Body>
                        </Card>
                    </Form>
                    <Card>
                        <Row>
                            <Col>
                                <img src={`${defaultData.eventImage}`} alt='img'/>
                            </Col>
                            <Col>
                                <Col>
                                    <Form.Group controlId="formFile" className="mb-3">
                                        <Form.Label>Default file input example</Form.Label>
                                        <Form.Control type="file"
                                                      name="image"
                                                      onChange={e=>handleChange(e)}
                                        />
                                    </Form.Group>
                                    <Button onClick={uploadImage} className="mb-4" variant="primary">Upload
                                        Photo</Button>
                                </Col>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </>
    )
}
export default AnnounceUpdate
