import React, { useState } from 'react'
import raidData from './data.json'
import '../../assets/scss/raid.scss'

const Raid = () => {
    const [selectedRaid, setSelectedRaid] = useState('2막: 아브렐슈드')
    const [showAuctionRewards, setShowAuctionRewards] = useState(false)
    const [showClearRewards, setShowClearRewards] = useState(false)
    const [showOtherRewards, setShowOtherRewards] = useState(false)
    const [showFourthGateRewards, setShowFourthGateRewards] = useState(true) // 4관문 보상 체크박스 상태

    const toggleAuctionRewards = () =>
        setShowAuctionRewards(!showAuctionRewards)
    const toggleClearRewards = () => setShowClearRewards(!showClearRewards)
    const toggleOtherRewards = () => setShowOtherRewards(!showOtherRewards)

    const handleRaidSelect = (raid) => {
        setSelectedRaid(raid)
        // 보상 상태 초기화
        setShowAuctionRewards(false)
        setShowClearRewards(false)
        setShowOtherRewards(false)
        setShowFourthGateRewards(false) // 4관문 보상 체크박스 초기화
    }

    const handleFourthGateToggle = () => {
        setShowFourthGateRewards(!showFourthGateRewards)
    }

    return (
        <div className="container">
            <div className="button-container">
                {Object.keys(raidData).map((raid) => (
                    <button
                        key={raid}
                        onClick={() => handleRaidSelect(raid)}
                        // style={{
                        //     padding: '10px 20px',
                        //     borderRadius: '5px',
                        //     border: 'none',
                        //     cursor: 'pointer',
                        //     backgroundColor:
                        //         selectedRaid === raid ? '#333' : '#555',
                        //     color: 'white',
                        // }}
                        className={selectedRaid === raid ? 'active' : ''}
                    >
                        {raid}
                    </button>
                ))}
            </div>

            <div style={{ marginBottom: '20px' }}>
                <button onClick={toggleAuctionRewards}>
                    {showAuctionRewards ? '숨기기' : '경매 보상 보기'}
                </button>
                <button onClick={toggleClearRewards}>
                    {showClearRewards ? '숨기기' : '최초 클리어 보상 보기'}
                </button>
                <button onClick={toggleOtherRewards}>
                    {showOtherRewards ? '숨기기' : '재료 아이템 보기'}
                </button>
                {(selectedRaid === '카멘' || selectedRaid === '아브렐슈드') && (
                    <label style={{ marginLeft: '20px' }}>
                        <input
                            type="checkbox"
                            checked={showFourthGateRewards}
                            onChange={handleFourthGateToggle}
                        />
                        4관문 보상 표시
                    </label>
                )}
            </div>

            {raidData[selectedRaid].map((difficulty) => (
                <div key={difficulty.title} className="table-container">
                    <h2>
                        {difficulty.title} / 입장 레벨 {difficulty.level}
                    </h2>
                    <table>
                        <thead>
                            <tr>
                                <th>관문</th>
                                <th>골드</th>
                                <th>더보기 골드</th>
                                <th>클리어 보상</th>
                                <th>더보기</th>
                                {showClearRewards && <th>최초 클리어 보상</th>}
                                {showAuctionRewards && <th>경매 보상</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {difficulty.data.map((row, index) => {
                                // 카멘 레이드에서 4관문 처리
                                if (
                                    (selectedRaid === '카멘' ||
                                        selectedRaid === '아브렐슈드') &&
                                    row.section === '4관문' &&
                                    !showFourthGateRewards
                                ) {
                                    return null // 체크 해제 시 4관문 보상 숨기기
                                }
                                return (
                                    <tr key={index}>
                                        <td>{row.section}</td>
                                        <td>
                                            {/* {row.gold.toLocaleString()} 🪙 */}
                                            {showFourthGateRewards &&
                                            row.gold2 &&
                                            row.gold ? (
                                                <>
                                                    {row.gold2.toLocaleString()}
                                                    🪙
                                                </>
                                            ) : (
                                                <>
                                                    {row.gold.toLocaleString()}
                                                    🪙
                                                </>
                                            )}
                                        </td>
                                        <td>
                                            {showFourthGateRewards &&
                                            row.extraGold2 &&
                                            row.extraGold ? (
                                                <>
                                                    {row.extraGold2.toLocaleString()}
                                                    🪙
                                                </>
                                            ) : (
                                                <>
                                                    {row.extraGold.toLocaleString()}
                                                    🪙
                                                </>
                                            )}
                                        </td>
                                        <td className="rewards-inner">
                                            {showFourthGateRewards &&
                                            row.rewards2 &&
                                            row.rewards ? (
                                                <>
                                                    {row.rewards2 &&
                                                    row.rewards2.length > 0
                                                        ? row.rewards2.map(
                                                              (
                                                                  reward,
                                                                  index
                                                              ) => (
                                                                  <span
                                                                      key={
                                                                          index
                                                                      }
                                                                  >
                                                                      <img
                                                                          src={
                                                                              reward.image
                                                                          }
                                                                          alt={
                                                                              reward.reward
                                                                          }
                                                                      />
                                                                      {
                                                                          reward.reward
                                                                      }
                                                                  </span>
                                                              )
                                                          )
                                                        : '-'}
                                                    {showOtherRewards &&
                                                        row.otherRewards2 &&
                                                        row.otherRewards2
                                                            .length > 0 && (
                                                            <span>
                                                                {' '}
                                                                (
                                                                {row.otherRewards2.map(
                                                                    (
                                                                        reward,
                                                                        index
                                                                    ) => (
                                                                        <span
                                                                            key={
                                                                                index
                                                                            }
                                                                        >
                                                                            <img
                                                                                src={
                                                                                    reward.image
                                                                                }
                                                                                alt={
                                                                                    reward.reward
                                                                                }
                                                                                style={{
                                                                                    width: '25px',
                                                                                    height: '25px',
                                                                                    marginRight:
                                                                                        '10px',
                                                                                }}
                                                                            />
                                                                            {
                                                                                reward.reward
                                                                            }
                                                                        </span>
                                                                    )
                                                                )}
                                                                )
                                                            </span>
                                                        )}
                                                </>
                                            ) : (
                                                <>
                                                    {row.rewards &&
                                                    row.rewards.length > 0
                                                        ? row.rewards.map(
                                                              (
                                                                  reward,
                                                                  index
                                                              ) => (
                                                                  <span
                                                                      key={
                                                                          index
                                                                      }
                                                                  >
                                                                      <img
                                                                          src={
                                                                              reward.image
                                                                          }
                                                                          alt={
                                                                              reward.reward
                                                                          }
                                                                      />
                                                                      {
                                                                          reward.reward
                                                                      }
                                                                  </span>
                                                              )
                                                          )
                                                        : '-'}
                                                    {/* 기본 기타아이템 */}
                                                    {showOtherRewards &&
                                                        row.otherRewards &&
                                                        row.otherRewards
                                                            .length > 0 && (
                                                            <span className="otherRewards">
                                                                {' '}
                                                                (
                                                                {row.otherRewards.map(
                                                                    (
                                                                        reward,
                                                                        index
                                                                    ) => (
                                                                        <span
                                                                            key={
                                                                                index
                                                                            }
                                                                            className="otherRewards-item"
                                                                        >
                                                                            <img
                                                                                src={
                                                                                    reward.image
                                                                                }
                                                                                alt={
                                                                                    reward.reward
                                                                                }
                                                                                // style={{
                                                                                //     width: '25px',
                                                                                //     height: '25px',
                                                                                //     marginRight:
                                                                                //         '10px',
                                                                                // }}
                                                                            />
                                                                            {
                                                                                reward.reward
                                                                            }
                                                                        </span>
                                                                    )
                                                                )}
                                                                )
                                                            </span>
                                                        )}
                                                </>
                                            )}
                                        </td>
                                        <td>
                                            {showFourthGateRewards &&
                                            row.extraRewards2 &&
                                            row.extraRewards ? (
                                                <>
                                                    {row.extraRewards2 &&
                                                    row.extraRewards2.length > 0
                                                        ? row.extraRewards2.map(
                                                              (
                                                                  reward,
                                                                  index
                                                              ) => (
                                                                  <span
                                                                      key={
                                                                          index
                                                                      }
                                                                  >
                                                                      <img
                                                                          src={
                                                                              reward.image
                                                                          }
                                                                          alt={
                                                                              reward.reward
                                                                          }
                                                                      />
                                                                      {
                                                                          reward.reward
                                                                      }
                                                                  </span>
                                                              )
                                                          )
                                                        : '-'}
                                                    {showOtherRewards &&
                                                        row.otherExtraRewards2 &&
                                                        row.otherExtraRewards2
                                                            .length > 0 && (
                                                            <span>
                                                                {' '}
                                                                {row.otherExtraRewards2.map(
                                                                    (
                                                                        reward,
                                                                        index
                                                                    ) => (
                                                                        <span
                                                                            key={
                                                                                index
                                                                            }
                                                                        >
                                                                            <img
                                                                                src={
                                                                                    reward.image
                                                                                }
                                                                                alt={
                                                                                    reward.reward
                                                                                }
                                                                                style={{
                                                                                    width: '25px',
                                                                                    height: '25px',
                                                                                    marginRight:
                                                                                        '10px',
                                                                                }}
                                                                            />
                                                                            {
                                                                                reward.reward
                                                                            }
                                                                        </span>
                                                                    )
                                                                )}
                                                                )
                                                            </span>
                                                        )}
                                                </>
                                            ) : (
                                                <>
                                                    {row.extraRewards &&
                                                    row.extraRewards.length > 0
                                                        ? row.extraRewards.map(
                                                              (
                                                                  reward,
                                                                  index
                                                              ) => (
                                                                  <span
                                                                      key={
                                                                          index
                                                                      }
                                                                  >
                                                                      <img
                                                                          src={
                                                                              reward.image
                                                                          }
                                                                          alt={
                                                                              reward.reward
                                                                          }
                                                                      />
                                                                      {
                                                                          reward.reward
                                                                      }
                                                                  </span>
                                                              )
                                                          )
                                                        : '-'}
                                                    {/* 더보기 기타아이템 */}
                                                    {showOtherRewards &&
                                                        row.otherExtraRewards &&
                                                        row.otherExtraRewards
                                                            .length > 0 && (
                                                            <span>
                                                                {' '}
                                                                (
                                                                {row.otherExtraRewards.map(
                                                                    (
                                                                        reward,
                                                                        index
                                                                    ) => (
                                                                        <span
                                                                            key={
                                                                                index
                                                                            }
                                                                        >
                                                                            <img
                                                                                src={
                                                                                    reward.image
                                                                                }
                                                                                alt={
                                                                                    reward.reward
                                                                                }
                                                                                style={{
                                                                                    width: '25px',
                                                                                    height: '25px',
                                                                                    marginRight:
                                                                                        '10px',
                                                                                }}
                                                                            />
                                                                            {
                                                                                reward.reward
                                                                            }
                                                                        </span>
                                                                    )
                                                                )}
                                                                )
                                                            </span>
                                                        )}
                                                </>
                                            )}
                                        </td>
                                        {showClearRewards && (
                                            <td>
                                                {row.clearReward &&
                                                row.clearReward.length > 0
                                                    ? row.clearReward.map(
                                                          (reward, index) => (
                                                              <span key={index}>
                                                                  <img
                                                                      src={
                                                                          reward.image
                                                                      }
                                                                      alt={
                                                                          reward.reward
                                                                      }
                                                                      style={{
                                                                          width: '25px',
                                                                          height: '25px',
                                                                          marginRight:
                                                                              '10px',
                                                                      }}
                                                                  />
                                                                  {
                                                                      reward.reward
                                                                  }
                                                              </span>
                                                          )
                                                      )
                                                    : '-'}
                                            </td>
                                        )}
                                        {showAuctionRewards && (
                                            <td>
                                                {showFourthGateRewards &&
                                                row.auctionRewards2 &&
                                                row.auctionRewards ? (
                                                    <>
                                                        {row.auctionRewards2 &&
                                                        row.auctionRewards2
                                                            .length > 0
                                                            ? row.auctionRewards2.map(
                                                                  (
                                                                      reward,
                                                                      index
                                                                  ) => (
                                                                      <span
                                                                          key={
                                                                              index
                                                                          }
                                                                      >
                                                                          <img
                                                                              src={
                                                                                  reward.image
                                                                              }
                                                                              alt={
                                                                                  reward.reward
                                                                              }
                                                                              style={{
                                                                                  width: '25px',
                                                                                  height: '25px',
                                                                                  marginRight:
                                                                                      '10px',
                                                                              }}
                                                                          />
                                                                          {
                                                                              reward.reward
                                                                          }
                                                                      </span>
                                                                  )
                                                              )
                                                            : '-'}
                                                    </>
                                                ) : (
                                                    <>
                                                        {row.auctionRewards &&
                                                        row.auctionRewards
                                                            .length > 0
                                                            ? row.auctionRewards.map(
                                                                  (
                                                                      reward,
                                                                      index
                                                                  ) => (
                                                                      <span
                                                                          key={
                                                                              index
                                                                          }
                                                                      >
                                                                          <img
                                                                              src={
                                                                                  reward.image
                                                                              }
                                                                              alt={
                                                                                  reward.reward
                                                                              }
                                                                              style={{
                                                                                  width: '25px',
                                                                                  height: '25px',
                                                                                  marginRight:
                                                                                      '10px',
                                                                              }}
                                                                          />
                                                                          {
                                                                              reward.reward
                                                                          }
                                                                      </span>
                                                                  )
                                                              )
                                                            : '-'}
                                                    </>
                                                )}
                                            </td>
                                        )}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    )
}
export default Raid
