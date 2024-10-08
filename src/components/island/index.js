import { useState, useEffect } from 'react'
import axiosDefault from '../../config/axios'

const Island = () => {
    // 섬 데이터
    const [islandData, setIslandData] = useState(null)

    // 오늘인지 아닌지 구분
    const today = new Date().toISOString().split('T')[0]

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosDefault.get(
                    `/gamecontents/calendar`
                )
                return response.data
            } catch (error) {
                throw error.response
            }
        }
        fetchData()
            .then((response) => setIslandData(response))
            .catch((error) => {
                switch (error.status) {
                    case 503:
                        break
                    default:
                        console.log(error)
                }
            })
    }, [])

    const processedData = islandData?.filter(
        (schedule) =>
            String(schedule.StartTimes).split('T')[0] === today &&
            schedule.CategoryName === '모험 섬'
    )

    return (
        <section>
            <div className="island-inner">
                <h3>오늘의 모험 섬</h3>
                <div className="island-list">
                    {processedData?.map((island, idx) => {
                        return (
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
                                        (times) => times.split('T')[0] === today
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
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default Island
