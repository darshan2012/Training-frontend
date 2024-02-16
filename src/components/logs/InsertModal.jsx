import axios from "axios";
import { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

export default function InsertModal({
  open,
  setOpen,
  handleModalSubmit,
  title,
  url,
}) {
  const name = useRef();
  const handleClose = () => setOpen(false);
  const handleSubmit = () => {
    console.log(name.current.value);
    axios
      .post(`${process.env.REACT_APP_URL}${url}`, {
        name: name.current.value,
      })
      .then((res) => {
        handleModalSubmit();
        setOpen(false);
      })
      .catch((err) => {
        console.log(err);
        // setOpen(false);
      });
  };

  return (
    <>
      <Modal show={open} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add {title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" ref={name} autoFocus />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
