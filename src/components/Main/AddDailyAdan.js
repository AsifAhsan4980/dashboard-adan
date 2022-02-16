import React, {useEffect, useState} from "react";
import {Button, Col, Container, Form, Row, Dropdown} from "react-bootstrap";
import DayData from '../../data/dayData.json'
import MonthData from "../../data/month.json"
import YearData from "../../data/yearData.json"
import AdanData from "../../data/adanData.json"
import {addAdans} from "../../Api/AdanTime";
import moment from 'moment'
import {isAuthenticated} from "../../utils/auth";
import {
    Snackbar,
    TextField,
    Alert,
    TableContainer,
    Paper,
    TableHead,
    TableRow,
    TableCell,
    TableBody
} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Table} from "reactstrap";
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
    const [rows, setRow] = useState([ ]);


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
                if (response.data.message === 'data exsit') {
                    setOpens(true);
                } else {
                    setOpen(true);
                    let resData = response.data
                    setRow([
                        ...rows,
                        createData(`${resData.englishDay}/${resData.englishMonth}/${resData.englishYear} (added at ${moment(resData.createdAt, ).format(' h:mm:ss a')})`, `${resData?.timing[0]?.startTime} | ${resData?.timing[0]?.endTime}`, `${resData?.timing[1]?.startTime} `, `${resData?.timing[2]?.startTime} | ${resData?.timing[2]?.endTime}`, `${resData?.timing[3]?.startTime} | ${resData?.timing[3]?.endTime}`,`${resData?.timing[4]?.startTime} | ${resData?.timing[4]?.endTime}`,`${resData?.timing[5]?.startTime} | ${resData?.timing[5]?.endTime}`)
                    ])
                }
            })
            .catch(err => console.log(err))
    }

    const [open, setOpen] = React.useState(false);

    function createData(
        name: string,
        fazr: string,
        sunrise: string,
        duhr: string,
        asr: string,
        magrib : string,
        isha: string
    ) {
        return {name, fazr, sunrise, duhr, asr, magrib, isha};
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    const [opens, setOpens] = React.useState(false);

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
                <Alert onClose={handleClose} severity="success" sx={{width: '100%'}} key={vertical + horizontal}
                       anchorOrigin={{vertical, horizontal}}>
                    Data added successfully
                </Alert>
            </Snackbar>
            <Snackbar open={opens} autoHideDuration={6000} onClose={handleCloses}>
                <Alert onClose={handleClose} severity="error" sx={{width: '100%'}} key={vertical + horizontal}
                       anchorOrigin={{vertical, horizontal}}>
                    Data already exist
                </Alert>
            </Snackbar>

            {rows.length!==0 && (
                <Box>
                    <Typography>Last added data</Typography>
                    <TableContainer component={Paper}>
                        <Table sx={{minWidth: 650}} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Date</TableCell>
                                    <TableCell align="right">Fazr(Adan| Iqamah)</TableCell>
                                    <TableCell align="right">Sunrise</TableCell>
                                    <TableCell align="right">Duhr(Adan| Iqamah)</TableCell>
                                    <TableCell align="right">Asr(Adan| Iqamah)</TableCell>
                                    <TableCell align="right">Magrib(Adan| Iqamah)</TableCell>
                                    <TableCell align="right">Isha(Adan| Iqamah)</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows?.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="right">{row.fazr}</TableCell>
                                        <TableCell align="right">{row.sunrise}</TableCell>
                                        <TableCell align="right">{row.duhr}</TableCell>
                                        <TableCell align="right">{row.asr}</TableCell>
                                        <TableCell align="right">{row.magrib}</TableCell>
                                        <TableCell align="right">{row.isha}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            )}

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
                                <Typography sx={{m: 1}} >Adan time</Typography>
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
                                    sx={{width: 150}}
                                    name='startTime'
                                    value={startTime}
                                    onChange={e => handleInputChange(e, i)}

                                />
                            </Col>

                            <Col className="btn-box">
                                <Form.Group className="mb-3" controlId="addCategory">
                                    <Typography sx={{m: 1}} >Iqamah time</Typography>
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
                                        sx={{width: 150}}
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