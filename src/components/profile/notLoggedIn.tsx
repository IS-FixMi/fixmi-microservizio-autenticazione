export default function NotLoggedIn() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="w-full max-w-4xl min-h-80">
        <div className="rounded-lg overflow-hidden shadow-lg bg-white">
          <div className="px-8 py-6 bg-red-100">
            <div className="font-bold text-4xl text-center mb-4 text-red-600">Non sei ancora autenticato!</div>
          </div>
          <div className="px-8 pt-4 pb-6">
            <p className="text-gray-700 text-lg text-center mb-20 mt-20">
              È necessario fare il login per poter visualizzare il proprio profilo.
            </p>
            <div className="flex justify-around">
              <a
                href="login"
                className="bg-blue-500 text-white text-4xl py-2 px-6 rounded hover:bg-blue-600 transition duration-300 ease-in-out"
              >
                Login
              </a>
              <a
                href="register"
                className="bg-green-500 text-white text-4xl py-2 px-6 rounded hover:bg-green-600 transition duration-300 ease-in-out"
              >
                Registrati
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

