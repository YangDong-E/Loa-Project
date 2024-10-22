import React from 'react'
import { useState } from 'react'

const Calculators = () => {
    const [price, setPrice] = useState('') // 가격 입력 상태
    const [people, setPeople] = useState(4) // 기본 인원수
    const [result, setResult] = useState({}) // 결과 상태

    const handlePriceChange = (e) => {
        setPrice(e.target.value)
    }

    const handlePeopleChange = (value) => {
        setPeople(value)
        // calculate()
    }

    const calculate = () => {
        // 원하는 수식을 여기에 작성하세요. 예시는 단순히 가격을 인원수로 나누는 것입니다.
        let calUseMe = 0 // 직접사용 - 입찰가
        let calUseMeShare = 0 // 직접사용 - 분배금
        let salescharge = 0 // 판매 수수료
        let breakpoint = 0 // 최대 입찰가
        let breakpointShare = 0 // 최대 입찰가 분배금
        let calbreakpoint = 0 // 최대 입찰가 판매차익
        let buypoint = 0 // 최적 입찰가
        let buypointShare = 0 // 최적 입찰가 분배금
        let calbuypoint = 0 // 최적 입찰가 판매차익

        // 인원 수에 따라 다른 수식을 적용
        if (people === 4) {
            calUseMe = (price * 3) / 4
            calUseMeShare = calUseMe / 3
            breakpoint = (price * 0.95 * 3) / 4
            breakpointShare = breakpoint / 3
            calbreakpoint = price - breakpoint
            buypoint = breakpoint / 1.1
            buypointShare = buypoint / 3
            calbuypoint = price - buypoint
        } else if (people === 8) {
            calUseMe = (price * 7) / 8
            calUseMeShare = calUseMe / 7
            breakpoint = (price * 0.95 * 7) / 8
            breakpointShare = breakpoint / 7
            calbreakpoint = price - breakpoint
            buypoint = breakpoint / 1.1
            buypointShare = buypoint / 7
            calbuypoint = price - buypoint
        } else if (people === 16) {
            calUseMe = (price * 15) / 16
            calUseMeShare = calUseMe / 15
            breakpoint = (price * 0.95 * 15) / 16
            breakpointShare = breakpoint / 15
            calbreakpoint = price - breakpoint
            buypoint = breakpoint / 1.1
            buypointShare = buypoint / 15
            calbuypoint = price - buypoint
        }

        salescharge = price * 0.05

        setResult({
            calUseMe: Math.round(calUseMe),
            calUseMeShare: Math.trunc(calUseMeShare),
            salescharge: Math.ceil(salescharge),
            breakpoint: Math.trunc(breakpoint),
            breakpointShare: Math.trunc(breakpointShare),
            calbreakpoint: Math.round(calbreakpoint),
            buypoint: Math.round(buypoint),
            buypointShare: Math.trunc(buypointShare),
            calbuypoint: Math.round(calbuypoint),
        })
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            calculate() // 엔터 터치시 계산실행
        }
    }

    return (
        <div className="cal-wrap" onKeyDown={handleKeyPress}>
            <div className="cal-inner">
                <h1>입찰 계산기</h1>
                <div className="cal-input">
                    <label>
                        아이템 가격 :
                        <input
                            type="number"
                            value={price}
                            onChange={handlePriceChange}
                            onKeyDown={handleKeyPress}
                        />
                    </label>
                </div>
                <div className="cal-people">
                    {[4, 8, 16].map((value) => (
                        <button
                            key={value}
                            onClick={() => {
                                handlePeopleChange(value)
                            }}
                            className={`cal-people-change ${
                                people === value ? 'selected' : ''
                            }`}
                        >
                            {value}명
                        </button>
                    ))}
                </div>
                <button onClick={calculate} className="cal-result-button">
                    계산
                </button>
            </div>
            <div className="cal-result">
                {result !== null && (
                    <div>
                        {/* <h1>계산된 가격</h1> */}
                        <div className="cal-result-useme">
                            직접 사용 할때
                            <div className="cal-result-price">
                                <p>입찰가 :</p>
                                <p> {result.calUseMe} 골드</p>
                            </div>
                            <div className="cal-result-price">
                                <p>분배금 : </p>
                                <p>{result.calUseMeShare} 골드</p>
                            </div>
                        </div>
                        <div className="cal-result-salescharge">
                            판매
                            <div className="cal-result-price">
                                <p>수수료: </p>
                                <p>{result.salescharge} 골드</p>
                            </div>
                        </div>
                        <div className="cal-result-breakpoint">
                            <div className="cal-result-price">
                                <p>최대 입찰가: </p>
                                <p>{result.breakpoint} 골드</p>
                            </div>
                            <div className="cal-result-price">
                                <p>분배금 : </p>
                                <p>{result.breakpointShare} 골드</p>
                            </div>
                            <div className="cal-result-price">
                                <p>판매 차익: </p>
                                <p>{result.calbreakpoint} 골드</p>
                            </div>
                        </div>
                        <div className="cal-result-buypoint">
                            <div className="cal-result-price">
                                <p>최적 입찰가: </p>
                                <p>{result.buypoint} 골드</p>
                            </div>
                            <div className="cal-result-price">
                                <p>분배금: </p>
                                <p>{result.buypointShare} 골드</p>
                            </div>
                            <div className="cal-result-price">
                                <p>판매 차익: </p>
                                <p>{result.calbuypoint} 골드</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Calculators
