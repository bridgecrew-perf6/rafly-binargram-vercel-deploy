import AuthProvider from "../../providers/auth/AuthProvider";
import MainLayout from "../../components/layout/MainLayout";
import useAccount from "./hooks/useAccount";

const Account = () => {
  const { profile } = useAccount();
  const handleLogout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    window.location.reload();
  }


  return (
    <AuthProvider>
      <MainLayout>
        {
          profile && (
            <section>
              <div className="flex justify-center items-center">
                <div className="w-24 h-24 rounded-full border border-gray-500 bg-gray-100"></div>
              </div>
              <div className=" my-3">
                <div className="flex px-3 justify-start items-center py-2 text-sm border-b border-gray-200">
                  <div className="w-28">Username</div>
                  <div className="flex-1">{profile.username}</div>
                </div>
                <div className="flex px-3 justify-start items-center py-2 text-sm border-b border-gray-200">
                  <div className="w-28">Email</div>
                  <div className="flex-1">{profile.email}</div>
                </div>
              </div>
              <div className="text-center">
                <button onClick={() => handleLogout()} type="button" className="text-red-500 py-3 px-5 text-sm">Sign Out</button>
              </div>
            </section>
          )
        }
      </MainLayout>
    </AuthProvider>
  )

}

export default Account;