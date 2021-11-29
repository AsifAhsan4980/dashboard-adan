import React, {Fragment, useEffect, useState} from "react";
import {deleteBanner, findAllBanner} from "../../Api/Banner";
import {Button, Card, Col, Form, Modal, Row, Table} from "react-bootstrap";
import {deleteAnnouncement, findAllAnnouncement, updateAnnouncement} from "../../Api/Announcement";
import {deleteEvent} from "../../Api/Event";
import EventUpdate from "./eventUpdate";

const BannerData = () => {
    const [show, setShow] = useState(false);


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [banners, setUser] = useState([]);

    useEffect(() => {
        loadUsers()
    }, []);

    const loadUsers = async () => {
        const result = await findAllBanner()
        setUser(result.data.reverse());
    };
    const deleteUser = async id => {
        await deleteBanner(id);
        await loadUsers();
    };


    return (
        <>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Banner Name</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {banners && banners.map((data, index)=> {
                    return(
                        <tr key={{index}}>
                            <td>{index}</td>
                            <td>{data.eventName}</td>
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

export default BannerData