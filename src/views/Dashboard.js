import React from "react";
// react-bootstrap components
import {
    Card,

} from "react-bootstrap";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {FormControl, InputLabel, MenuItem, Paper, Select,Container} from "@mui/material";
import Button from "@mui/material/Button";
import {updateNotificationTime} from "../Api/AdanTime";

function Dashboard() {
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const onSubmit = (e) => {
        e.preventDefault()
        console.log(age)
        updateNotificationTime({
            notificationTime : age
        })
    }
    return (
        <>
            <Container fluid>
                <Card>
                    <Card.Body>
                        <h2 className="text-center mt-lg-5">
                            Welcome To Dashboard
                        </h2>
                    </Card.Body>
                </Card>

                <Box>
                    <Paper>
                        <Box style={{padding:20}}>
                            <Typography>Push Notification</Typography>
                            <FormControl fullWidth sx={{m:2}}>
                                <InputLabel id="demo-simple-select-label">Next adan notification time</InputLabel>
                                <Select

                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={age}
                                    label="Age"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={5}>5 minutes</MenuItem>
                                    <MenuItem value={10}>10 minutes</MenuItem>
                                    <MenuItem value={15}>15 minutes</MenuItem>
                                    <MenuItem value={20}>20 minutes</MenuItem>
                                    <MenuItem value={25}>25 minutes</MenuItem>
                                    <MenuItem value={30}>30 minutes</MenuItem>
                                    <MenuItem value={35}>35 minutes</MenuItem>
                                    <MenuItem value={40}>40 minutes</MenuItem>
                                    <MenuItem value={45}>45 minutes</MenuItem>
                                    <MenuItem value={50}>50 minutes</MenuItem>
                                    <MenuItem value={55}>55 minutes</MenuItem>
                                    <MenuItem value={60}>60 minutes</MenuItem>
                                </Select>
                                <Button sx={{mt:2}} onClick={e=>onSubmit(e)} variant="outlined">Update</Button>
                            </FormControl>

                        </Box>

                    </Paper>

                </Box>
            </Container>
        </>
    );
}

export default Dashboard;
