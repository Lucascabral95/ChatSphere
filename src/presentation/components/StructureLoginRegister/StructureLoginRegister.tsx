import "./StructureLoginRegister.scss";

interface StructureLoginRegisterProps {
  children: React.ReactNode;
}

const StructureLoginRegister = ({ children }: StructureLoginRegisterProps) => {
  return (
    <div className="StructureLoginRegister">
      <div className="contenedor-login-register">{children}</div>
    </div>
  );
};

export default StructureLoginRegister;
