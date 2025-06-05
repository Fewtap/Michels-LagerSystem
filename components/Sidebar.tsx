import { aside } from "motion/react-client";

export interface ISiderbarProps<T> {
    JoinedItems: T[];
};

export const Siderbar = <T extends object>(props: ISiderbarProps<T> & { children?: any }) => {
    return (
        <div className="w-[20vw] h-screen bg-gray-800 text-white overflow-auto">
            {props.children.map((item, index) => (
                <div key={index} className="text-wrap border-b border-gray-700 p-2">
                    {item}
                </div>
            ))}
        </div>
    );
}

export default Siderbar;


