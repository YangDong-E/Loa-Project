import { useState } from 'react'
import { getCharacter } from '../../store/characterSlice'
import { useDispatch } from 'react-redux'
import '../../assets/scss/search.scss'

const Search = () => {
    const [charName, setCharName] = useState('')

    const dispatch = useDispatch()

    const handleSubmit = (value) => {
        dispatch(getCharacter(value))
            .unwrap()
            .catch((error) => {})
    }
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSubmit(charName)
        }
    }

    return (
        <section id="search">
            <div className="search-inner">
                <input
                    type="text"
                    placeholder="캐릭터명을 입력해주세요"
                    value={charName}
                    onChange={(e) => setCharName(e.target.value)}
                    onKeyUp={(e) => handleKeyDown(e)}
                />
                <button type="button" onClick={() => handleSubmit(charName)} />
            </div>
        </section>
    )
}

export default Search
