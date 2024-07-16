import React from 'react'
import PosImg from '../assets/img/usericon.png'

const UpdateProfile = () => {

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
    <div className='upt-profile'>
        <h3>Atualiza seu Perfil</h3>
       <form action="">
            <div className="form-image" onClick={handleImageClick}>
                <img style={{width: '80px', cursor:'pointer'}} src={PosImg} alt="Default" srcset="" />
                <input type="file"  id="imageInput" accept="image/*" onChange={handleImageChange} />
            </div>
            <div className="input-duo">
                <div className="input-body first-child">
                    <label htmlFor="">Primeiro Nome:</label>
                    <input type="text" value={'Jensen'} placeholder='Primeiro Nome' name="" id="" />
                </div>
                <div className="input-body">
                    <label htmlFor="">Ultimo Nome:</label>
                    <input type="text" value={'Mendes'} placeholder='Ultimo Nome' name="" id="" />
                </div>
            </div>

            <div className="input-duo">
                <div className="input-body first-child">
                    <label htmlFor="">Username:</label>
                    <input type="text" value={'Jensen123'} placeholder='Username' name="" id="" readOnly/>
                </div>
                <div className="input-body">
                    <label htmlFor="">Email:</label>
                    <input type="email" value={'jensen@exemplo.cv'} placeholder='Ultimo Nome' name="" id="" />
                </div>
            </div>

            <div className="input-duo">
                <div className="input-body first-child">
                    <label htmlFor="">Estado:</label>
                    <input type="text" value={'Ativo'} placeholder='Estado' name="" id="" readOnly />
                </div>
                <div className="input-body">
                    <label htmlFor="">Role:</label>
                    <input type="text" value={'Administrador'} placeholder='Role' name="" id="" readOnly />
                </div>
            </div>
        
            <button type="submit">Atualizar</button>
        </form>
    </div>
  )
}

export default UpdateProfile