import PageHeader from '../../compoenents/page-header/page-header.component';
import ProductView from '../../../../components/product-view/product-view.component';
import { Link, useParams } from 'react-router-dom';

const ViewProduct = () => {
    const { productName } = useParams();
    console.log(productName);
    return (
        <div className="container p-3 bg-white rounded-md">
            <PageHeader title="View Product">
                <Link className="bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded" to={`/dashboard/products/${productName}/edit`}>Edit</Link>
            </PageHeader>
            <ProductView/>
        </div>
    );
};

export default ViewProduct;
