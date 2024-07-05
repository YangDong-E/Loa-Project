// CharacterProfile.js

import React, { useEffect, useState } from 'react'
import axios from 'axios'

const LostarkApiKey =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAwNDU0MzAifQ.O0ahFMY78geMKVfZPdWILvEONPH_0bMgVpBaHbsb2jLjMJ1ERkLYNRGDJFU6X2xt4IetAoJOJmwPgv0gKISJkKVlnesf_ymWaq3kGQXlfeX0u07WtpNNFaYJV5mQFUUhVE1COezg7pliWnCUZmPFrkT3RyCK193nnKovGOIoHzpHxEmGXy2yoAPoMLwUYWlEGzB8jwDstmDzYaDMzHPvEBFBxDWMjZPoc4HKKa-SFzFHBbT_2YFOCG0ErY4QbG_2PyOUR0CrSCr8Kd9pQAdiGs9Nq4FseXEiuQ0jwujQb4_kcWY-0rB40FHrA2vCn7CmzCMlTnU-EozEwt3kvo8zDw' // Lostark API 키

function CharacterProfile({ characterName }) {
    const [characterData, setCharacterData] = useState(null)

    useEffect(() => {
        if (!characterName) return // characterName이 비어있으면 아무 작업도 수행하지 않음

        async function fetchCharacterProfiles() {
            try {
                const encodedCharacterName = encodeURIComponent(characterName)
                const url = `https://developer-lostark.game.onstove.com/armories/characters/${encodedCharacterName}/profiles`
                const response = await axios.get(url, {
                    headers: {
                        authorization: `Bearer ${LostarkApiKey}`,
                        accept: 'application/json',
                        'content-Type': 'application/json',
                    },
                })

                if (response.status === 200) {
                    setCharacterData(response.data)
                } else {
                    throw new Error('Failed to fetch character profiles')
                }
            } catch (error) {
                console.error(error.message)
            }
        }

        fetchCharacterProfiles() // characterName이 변경될 때마다 호출
    }, [characterName])

    return (
        <div className="character-profile">
            {characterData ? (
                <div>
                    <h2>{characterData.CharacterName}</h2>
                    <p>서버: {characterData.ServerName}</p>
                    <p>직업: {characterData.CharacterClassName}</p>
                    <p>칭호: {characterData.Title}</p>
                    <p>레벨 : {characterData.ItemMaxLevel}</p>
                    <p>길드: {characterData.GuildName}</p>
                    <p>특화: {characterData.Stats[1].Value}</p>
                    <p>치명: {characterData.Stats[0].Value}</p>
                    <p>신속: {characterData.Stats[2].Value}</p>
                    <img
                        src={characterData.CharacterImage}
                        alt={characterData.CharacterName}
                        style={{ width: '512px', height: '420px' }}
                    />

                    {/* 다른 캐릭터 프로필 정보 표시 */}
                </div>
            ) : (
                <p>캐릭터 정보를 불러오는 중...</p>
            )}
        </div>
    )
}

export default CharacterProfile
