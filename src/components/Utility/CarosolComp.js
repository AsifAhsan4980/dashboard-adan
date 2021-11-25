import React, {useState} from "react";
import {Button, Card, Modal} from "react-bootstrap";
import AddBanner from "./Child/Add Banner";

const CarouselComp = () => {

    const [lgShow, setLgShow] = useState(false);


    return (
        <>
            <Card>
                <Card.Body>
                    <Button onClick={() => setLgShow(true)}>Add Cover Image</Button>
                    <Modal
                        size="lg"
                        show={lgShow}
                        onHide={() => setLgShow(false)}
                        aria-labelledby="example-modal-sizes-title-lg"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="example-modal-sizes-title-lg">
                                <AddBanner/>
                            </Modal.Title>
                        </Modal.Header>
                    </Modal>
                </Card.Body>
            </Card>
        </>
    )
}


export default CarouselComp