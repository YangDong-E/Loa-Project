import { useSelector } from 'react-redux'
import Search from '../../components/search'
import Profile from '../../components/character/profile'
import '../../assets/scss/character.scss'

const Character = () => {
    // ** store
    const data = useSelector((state) => state.character.characterProfile)

    // 캐릭터 조회 성공
    return (
        <main className="character-wrap">
            <section id="character">
                <div className="character-inner">
                    <div className="character-area">
                        {data === null ? (
                            <div className="character-error-area">
                                존재하지 않는 캐릭터입니다.
                            </div>
                        ) : JSON.stringify(data) === '{}' ? (
                            <div className="character-error-area" />
                        ) : (
                            <div className="character-success-area">
                                <Profile />
                            </div>
                        )}
                    </div>
                    <div className="character-search-area">
                        <Search />
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Character
