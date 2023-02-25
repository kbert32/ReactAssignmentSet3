import { Fragment } from 'react';
// import ReactDOM from 'react-dom/client';     //code came with this line from instrctor, not sure why, does not seem to work
import ReactDOM from 'react-dom';               //this line I added, because line 2 was not working, this way works
// import { createPortal } from 'react-dom';    //this method of creating portals works also, if using this method,
                                                //line 25-26 statements would be:  "createPortal()" instead of "ReactDOM.createPortal()"
import classes from './Modal.module.css';

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose}/>;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById('overlays');

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
