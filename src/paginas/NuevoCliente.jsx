import Formulario from '../components/Formulario'

const NuevoCliente = () => {
  return (
    <div>
        <> 
          <h1 className='font-black text-4xl text-blue-900'>Nuevo Cliente</h1>
          <p className='mt-3'>Llena los siguientes campos para registrar un cliente</p>
          <Formulario></Formulario>
        </>  
    </div>
  )
}

export default NuevoCliente