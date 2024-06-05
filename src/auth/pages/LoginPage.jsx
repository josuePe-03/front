import { useEffect } from "react";
import Swal from "sweetalert2";
import { useAuthStore, useForm } from "../../hooks";

const loginFormFields = {
  loginEmail: "",
  loginPassword: "",
};

const registerFormFields = {
  registerName: "",
  registerEmail: "",
  registerPassword: "",
  registerPassword2: "",
};

export const LoginPage = () => {
  const { startLogin, errorMessage, startRegister } = useAuthStore();

  const {
    loginEmail,
    loginPassword,
    onInputChange: onLoginInputChange,
  } = useForm(loginFormFields);
  const {
    registerEmail,
    registerName,
    registerPassword,
    registerPassword2,
    onInputChange: onRegisterInputChange,
  } = useForm(registerFormFields);

  const loginSubmit = (event) => {
    event.preventDefault();
    startLogin({ email: loginEmail, password: loginPassword });
  };

  const registerSubmit = (event) => {
    event.preventDefault();
    if (registerPassword !== registerPassword2) {
      Swal.fire("Error en registro", "Contraseñas no son iguales", "error");
      return;
    }

    startRegister({
      name: registerName,
      email: registerEmail,
      password: registerPassword,
      rol: 1,
    });
  };

  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire("Error en la autenticación", errorMessage, "error");
    }
  }, [errorMessage]);

  return (
    <div className="h-screen bg-gray-200">
      <section className="h-full w-full ">
        <div className="flex justify-center items-center h-full">
          <div className="shadow-gray-300 shadow-lg w-11/12 md:w-7/12 lg:grid lg:grid-cols-2 lg:w-7/12 2xl:w-5/12 rounded-xl lg:h-[25rem]">
            <div className="hidden lg:flex justify-center items-center">
              <img className="w-[15rem]" src="../logo.png" alt="" />
            </div>

            <div className="p-6 space-y-4 md:space-y-6 lg:space-y-3 sm:p-8 relative flex justify-center flex-col ">
              <h1 className=" font-bold  text-gray-500 text-4xl  text-center">
                Login
              </h1>
              <form
                className="space-y-4 md:space-y-6 lg:space-y-5 "
                onSubmit={loginSubmit}
              >
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-900">
                    Correo
                  </label>
                  <input
                    type="email"
                    name="loginEmail"
                    value={loginEmail}
                    onChange={onLoginInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="name@example.com"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    name="loginPassword"
                    value={loginPassword}
                    onChange={onLoginInputChange}
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-[#004b93] hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                >
                  Iniciar Sesion
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
