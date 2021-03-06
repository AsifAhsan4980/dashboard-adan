import React, {useEffect, useState} from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import DayData from "../../data/dayData.json";
import MonthData from "../../data/month.json";
import YearData from "../../data/yearData.json";
import {isAuthenticated} from "../../utils/auth";
import {deleteJummah, getOneJummah, updateJummah} from "../../Api/jummah";
import {deleteRamadan, updateRamadan} from "../../Api/Ramadan";
import {Alert, Snackbar, TextField} from "@mui/material";

const RamadanData = (allData) => {
    const data = allData.data
    const [adanTime, setAdanTime] = useState({
        englishDay: '',
        englishMonth: '',
        englishYear: "",
        arabDay: '',
        arabMonth: '',
        arabYear: "",
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
            timing: inputList
        })
    };


    useEffect(() => {
        setAdanTime(data)
        const prayer = data.prayer
        setInputList(prayer)
        console.log(prayer)
    })

    const handleChange = (e, index) => {
        setAdanTime({
            ...adanTime,
            [e.target.name]: e.target.value,
        })
    }

    // console.log(data)

    function updateChange(e) {
        e.preventDefault();
        const id = data._id
        console.log(id)
        updateRamadan(id, adanTime).then(res => {
            setOpen(true);
            isAuthenticated(res.data.token, () => {
                setAdanTime({
                    englishDay: '',
                    englishMonth: '',
                    englishYear: "",
                    arabDay: '',
                    arabMonth: '',
                    arabYear: "",
                    prayer: [],
                })
            })
        }).catch(err => console.log(err))
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
    function deleteAdan(e) {
        e.preventDefault();
        const id = data._id
        deleteRamadan(id).then(res => {
            isAuthenticated(res.data.token)
        }).catch(err => console.log(err))
    }

    return (
        <>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Operation done successfully
                </Alert>
            </Snackbar>
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
                                    <Form.Label>Seheri Start Time</Form.Label>
                                    <div>
                                        <TextField
                                            label="Pick time"
                                            type="time"
                                            defaultValue={x.shehriIn}
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
                                    {/*<Form.Control type="option" name="shehriIn" placeholder={shehriIn}*/}
                                    {/*              defaultValue={x.shehriIn}*/}
                                    {/*              value={shehriIn} onChange={e => handleInputChange(e, i)}/>*/}
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="addCategory">
                                    <Form.Label>Seheri End Time</Form.Label>
                                    <div>
                                        <TextField
                                            label="Pick time"
                                            type="time"
                                            defaultValue={x.shehriOut}
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
                                    {/*<Form.Control type="option" name="shehriOut" placeholder={shehriOut}*/}
                                    {/*              defaultValue={x.shehriOut}*/}
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
                                            defaultValue={x.Iftar}
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
                                    {/*<Form.Control type="price" name="Iftar" placeholder="End time"*/}
                                    {/*              defaultValue={x.Iftar}*/}
                                    {/*              value={Iftar} onChange={e => handleInputChange(e, i)}/>*/}
                                </Form.Group>
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

export default RamadanData