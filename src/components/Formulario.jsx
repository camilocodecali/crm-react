import React from 'react'
import { Formik, Form, Field } from 'formik'
import { useNavigate} from 'react-router-dom'
import * as Yup from 'yup'
import Alerta from './Alerta'
import Spinner from './Spinner'

const Formulario = ({cliente, cargando}) => {

    const navigate = useNavigate()

    const nuevoClienteSchema = Yup.object().shape({
                nombre: Yup.string()
                            .min(3,'El nombre es muy corto')
                            .max(40,'El nombre es muy largo')
                            .required('El nombre del cliente es obligatorio'),
                empresa:Yup.string()
                            .required('El nombre del la Empresa es obligatorio'),
                email:Yup.string()
                            .email('Email no valido')
                            .required('El email es obligatorio'),
                telefono:Yup.number().typeError('El número no es valido')
                            .integer('Número no valido')
                            .positive('Número no valido'),
                notas:''
    })

    const handleSubmit = async (valores)=>{
        console.log(valores);
        try {
            let respuesta
            if (cliente.id) {
                //Editando registro
                const url = `${import.meta.env.VITE_API_URL}/${cliente.id}`

                 respuesta = await fetch(url, {
                    method: 'PUT',
                    body: JSON.stringify(valores),
                    headers: {
                        'Content-Type': 'application/json'
                    }
    
                })

            }else{
                //Nuevo registro
                const url = import.meta.env.VITE_API_URL

                 respuesta = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(valores),
                    headers: {
                        'Content-Type': 'application/json'
                    }
    
                })

            }

            await respuesta.json()

            navigate('/clientes')
            
        } catch (error) {
            console.log(error);
        }
        

    }

  return (
    cargando ? <Spinner></Spinner> :
    <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md
    md:w-3/4 mx-auto'>
        <h1 className='text-gray-600 font-bold text-xl uppercase text-center'>{cliente?.nombre ? 'Editar cliente' :'Agregar Cliente'}</h1>

        <Formik
            initialValues={{
                nombre: cliente?.nombre ?? "",
                empresa:cliente?.empresa ?? "",
                email:cliente?.email ?? "",
                telefono:cliente?.telefono ?? "",
                notas:cliente?.notas ?? ""
            }}
            enableReinitialize={true}
            onSubmit={async (values, {resetForm})=>{
                await handleSubmit(values);

                resetForm()
            }}
            validationSchema={nuevoClienteSchema}
        >
            {({errors, touched})=>{
                
                return (

            
            <Form
                className='mb-4'
            >
                <div>
                    <label 
                        htmlFor="nombre"
                        className='text-gray-800'
                    >Nombre:</label>
                    <Field
                        id="nombre"
                        type="text"
                        className="mt-2 block w-full p-3 bg-gray-50"
                        placeholder="Nombre del cliente"
                        name="nombre"
                    />

                    {errors.nombre && touched.nombre ? (
                        <Alerta>{errors.nombre}</Alerta>
                    ): null }

                </div>
                <div>
                    <label 
                        htmlFor="empresa"
                        className='text-gray-800'
                    >Empresa:</label>
                    <Field
                        id="empresa"
                        type="text"
                        className="mt-2 block w-full p-3 bg-gray-50"
                        placeholder="Empresa del cliente"
                        name="empresa"
                    />
                    
                    {errors.empresa && touched.empresa ? (
                        <Alerta>{errors.empresa}</Alerta>
                    ): null }
                </div>
                <div>
                    <label 
                        htmlFor="email"
                        className='text-gray-800'
                    >Email:</label>
                    <Field
                        id="email"
                        type="email"
                        className="mt-2 block w-full p-3 bg-gray-50"
                        placeholder="Email del cliente"
                        name="email"
                    />
                    
                    {errors.email && touched.email ? (
                        <Alerta>{errors.email}</Alerta>
                    ): null }
                </div>
                <div>
                    <label 
                        htmlFor="telefono"
                        className='text-gray-800'
                    >Teléfono:</label>
                    <Field
                        id="telefono"
                        type="tel"
                        className="mt-2 block w-full p-3 bg-gray-50"
                        placeholder="Teléfono del cliente"
                        name="telefono"
                    />
                    
                    {errors.telefono && touched.telefono ? (
                        <Alerta>{errors.telefono}</Alerta>
                    ): null }
                </div>
                <div>
                    <label 
                        htmlFor="notas"
                        className='text-gray-800'
                    >Notas:</label>
                    <Field
                        as="textarea"
                        id="notas"
                        type="text"
                        className="mt-2 block w-full p-3 bg-gray-50 h-40"
                        placeholder="Notas del cliente"
                        name="notas"
                    />
                </div>
                <input 
                    type="submit" 
                    value={cliente?.nombre ? 'Editar cliente' :'Agregar Cliente'}
                    className='mt-5 bg-blue-800 w-full p-3 text-white uppercase font-bold text-lg'
                />
                
            </Form>
            )}}
        </Formik>
    </div>
  )
}

Formulario.defaultProps = {
    cliente:{},
    cargando:(false)
}

export default Formulario