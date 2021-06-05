import {useState} from 'react';
import Card from "../UI/Card";
import Button from "../UI/Button";
import styles from "./AddUser.module.css";
import ErrorModal from "../UI/ErrorModal";

const AddUser = props => {
    const [isValidName, setIsValidName] = useState(true);
    const [isValidAge, setIsValidAge] = useState(true);
    const [enteredUserName, setEnteredUsername] = useState('');
    const [enteredAge, setEnteredAge] = useState('');

    // Handlers
    const userSubmitHandler = event => {
        event.preventDefault();
        if (enteredUserName.trim().length === 0) {
            setIsValidName(false);
            return;
        }
        if (enteredAge.trim().length === 0 || parseFloat(enteredAge.trim()) < 0) {
            setIsValidAge(false);
            return;
        }

        props.onAddUser(enteredUserName,enteredAge);
        // Two-way binding
        setEnteredUsername('');
        setEnteredAge('');
    };

    const userAgeChangeHandler = event => {
        if (enteredAge.trim().length > 0) {
            setIsValidAge(true);
        }
        setEnteredAge(event.target.value);
    };

    const usernameChangeHandler = event => {
        if (enteredUserName.trim().length) {
            setIsValidName(true);
        }
        setEnteredUsername(event.target.value);
    };

    const errorHandler = () => {
        setIsValidName(true);
        setIsValidAge(true);
    };

    return (
        <div>
            {!isValidName || !isValidAge ?
                <ErrorModal title={!isValidName ? 'Name field is empty!' : !isValidAge && 'Age field is empty or invalid!'}
                            message={!isValidName ? 'Try filling in the name field!' : !isValidAge && 'Try filling in the age field!'} onErrorConfirmation={errorHandler}/> : ''}
            <Card className={styles.input}>
                <form onSubmit={userSubmitHandler}>
                    <label htmlFor="username">Username</label>
                    <input className={!isValidName ? styles.incorrect : ''} value={enteredUserName}
                           onChange={usernameChangeHandler} type="username" id="username"/>
                    <label htmlFor="age">Age <small>(Years)</small></label>
                    <input className={!isValidAge ? styles.incorrect : ''} value={enteredAge}
                           onChange={userAgeChangeHandler} type="number" id="age"/>
                    <Button type="submit">Add User</Button>
                </form>
            </Card>
        </div>
    );
};


export default AddUser;