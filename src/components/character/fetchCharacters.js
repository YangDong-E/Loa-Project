import axios from 'axios'

const LostarkApiKey =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAwNDU0MzAifQ.O0ahFMY78geMKVfZPdWILvEONPH_0bMgVpBaHbsb2jLjMJ1ERkLYNRGDJFU6X2xt4IetAoJOJmwPgv0gKISJkKVlnesf_ymWaq3kGQXlfeX0u07WtpNNFaYJV5mQFUUhVE1COezg7pliWnCUZmPFrkT3RyCK193nnKovGOIoHzpHxEmGXy2yoAPoMLwUYWlEGzB8jwDstmDzYaDMzHPvEBFBxDWMjZPoc4HKKa-SFzFHBbT_2YFOCG0ErY4QbG_2PyOUR0CrSCr8Kd9pQAdiGs9Nq4FseXEiuQ0jwujQb4_kcWY-0rB40FHrA2vCn7CmzCMlTnU-EozEwt3kvo8zDw'

async function fetchCharacters(characterName) {
    try {
        characterName = encodeURIComponent(characterName)
        const url = `https://developer-lostark.game.onstove.com/characters/${characterName}/siblings`
        const response = await axios.get(url, {
            headers: {
                authorization: `Bearer ${LostarkApiKey}`,
                accept: 'application/json',
                'content-Type': 'application/json',
            },
        })

        if (response.status === 200) {
            const characters = response.data
            // 이미지 URL을 가져오는 추가 API 요청
            const charactersWithImages = await Promise.all(
                characters.map(async (character) => {
                    const characterName = character.CharacterName
                    const characterImageResponse = await axios.get(
                        `https://api.example.com/CharacterImage?CharacterName=${characterName}`
                    )
                    character.CharacterImage =
                        characterImageResponse.data.imageUrl
                    return character
                })
            )
            return charactersWithImages
        } else {
            throw new Error('Failed to fetch data')
        }
    } catch (error) {
        throw new Error(error.message)
    }
}

export default fetchCharacters
