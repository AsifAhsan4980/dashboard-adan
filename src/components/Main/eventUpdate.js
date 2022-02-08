import React, {useEffect, useState} from "react";
import {Alert, Button, Card, Col, Form, Row} from "react-bootstrap";
import {findOneEvent, updateEvent} from "../../Api/Event";
import { useForm } from "react-hook-form";

const eventUpdate = (data) => {
    const { register, handleSubmit } = useForm({ shouldUseNativeValidation: true });
    const id = data.datas._id
    console.log(data)

    const [defaultData, setDefaultData] = useState({})
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        findOneEvent(id).then(res => {
            setDefaultData(res.data)
            console.log(defaultData)
        })
    }, [])

    const onSubmit = async data => {
        try {
            // const formData = new FormData();
            // formData.append("eventIamge", data.image[0]);
            // console.log(data.image[0])
            await updateEvent(id, data).then((res)=> {
                if (res) {
                    setSuccess(true)
                }
                else{
                    setSuccess(false)
                }
            })
        }catch (err){
            setSuccess(false)
        }

    };

    return (
        <>
            <Row className="mt-4">
                <Col>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        {success && (<Alert > Ok</Alert>)}
                        {!success && (<Alert > Something went Wrong</Alert>)}
                        <Card>
                            <Card.Body>
                                <Row>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>Announcement Name</Form.Label>
                                            <Form.Control type="name"
                                                          name="eventName"
                                                          placeholder='Announcement Name'
                                                          defaultValue={defaultData.eventName}
                                                          {...register("eventName")}

                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>Announcement Date</Form.Label>

                                            <Form.Control type="dates"
                                                          name="eventDate"
                                                          placeholder='Announcement Date'
                                                          defaultValue={defaultData.eventDate}
                                                          {...register("eventDate")}
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
                                    <Col>
                                        {/*<Form.Group controlId="formFile" className="mb-3">*/}
                                        {/*    <Form.Label>Default file input example</Form.Label>*/}
                                        {/*    <Form.Control type="file"*/}
                                        {/*                  name="image"*/}
                                        {/*                  {...register("image")}*/}

                                        {/*    />*/}
                                        {/*</Form.Group>*/}
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
                </Col>
            </Row>
        </>
    )
}
export default eventUpdate