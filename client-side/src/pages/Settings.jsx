import React, { useState } from 'react'
import ListSettings from '../components/ListSettings'
import UpdateProfile from '../components/UpdateProfile'
import UpdatePassword from '../components/UpdatePassword'

const Settings = () => {

    const [selectedOption, setSelectedOption] = useState('Profile');

    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };
    
  return (
    <div className='container-content'>
      <ListSettings onSelectOption={handleOptionClick} selectedOption={selectedOption} />
      {selectedOption === 'Profile' && <UpdateProfile />}
      {selectedOption === 'Password' && <UpdatePassword />}
    </div>
  )
}

export default Settings