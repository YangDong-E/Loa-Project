import { useSelector } from 'react-redux'
import Search from '../../components/search'
import Profile from '../../components/character/profile'
import { findImage } from '../../utils'

const Character = () => {
    // ** store
    const data = useSelector((state) => state.character.characterProfile)

    // 캐릭터 조회 성공
    return (
        <main className="character-wrap">
            <section id="character">
                <div className="character-inner">
                    <div className="character-left-area">
                        {data === null ? (
                            <div className="character-error-area">
                                <img
                                    src={findImage('char_not_found')}
                                    alt="캐릭터 미존재시 이미지"
                                />
                                존재하지 않는 캐릭터입니다.
                            </div>
                        ) : JSON.stringify(data) === '{}' ? (
                            <div className="character-error-area">
                                캐릭터명을 입력해주세요.
                            </div>
                        ) : (
                            <div className="character-area">
                                <Profile />
                            </div>
                        )}
                    </div>
                    <div className="character-right-area">
                        <Search />
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Character
