import { Link, useLocation } from 'react-router-dom'
import { findImage } from '../../utils'

const NavMenu = ({ path, children }) => {
    const location = useLocation()
    const matchPath = (path) => {
        return location.pathname === path ? 'matched' : ''
    }
    return (
        <div
            className={matchPath(path)}
            style={{ display: 'flex', margin: '15px', fontSize: '1.6rem' }}
        >
            <Link
                to={path}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    textDecoration: 'none',
                    font: 'menu',
                    fontSize: '1.6rem',
                    fontWeight: '600',
                }}
            >
                <div
                    style={{
                        height: '1.5rem',
                        display: 'flex',
                    }}
                />
                <p>{children}</p>
            </Link>
        </div>
    )
}

export default NavMenu
