import { useSelector } from 'react-redux'
const Profile = () => {
    const data = useSelector((state) => state.character.characterProfile)
    const profileData = data?.ArmoryProfile
    const equipData = data?.ArmoryEquipment
    const skillData = data?.ArmorySkills

    const a = parseInt(profileData.Stats[1].Value)
    const b = parseInt(profileData.Stats[0].Value)
    const c = parseInt(profileData.Stats[3].Value)

    const max = a > b && a > c ? a : c > b ? c : b
    const min = b > a && c > a ? a : b > c ? c : b
    const middle = a + b + c - max - min

    const randomColor = () => {
        let r = Math.floor(Math.random() * 256)
        let g = Math.floor(Math.random() * 256)
        let b = Math.floor(Math.random() * 256)

        return `rgba(${r}, ${g}, ${b}, 0.6)`
    }

    return (
        <article className="profile">
            <div className="profile-inner">
                <div className="img-box">
                    <span
                        className="effect"
                        style={{ background: randomColor() }}
                    ></span>
                    {profileData.CharacterImage && (
                        <img
                            src={profileData.CharacterImage}
                            alt="캐릭터 이미지"
                        />
                    )}
                </div>
                <div className="server-box">
                    <p className="server">{profileData.ServerName}</p>
                    <p className="class">{profileData.CharacterClassName}</p>
                </div>
                <div className="info-box">
                    <div className="info-title">
                        <p className="sub-title">아이템 레벨</p>
                        <p className="sub-title">전투 레벨</p>
                        <p className="sub-title">원정대 레벨</p>
                    </div>
                    <div className="info-level">
                        <p className="level">{profileData.ItemAvgLevel}</p>
                        <p className="level">{profileData.CharacterLevel}</p>
                        <p className="level">{profileData.ExpeditionLevel}</p>
                    </div>
                    <div className="info-name">
                        <p className="title">{profileData.Title}</p>
                        <p className="name">{profileData.CharacterName}</p>
                    </div>
                </div>
            </div>
            <section style={{ display: 'flex', gap: '10px' }}>
                <div className="stats">
                    <div className="stats-inner">
                        <div className="stats-info">
                            <p>
                                특화{' '}
                                <div
                                    className="value"
                                    style={{
                                        color:
                                            a == max
                                                ? 'purple'
                                                : a == middle
                                                ? 'blue'
                                                : 'black',
                                    }}
                                >
                                    {profileData.Stats[1].Value}
                                </div>
                            </p>
                            <p>
                                치명{' '}
                                <div
                                    className="value"
                                    style={{
                                        color:
                                            b == max
                                                ? 'purple'
                                                : b == middle
                                                ? 'blue'
                                                : 'black',
                                    }}
                                >
                                    {profileData.Stats[0].Value}
                                </div>
                            </p>
                            <p>
                                신속
                                <div
                                    className="value"
                                    style={{
                                        color:
                                            c == max
                                                ? 'purple'
                                                : c == middle
                                                ? 'blue'
                                                : 'black',
                                    }}
                                >
                                    {profileData.Stats[3].Value}
                                </div>
                            </p>
                        </div>
                        <div className="sub-stats">
                            <p>
                                제압{' '}
                                <div className="value">
                                    {profileData.Stats[2].Value}
                                </div>
                            </p>
                            <p>
                                인내{' '}
                                <div className="value">
                                    {profileData.Stats[4].Value}
                                </div>
                            </p>
                            <p>
                                숙련{' '}
                                <div className="value">
                                    {' '}
                                    {profileData.Stats[5].Value}
                                </div>
                            </p>
                        </div>
                        <div className="ark">
                            <p>
                                진화{' '}
                                <div className="value">
                                    {profileData.ItemAvgLevel < '1620' ||
                                    profileData.ArkPassive.Points[0] ==
                                        undefined ||
                                    null
                                        ? '0'
                                        : profileData.ArkPassive.Points[0]
                                              .Value}
                                </div>
                            </p>
                            <p>
                                깨달음{' '}
                                <div className="value">
                                    {profileData.ItemAvgLevel < '1620' ||
                                    profileData.ArkPassive.Points[1] ==
                                        undefined ||
                                    null
                                        ? '0'
                                        : profileData.ArkPassive.Points[1]
                                              .Value}
                                </div>
                            </p>
                            <p>
                                도약{' '}
                                <div className="value">
                                    {profileData.ItemAvgLevel < '1620' ||
                                    profileData.ArkPassive.Points[2] ==
                                        undefined ||
                                    null
                                        ? '0'
                                        : profileData.ArkPassive.Points[2]
                                              .Value}
                                </div>
                            </p>
                        </div>
                        <div className="char-stats">
                            <p>
                                최대 생명력{' '}
                                <div className="value">
                                    {profileData.Stats[6].Value}
                                </div>
                            </p>
                            <p>
                                공격력{' '}
                                <div className="value">
                                    {profileData.Stats[7].Value}
                                </div>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="equip">
                    <div className="equip-inner">
                        <div className="equipment">
                            <p>
                                <div
                                    className="img-quality"
                                    style={{
                                        display: 'flex',
                                        width: '48px',
                                        height: '56px',
                                        // borderRadius: '8px',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <img
                                        src={equipData[0].Icon}
                                        value={equipData[0].Grade}
                                        style={{
                                            backgroundImage:
                                                equipData[0].Grade === '유물'
                                                    ? 'linear-gradient(135deg, #341a09, #a24006)'
                                                    : 'linear-gradient(135deg, #3d3325, #dcc999)',
                                        }}
                                    />
                                    <div
                                        className="qualityValue"
                                        style={{
                                            // width: '48px',
                                            backgroundColor: 'green',
                                            fontSize: '12px',
                                            textAlign: 'center',
                                        }}
                                    >
                                        {equipData[0].Tooltip.substring(
                                            equipData[0].Tooltip.indexOf(
                                                'qualityValue'
                                            )
                                        )
                                            .slice(14, 18)
                                            .replace(',', '')}
                                    </div>
                                </div>
                                <div>{equipData[0].Name}</div>
                            </p>
                            <p>
                                <img
                                    src={equipData[1].Icon}
                                    value={equipData[2].Grade}
                                    style={{
                                        backgroundImage:
                                            equipData[1].Grade === '유물'
                                                ? 'linear-gradient(135deg, #341a09, #a24006)'
                                                : 'linear-gradient(135deg, #3d3325, #dcc999)',
                                    }}
                                />
                                <div>{equipData[1].Name}</div>
                            </p>
                            <p>
                                <img
                                    src={equipData[2].Icon}
                                    style={{
                                        backgroundImage:
                                            equipData[2].Grade === '유물'
                                                ? 'linear-gradient(135deg, #341a09, #a24006)'
                                                : 'linear-gradient(135deg, #3d3325, #dcc999)',
                                    }}
                                />
                                <div>{equipData[2].Name}</div>
                            </p>
                            <p>
                                <img
                                    src={equipData[3].Icon}
                                    style={{
                                        backgroundImage:
                                            equipData[3].Grade === '유물'
                                                ? 'linear-gradient(135deg, #341a09, #a24006)'
                                                : 'linear-gradient(135deg, #3d3325, #dcc999)',
                                    }}
                                />
                                <div>{equipData[3].Name}</div>
                            </p>
                            <p>
                                <img
                                    src={equipData[4].Icon}
                                    style={{
                                        backgroundImage:
                                            equipData[4].Grade === '유물'
                                                ? 'linear-gradient(135deg, #341a09, #a24006)'
                                                : 'linear-gradient(135deg, #3d3325, #dcc999)',
                                    }}
                                />
                                <div>{equipData[4].Name}</div>
                            </p>
                            <p>
                                <img
                                    src={equipData[5].Icon}
                                    style={{
                                        backgroundImage:
                                            equipData[5].Grade === '유물'
                                                ? 'linear-gradient(135deg, #341a09, #a24006)'
                                                : 'linear-gradient(135deg, #3d3325, #dcc999)',
                                    }}
                                />
                                <div>{equipData[5].Name}</div>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </article>
    )
}

export default Profile
