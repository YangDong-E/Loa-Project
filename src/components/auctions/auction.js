import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    fetchAuctionItems,
    setSortBy,
    setSortOrder,
    setItemGrade,
} from '../../store/marketSlice'

const Auction = () => {
    const dispatch = useDispatch()
    const [categoryCode, setCategoryCode] = useState('')
    const [itemName, setItemName] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [selectedGrade, setSelectedGrade] = useState('')
    const [searchTriggered, setSearchTriggered] = useState(false)

    const marketItems = useSelector((state) => state.market.items)
    const status = useSelector((state) => state.market.status)
    const error = useSelector((state) => state.market.error)
    const sortBy = useSelector((state) => state.market.sortBy)
    const sortOrder = useSelector((state) => state.market.sortOrder)

    const fetchItems = useCallback(
        (pageNo) => {
            if (searchTriggered) {
                dispatch(
                    fetchAuctionItems({
                        CategoryCode: categoryCode,
                        ItemName: itemName,
                        PageNo: pageNo,
                        SortBy: sortBy,
                        SortOrder: sortOrder,
                        ItemGrade: selectedGrade,
                    })
                ).then((action) => {
                    if (fetchAuctionItems.fulfilled.match(action)) {
                        setTotalPages(Math.ceil(action.payload.TotalCount / 10))
                    }
                })
            }
        },
        [
            categoryCode,
            itemName,
            dispatch,
            sortBy,
            sortOrder,
            selectedGrade,
            searchTriggered,
        ]
    )

    const handleCategoryChange = (e) => {
        setCategoryCode(e.target.value)
        setItemName('')
        setCurrentPage(1)
        setSearchTriggered(false)
    }

    const handleItemNameChange = (e) => {
        setItemName(e.target.value.trim())
    }

    const handleSearch = () => {
        setSearchTriggered(true)
        setCurrentPage(1)
        fetchItems(1)
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch()
        }
    }

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))
    }

    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
    }

    const handleGradeChange = (e) => {
        const grade = e.target.value
        setSelectedGrade(grade)
        dispatch(setItemGrade(grade))
        setSearchTriggered(true)
    }

    const handleSortChange = (field) => {
        const newSortOrder = sortOrder === 'ASC' ? 'DESC' : 'ASC'
        let fieldname

        switch (field) {
            case 'YDayAvgPrice':
                fieldname = 'YDAY_AVG_PRICE'
                break
            case 'RecentPrice':
                fieldname = 'RECENT_PRICE'
                break
            case 'CurrentMinPrice':
                fieldname = 'CURRENT_MIN_PRICE'
                break
            default:
                fieldname = field
                break
        }
        dispatch(setSortBy(fieldname))
        dispatch(setSortOrder(newSortOrder))
        fetchItems(currentPage)
    }

    useEffect(() => {
        fetchItems(currentPage)
    }, [currentPage, fetchItems])

    useEffect(() => {
        if (selectedGrade !== '') {
            fetchItems(1)
        }
    }, [selectedGrade, fetchItems])

    return (
        <div className="auction-wrap">
            <h1>실시간 가격</h1>

            <div className="auction-category">
                <label className="auction-category-name">카테고리</label>
                <div>
                    <input
                        type="radio"
                        id="category1"
                        name="category"
                        value="40000"
                        checked={categoryCode === '40000'}
                        onChange={handleCategoryChange}
                    />
                    <label htmlFor="category1" className="category-text">
                        각인서
                    </label>
                </div>
                <div>
                    <input
                        type="radio"
                        id="category2"
                        name="category"
                        value="50010"
                        checked={categoryCode === '50010'}
                        onChange={handleCategoryChange}
                    />
                    <label htmlFor="category2" className="category-text">
                        재련재료
                    </label>
                </div>
                <div>
                    <input
                        type="radio"
                        id="category3"
                        name="category"
                        value="50020"
                        checked={categoryCode === '50020'}
                        onChange={handleCategoryChange}
                    />
                    <label htmlFor="category3" className="category-text">
                        재련추가재료
                    </label>
                </div>
                <div>
                    <input
                        type="radio"
                        id="category4"
                        name="category"
                        value="70000"
                        checked={categoryCode === '70000'}
                        onChange={handleCategoryChange}
                    />
                    <label htmlFor="category4" className="category-text">
                        요리
                    </label>
                </div>
            </div>

            <div className="auction-search">
                <label>아이템 이름</label>{' '}
                <input
                    type="text"
                    value={itemName}
                    onChange={handleItemNameChange}
                    onKeyDown={handleKeyDown}
                    placeholder="검색어를 입력해주세요."
                />
                <button onClick={handleSearch} disabled={status === 'loading'}>
                    검색
                </button>
            </div>

            <div className="auction-info">
                <h2>아이템 목록</h2>
                <table className="auction-table">
                    <thead>
                        <tr>
                            <th onClick={() => handleSortChange('Name')}>
                                이름
                            </th>
                            <th>
                                {' '}
                                <div>
                                    <label>등급</label>{' '}
                                    <select
                                        onChange={handleGradeChange}
                                        value={selectedGrade}
                                    >
                                        <option value="">전체</option>
                                        <option value="일반">일반</option>
                                        <option value="고급">고급</option>
                                        <option value="희귀">희귀</option>
                                        <option value="영웅">영웅</option>
                                        <option value="전설">전설</option>
                                        <option value="유물">유물</option>
                                        <option value="고대">고대</option>
                                        <option value="에스더">에스더</option>
                                    </select>
                                </div>
                            </th>
                            <th
                                onClick={() => handleSortChange('YDayAvgPrice')}
                            >
                                전날 평균 거래가
                            </th>
                            <th onClick={() => handleSortChange('RecentPrice')}>
                                최근 거래가
                            </th>
                            <th
                                onClick={() =>
                                    handleSortChange('CurrentMinPrice')
                                }
                            >
                                최저가
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {status === 'succeeded' && marketItems.length > 0 ? (
                            marketItems.map((item) => (
                                <tr key={item.Id}>
                                    <td className="item-imgname">
                                        <img
                                            src={item.Icon}
                                            alt={item.Name}
                                            className="item-icon"
                                        />
                                        {item.Name}
                                    </td>
                                    <td>{item.Grade}</td>
                                    <td>{item.YDayAvgPrice}골</td>
                                    <td>{item.RecentPrice}골</td>
                                    <td>{item.CurrentMinPrice}골</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6">데이터 없음</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                {status === 'succeeded' && marketItems.length > 0 && (
                    <div className="page-button">
                        <button
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1}
                        >
                            이전
                        </button>
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage >= totalPages}
                        >
                            다음
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Auction
