import React, { useEffect, useState } from 'react';
import { FaUser, FaUserTie, FaUserCircle, FaUserCog} from 'react-icons/fa';
import Card from '../components/Card';
import CardListUser from './CardListUser';

const AdminDashboard = () => {

   const cardsData = [
        { nome: 'Utilizador', valor: 15, icon: FaUserCircle },
        { nome: 'Vendedor', valor: 3, icon: FaUser},
        { nome: 'Gerente', valor: 1, icon: FaUserTie},
        { nome: 'Administrador', valor: 1, icon: FaUserCog},
    ];

    const [data, setData] = useState([])

    const fetchData = () => {
        setTimeout(() => {
          setData([
            { primeiroNome: 'Jensen', ultimoNome: 'Mendes', email: 'jensen08david@gmail.com', funcao: 'Administrador' },
            { primeiroNome: 'Albertina', ultimoNome: 'Mendes', email: 'albetina10mendes@gmail.com', funcao: 'Gerente' },
            { primeiroNome: 'Ismael', ultimoNome: 'Evora', email: 'ismaevora@hotmail.com', funcao: 'Vendedor' },
            { primeiroNome: 'Alfonso', ultimoNome: 'Ramos', email: 'dyseghostcvsal@gmail.com', funcao: 'Vendedor' },
            { primeiroNome: 'Oscar', ultimoNome: 'Mendes', email: 'osquinamendes@gmail.com', funcao: 'Vendedor' },
          ]);
        }, 1000);
      };

    /*const getUser = async() => {
        try {
            const req = await fetch("https://fakestoreapi.com/products")

        const res = await req.json()

        setData(res)
        } catch (error) {
            console.log(error)
        }
    }
*/
    useEffect(() => {
        //getUser()
        fetchData()
    }, [])

    const firstsUsers = data.slice(0, 5);
    return (
        <div className="container-content">
            <div className="container-title">
                <h3>Dashboard</h3>
            </div>
            <div className="card-container">
                {cardsData.map((card, index) => (
                    <Card key={index} {...card} />
                ))}
            </div>
            <div className="table-section-2">
                <div className="table-right">
                    <div className="details">
                        <h3>Utilizadores</h3>
                        <span>Ver</span>
                    </div>                    
                    {firstsUsers.map((user, index) => (
                        <CardListUser
                        key={index} // Certifique-se de usar uma chave única ao usar map
                        primeiroNome={user.primeiroNome}
                        ultimoNome={user.ultimoNome}
                        email={user.email}
                        funcao={user.funcao}
                        />
                    ))}

                </div>
                
            </div>
            
        </div>
    ); 
}

export default AdminDashboard