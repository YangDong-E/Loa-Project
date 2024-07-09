import Events from '../../components/events'
import Island from '../../components/island'
import Notice from '../../components/notice'

const Home = () => {
    return (
        <div className="home">
            <div className="list">
                <Notice />
                <Events />
            </div>
            <div>
                <Island />
            </div>
        </div>
    )
}

export default Home
