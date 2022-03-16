import { useContext } from 'react';
import './UserDetail.scss';
import UserContext from '../../providers/UserContext';
import { convertDOB , getAddress, getCellNumber } from '../../utils/common';

const UserDetail = ({closeModal, showModal}) => {
    const selectedUser = useContext(UserContext);

    const modalClassName = showModal ? 'display-block' : 'display-none';

    return (
        <div className={`modal ${modalClassName}`}>
            {selectedUser && (
                <div className="modal-main">
                <div className='modal-header'>
                    User Information - {`${selectedUser.name.title} ${selectedUser.name.first} ${selectedUser.name.last}`}
                </div>
                <div className='modal-body'>
                    <div className='userProfile'>
                        <div className='userProfile__imgContainer'>
                            <img src={selectedUser.picture.large} alt={selectedUser.name.first} />
                        </div>
                        <div className='userProfile__infoContainer'>
                            <p>{selectedUser.login.username}</p>
                            <p>{selectedUser.gender}</p>
                            <p>{selectedUser.email}</p>
                            <p>{convertDOB(selectedUser.dob.date)}</p>
                            <p>{getAddress(selectedUser.location.street, selectedUser.location.city, selectedUser.location.country, selectedUser.location.postcode)}</p>
                            <p>{getCellNumber(selectedUser.cell)}</p>
                        </div>
                    </div>
                </div>
                <div className='modal-footer'>
                    <button type="button" onClick={closeModal}>
                        Close
                    </button>
                </div>
            </div>
            )}
        </div>
    )
}

export default UserDetail;