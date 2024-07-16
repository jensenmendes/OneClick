import React from 'react'
import PosImg from '../assets/img/producticon.png'

const FormularioNewProduto = () => {

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
    
        <div className='reg-container'>
        
            <div className="reg-form-container">
                <form action="">
                    <div className="form-image" onClick={handleImageClick}>
                        <img style={{width: '60px', cursor:'pointer'}} src={PosImg} alt="Default" srcset="" />
                        <input type="file"  id="imageInput" accept="image/*" onChange={handleImageChange} />
                    </div>
                    <div className="input-box">
                        <label htmlFor="">Produto:</label>
                        <input type="text" placeholder='Nome Produto' name="" id="" />
                    </div>
                    <div className="input-duo">
                        <div className="input-body">
                            <label htmlFor="">Quantidade:</label>
                            <input type="text" placeholder='Quantidade' name="" id="" />
                        </div>
                        <div className="input-body">
                            <label htmlFor="">Preço:</label>
                            <input type="text" placeholder='Preço' name="" id="" />
                        </div>
                    </div>
                    <div className="input-duo">
                        <div className="input-body">
                            <label htmlFor="">Custo:</label>
                            <input type="text" placeholder='Custo' name="" id="" />
                        </div>
                        <div className="input-body">
                            <label htmlFor="">Estado:</label>
                            <select name="" id="">
                                <option value="Ativo">Ativo</option>
                                <option value="Inativo">Inativo</option>
                            </select>
                        </div>
                    </div>
                    <div className="input-duo">
                        <div className="input-body">
                            <label htmlFor="">Categoria:</label>
                            <select name="" id="">
                                <option value="categoria1">Categoria1</option>
                                <option value="categoria2">Categoria2</option>
                                <option value="categoria3">Categoria3</option>
                            </select>
                        </div>
                        <div className="input-body">
                            <label htmlFor="">Fornecedor:</label>
                            <select name="" id="">
                                <option value="Fornecedor1">Fornecedor1</option>
                                <option value="Fornecedor2">Fornecedor2</option>
                                <option value="Fornecedor3">Fornecedor3</option>
                            </select>
                        </div>
                    </div>
                    <button type="submit">Adicionar</button>
                </form>
            </div>
        </div>
   
  )
}

export default FormularioNewProduto