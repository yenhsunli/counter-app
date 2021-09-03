import React, { Component, useState } from "react";
import NavBar from "./components/navbar";
import Counters from "./components/counters";
import { Modal, Button } from "react-bootstrap"

const AddItem = () => {
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}



class App extends Component {
    state = {
        counters: [
            { id: 1, value: 0 },
            { id: 2, value: 0 },
            { id: 3, value: 0 },
            { id: 4, value: 0 }
        ],
        createModalOpen: false
    };

    handleIncrement = counter => {
        const counters = [...this.state.counters];
        const index = counters.indexOf(counter);
        counters[index] = { ...counters[index] };
        counters[index].value++;
        this.setState({ counters });
    };

    handleDecrement = counter => {
        const counters = [...this.state.counters];
        const index = counters.indexOf(counter);
        counters[index] = { ...counters[index] };
        counters[index].value--;
        this.setState({ counters });
    };

    handleReset = () => {
        const counters = this.state.counters.map(c => {
            c.value = 0;
            return c;
        });
        this.setState({ counters });
    };

    handleDelete = counterId => {
        const counters = this.state.counters.filter(c => c.id !== counterId);
        this.setState({ counters });
    };

    handleRestart = () => {
        window.location.reload();
    };

    handleCreateModal = () => {
        this.setState({
            createModalOpen: true
        })
    }

    render() {
        return (
            <div>
                <NavBar
                    totalCounters={this.state.counters.filter(c => c.value > 0).length}
                />
                <main className="container">
                    <div>
                        <label>battery: </label>
                        <input type="text"></input>
                    </div>
                    <button className="btn btn-success m-2" onClick>
                        <i className="fa fa-plus-circle" aria-hidden="true" />
                    </button>
                    <Counters
                        counters={this.state.counters}
                        onReset={this.handleReset}
                        onIncrement={this.handleIncrement}
                        onDecrement={this.handleDecrement}
                        onDelete={this.handleDelete}
                        onRestart={this.handleRestart}
                        onAdd={this.handleCreateModal}
                    />
                </main>
                {this.state.createModalOpen ? <AddItem /> : null}
            </div>
        );
    }
}

export default App;
