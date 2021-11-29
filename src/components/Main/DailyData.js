import React, {useEffect, useState} from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import AdanData from "../../data/adanData.json";
import DayData from "../../data/dayData.json";
import MonthData from "../../data/month.json";
import YearData from "../../data/yearData.json";
import {deleteAdans, updateProductss} from "../../Api/AdanTime";
import {isAuthenticated} from "../../utils/auth";

const DailyData = (allData) => {
    const data = allData.data
    const [adanTime, setAdanTime] = useState({
        englishDay: '',
        englishMonth: '',
        englishYear: "",
        arabDay: '',
        arabMonth: '',
        arabYear: "",
        timing: [],
    })

    const {
        englishDay, englishMonth, englishYear, prayer
    } = adanTime
    const [inputList, setInputList] = useState([{
        level: "",
        startTime: "",
        endTime: ""
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
            level: "",
            startTime: "",
            endTime: ""
        }])
    };

    useEffect(() => {
        setAdanTime(data)
        const timing = data.timing
        setInputList(timing)
        console.log(timing)
        // timing && timing.map((data)=>{
        //     setInputList(data)
        // })
    })

    const handleChange = (e, index) => {
        setAdanTime({
            ...adanTime,
            [e.target.name]: e.target.value,
        })
    }
    console.log(data)

    function updateChange(e) {
        e.preventDefault();
        const id = data._id
        console.log(id)
        updateProductss(id, adanTime).then(res => {
            isAuthenticated(res.data.token, () => {
                setAdanTime({
                    englishDay: '',
                    englishMonth: '',
                    englishYear: "",
                    arabDay: '',
                    arabMonth: '',
                    arabYear: "",
                    timing: [],
                })
            })
        }).catch(err => console.log(err))
    }

    function deleteAdan(e) {
        e.preventDefault();
        const id = data._id
        deleteAdans(id).then(res => {
            isAuthenticated(res.data.token)
        }).catch(err => console.log(err))
    }

    return (
        <>
            <Form>
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
                                    <Form.Control as="select"
                                                  defaultValue={x.level}
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
                                <Form.Control type="option" name="startTime" placeholder={startTime}
                                              defaultValue={x.startTime}
                                              value={startTime} onChange={e => handleInputChange(e, i)}/>
                            </Form.Group>
                        </Col>

                            <Col className="btn-box">
                                <Form.Group className="mb-3" controlId="addCategory">
                                    <Form.Label>EndTime</Form.Label>
                                    <Form.Control type="price" name="endTime" placeholder="End time"
                                                  defaultValue={x.endTime}
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
                <div className='d-flex justify-content-around'>

                    <div>
                        <Button variant="outline-primary" onClick={deleteAdan}>Delete</Button>
                    </div>
                    <di>
                        <Button variant="outline-primary" onClick={updateChange}>Update</Button>
                    </di>
                </div>
            </Form>
        </>
    )
}

export default DailyData