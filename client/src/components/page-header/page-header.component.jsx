import LinkGenerator from "../link-generator/link-generator.component";

const PageHeader = ({title, children}) => {
    return (
        <div className="flex justify-between items-center mb-4">
            <div className="flex justify-between items-left flex-col">
                <h1 className="text-3xl font-semibold mb-4">{title}</h1>
                <LinkGenerator/>
            </div>
            {children}
            {/* <button className="bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded">Add</button> */}
        </div>
    )
}

export default PageHeader;