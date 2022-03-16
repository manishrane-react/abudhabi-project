import { convertDOB , getAddress, getCellNumber } from '../../utils/common';
import Lightbox from '../Lightbox/Lightbox';
import Pagination from '../Pagination/Pagination';
import UserDetail from '../UserDetail/UserDetail';
import './UserProfile.scss';

const UserProfile = ({currentUsers, modal, currentPage, openModalHandler, setCurrentPageHandler, closeModalHandler}) => {
    return (
        <>
            {currentUsers && (
                currentUsers.map((item, index) => {
                return (
                    <div className='userProfile' key={index}>
                    <div className='userProfile__imgContainer'>
                        <Lightbox image={item.picture} />
                    </div>
                    <div className='userProfile__infoContainer'>
                        <a href="#" onClick={(e) => {openModalHandler(e, item)}}>{`${item.name.title} ${item.name.first} ${item.name.last}`}</a>
                        <p>{item.login.username}</p>
                        <p>{item.email}</p>
                        <p>{convertDOB(item.dob.date)}</p>
                        <p>{getAddress(item.location.street, item.location.city, item.location.country, item.location.postcode)}</p>
                        <p>{getCellNumber(item.cell)}</p>
                    </div>
                    </div>
                )
                })
            )}
            
            <Pagination pageSize={process.env.REACT_APP_RESULT_SIZE} currentPage={currentPage} setPageHandler={(pageNumber) => setCurrentPageHandler(pageNumber)} />
            
            <UserDetail showModal={modal} closeModal={closeModalHandler}/>
        
        </>
    )
}

export default UserProfile;