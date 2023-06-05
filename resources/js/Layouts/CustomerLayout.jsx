import Header from "@/Components/Header";
import Sidebar from "@/Components/SideBar";

export default function CustomerLayout({ user, children }) {

    return (
        <div className="bg-gray-100 dark:bg-gray-900 transition ease-linear duration-300">

            <div className="flex h-screen overflow-hidden">
                {/* SideBar Start*/}
                <Sidebar />
                {/* SideBar Start*/}

                {/* Content Area Start*/}
                <div className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                    <Header user={user} />
                    {/* Main Content Start*/}
                    <main>
                        <div className="max-w-7xl mx-auto py-12">
                            {children}
                        </div>
                    </main>
                    {/* Main Content End*/}
                </div>
                {/* Content Area End*/}
            </div>
        </div>
    );
}
