import { useEffect, useState, createContext } from 'react';
import './App.scss';
import Lightbox from './components/Lightbox/Lightbox';
import UserDetail from './components/UserDetail/UserDetail';
import { convertDOB , getAddress, getCellNumber } from './utils/common';
import UserContext from './providers/UserContext';
import Pagination from './components/Pagination/Pagination';
import UserProfile from './components/UserProfile/UserProfile';

function App() {
  const [users, setUsers] = useState();
  const [error, setError] = useState();
  const [modal, setModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [currentUsers, setCurrentUsers] = useState();
  let searchedUser = [];

  let indexOfLastUser = currentPage * process.env.REACT_APP_PAGE_SIZE;
  let indexOfFirstUser = indexOfLastUser - process.env.REACT_APP_PAGE_SIZE;

  const openModal = (e, selectedUser) => {
    e.preventDefault();
    setSelectedUser(selectedUser);
    setModal(true);
  }

  const closeModal = () => {
    setModal(false);
    setSelectedUser();
  }

  const searchUserHandler = (event) => {
    const filterUser = (user) =>  {
      return user.login.username.includes(event.target.value);
    }

    searchedUser = users.filter(user => filterUser(user));
  
    setCurrentUsers(searchedUser?.slice(indexOfFirstUser, indexOfLastUser));
  }

  useEffect(() => {
    let fetchUrl = `${process.env.REACT_APP_SERVER_URL}?results=${process.env.REACT_APP_RESULT_SIZE}`
    fetch(fetchUrl)
      .then(res => res.json())
      .then(
        results => {
          setUsers(results.results);
          setCurrentUsers(results.results.slice(indexOfFirstUser, indexOfLastUser));
        }, 
        error => setError(error)
      );
  }, [])

  useEffect(() => {
    setCurrentUsers(users?.slice(indexOfFirstUser, indexOfLastUser));
  }, [indexOfFirstUser, indexOfLastUser])

  return (
    <UserContext.Provider value={selectedUser}>
      <div className="App">
        {/* If we have a error */}
        <input className='searchUser' type='search' placeholder='search user' onKeyUp={(e) => searchUserHandler(e)} />
        {error && <div>Error: {error.message}</div>}
        {
          currentUsers && (
            <UserProfile modal={modal} currentUsers={currentUsers} currentPage={currentPage} openModalHandler={(e, selectedUser) => openModal(e, selectedUser)} setCurrentPageHandler={(pageNumber) => setCurrentPage(pageNumber)} closeModalHandler={closeModal}/>
          )
        }
      </div>
    </UserContext.Provider>
  );
}

export default App;
