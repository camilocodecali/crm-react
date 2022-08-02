import { useState, useEffect } from 'react'
import { useParams }  from 'react-router-dom'

const VerCliente = () => {

    const [cliente, setCliente] = useState([])

    const {id} = useParams()

    useEffect(()=>{
        const obtenerClienteAPI = async () =>{
            try {
                const url = `http://localhost:4000/clientes/${id}`
                const respuesta = await fetch(url)
                const resultado = await respuesta.json()
                console.log(resultado);
                setCliente(resultado)
                
            } catch (error) {
                console.log(error);
            }
        }

        obtenerClienteAPI()
    },[])
    

  return (
    <div>
        <h1 className='font-black text-4xl text-blue-900'>Ver Cliente: {cliente.nombre}</h1>
          <p className='mt-3'>Información del cliente</p>

        <p className='text-4xl text-gray-600 mt-10'>
            <span className='text-gray-800 uppercase font-bold'> Cliente:</span>
              {cliente.nombre}
        </p>
        <p className='text-2xl text-gray-600 mt-4'>
            <span className='text-gray-800 uppercase font-bold'> Email:</span>
              {cliente.email}
        </p>
        <p className='text-2xl text-gray-600 mt-4'>
            <span className='text-gray-800 uppercase font-bold'> Telefóno:</span>
              {cliente.telefono}
        </p>
        <p className='text-2xl text-gray-600 mt-4'>
            <span className='text-gray-800 uppercase font-bold'> Empresa:</span>
              {cliente.empresa}
        </p>
        <p className='text-2xl text-gray-600 mt-4'>
            <span className='text-gray-800 uppercase font-bold'> Notas:</span>
              {cliente.notas}
        </p>
    </div>
  )
}

export default VerCliente