import React, {Fragment, useEffect, useState} from "react";
import {Button, Card, Col, Form, Modal, Row, Table} from "react-bootstrap";
import {deleteAnnouncement, findAllAnnouncement} from "../../Api/Announcement";
import AnnounceUpdate from "./AnnounceUpdate";

const AnnouncementData = () => {
    const [show, setShow] = useState(false);


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [events, setUser] = useState([]);

    useEffect(() => {
        loadUsers()
    }, []);

    const loadUsers = async () => {
        const result = await findAllAnnouncement()
        setUser(result.data.reverse());
    };

    const deleteUser = async id => {
        await deleteAnnouncement(id);
        await loadUsers();
    };


    return (
        <>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Announcement Name</th>
                    <th>Announcement Data</th>
                    <th>Announcement Description</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {events && events.map((data, index)=> {
                    return(
                        <tr key={{index}}>
                            <td>{index}</td>
                            <td>{data.eventName}</td>
                            <td>{data.eventDate}</td>
                            <td>{data.eventBody}</td>
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
                                <Modal.Body><AnnounceUpdate datas={data} /></Modal.Body>
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

export default AnnouncementData