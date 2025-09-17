import '../../assets/scss/home.scss'
import Events from '../../components/events'
import Island from '../../components/island'
import Notice from '../../components/notice'

const Home = () => {
    return (
        <div className="home-wrap">
            <div className="left-item">
                <Notice />
                {/* <Events /> */}
            </div>
            <div className="right-item">
                <Island />
            </div>
        </div>
    )
}

export default Home
