// "use client";

// import { useState } from "react";

// enum MODE {
//   LOGIN = "LOGIN",
//   REGISTER = "REGISTER",
//   RESET_PASSWORD = "RESET_PASSWORD",
//   EMAIL_VERIFICATION = "EMAIL_VERIFICATION",
// }

// const LoginPage = () => {
//   const [mode, setMode] = useState(MODE.LOGIN);
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [isLoading, setIsLoading] = useState("");
//   const [emailCode, setEmailCode] = useState("");
//   const [error, setError] = useState("");
//   const [message, setMessage] = useState("");

//   const formTitle =
//     mode === MODE.LOGIN
//       ? "Prihlasenie"
//       : mode === MODE.REGISTER
//       ? "Registrace"
//       : mode === MODE.RESET_PASSWORD
//       ? "Resetovanie hesla"
//       : "Potvrdenie emailovej adresy";
//   const buttonTitle =
//     mode === MODE.LOGIN
//       ? "Prihlasit"
//       : mode === MODE.REGISTER
//       ? "Registrovat"
//       : mode === MODE.RESET_PASSWORD
//       ? "Resetovat"
//       : "Potvrdit";

//       const wixClient = useWixClient()
//   return <div>LoginPage</div>;
// };

// export default LoginPage;
