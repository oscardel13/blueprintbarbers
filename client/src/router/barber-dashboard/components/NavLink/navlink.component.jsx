import { NavLink as Link } from 'react-router-dom';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const NavLink = (props) => {
    const { Icon, to, title, onClick } = props
    return (
        <Link to={to} className='flex py-2 hover:bg-gray-500 rounded-md rounded-lg' onClick={onClick}>
            <Icon/>
            &nbsp;
            &nbsp;
            {title}
        </Link>
    )
}

export default NavLink;