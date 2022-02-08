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
        addAdans({englishDay, englishMonth, englishYear, timing, level, startTime, endTime})
            .then(response => {
                console.log(response.data.message)
                if (response.data.message === 'data exsit'){
                    setOpens(true);
                }
                else {
                    setOpen(true);
                }

                // setOpen(true);
                // isAuthenticated(response.data.token, () => {
                //     setAdanTime({
                //         englishDay: '',
                //         englishMonth: '',
                //         englishYear: "",
                //         timing: inputList,
                //         level: "",
                //         startTime: "",
                //         endTime: "",
                //         success: true,
                //     })
                //     setValues({
                //         success: true,
                //     })
                //     showSuccess()
                // })
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
    const [opens, setOpens] = React.useState(false);

    const handleClicks = () => {
        setOpens(true);
    };

    const handleCloses = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpens(false);
    };
    const vertical = 'top'
    const horizontal = 'right'
    const addNewAdan = () => (
        <Container fluid>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }} key={vertical + horizontal} anchorOrigin={{ vertical, horizontal }}>
                    Data added successfully
                </Alert>
            </Snackbar>
            <Snackbar open={opens} autoHideDuration={6000} onClose={handleCloses}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}  key={vertical + horizontal} anchorOrigin={{ vertical, horizontal }}>
                    Data already exist
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

    const showSuccess = (data) => {

        if (success) return (

            <>
                <Alert variant='success'>
                    {data}
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