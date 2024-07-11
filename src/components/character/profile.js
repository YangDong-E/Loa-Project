import { useSelector } from 'react-redux'
const Profile = () => {
    const data = useSelector((state) => state.character.characterProfile)
    const profileData = data?.ArmoryProfile
    const equipData = data?.ArmoryEquipment
    const skillData = data?.ArmorySkills

    const randomColor = () => {
        let r = Math.floor(Math.random() * 256)
        let g = Math.floor(Math.random() * 256)
        let b = Math.floor(Math.random() * 256)

        return `rgba(${r}, ${g}, ${b}, 0.6)`
    }

    return (
        <article id="profile">
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
                    <p className="level">{profileData.ItemAvgLevel}</p>
                    <p>{profileData.CharacterLevel}</p>
                    <p className="name">{profileData.CharacterName}</p>
                    <p className="title">{profileData.Title}</p>
                    <div className="stats">
                        <p>특화: {profileData.Stats[1].Value}</p>
                        <p>치명: {profileData.Stats[0].Value}</p>
                        <p>신속: {profileData.Stats[3].Value}</p>
                        <p>인내: {profileData.Stats[4].Value}</p>
                        <p>제압: {profileData.Stats[2].Value}</p>
                        <p>숙련: {profileData.Stats[5].Value}</p>
                        <p>공격력: {profileData.Stats[7].Value}</p>
                    </div>
                    <div className="ark">
                        <p>진화:{profileData.ArkPassive.Points[0].Value}</p>
                        <p>깨달음:{profileData.ArkPassive.Points[1].Value}</p>
                    </div>
                    <div className="equipment">
                        <p>
                            {equipData[0].Name}
                            <img src={equipData[0].Icon} />
                        </p>
                    </div>
                    <div className="skill">
                        <p>{skillData[0].Name}</p>
                        <img src={skillData[0].Tripods[0].Icon} />
                        <p>{skillData[0].Rune.Name}</p>
                    </div>
                </div>
            </div>
        </article>
    )
}

export default Profile
