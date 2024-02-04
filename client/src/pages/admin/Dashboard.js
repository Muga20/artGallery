import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar";
import AdminNavbar from "../../components/AdminNavbar";
import { api } from "../../middleware/Api";

function Dashboard() {
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState({ activeUsers: [], inactiveUsers: [] });


  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js";
    script.defer = true;

    document.body.appendChild(script);

    return () => {
      // Clean up: Remove the script from the DOM when the component unmounts
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await api("/user/ActiveAndDeActive", "GET", {}, {});
       
        setUsers(response);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    getUsers();
  }, []);



  return (
    <div className="bg-gray-100  h-screen dark:bg-gray-800">
      <div className="body-content" x-data="{ open: true }">
        <div className="relative lg:block navbar-menu">
         <AdminSidebar open={open} setOpen={setOpen} loading={loading} setLoading={setLoading}/>
        </div>

        <div
          className={`relative lg:block navbar-menu ${
            open ? "lg:ml-[280px]" : "lg:ml-0"
          }`}
        >
        
          <AdminNavbar open={open} setOpen={setOpen} loading={loading} setLoading={setLoading}/>

          <section className="bg-gray-100 dark:bg-gray-800">
          <section className="px-6 pt-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="flex items-center p-4 rounded-md shadow dark:bg-gray-900 bg-gray-50">
                <div className="mr-4">
                  <span className="inline-block p-4 mr-2 text-blue-600 bg-blue-100 rounded-full dark:text-gray-400 dark:bg-gray-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="w-5 h-5 dark:group-hover:text-gray-300"
                        viewBox="0 0 16 16"
                      >
                        <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z" />
                      </svg>
                    </span>
                </div>
                <div>
                  <p className="mb-2 text-gray-700 dark:text-gray-400">
                    Active Users
                  </p>
                  <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-400">
                  {users.activeUsers.length}
                  </h2>
                </div>
              </div>
              <div className="flex items-center p-4 rounded-md shadow dark:bg-gray-900 bg-gray-50">
                <div className="mr-4">
                  <span className="inline-block p-4 mr-2 text-blue-600 bg-blue-100 rounded-full dark:text-gray-400 dark:bg-gray-700">
                  <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="w-5 h-5 dark:group-hover:text-gray-300"
                        viewBox="0 0 16 16"
                      >
                        <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z" />
                      </svg>
                    </span>
                </div>
                <div>
                  <p className="mb-2 text-gray-700 dark:text-gray-400">
                     InActive Users
                  </p>
                  <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-400">
                  {users.inactiveUsers.length}
                  </h2>
                </div>
              </div>
              <div className="flex items-center p-4 rounded-md shadow dark:bg-gray-900 bg-gray-50">
                <div className="mr-4">
                  <span className="inline-block p-4 mr-2 text-blue-600 bg-blue-100 rounded-full dark:text-gray-400 dark:bg-gray-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="w-6 h-6 bi bi-chat-text"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"></path>
                      <path d="M4 5.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8zm0 2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5z"></path>
                    </svg>
                  </span>
                </div>
                <div>
                  <p className="mb-2 text-gray-700 dark:text-gray-400">
                    Pending Requests
                  </p>
                  <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-400">
                    56
                  </h2>
                </div>
              </div>
            </div>
          </section>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
