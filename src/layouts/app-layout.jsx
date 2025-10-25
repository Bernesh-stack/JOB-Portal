// in AppLayout.jsx
import Header from "@/components/header";
import { Outlet } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const AppLayout = () => {
  const { isLoaded } = useUser();
  return (
    <div>
      <div className="grid-background" />
      <main className="min-h-screen container">
        {isLoaded ? <Header /> : null}
        <Outlet />
      </main>
      <div className="p-10 text-center bg-gray-800 mt-10">Just learning</div>
    </div>
  );
};
export default AppLayout;
