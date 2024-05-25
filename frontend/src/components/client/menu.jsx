'use client';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Link from 'next/link';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HelpIcon from '@mui/icons-material/Help';
import NavDropdown from 'react-bootstrap/NavDropdown';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import LogoutIcon from '@mui/icons-material/Logout';
import { useSession, signIn, signOut } from 'next-auth/react'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { useRouter } from 'next/navigation'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CartModal from "./shoppingCart/cartModal";
import { useShoppingCart } from "use-shopping-cart" ;
function Menu({children }) {
const { handleCartClick, cartCount } = useShoppingCart();
const router = useRouter()
const { data: session } = useSession()
const title=<DynamicFeedIcon/>
return (
<>
<Navbar bg="dark" data-bs-theme="dark">
<Container>
<Navbar.Brand href="#home">My-Site</Navbar.Brand>
<Nav className="me-auto">
<NavDropdown title={title} >
{children }
</NavDropdown>
<Nav.Link as={Link} href="/"><HomeIcon/>Home</Nav.Link>
{session? <Nav.Link onClick={() => signOut()}><LogoutIcon/>Se
déconnecter</Nav.Link>
: <Nav.Link onClick={() => signIn()}><AccountCircleIcon/>Se
connecter</Nav.Link>
}
<Nav.Link as={Link} href="/client/pageAide"><HelpIcon
/>Aide</Nav.Link>
<Nav.Link onClick={() =>
router.push('/client/cartProducts')}><ShoppingBasketIcon style={{ color:
'pink' }}/> Shopping Cart </Nav.Link>
</Nav>
<button className="relative" onClick={() => handleCartClick()}>
<ShoppingCartIcon color="primary"/>
<div className="rounded-full flex justify-center items-center
bg-emerald-500 text-xs text-white absolute w-6 h-5 bottom-6 -right-1">
{cartCount}
</div>
</button>
<CartModal />
</Container>
</Navbar>
</>
);
}
export default Menu;