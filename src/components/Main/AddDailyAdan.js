import React, {useEffect, useState} from "react";
import {Button, Col, Container, Form, Row, Dropdown} from "react-bootstrap";
import DayData from '../../data/dayData.json'
import MonthData from "../../data/month.json"
import YearData from "../../data/yearData.json"
import AdanData from "../../data/adanData.json"
import {addAdans} from "../../Api/AdanTime";
import {isAuthenticated} from "../../utils/auth";
import {Snackbar, TextField, Alert} from "@mui/material";
// import TimePicker from 'react-bootstrap-time-picker';
const AddDailyAdan = () => {
    const [values, setValues] = useState({
        success: false,
    })
    const {success} = values;
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
        level: "",
        startTime: "",
        endTime: ''
    }]);

    const {level, startTime, endTime} = inputList;


    const handleInputChange = (e, index) => {
        const {name, value} = e.target;
        console.log("hello",name, value)
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

    console.log(inputList)
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
        addAdans({englishDay, englishMonth, englishYear, timing, level, startTime, endTime})
            .then(response => {
                // setValues({
                //     success: true,
                // })
                setOpen(true);
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
                    setValues({
                        success: true,
                    })
                    console.log(values)
                    showSuccess()
                })
            })
            .catch(err => console.log(err))
    }
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    const addNewAdan = () => (
        <Container fluid>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    This is a success message!
                </Alert>
            </Snackbar>
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
                            </Col>
                            <Col>
                                <Form.Label>Adan time</Form.Label>
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
                                    name='startTime'
                                    value={startTime}
                                    onChange={e => handleInputChange(e, i)}

                                />
                                {/*<Form.Group className="mb-3" controlId="addCategory">*/}
                                {/*    <Form.Label>Adan time</Form.Label>*/}
                                {/*    <Form.Control type="option" name="startTime" placeholder="Start time"*/}
                                {/*                  value={startTime} onChange={e => handleInputChange(e, i)}/>*/}
                                {/*</Form.Group>*/}
                                {/*<Form.Group className="mb-3" controlId="addCategory">*/}
                                {/*    <Form.Control as="select" aria-label="Default select example"*/}
                                {/*                  defaultValue="State..."*/}
                                {/*                  name="level" value={level} onChange={e => handleInputChange(e, i)}>*/}
                                {/*        <option>am/pm</option>*/}
                                {/*        <option className="text-black">am</option>*/}
                                {/*        <option className="text-black">pm</option>*/}
                                {/*    </Form.Control>*/}
                                {/*</Form.Group>*/}
                            </Col>

                            <Col className="btn-box">
                                <Form.Group className="mb-3" controlId="addCategory">
                                    <Form.Label>Iqamah time</Form.Label>
                                    <TextField
                                        label="Pick time"
                                        type="time"
                                        defaultValue="07:30"
                                        name='endTime'
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        inputProps={{
                                            step: 60, // 5 min
                                        }}
                                        sx={{ width: 150 }}
                                        onChange={e => handleInputChange(e, i)}
                                        value={endTime}
                                    />
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
            {addNewAdan()}
        </div>
    )
}
export default AddDailyAdan