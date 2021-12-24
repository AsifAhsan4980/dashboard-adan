import React, { useEffect, useState} from "react";
import {deleteBanner, findAllBanner} from "../../Api/Banner";
import {Button, Modal, Table} from "react-bootstrap";

const BannerData = () => {
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
            <div className="text-center font-bold"> All Banner</div>
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
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td ><img width="20%" src={data.bannerImage} /></td>
                            <td>
                                <Button
                                    className="btn btn-danger"
                                    onClick={() => deleteUser(data._id)}
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </Table>
        </>
    )
}

export default BannerData