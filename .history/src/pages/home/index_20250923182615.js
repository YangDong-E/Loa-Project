import '../../assets/scss/home.scss'
import Events from '../../components/events'
import Island from '../../components/island'
import Notice from '../../components/notice'

const Home = () => {
    return (
        <div className="home-wrap">
            <div className="left-item">
                <Notice />
            </div>
            <div className="right-item">
                <Island />
            </div>
            <div className="bottom-item">
                <Events />
            </div>
        </div>
    )
}

export default Home
