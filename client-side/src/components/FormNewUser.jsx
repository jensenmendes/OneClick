import React from 'react'
import PosImg from '../assets/img/usericon.png'

const FormNewUser = () => {

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
            
            <div className="reg-form-container">
                <form action="">
                    <div className="form-image">
                        <img style={{width: '60px', cursor:'pointer'}} onClick={handleImageClick} src={PosImg} alt="Default" srcset="" />
                        <input type="file"  id="imageInput" accept="image/*" onChange={handleImageChange} />
                    </div>
                    <div className="input-duo">
                        <div className="input-body">
                            <label htmlFor="">Primeiro Nome:</label>
                            <input type="text" placeholder='Primeiro Nome' name="" id="" />
                        </div>
                        <div className="input-body">
                            <label htmlFor="">Ultimo Nome:</label>
                            <input type="text" placeholder='Ultimo Nome' name="" id="" />
                        </div>
                    </div>

                    <div className="input-box">
                        <label htmlFor="">Email:</label>
                        <input type="email" placeholder='Email' name="" id="" />
                    </div>
                
                    <div className="input-duo">
                        <div className="input-body">
                            <label htmlFor="">Telemovel:</label>
                            <input type="text" placeholder='Telemovel' name="" id="" />
                        </div>
                        <div className="input-body">
                            <label htmlFor="">Funcao:</label>
                            <select name="" id="">
                                <option value="Admin">Administrador</option>
                                <option value="Gerente">Gerente</option>
                                <option value="Vendedor">Vendedor</option>
                            </select>
                        </div>
                    </div>
                    <button type="submit">Adicionar</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default FormNewUser