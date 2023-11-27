import { useState, useEffect, useRef } from 'react';

import { putAPIMultipart } from '../../../../utils/api';

const ProductItemDropdown = (props) => {
    const { item, product, setItems } = props;
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    //TODO call api that updates 
    const handleStatusReady = async() => {
        const updatedProduct = product
        updatedProduct.items = updatedProduct.items.map(itemObj => {
            if(item._id === itemObj._id){
                itemObj.status = 'ready'
            }
            return itemObj;
        })
        try{
            const productFormData = new FormData();
            productFormData.append('form', JSON.stringify(updatedProduct))

            const response = await putAPIMultipart(`/products/${product.name}`, productFormData);
            if (response.status === 200) {
                setItems(response.data.items)   
                setDropdownOpen(false)
            }
        }
        catch(err){
            console.log(err)
        }
    }

    const handleSetPrinting = async () =>{
        const updatedProduct = product
        navigator.clipboard.writeText(`https://beta.blueprintbarbers.co/store/${product.name}/${item._id}`);
        updatedProduct.items = updatedProduct.items.map(itemObj => {
            if(item._id === itemObj._id){
                itemObj.status = 'printing'
            }
            return itemObj;
        })
        try{
            const productFormData = new FormData();
            productFormData.append('form', JSON.stringify(updatedProduct))

            const response = await putAPIMultipart(`/products/${product.name}`, productFormData);
            if (response.status === 200) {
                setItems(response.data.items) 
                setDropdownOpen(false)
                // window.alert("Unique Link has been copied")
            }
        }
        catch(err){
            console.log(err)
        }
    }

    const handleClickOutside = (event) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target) &&
            event.target.className !== 'bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 rounded-md'
          ) {
            setDropdownOpen(false);
          }
      };
    
      useEffect(() => {
        document.addEventListener('click', handleClickOutside);
    
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
      }, []);

    return (
        <div className='relative'>
            <span className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 rounded-md" onClick={toggleDropdown}>Action</span>
            {isDropdownOpen && (
                <div ref={dropdownRef} className='p-3 grid grid-cols-1 gap-2 z-3 absolute flex flex-col justify-center w-max top-[100%] right-5 bg-gray-300 text-black border-solid border-black border-[1px]'>
                    <a className="block p-2 cursor-pointer hover:text-white hover:bg-gray-500" onClick={handleSetPrinting}>Status set: Printing</a>
                    <a className="block p-2 cursor-pointer hover:text-white hover:bg-gray-500" onClick={handleStatusReady}>Status set: Ready</a>
                    <a className="block p-2 cursor-pointer hover:text-white hover:bg-gray-500" href={`https://beta.blueprintbarbers.co/store/${product.name}/${item._id}`} target="_blank">View</a>
                </div>
            )}
        </div>
    );
};

export default ProductItemDropdown;
