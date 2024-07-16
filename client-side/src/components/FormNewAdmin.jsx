import React from 'react'
import PosImg from '../assets/img/usericon.png'

const FormNewAdmin = () => {
 
    const handleImageClick = () => {
        document.getElementById('imageInput').click();
    };
    
    const handleImageChange = (event) => {
        // Handle the selected image, you can add your logic here
        const selectedImage = event.target.files[0];
        // Add your logic to handle the selected image, for example, display a preview
        console.log(selectedImage);
    };

  return (
    <div className='form-container'>
        <div className='reg-container'>
            <h2 className='reg-title'>Novo Administrador</h2>

            <div className="reg-form-container">
                <form action="">
                    <div className="form-image" onClick={handleImageClick}>
                        <img style={{width: '60px', cursor:'pointer'}} src={PosImg} alt="Default" srcset="" />
                        <input type="file"  id="imageInput" accept="image/*" onChange={handleImageChange} />
                    </div>
                    
                    <div className="input-box">
                        <label htmlFor="">First Name:</label>
                        <input type="text" placeholder='First Name' name="" id="" />
                    </div>
                    <div className="input-box">
                        <label htmlFor="">Last Name:</label>
                        <input type="text" placeholder='Last Name' name="" id="" />
                    </div>
                    <div className="input-box">
                        <label htmlFor="">Email:</label>
                        <input type="email" placeholder='Email' name="" id="" />
                    </div>
                    <div className="input-box">
                        <label htmlFor="">Funcao:</label>
                        <input type="text" placeholder='Administrador' value={'Admin'} name="" id="" readOnly/>
                    </div>
                       
                    <button type="submit">Adicionar</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default FormNewAdmin