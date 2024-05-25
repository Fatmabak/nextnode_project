'use client';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import Link from 'next/link';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ArticleIcon from '@mui/icons-material/Article';
import CategoryIcon from '@mui/icons-material/Category';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import GroupIcon from '@mui/icons-material/Group';
import ReceiptIcon from '@mui/icons-material/Receipt';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BarChartIcon from '@mui/icons-material/BarChart';
import LightModeIcon from '@mui/icons-material/LightMode'; 
import Image from 'next/image';
import { useSession } from 'next-auth/react'
const SideBar = () => {
    const { data: session } = useSession()
    return (
        <Sidebar>
            <Menu
                menuItemStyles={{
                    button: ({ level, active, disabled }) => {
                        // only apply styles on first level elements of the tree
                        if (level === 0)
                            return {
                                color: disabled ? '#b4c2c0' : '#718280',
                                backgroundColor: active ? '#4f5d73' : '#071121',
                            };
                    },
                }}
            >
                <MenuItem>
                    <div className="card" style={{ "backgroundColor": "#44ebe2" }}>
                        <div className="card-body">
                            {session?.user?.image ? (
                                <div>
                                    <Image
                                        src={session.user.image}
                                        alt={session.user.email}
                                        className='inline-block rounded-full'
                                        width={30}
                                        height={30}
                                        style={{ width: 'auto', height: 'auto' }}
                                    />
                                    {session.user.email}
                                </div>
                            ) : (
                                null
                            )}
                        </div>
                    </div>
                </MenuItem>
                <MenuItem component={<Link href="/admin/dashboard" />}> <DashboardIcon />
                    Dashboard </MenuItem>
                <MenuItem component={<Link href="/admin/products" />}> <ArticleIcon />
                    Produits </MenuItem>
                <MenuItem component={<Link href="/admin/categories" />}> <CategoryIcon />
                    Catégories </MenuItem>
                <MenuItem component={<Link href="/admin/scategories" />}>
                    <ContentCopyIcon /> Sous/Catégories</MenuItem>
                <MenuItem component={<Link href="/admin/users" />}> <GroupIcon />
                    Utilisateurs </MenuItem>
                <MenuItem component={<Link href="/admin/orders" />}> <ReceiptIcon />
                    Commandes </MenuItem>
                <MenuItem component={<Link href="/admin/calendars" />}>
                    <CalendarMonthIcon /> Calendrier </MenuItem>
                <MenuItem component={<Link href="/admin/chart" />}> <BarChartIcon />
                    Chart </MenuItem>
                <MenuItem component={<Link href="/admin/theme" />}> <LightModeIcon />
                    Thème </MenuItem>
            </Menu>
        </Sidebar>
    )
}
export default SideBar