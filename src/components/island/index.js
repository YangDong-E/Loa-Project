import { useState, useEffect } from 'react'
import axiosDefault from '../../config/axios'

const Island = () => {
    const [islandData, setIslandData] = useState(null)
    const today = new Date().toISOString().split('T')[0]

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosDefault.get(
                    `/gamecontents/calendar`
                )
                console.log(response.data) // API 응답 확인
                return response.data
            } catch (error) {
                console.error(error) // 오류 출력
                throw error.response
            }
        }

        fetchData()
            .then((response) => setIslandData(response))
            .catch((error) => {
                console.error('error: ', error)
            })
    }, [])

    const processedData = islandData?.filter((schedule) => {
        const startDates = schedule.StartTimes.map((time) => time.split('T')[0])
        return startDates.includes(today) && schedule.CategoryName === '모험 섬'
    })

    return (
        <section>
            <div className="island-inner">
                <h3>오늘의 모험 섬</h3>
                <div className="island-list">
                    {processedData && processedData.length > 0 ? (
                        processedData.map((island, idx) => (
                            <div key={`island_${idx}`}>
                                <div className="island-info">
                                    <img
                                        src={island.ContentsIcon}
                                        alt={`${island.ContentsName} 이미지`}
                                    />
                                    <p className="title">
                                        {island.ContentsName}
                                    </p>
                                </div>
                                <div className="island-time">
                                    {island.StartTimes.filter(
                                        (time) => time.split('T')[0] === today
                                    ).map((time, idx) => (
                                        <p
                                            key={`time_${idx}`}
                                            className={
                                                new Date(time) < new Date()
                                                    ? 'over'
                                                    : ''
                                            }
                                        >
                                            {time.split('T')[1].slice(0, 5)}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>오늘의 모험 섬 정보가 없습니다.</p>
                    )}
                </div>
            </div>
        </section>
    )
}

export default Island
