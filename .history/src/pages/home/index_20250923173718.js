import '../../assets/scss/home.scss'
import Events from '../../components/events'
import Island from '../../components/island'
import Notice from '../../components/notice'

const Home = () => {
    return (
        <div className="home-wrap">
            <div className="top=wrap">
                <div className="left-item">
                    <Notice />
                    {/* <Events /> */}
                </div>
                <div className="right-item">
                    <Island />
                </div>
            </div>

            <div className="bottom-wrap">
                <Events />
            </div>
        </div>
    )
}

export default Home
