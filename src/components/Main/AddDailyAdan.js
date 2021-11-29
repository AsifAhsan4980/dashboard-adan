import React, {useEffect, useState} from "react";
import {Button, Col, Container, Form, Row, Dropdown} from "react-bootstrap";
import DayData from '../../data/dayData.json'
import MonthData from "../../data/month.json"
import YearData from "../../data/yearData.json"
import AdanData from "../../data/adanData.json"
import {addAdans} from "../../Api/AdanTime";
import {isAuthenticated} from "../../utils/auth";

const AddDailyAdan = () => {

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
        level: " ",
        startTime: " ",
        endTime: " "
    }]);

    const {level, startTime, endTime} = inputList;



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
            level: " ",
            startTime: " ",
            endTime: " "
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
console.log(adanTime)
    return (
        <Container fluid>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="addGame">
                            <Form.Label>Add Day</Form.Label>
                            <Form.Control as="select" aria-label="Default select example" defaultValue="State..."
                                          name="englishDay" value={englishDay} onChange={handleChange}>
                                <option>Select Day</option>
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
                                <option>Select Month</option>
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
                                <option>Select year</option>
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

                {inputList.map((x, i) => {
                    return (
                        <Row key={i}>
                            <Col>
                                <Form.Group className="mb-3" controlId="addCategory">
                                    <Form.Label>Adan</Form.Label>
                                    <Form.Control as="select" aria-label="Default select example"
                                                  defaultValue="State..."
                                                  name="level" value={level} onChange={e => handleInputChange(e, i)}>
                                        <option>Select Adan Name</option>
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
                                <Form.Control type="option" name="startTime" placeholder="Start time"
                                              value={startTime} onChange={e => handleInputChange(e, i)}/>
                            </Form.Group>
                        </Col>

                            <Col className="btn-box">
                                <Form.Group className="mb-3" controlId="addCategory">
                                    <Form.Label>EndTime</Form.Label>
                                    <Form.Control type="price" name="endTime" placeholder="End time"
                                                  value={endTime} onChange={e => handleInputChange(e, i)}/>
                                </Form.Group>
                            </Col>
                            <Col className="mt-4">
                                {inputList.length !== 1 && <Button
                                    className="mr10"
                                    onClick={() => handleRemoveClick(i)}>Remove</Button>}
                                {inputList.length - 1 === i && <Button key={i} onClick={handleAddClick}>Add</Button>}
                            </Col>
                        </Row>


                    )
                        ;
                })}

                <div>
                    <Button type="submit" variant="primary">
                        Add new prayer
                    </Button>
                </div>
            </Form>
        </Container>
    )
}
export default AddDailyAdan