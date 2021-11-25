import React, {useEffect, useState} from "react";
import {Button, Card, Row, Col, Form, Modal} from "react-bootstrap";
import DayData from '../data/dayData.json'
import MonthData from "../data/month.json"
import YearData from "../data/yearData.json"
import AdanData from "../data/adanData.json"
import {addAdans} from "../Api/AdanTime";
import {isAuthenticated} from "../utils/auth";
import AddRamadan from "../components/Main/addRamadan";
import './product.css'


const Ramadan = () => {
    const [adanTime, setAdanTime] = useState({
        englishDay: '',
        englishMonth: '',
        englishYear: "",
        timing: [],
    })

    const {
        englishDay, englishMonth, englishYear, timing
    } = adanTime

    const [inputList, setInputList] = useState([{
        level: "level",
        startTime: "time",
        endTime: "time"
    }]);

    const [show, setShow] = useState(false);
    const {lstartTime, endTime} = inputList;


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleInputChange = (e, index) => {
        const {name, value} = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
        setAdanTime({
            ...adanTime,
            timing: inputList
        })
    };


    const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };

    const handleAddClick = () => {
        setInputList([...inputList, {
            level: "level",
            startTime: "time",
            endTime: "time"
        }])
    };


    const handleChange = (e, index) => {
        const value = e.target.name === 'image' ? e.target.files[0] : e.target.value;
        setAdanTime({
            ...adanTime,
            [e.target.name]: value,
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        addAdans({ englishDay, englishMonth, englishYear, timing, level, startTime,endTime})
            .then(response => {
                isAuthenticated(response.data.token, () => {
                    setAdanTime({englishDay: '',
                        englishMonth: '',
                        englishYear: "",
                        timing: inputList,
                        level: "",
                        startTime: "",
                        endTime: "",
                        success: true,
                    })
                })
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <Button variant="primary" className="mb-4" onClick={handleShow}>
                Add Jummah
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddRamadan/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            <Form onSubmit={handleSubmit}>
                <Form.Label className="text-center">Update Adan</Form.Label>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="addGame">
                            <Form.Label>Add Day</Form.Label>
                            <Form.Control as="select" aria-label="Default select example" defaultValue="State..."
                                          name="type">
                                {
                                    DayData.map((data, index) => {
                                            return (
                                                <option key={index} className="text-black">{data.day}</option>
                                            )
                                        }
                                    )
                                }
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="addCategory">
                            <Form.Label>Add Month</Form.Label>
                            <Form.Control as="select" aria-label="Default select example" defaultValue="State..."
                                          name="type">

                                {
                                    MonthData.map((data, index) => {
                                            return (
                                                <option key={index} className="text-black">{data.name}</option>
                                            )
                                        }
                                    )
                                }
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="addCategory">
                            <Form.Label>Add Year</Form.Label>
                            <Form.Control as="select" aria-label="Default select example" defaultValue="State..."
                                          name="type">
                                {
                                    YearData.map((data, index) => {
                                            return (
                                                <option key={index} className="text-black">{data.year}</option>
                                            )
                                        }
                                    )
                                }
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Button variant="primary" className="mb-4">
                    Search
                </Button>
            </Form>
            <Card>
                <Card.Body>
                    {inputList.map((x, i) => {
                        return (
                            <Row key={i}>
                                <Col>
                                    <Form.Group className="mb-3" controlId="addCategory">
                                        <Form.Label>Adan</Form.Label>
                                        <Form.Control as="select" aria-label="Default select example"
                                                      defaultValue="State..."
                                                      name="type">
                                            {
                                                AdanData.map((data, index) => {
                                                        return (
                                                            <option key={index} className="text-black">{data.label}</option>
                                                        )
                                                    }
                                                )
                                            }
                                        </Form.Control>
                                    </Form.Group>
                                </Col> <Col>
                                <Form.Group className="mb-3" controlId="addCategory">
                                    <Form.Label>Start Time</Form.Label>
                                    <Form.Control type="option" name="option" placeholder="Start time"
                                                  onChange={e => handleInputChange(e, i)}/>
                                </Form.Group>
                            </Col>

                                <Col className="btn-box">
                                    <Form.Group className="mb-3" controlId="addCategory">
                                        <Form.Label>EndTime</Form.Label>
                                        <Form.Control type="price" name="price" placeholder="End time"
                                                      onChange={e => handleInputChange(e, i)}/>
                                    </Form.Group>
                                </Col>
                                <Col className="mt-4">
                                    {inputList.length !== 1 && <Button
                                        className="mr10"
                                        onClick={() => handleRemoveClick(i)}>Remove</Button>}
                                    {inputList.length - 1 === i &&
                                    <Button key={i} onClick={handleAddClick}>Add</Button>}
                                </Col>
                            </Row>


                        )
                            ;
                    })}

                    <div className='d-flex justify-content-around'>
                        <div>
                            <Button variant="primary" className="mb-4">
                                Delete
                            </Button>
                        </div>
                        <div>
                            <Button variant="primary" className="mb-4">
                                Update
                            </Button>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </>
    )
}

export default Ramadan