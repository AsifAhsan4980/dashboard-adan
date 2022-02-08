import React, {useEffect, useState} from "react";
import {Button, Col, Container, Form, Row, Dropdown, Alert} from "react-bootstrap";
import DayData from '../../data/dayData.json'
import MonthData from "../../data/month.json"
import YearData from "../../data/yearData.json"
import AdanData from "../../data/jummah.json"
import {isAuthenticated} from "../../utils/auth";
import {addJummahs} from "../../Api/jummah";
import {TextField} from "@mui/material";

const AddJummah = () => {
    const [values, setValues] = useState({
        success: false,
    })
    const { success } = values;
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
        label: "level",
        khutba: "time",
        imam: "name"
    }]);

    const {label, khutba, imam} = inputList;



    const handleInputChange = (e, index) => {
        const {name, value} = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
        setAdanTime({
            ...adanTime,
            prayer: inputList
        })
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
        addJummahs({ englishDay, englishMonth, englishYear, prayer, label, khutba, imam})
            .then(response => {
                setValues({
                    success: true,
                })
                isAuthenticated(response.data.token, () => {
                    setAdanTime({englishDay: '',
                        englishMonth: '',
                        englishYear: "",
                        prayer: inputList,
                        success: true,
                        label: "",
                        khutba: "",
                        imam: ""
                    })
                })
            })
            .catch(err => console.log(err))
    }



    const addNewPrayer = () => (
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
                                                  name="label" value={label} onChange={e => handleInputChange(e, i)}>
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
                                <Form.Label>Khutba Time</Form.Label>
                                <TextField
                                    label="Pick time"
                                    type="time"
                                    defaultValue="07:30"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        step: 60, // 5 min
                                    }}
                                    sx={{ width: 150 }}
                                    name='khutba'
                                    value={khutba}
                                    onChange={e => handleInputChange(e, i)}

                                />
                                {/*<Form.Control type="option" name="khutba" placeholder="Start time"*/}
                                {/*              value={khutba} onChange={e => handleInputChange(e, i)}/>*/}
                            </Form.Group>
                        </Col>

                            <Col className="btn-box">
                                <Form.Group className="mb-3" controlId="addCategory">
                                    <Form.Label>Imam</Form.Label>
                                    <Form.Control type="Name" name="imam" placeholder="End time"
                                                  value={imam} onChange={e => handleInputChange(e, i)}/>
                                </Form.Group>
                            </Col>
                            {/*<Col className="mt-4">*/}
                            {/*    {inputList.length !== 1 && <Button*/}
                            {/*        className="mr10"*/}
                            {/*        onClick={() => handleRemoveClick(i)}>Remove</Button>}*/}
                            {/*    {inputList.length - 1 === i && <Button key={i} onClick={handleAddClick}>Add</Button>}*/}
                            {/*</Col>*/}
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
    const showSuccess = () => {
        console.log(success)
        if (success) return (

            <>
                <Alert variant='success'>
                    Announcement successfully added
                </Alert>
            </>

        )
    }

    return (
        <div>
            {showSuccess()}
            {addNewPrayer()}
        </div>
    )
}
export default AddJummah