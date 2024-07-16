import React from 'react';
import AdminDashboard from '../components/AdminDashboard';
import GerenteDashboard from '../components/GerenteDashboard';
import VendedorDashboard from '../components/VendedorDashboard';


const Dashboard = () => {

    const userType = 'Gerente'

    //valores CARD
    /*let cardsData = [];
    
    let columns = [];

    columns = [
        {
            name:"Id",
            selector:(row) => row.id
        },
        {
            name:"Title",
            selector:(row) => row.title
        },
        {
            name:"Category",
            selector:(row) => row.category
        },
        {
            name:"Price",
            selector:(row) => row.price
        }
    ]

    const [data, setData] = useState([])

    const getProduct = async() => {
        try {
            const req = await fetch("https://fakestoreapi.com/products")

        const res = await req.json()

        setData(res)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getProduct()
    }, [])

    const recentVendas = data.slice(0, 5);*/

    if (userType === 'Vendedor'){
        return(
            <VendedorDashboard />
        );
    }else if(userType === 'Gerente'){
       return(
            <GerenteDashboard />
       )
    }else if(userType === 'Admin'){
        return(
            <AdminDashboard />
        )
    }
};

export default Dashboard;
