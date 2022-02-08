import React, {Fragment, useEffect, useState} from "react";
import {Button, Card, Row, Col, Form, Modal} from "react-bootstrap";
import AddDailyAdan from "../components/Main/AddDailyAdan";
import DayData from '../data/dayData.json'
import MonthData from "../data/month.json"
import YearData from "../data/yearData.json"
import {addAdans, getOneAdan} from "../Api/AdanTime";
import {isAuthenticated} from "../utils/auth";

import DailyData from "../components/Main/DailyData";


const UpdateDailyAdan = () => {
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
    const {level, startTime, endTime} = inputList;

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
        setAdanTime({
            ...adanTime,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        addAdans({englishDay, englishMonth, englishYear, timing, level, startTime, endTime})
            .then(response => {
                isAuthenticated(response.data.token, () => {
                    setAdanTime({
                        englishDay: '',
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



    function search() {

        const id1 = englishDay
        const id2 = englishMonth
        const id3 = englishYear
        if (id1, id2, id3) {
            getOneAdan(id1, id2, id3).then(res => {

                try {
                 const allData = res.data[0]
                    const timing = allData.timing
                    setAdanTime(allData)
                    setInputList(timing)
                    console.log(adanTime)
                } catch (err) {
                    console.log(err)
                }

            })

        }
    }

    return (
        <>
            <Button variant="primary" className="mb-4" onClick={handleShow}>
                Add Daily Adan
            </Button>

            <Modal show={show} size="lg" onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddDailyAdan/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
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
                                          name="englishDay" value={englishDay} onChange={handleChange}>
                                <option className="text-black">Select</option>
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
                                          name="englishMonth" value={englishMonth} onChange={handleChange}>
                                <option className="text-black">Select</option>
                                {
                                    MonthData.map((data, index) => {
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
                            <Form.Label>Add Year</Form.Label>
                            <Form.Control as="select" aria-label="Default select example" defaultValue="State..."
                                          name="englishYear" value={englishYear} onChange={handleChange}>
                                <option className="text-black">Select</option>
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
                <Button variant="primary" className="mb-4" onClick={search}>
                    Search
                </Button>
            </Form>
            <DailyData data={adanTime}/>
        </>
    )
}

export default UpdateDailyAdan