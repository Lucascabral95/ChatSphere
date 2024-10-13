import "./StructureLoginRegister.scss"

const StructureLoginRegister = ({ children }) => {
  return (
    <div className="StructureLoginRegister">
       <div className="contenedor-login-register">

         {children}

       </div>
    </div>
  )
}

export default StructureLoginRegister