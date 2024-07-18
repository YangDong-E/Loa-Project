import { useSelector } from 'react-redux'
import transcend from '../../assets/images/character/transcendence.png'

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

    function equipLevel(idx) {
        return equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
            .replace(
                /(Element_000|Element_001|Element_002|Element_003|Element_004|Element_005|Element_006|Element_007|Element_008|Element_009|Element_010|)/gi,
                ''
            )
            .replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-_>?@\#$&\\\=\(\'\"]/gi, '')
            .replace('Element', '')
            .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\0-9]/gi, '')
            .replace(/\s/gi, '')
            .substring(
                equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                    .replace(
                        /(Element_000|Element_001|Element_002|Element_003|Element_004|Element_005|Element_006|Element_007|Element_008|Element_009|Element_010|)/gi,
                        ''
                    )
                    .replace(
                        /[\{\}\[\]\/?.,;:|\)*~`!^\-_>?@\#$&\\\=\(\'\"]/gi,
                        ''
                    )
                    .replace('Element', '')
                    .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\0-9]/gi, '')
                    .replace(/\s/gi, '')
                    .indexOf('아이템레벨')
            )
            .slice(0, 10)
            .replace(/[^0-9]/gi, '')
    }
    function equipHighLevel(idx) {
        return equipData[idx].Tooltip.includes('상급 재련') ? (
            <>
                +
                {equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                    .replace(
                        /(Element_000|Element_001|Element_002|Element_003|Element_004|Element_005|Element_006|Element_007|Element_008|Element_009|Element_010|)/gi,
                        ''
                    )
                    .replace(
                        /[\{\}\[\]\/?.,;:|\)*~`!^\-_>?@\#$&\\\=\(\'\"]/gi,
                        ''
                    )
                    .replace('Element', '')
                    .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\0-9]/gi, '')
                    .replace(/\s/gi, '')
                    .substring(
                        equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                            .replace(
                                /(Element_000|Element_001|Element_002|Element_003|Element_004|Element_005|Element_006|Element_007|Element_008|Element_009|Element_010|)/gi,
                                ''
                            )
                            .replace(
                                /[\{\}\[\]\/?.,;:|\)*~`!^\-_>?@\#$&\\\=\(\'\"]/gi,
                                ''
                            )
                            .replace('Element', '')
                            .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\0-9]/gi, '')
                            .replace(/\s/gi, '')
                            .indexOf('상급재련')
                    )
                    .slice(0, 9)
                    .replace(/[^0-9]/gi, '')}
            </>
        ) : (
            ''
        )
    }
    function equiptranscend(idx) {
        return equipData[idx].Tooltip.includes('[초월]')
            ? equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                  .replace(
                      /(Element_000|Element_001|Element_002|Element_003|Element_004|Element_005|Element_006|Element_007|Element_008|Element_009|Element_010|Element_011|Element_012|Element_013|Element_014|Element_015|Element_016|Element_017|Element_018|Element_019|Element_020|)/gi,
                      ''
                  )
                  .replace(
                      /[\{\}\[\]\/?.,;:|\)*~`!^\-_>?@\#$&\\\=\(\'\"]/gi,
                      ''
                  )
                  .replace('Element', '')
                  .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\0-9]/gi, '')
                  .replace(/\s/gi, '')
                  .substring(
                      equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                          .replace(
                              /(Element_000|Element_001|Element_002|Element_003|Element_004|Element_005|Element_006|Element_007|Element_008|Element_009|Element_010|Element_011|Element_012|Element_013|Element_014|Element_015|Element_016|Element_017|Element_018|Element_019|Element_020|)/gi,
                              ''
                          )
                          .replace(
                              /[\{\}\[\]\/?.,;:|\)*~`!^\-_>?@\#$&\\\=\(\'\"]/gi,
                              ''
                          )
                          .replace('Element', '')
                          .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\0-9]/gi, '')
                          .replace(/\s/gi, '')
                          .indexOf('슬롯효과초월')
                  )
                  .slice(0, 9)
                  .replace(/[^0-9\단계]/gi, '')
            : ''
    }
    function equiptranscendcount(idx) {
        return equipData[idx].Tooltip.includes('[초월]') ? (
            <>
                <img
                    src={transcend}
                    style={{ width: '15px', height: '15px' }}
                />
                {equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                    .replace(
                        /(Element_000|Element_001|Element_002|Element_003|Element_004|Element_005|Element_006|Element_007|Element_008|Element_009|Element_010|Element_011|Element_012|Element_013|Element_014|Element_015|Element_016|Element_017|Element_018|Element_019|Element_020|)/gi,
                        ''
                    )
                    .replace(
                        /[\{\}\[\]\/?.,;:|\)*~`!^\-_>?@\#$&\\\=\(\'\"]/gi,
                        ''
                    )
                    .replace('Element', '')
                    .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\0-9]/gi, '')
                    .replace(/\s/gi, '')
                    .substring(
                        equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                            .replace(
                                /(Element_000|Element_001|Element_002|Element_003|Element_004|Element_005|Element_006|Element_007|Element_008|Element_009|Element_010|Element_011|Element_012|Element_013|Element_014|Element_015|Element_016|Element_017|Element_018|Element_019|Element_020|)/gi,
                                ''
                            )
                            .replace(
                                /[\{\}\[\]\/?.,;:|\)*~`!^\-_>?@\#$&\\\=\(\'\"]/gi,
                                ''
                            )
                            .replace('Element', '')
                            .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\0-9]/gi, '')
                            .replace(/\s/gi, '')
                            .indexOf('슬롯효과초월')
                    )
                    .slice(3, 8)
                    .replace(/[^0-9]/gi, '')}
            </>
        ) : (
            ''
        )
    }

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
                        <p className="level">Lv {profileData.CharacterLevel}</p>
                        <p className="level">
                            Lv {profileData.ExpeditionLevel}
                        </p>
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
                                <div className="nametag">
                                    <div className="leveltag">
                                        <div>
                                            <div className="transcend-info">
                                                {equiptranscendcount(0)}{' '}
                                                {equiptranscend(0)}
                                            </div>
                                            <div className="level-info">
                                                {equipLevel(0)}{' '}
                                                <span className="highlevel">
                                                    {equipHighLevel(0)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="equip-name">
                                        {equipData[0].Name}
                                    </div>
                                </div>
                            </p>
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
                                        src={equipData[1].Icon}
                                        value={equipData[1].Grade}
                                        style={{
                                            backgroundImage:
                                                equipData[1].Grade === '유물'
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
                                        {equipData[1].Tooltip.substring(
                                            equipData[1].Tooltip.indexOf(
                                                'qualityValue'
                                            )
                                        )
                                            .slice(14, 18)
                                            .replace(',', '')}
                                    </div>
                                </div>
                                <div className="nametag">
                                    <div className="leveltag">
                                        <div>
                                            <div className="transcend-info">
                                                {equiptranscendcount(1)}{' '}
                                                {equiptranscend(1)}
                                            </div>
                                            <div className="level-info">
                                                {equipLevel(1)}{' '}
                                                <span className="highlevel">
                                                    {equipHighLevel(1)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="equip-name">
                                        {equipData[1].Name}
                                    </div>
                                </div>
                            </p>
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
                                        src={equipData[2].Icon}
                                        value={equipData[2].Grade}
                                        style={{
                                            backgroundImage:
                                                equipData[2].Grade === '유물'
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
                                        {equipData[2].Tooltip.substring(
                                            equipData[2].Tooltip.indexOf(
                                                'qualityValue'
                                            )
                                        )
                                            .slice(14, 18)
                                            .replace(',', '')}
                                    </div>
                                </div>
                                <div className="nametag">
                                    <div className="leveltag">
                                        <div>
                                            <div className="transcend-info">
                                                {equiptranscendcount(2)}{' '}
                                                {equiptranscend(2)}
                                            </div>
                                            <div className="level-info">
                                                {equipLevel(2)}{' '}
                                                <span className="highlevel">
                                                    {equipHighLevel(2)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="equip-name">
                                        {equipData[2].Name}
                                    </div>
                                </div>
                            </p>
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
                                        src={equipData[3].Icon}
                                        value={equipData[3].Grade}
                                        style={{
                                            backgroundImage:
                                                equipData[3].Grade === '유물'
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
                                        {equipData[3].Tooltip.substring(
                                            equipData[3].Tooltip.indexOf(
                                                'qualityValue'
                                            )
                                        )
                                            .slice(14, 18)
                                            .replace(',', '')}
                                    </div>
                                </div>
                                <div className="nametag">
                                    <div className="leveltag">
                                        <div>
                                            <div className="transcend-info">
                                                {equiptranscendcount(3)}{' '}
                                                {equiptranscend(3)}
                                            </div>
                                            <div className="level-info">
                                                {equipLevel(3)}{' '}
                                                <span className="highlevel">
                                                    {equipHighLevel(3)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="equip-name">
                                        {equipData[3].Name}
                                    </div>
                                </div>
                            </p>
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
                                        src={equipData[4].Icon}
                                        value={equipData[4].Grade}
                                        style={{
                                            backgroundImage:
                                                equipData[4].Grade === '유물'
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
                                        {equipData[4].Tooltip.substring(
                                            equipData[4].Tooltip.indexOf(
                                                'qualityValue'
                                            )
                                        )
                                            .slice(14, 18)
                                            .replace(',', '')}
                                    </div>
                                </div>
                                <div className="nametag">
                                    <div className="leveltag">
                                        <div>
                                            <div className="transcend-info">
                                                {equiptranscendcount(4)}{' '}
                                                {equiptranscend(4)}
                                            </div>
                                            <div className="level-info">
                                                {equipLevel(4)}{' '}
                                                <span className="highlevel">
                                                    {equipHighLevel(4)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="equip-name">
                                        {equipData[4].Name}
                                    </div>
                                </div>
                            </p>
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
                                        src={equipData[5].Icon}
                                        value={equipData[5].Grade}
                                        style={{
                                            backgroundImage:
                                                equipData[5].Grade === '유물'
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
                                        {equipData[5].Tooltip.substring(
                                            equipData[5].Tooltip.indexOf(
                                                'qualityValue'
                                            )
                                        )
                                            .slice(14, 18)
                                            .replace(',', '')}
                                    </div>
                                </div>
                                <div className="nametag">
                                    <div className="leveltag">
                                        <div>
                                            <div className="transcend-info">
                                                {equiptranscendcount(5)}{' '}
                                                {equiptranscend(5)}
                                            </div>
                                            <div className="level-info">
                                                {equipLevel(5)}{' '}
                                                <span className="highlevel">
                                                    {equipHighLevel(5)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="equip-name">
                                        {equipData[5].Name}
                                    </div>
                                </div>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </article>
    )
}

export default Profile
