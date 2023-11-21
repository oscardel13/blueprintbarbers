import Logo from '../../components/logo/logo_store.component'
import bgImage1 from '../../assets/IMG_0225.jpg'
import bgImage2 from '../../assets/Barbers-background2.jpg'
import bgImage3 from '../../assets/pexels-stefan-lorentz-668196.jpg'

import ProductList from './components/product_list/product_list.component';

const containerStyle = {
  backgroundImage: `url(${bgImage2})`,
  backgroundPosition: 'bottom center',
  backgroundSize: 'cover',
  boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.7)',

};

const Store = () => {
  return (
    <>
        <div className="flex justify-center items-center h-[60vh] lg:h-[80vh]" style={containerStyle}>
          <Logo styling="lg:scale-[2.0]"/>
        </div>
        <ProductList/>
    </>
  );
}

export default Store;
