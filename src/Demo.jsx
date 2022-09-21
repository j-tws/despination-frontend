import React from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';


import Modal from 'react-bootstrap/Modal';

import Alert from "react-bootstrap/Alert";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

class Demo extends React.Component{

    state= {
        show: false 
    }

    handleShow = () => {
        this.setState({show: true})
    }

     handleClose = () => {
        this.setState({show: false})
    }


    render() {
        return (
            <div>

                 <Button variant="info" onClick={this.handleShow}>Modal Demo</Button>

                 <Modal show ={this.state.show} onHide={this.handleClose} centered>
                    <Modal.Header>
                        <Modal.Title>Creepy Dentist</Modal.Title>
                    </Modal.Header>

                    <Modal.Body> This message is brought to you by creepy dentist </Modal.Body>

                    <Modal.Footer>
                        <Button variant="danger" onClick ={this.handleClose}> </Button>
                    </Modal.Footer>
                 </Modal>

                <Form>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>first name </Form.Label>
                        <Form.Control required type='name' placeholder='First Name'/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>email</Form.Label>
                        <Form.Control required type='name' placeholder='email'/>
                    </Form.Group>
                    <Form.Group className="text-muted" controlId="formBasicName">
                        <Form.Label>never share your details</Form.Label>
                        <Form.Control required type='name' placeholder='enter your email'/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>password</Form.Label>
                        <Form.Control required type='password' placeholder='enter password'/>
                    </Form.Group>




                    <Form.Select aria-label="Default Select example">
                        <option> Select options </option>
                        <option value="1"> Root Canal</option>
                        <option value="2">Fillings</option>
                        <option value="3"> Jaw Removal</option>
                    </Form.Select>


                    <Form.Group className="mb=3" controlId='formBasicCheckbox'>
                        <Form.Check type="checkbox" label="subsribe to newsletter" />
                        <Form.Check type="radio" name="radio 1" label="subsribe to newsletter" />
                        <Form.Check type="radio" name="radio 2" label="subsribe to newsletter" />
                        <Form.Check type="switch" label="subsribe to newsletter" />
                    </Form.Group>

                    <Button variant="sucess" type='submit' > Submit! </Button>

                </Form>     

                <Alert variant="success" className="alert">
                    sucessfull alert
                </Alert>
                

                <Alert variant="danger" className="alert">
                    dangerous!
                </Alert>
                

                <Alert variant="warning" className="alert">
                   warning!
                </Alert>



                <h1>ffsefg</h1>
                    <p>
                    gdfgfdgfd
                    </p>
                    <Row xs={1} md={2} lg={4}>
                        <Col>
                            <h1>dhffdksn</h1>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis voluptatem iusto eaque beatae modi placeat hic corrupti sapiente consequatur! Veritatis totam saepe tempora, itaque aliquid ut quisquam quidem alias? Voluptatem?
                        Magni sapiente suscipit quaerat in enim, hic corrupti dolorem ea ab animi quae, quam, reprehenderit incidunt debitis. Voluptatum, itaque sit sequi et animi nihil ut, ad totam reprehenderit, tempora quidem.
                        Labore suscipit repellat cupiditate id ipsa aliquam excepturi tempore eligendi vero praesentium! Quam similique ab, deleniti debitis, autem, labore beatae quos quaerat repellat laborum enim. Rerum veniam iste modi reprehenderit.
                        Ab modi amet, fugit accusantium itaque eveniet qui sint nihil fugiat! Minus dolorem illo eos possimus placeat id veritatis fugiat corporis asperiores, saepe, voluptates cum quasi eum adipisci perferendis deleniti?
                        Quasi quae nisi dolor, iure eveniet sequi soluta omnis blanditiis perspiciatis libero. Voluptatum officia minima non nam? Vitae, libero. Error repellendus exercitationem corporis maiores iste laudantium architecto quo vitae hic! </p>

                        </Col>
                        <Col>
                            <h1>dhffdksn</h1>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis voluptatem iusto eaque beatae modi placeat hic corrupti sapiente consequatur! Veritatis totam saepe tempora, itaque aliquid ut quisquam quidem alias? Voluptatem?
                        Magni sapiente suscipit quaerat in enim, hic corrupti dolorem ea ab animi quae, quam, reprehenderit incidunt debitis. Voluptatum, itaque sit sequi et animi nihil ut, ad totam reprehenderit, tempora quidem.
                        Labore suscipit repellat cupiditate id ipsa aliquam excepturi tempore eligendi vero praesentium! Quam similique ab, deleniti debitis, autem, labore beatae quos quaerat repellat laborum enim. Rerum veniam iste modi reprehenderit.
                        Ab modi amet, fugit accusantium itaque eveniet qui sint nihil fugiat! Minus dolorem illo eos possimus placeat id veritatis fugiat corporis asperiores, saepe, voluptates cum quasi eum adipisci perferendis deleniti?
                        Quasi quae nisi dolor, iure eveniet sequi soluta omnis blanditiis perspiciatis libero. Voluptatum officia minima non nam? Vitae, libero. Error repellendus exercitationem corporis maiores iste laudantium architecto quo vitae hic! </p>

                        </Col>
                        <Col>
                            <h1>dhffdksn</h1>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis voluptatem iusto eaque beatae modi placeat hic corrupti sapiente consequatur! Veritatis totam saepe tempora, itaque aliquid ut quisquam quidem alias? Voluptatem?
                        Magni sapiente suscipit quaerat in enim, hic corrupti dolorem ea ab animi quae, quam, reprehenderit incidunt debitis. Voluptatum, itaque sit sequi et animi nihil ut, ad totam reprehenderit, tempora quidem.
                        Labore suscipit repellat cupiditate id ipsa aliquam excepturi tempore eligendi vero praesentium! Quam similique ab, deleniti debitis, autem, labore beatae quos quaerat repellat laborum enim. Rerum veniam iste modi reprehenderit.
                        Ab modi amet, fugit accusantium itaque eveniet qui sint nihil fugiat! Minus dolorem illo eos possimus placeat id veritatis fugiat corporis asperiores, saepe, voluptates cum quasi eum adipisci perferendis deleniti?
                        Quasi quae nisi dolor, iure eveniet sequi soluta omnis blanditiis perspiciatis libero. Voluptatum officia minima non nam? Vitae, libero. Error repellendus exercitationem corporis maiores iste laudantium architecto quo vitae hic! </p>

                        </Col>
                    </Row>
                



            </div>
        )
    }
}

export default Demo;