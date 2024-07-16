import React from 'react'

const ListSettings = ({ onSelectOption, selectedOption }) => {
    console.log(selectedOption)
  return (
    <div className='profileHeader'>
        <ul>
        <li
          onClick={() => onSelectOption('Profile')}
          className={selectedOption === 'Profile' ? 'active' : ''}
        >
          Profile
        </li>
        <li
          onClick={() => onSelectOption('Password')}
          className={selectedOption === 'Password' ? 'active' : ''}
        >
          Password
        </li>
            <li>Notificação</li>
        </ul>
    </div>
  )
}

export default ListSettings