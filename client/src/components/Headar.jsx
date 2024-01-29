import Cookies from 'js-cookie'

const Headar = () => {
  const handleLogout = () => {
    Cookies.remove('token')
    window.location.reload()
  }
  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <a href="https://flowbite.com" className="flex items-center">
            <img
              width="50"
              height="50"
              src="https://img.icons8.com/ios-filled/50/redux.png"
              alt="redux"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Authentication system
            </span>
          </a>
          <div className="flex items-center lg:order-2">
            <button
              onClick={handleLogout}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Headar
