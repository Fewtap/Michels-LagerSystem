import Link from "next/link";

const Inventory = () => {
    return(
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold mb-4">Inventory Management</h1>
            <p className="text-lg">Manage your inventory efficiently.</p>
            <div className="mt-8">

                <Link href={"/inventory/add"}>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" >
                        Add New Item
                    </button>
                </Link>
            </div>
        </div>
    );
}
export default Inventory;