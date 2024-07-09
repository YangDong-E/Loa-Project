import { useEffect, useState } from 'react'
import axiosDefault from '../../config/axios'
import { Link } from 'react-router-dom'

const Notice = () => {
    const [newsList, setNewsList] = useState(null)

    useEffect(() => {
        const fetchNewsData = async () => {
            try {
                const response = await axiosDefault.get(`/news/notices`)
                return response.data
            } catch (error) {
                throw error.response
            }
        }
        fetchNewsData()
            .then((response) => setNewsList(response.slice(0, 6)))
            .catch((error) => {
                switch (error.status) {
                    case 503:
                        setNewsList([
                            {
                                Title: '로스트아크 게임이 점검중입니다',
                                Date: new Date().toISOString().slice(0, 10),
                                Type: '공지',
                            },
                        ])
                        break
                    default:
                        console.log(error)
                }
            })
    }, [])

    const dateFormat = (dateTime) => dateTime.slice(0, 10).replaceAll('-', '.')
    const noticeTypeFormat = (noticeType) => {
        switch (noticeType) {
            case '공지':
                return 'type-notice'
            case '상품':
                return 'type-shop'
            case '점검':
                return 'type-check'
            case '이벤트':
                return 'type-event'
            default:
                break
        }
    }

    return (
        <section id="news">
            <div className="news-inner">
                <h3>로스트아크 공지사항</h3>
                <ul className="news-list">
                    {newsList?.map((notice, idx) => {
                        return (
                            <li key={`news_${idx}`}>
                                <Link
                                    to={notice.Link}
                                    target="_blank"
                                    title="새 탭으로 열기"
                                >
                                    <p className="title">{notice.Title}</p>
                                    <p className="date">
                                        <span
                                            className={[
                                                'type',
                                                noticeTypeFormat(notice.Type),
                                            ].join(' ')}
                                        >
                                            {notice.Type}
                                        </span>
                                        {dateFormat(notice.Date)}
                                    </p>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </section>
    )
}

export default Notice
