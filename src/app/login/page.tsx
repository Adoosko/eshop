"use client";

import { useWixClient } from "@/hooks/useWixClient";
import { LoginState } from "@wix/sdk";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useState } from "react";
import { CheckCircleIcon, DoorClosed, MailIcon, UserIcon } from "lucide-react";

enum MODE {
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
  RESET_PASSWORD = "RESET_PASSWORD",
  EMAIL_VERIFICATION = "EMAIL_VERIFICATION",
}

const LoginPage = () => {
  const wixClient = useWixClient();
  const router = useRouter();

  const isLoggedIn = wixClient.auth.loggedIn();

  if (isLoggedIn) {
    router.push("/");
  }

  const [mode, setMode] = useState(MODE.LOGIN);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const formTitle =
    mode === MODE.LOGIN
      ? "Přihlášení"
      : mode === MODE.REGISTER
      ? "Registrace"
      : mode === MODE.RESET_PASSWORD
      ? "Obnovení hesla"
      : "Ověření emailu";

  const buttonTitle =
    mode === MODE.LOGIN
      ? "Přihlásit se"
      : mode === MODE.REGISTER
      ? "Registrovat se"
      : mode === MODE.RESET_PASSWORD
      ? "Obnovit"
      : "Ověřit";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      let response;

      switch (mode) {
        case MODE.LOGIN:
          response = await wixClient.auth.login({
            email,
            password,
          });
          break;
        case MODE.REGISTER:
          response = await wixClient.auth.register({
            email,
            password,
            profile: { nickname: username },
          });
          break;
        case MODE.RESET_PASSWORD:
          response = await wixClient.auth.sendPasswordResetEmail(
            email,
            window.location.href
          );
          setMessage(
            "Email pro obnovení hesla byl odeslán. Zkontrolujte svůj email."
          );
          break;
        case MODE.EMAIL_VERIFICATION:
          response = await wixClient.auth.processVerification({
            verificationCode: emailCode,
          });
          break;
        default:
          break;
      }

      switch (response?.loginState) {
        case LoginState.SUCCESS:
          setMessage("Úspěšně přihlášeni! Přesměrováváme vás.");
          const tokens = await wixClient.auth.getMemberTokensForDirectLogin(
            response.data.sessionToken!
          );

          Cookies.set("refreshToken", JSON.stringify(tokens.refreshToken), {
            expires: 2,
          });
          wixClient.auth.setTokens(tokens);
          router.push("/");
          break;
        case LoginState.FAILURE:
          if (
            response.errorCode === "invalidEmail" ||
            response.errorCode === "invalidPassword"
          ) {
            setError("Neplatný email nebo heslo!");
          } else if (response.errorCode === "emailAlreadyExists") {
            setError("Email již existuje!");
          } else if (response.errorCode === "resetPassword") {
            setError("Musíte obnovit své heslo!");
          } else {
            setError("Něco se pokazilo!");
          }
        case LoginState.EMAIL_VERIFICATION_REQUIRED:
          setMode(MODE.EMAIL_VERIFICATION);
        case LoginState.OWNER_APPROVAL_REQUIRED:
          setMessage("Váš účet čeká na schválení");
        default:
          break;
      }
    } catch (err) {
      console.log(err);
      setError("Něco se pokazilo!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className=" mt-24 max-w-[400px] mx-auto flex flex-col items-center justify-center
    border py-5 border-gray-300 rounded-xl shadow-lg bg-white dark:bg-gray-800 dark:border-gray-700"
    >
      <img src="/logo.png" alt="Company Logo" className="w-24 h-10 mb-6" />
      <form className="flex flex-col gap-6 w-full px-8" onSubmit={handleSubmit}>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
          {formTitle}
        </h1>
        {mode === MODE.REGISTER && (
          <div className="flex flex-col gap-2 w-full">
            <label className="text-sm text-gray-600 dark:text-gray-400">
              Uživatelské jméno
            </label>
            <div className="relative">
              <UserIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300" />
              <input
                type="text"
                name="username"
                placeholder="john"
                className="ring-2 ring-gray-300 rounded-md pl-10 p-4 w-full focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:ring-gray-600"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
        )}
        {mode !== MODE.EMAIL_VERIFICATION ? (
          <div className="flex flex-col gap-2 w-full">
            <label className="text-sm text-gray-600 dark:text-gray-400">
              Email
            </label>
            <div className="relative">
              <MailIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300" />
              <input
                type="email"
                name="email"
                placeholder="john@gmail.com"
                className="ring-2 ring-gray-300 rounded-md pl-10 p-4 w-full focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:ring-gray-600"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-2 w-full">
            <label className="text-sm text-gray-600 dark:text-gray-400">
              Ověřovací kód
            </label>
            <div className="relative">
              <CheckCircleIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300" />
              <input
                type="text"
                name="emailCode"
                placeholder="Kód"
                className="ring-2 ring-gray-300 rounded-md pl-10 p-4 w-full focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:ring-gray-600"
                onChange={(e) => setEmailCode(e.target.value)}
              />
            </div>
          </div>
        )}
        {(mode === MODE.LOGIN || mode === MODE.REGISTER) && (
          <div className="flex flex-col gap-2 w-full">
            <label className="text-sm text-gray-600 dark:text-gray-400">
              Heslo
            </label>
            <div className="relative">
              <DoorClosed className="absolute left-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300" />
              <input
                type="password"
                name="password"
                placeholder="Zadejte své heslo"
                className="ring-2 ring-gray-300 rounded-md pl-10 p-4 w-full focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:ring-gray-600"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
        )}
        {mode === MODE.LOGIN && (
          <div
            className="text-sm text-blue-500 cursor-pointer dark:text-blue-400"
            onClick={() => setMode(MODE.RESET_PASSWORD)}
          >
            Zapomněli jste heslo?
          </div>
        )}
        <button
          className="bg-blue-500 text-white p-3 rounded-md w-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
          disabled={isLoading}
        >
          {isLoading ? "Načítání..." : buttonTitle}
        </button>
        {error && <div className="text-red-500 dark:text-red-400">{error}</div>}
        {mode === MODE.LOGIN && (
          <div
            className="text-sm text-blue-500 cursor-pointer dark:text-blue-400"
            onClick={() => setMode(MODE.REGISTER)}
          >
            Nemáte účet?
          </div>
        )}
        {mode === MODE.REGISTER && (
          <div
            className="text-sm text-blue-500 cursor-pointer dark:text-blue-400"
            onClick={() => setMode(MODE.LOGIN)}
          >
            Máte účet?
          </div>
        )}
        {mode === MODE.RESET_PASSWORD && (
          <div
            className="text-sm text-blue-500 cursor-pointer dark:text-blue-400"
            onClick={() => setMode(MODE.LOGIN)}
          >
            Zpět na přihlášení
          </div>
        )}
        {message && (
          <div className="text-green-500 text-sm dark:text-green-400">
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

export default LoginPage;
