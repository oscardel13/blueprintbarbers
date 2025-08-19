import LinkGenerator from "../link-generator/link-generator.component";

const PageHeader = ({title, children}) => {
    return (
        <div className="flex justify-between items-center mb-4 flex-wrap space-y-5">
            <div className="flex items-left flex-col">
                <h1 className="text-3xl font-semibold mb-4">{title}</h1>
                <LinkGenerator/>
            </div>
            {children}
        </div>
    )
}

export default PageHeader;