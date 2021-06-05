import {Fragment} from "react";
import ReactDom from 'react-dom';
import Card from "./Card";
import Button from "./Button";

import styles from "./ErrorModal.module.css";


const BackgroundOverlay = props => {
    return <div className={props.className} onClick={props.onErrorConfirmation}/>;
};

const Modal = props => {
    return (
        <Card className={styles.modal}>
            <header className={styles.header}>
                <h2>{props.title}</h2>
            </header>
            <div className={styles.content}>
                <p>{props.message}</p>
            </div>
            <footer className={styles.actions}>
                <Button onClick={props.onErrorConfirmation}>Okay</Button>
            </footer>
        </Card>);
}


const ErrorModal = props => {
    return (
        <Fragment>
            {ReactDom.createPortal(<BackgroundOverlay className={styles.backdrop}
                                                      onErrorConfirmation={props.onErrorConfirmation}/>,
                document.getElementById('OverlayContainer'))}
            {ReactDom.createPortal(<Modal title={props.title} message={props.message}
                                          onErrorConfirmation={props.onErrorConfirmation}/>,
                document.getElementById('ErrorModalContainer'))}
        </Fragment>);
};

export default ErrorModal;