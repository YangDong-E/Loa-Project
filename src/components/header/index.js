import '../../assets/scss/layout.scss'
import { Link } from 'react-router-dom'
import { findImage } from '../../utils'
import NavMenu from './Menu'

const Header = () => {
    return (
        <header id="header">
            <div className="nav-wrap">
                <h1>
                    <Link to={'/'}>
                        <img
                            className="logo"
                            src={findImage('logo')}
                            alt="로고 이미지"
                        />
                    </Link>
                </h1>
                <nav>
                    <div className="menu">
                        <NavMenu path={'/'} className="menu-name">
                            홈
                        </NavMenu>
                        <NavMenu path={'/character'} className="menu-name">
                            캐릭터검색
                        </NavMenu>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Header
