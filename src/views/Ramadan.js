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
import {getOneJummah} from "../Api/jummah";
import AddJummah from "../components/Main/AddJummah";
import JummahDatas from "../components/Main/JummaData";
import {getOneRamadan} from "../Api/Ramadan";
import RamadanData from "../components/Main/RamadanData";


const Ramadan = () => {
    const [adanTime, setAdanTime] = useState({
        englishDay: '',
        englishMonth: '',
        englishYear: "",
        prayer: [],
    })

    const {
        englishDay, englishMonth, englishYear, prayer
    } = adanTime

    const [inputList, setInputList] = useState([{
        shehriIn: "level",
        shehriOut: "time",
        Iftar: "time"
    }]);

    const [show, setShow] = useState(false);
    const {shehriIn,shehriOut,Iftar} = inputList;

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    // const handleInputChange = (e, index) => {
    //     const {name, value} = e.target;
    //     const list = [...inputList];
    //     list[index][name] = value;
    //     setInputList(list);
    //     setAdanTime({
    //         ...adanTime,
    //         prayer: inputList
    //     })
    // };
    //
    //
    // const handleRemoveClick = index => {
    //     const list = [...inputList];
    //     list.splice(index, 1);
    //     setInputList(list);
    // };
    //
    // const handleAddClick = () => {
    //     setInputList([...inputList, {
    //         level: "level",
    //         startTime: "time",
    //         endTime: "time"
    //     }])
    // };


    const handleChange = (e, index) => {
        setAdanTime({
            ...adanTime,
            [e.target.name]: e.target.value
        })
    }



    function search() {

        const id1 = englishDay
        const id2 = englishMonth
        const id3 = englishYear
        console.log(id3)
        if (id1, id2, id3) {
            getOneRamadan(id1, id2, id3).then(res => {
                console.log("data")
                try {
                    const allData = res.data[0]
                    const prayer = allData.prayer[0]
                    setAdanTime(allData)
                    setInputList(prayer)
                    console.log(adanTime)
                } catch (err) {
                    console.log(err)
                }

            })

        }
    }
    // console.log(adanTime)

    return (
        <>
            <Button variant="primary" className="mb-4" onClick={handleShow}>
                Add Ramadan
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddJummah/>
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
            <Form
            >
                <Form.Label className="text-center">Update Ramadan</Form.Label>
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
            <RamadanData data={adanTime}/>
        </>
    )
}

export default Ramadan