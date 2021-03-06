import React, {useEffect, useState} from "react";
import {Button, Col, Container, Form, Row, Dropdown, } from "react-bootstrap";
import DayData from '../../data/dayData.json'
import MonthData from "../../data/month.json"
import YearData from "../../data/yearData.json"
import {isAuthenticated} from "../../utils/auth";
import {addRamadan} from "../../Api/Ramadan";
import {Snackbar, Alert,TextField} from "@mui/material";

const AddRamadan = () => {
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
        shehriIn: "level",
        shehriOut:"time",
        Iftar: "name"
    }]);

    const {shehriIn, shehriOut, Iftar} = inputList;



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


    const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };

    const handleAddClick = () => {
        setInputList([...inputList, {
            shehriIn: "level",
            shehriOut:"time",
            Iftar: "name"
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
        addRamadan({ englishDay, englishMonth, englishYear, prayer, shehriIn, shehriOut, Iftar})
            .then(response => {
                // setValues({
                //     success: true,
                // })
                setOpen(true);
                isAuthenticated(response.data.token, () => {
                    setAdanTime({englishDay: '',
                        englishMonth: '',
                        englishYear: "",
                        prayer: inputList,
                        success: true,
                        shehriIn: "",
                        shehriOut:"",
                        Iftar: ""
                    })

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
    const addNewRamadan = () => (
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
                                    <Form.Label>Sehri Start</Form.Label>
                                    <div>
                                        <TextField
                                            label="Pick time"
                                            type="time"
                                            defaultValue="03:30"
                                            name='shehriIn'
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            inputProps={{
                                                step: 60, // 5 min
                                            }}
                                            sx={{ width: 150 }}
                                            onChange={e => handleInputChange(e, i)}
                                            value={shehriIn}
                                        />
                                    </div>
                                    {/*<Form.Control type="option" name="shehriIn" placeholder="Start time"*/}
                                    {/*              value={shehriIn} onChange={e => handleInputChange(e, i)}/>*/}
                                </Form.Group>
                            </Col> <Col>
                            <Form.Group className="mb-3" controlId="addCategory">
                                <Form.Label>Sehri End</Form.Label>
                                <div>
                                    <TextField
                                        label="Pick time"
                                        type="time"
                                        defaultValue="03:30"
                                        name='shehriOut'
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        inputProps={{
                                            step: 60, // 5 min
                                        }}
                                        sx={{ width: 150 }}
                                        onChange={e => handleInputChange(e, i)}
                                        value={shehriOut}
                                    />
                                </div>
                                {/*<Form.Control type="option" name="shehriOut" placeholder="Start time"*/}
                                {/*              value={shehriOut} onChange={e => handleInputChange(e, i)}/>*/}
                            </Form.Group>
                        </Col>

                            <Col className="btn-box">
                                <Form.Group className="mb-3" controlId="addCategory">
                                    <Form.Label>Iftar Time</Form.Label>
                                    <div>
                                        <TextField
                                            label="Pick time"
                                            type="time"
                                            defaultValue="03:30"
                                            name='Iftar'
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            inputProps={{
                                                step: 60, // 5 min
                                            }}
                                            sx={{ width: 150 }}
                                            onChange={e => handleInputChange(e, i)}
                                            value={Iftar}
                                        />
                                    </div>
                                    {/*<Form.Control type="Name" name="Iftar" placeholder="End time"*/}
                                    {/*              value={Iftar} onChange={e => handleInputChange(e, i)}/>*/}
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
                        Add new Ramadan
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
            {addNewRamadan()}
        </div>
    )
}
export default AddRamadan