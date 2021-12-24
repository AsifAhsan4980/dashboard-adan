import React, {useEffect, useState} from "react";
import {Button, Modal, Table} from "react-bootstrap";
import { deleteEvent, findAllEvent} from "../../Api/Event";
import EventUpdate from "./eventUpdate";



const EventData = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [events, setUser] = useState([]);

    useEffect(() => {
        loadUsers()
    }, []);

    const loadUsers = async () => {
        const result = await findAllEvent()
        setUser(result.data.reverse());
    };

    const deleteUser = async id => {
        await deleteEvent(id);
        await loadUsers();
    };


    return (
        <>
            <div className="text-center font-bold"> All Events</div>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Event Name</th>
                    <th>Event Data</th>
                    <th>Event Description</th>
                    <td >Image /></td>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {events && events.map((data, index)=> {
                    return(
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{data.eventName}</td>
                            <td>{data.eventDate}</td>
                            <td>{data.eventBody}</td>
                            <td width="10%"><img width="auto" src={data.eventImage}  alt="eventImage"/></td>
                            <td>
                                <Button className="mr-4" variant="primary"  onClick={handleShow}>
                                    Edit
                                </Button>
                                <Button
                                    className="btn btn-danger"
                                    onClick={() => deleteUser(data._id)}
                                >
                                    Delete
                                </Button>
                            </td>
                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Modal heading</Modal.Title>
                                </Modal.Header>
                                <Modal.Body><EventUpdate datas={data} /></Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Close
                                    </Button>
                                    <Button variant="primary" onClick={handleClose}>
                                        Save Changes
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </tr>
                    )
                })}
                </tbody>
            </Table>

        </>
    )
}

export default EventData