import { useSelector } from 'react-redux'
import transcend from '../../assets/images/character/transcendence.png'
import { useState } from 'react'
import arrowup from '../../assets/images/common/arrow-up.png'
import General from '../../assets/images/common/img_card_grade.png'
import Advanced from '../../assets/images/common/img_card_grade2.png'
import Rare from '../../assets/images/common/img_card_grade3.png'
import Hero from '../../assets/images/common/img_card_grade4.png'
import Legend from '../../assets/images/common/img_card_grade5.png'

const imageMap = {
    각성: require('../../assets/images/common/ability/각성.png'),
    강령술: require('../../assets/images/common/ability/강령술.png'),
    '강화 방패': require('../../assets/images/common/ability/강화방패.png'),
    '결투의 대가': require('../../assets/images/common/ability/결대.png'),
    구슬동자: require('../../assets/images/common/ability/구동.png'),
    '굳은 의지': require('../../assets/images/common/ability/굳은의지.png'),
    '급소 타격': require('../../assets/images/common/ability/급타.png'),
    '기습의 대가': require('../../assets/images/common/ability/기습.png'),
    긴급구조: require('../../assets/images/common/ability/긴급구조.png'),
    '달인의 저력': require('../../assets/images/common/ability/달저.png'),
    돌격대장: require('../../assets/images/common/ability/돌대.png'),
    '마나 효율 증가': require('../../assets/images/common/ability/마효증.png'),
    '마나의 흐름': require('../../assets/images/common/ability/마흐.png'),
    바리케이드: require('../../assets/images/common/ability/바리.png'),
    '번개의 분노': require('../../assets/images/common/ability/번분.png'),
    '부러진 뼈': require('../../assets/images/common/ability/부뼈.png'),
    '분쇄의 주먹': require('../../assets/images/common/ability/분쇄의주먹.png'),
    불굴: require('../../assets/images/common/ability/불굴.png'),
    선수필승: require('../../assets/images/common/ability/선필.png'),
    속전속결: require('../../assets/images/common/ability/속전속결.png'),
    실드관통: require('../../assets/images/common/ability/쉴드관통.png'),
    '슈퍼 차지': require('../../assets/images/common/ability/슈차.png'),
    승부사: require('../../assets/images/common/ability/승부사.png'),
    '시선 집중': require('../../assets/images/common/ability/시선집중.png'),
    아드레날린: require('../../assets/images/common/ability/아드레날린.png'),
    '안정된 상태': require('../../assets/images/common/ability/안상.png'),
    '약자 무시': require('../../assets/images/common/ability/약무.png'),
    '에테르 포식자': require('../../assets/images/common/ability/에포.png'),
    '여신의 가호': require('../../assets/images/common/ability/여신의가호.png'),
    '예리한 둔기': require('../../assets/images/common/ability/예둔.png'),
    원한: require('../../assets/images/common/ability/원한.png'),
    '위기 모면': require('../../assets/images/common/ability/위모.png'),
    '저주받은 인형': require('../../assets/images/common/ability/저받.png'),
    전문의: require('../../assets/images/common/ability/전문의.png'),
    '정밀 단도': require('../../assets/images/common/ability/정단.png'),
    '정기 흡수': require('../../assets/images/common/ability/정흡.png'),
    '중갑 착용': require('../../assets/images/common/ability/중갑.png'),
    '질량 증가': require('../../assets/images/common/ability/질증.png'),
    '최대 마나 증가': require('../../assets/images/common/ability/최마.png'),
    추진력: require('../../assets/images/common/ability/추진력.png'),
    '타격의 대가': require('../../assets/images/common/ability/타격의대가.png'),
    '탈출의 명수': require('../../assets/images/common/ability/탈출의명수.png'),
    '폭발물 전문가': require('../../assets/images/common/ability/폭전.png'),
}

const Profile = () => {
    const [openIndex, setOpenIndex] = useState(null)
    const [openSkill, setSkill] = useState(null)
    const handleAccordionClick = (index) => {
        setOpenIndex(openIndex === index ? null : index)
    }
    const handleSkillClick = (index) => {
        setSkill(openSkill === index ? null : index)
    }

    const cardborders = {
        전설: Legend,
        영웅: Hero,
        희귀: Rare,
        고급: Advanced,
        일반: General,
    }

    const data = useSelector((state) => state.character.characterProfile)
    const profileData = data?.ArmoryProfile
    const equipData = data?.ArmoryEquipment
    const skillData = data?.ArmorySkills
    const engravData = data?.ArmoryEngraving
    const arkpassiveData = data?.ArkPassive
    const avgLevel = parseFloat(profileData.ItemAvgLevel.replace(',', ''))
    const gemData = data?.ArmoryGem.Gems
    const priority = { 겁화: 1, 멸화: 2, 작열: 3, 홍염: 4 }
    const sortedGemData = (gemData ? [...gemData] : [])
        .map((item) => ({ ...item }))
        .sort((a, b) => {
            const nameA = extractGemName(a.Name)
            const nameB = extractGemName(b.Name)
            const levelA = extractGemLevel(a.Name)
            const levelB = extractGemLevel(b.Name)

            if (priority[nameA] !== priority[nameB]) {
                return priority[nameA] - priority[nameB]
            } else {
                return levelB - levelA
            }
        })
    const cardData = data?.ArmoryCard.Cards
    const cardEffectsData = data?.ArmoryCard.Effects

    const sortskillA = skillData.filter(
        (item) => item.Level > 1 || item.Rune !== null
    )
    const sortskillB = skillData.filter(
        (item) => !(item.Level > 1 || item.Rune !== null)
    )

    const sortskillData = [...sortskillA, ...sortskillB]

    const sortedgemskill = sortskillA.map((skill) => {
        let newSkill = { ...skill }
        sortedGemData.forEach((gem) => {
            if (
                gem.Tooltip.replace(/(<([^>]+)>)/g, '')
                    .replace(/Element_[0-9]+/g, '')
                    // .replace(/\s/gi, '')
                    .replace(/[\{\}\/?,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi, '')
                    .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\[\]\.\0-9]/gi, '')
                    .match(/\[\D{2,6}\]\s\D{2,12}\s(피해|재사용)/g)[0]
                    .replace(/\s/gi, '')
                    .replace(/\[\D{2,6}\]/g, '')
                    .replace(/(피해|재사용)/g, '') === newSkill.Name
            ) {
                if (gem.Name.includes('멸화') || gem.Name.includes('겁화')) {
                    newSkill.AttackGemIcon = gem.Icon
                } else if (
                    gem.Name.includes('홍염') ||
                    gem.Name.includes('작열')
                ) {
                    newSkill.CoolGemIcon = gem.Icon
                }
            }
        })
        return newSkill
    })

    function extractGemName(name) {
        const regex = /(\d+레벨 )?(겁화|멸화|작열|홍염)의 보석/
        const match = name.match(regex)
        return match ? match[2] : null
    }

    function extractGemLevel(name) {
        const regex = /(\d+)레벨/
        const match = name.match(regex)
        return match ? parseInt(match[1], 10) : 0
    }

    const a = parseInt(profileData.Stats[1].Value)
    const b = parseInt(profileData.Stats[0].Value)
    const c = parseInt(profileData.Stats[3].Value)

    const max = a > b && a > c ? a : c > b ? c : b
    const min = b > a && c > a ? a : b > c ? c : b
    const middle = a + b + c - max - min

    const newdata = [
        { Type: '무기', Name: '', Icon: '', Grade: '', Tooltip: '' },
        { Type: '투구', Name: '', Icon: '', Grade: '', Tooltip: '' },
        { Type: '상의', Name: '', Icon: '', Grade: '', Tooltip: '' },
        { Type: '하의', Name: '', Icon: '', Grade: '', Tooltip: '' },
        { Type: '장갑', Name: '', Icon: '', Grade: '', Tooltip: '' },
        { Type: '어깨', Name: '', Icon: '', Grade: '', Tooltip: '' },
        { Type: '목걸이', Name: '', Icon: '', Grade: '', Tooltip: '' },
        { Type: '귀걸이', Name: '', Icon: '', Grade: '', Tooltip: '' },
        { Type: '귀걸이', Name: '', Icon: '', Grade: '', Tooltip: '' },
        { Type: '반지', Name: '', Icon: '', Grade: '', Tooltip: '' },
        { Type: '반지', Name: '', Icon: '', Grade: '', Tooltip: '' },
        { Type: '어빌리티 스톤', Name: '', Icon: '', Grade: '', Tooltip: '' },
        { Type: '팔찌', Name: '', Icon: '', Grade: '', Tooltip: '' },
        { Type: '나침반', Name: '', Icon: '', Grade: '', Tooltip: '' },
        { Type: '부적', Name: '', Icon: '', Grade: '', Tooltip: '' },
    ]

    function alignData(newData, equipData) {
        const result = newData.map((item) => ({ ...item }))

        const equipMap = equipData.reduce((acc, item) => {
            if (!acc[item.Type]) {
                acc[item.Type] = []
            }
            acc[item.Type].push(item)
            return acc
        }, {})

        result.forEach((item, index) => {
            if (equipMap[item.Type] && equipMap[item.Type].length > 0) {
                result[index] = equipMap[item.Type].shift()
            }
        })

        return result
    }

    const alignedData = alignData(newdata, equipData)

    function qualityValue(idx) {
        return alignedData[idx].Tooltip.substring(
            alignedData[idx].Tooltip.indexOf('qualityValue')
        )
            .slice(14, 18)
            .replace(',', '')
    }

    function equipLevel(idx) {
        return alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
            .replace(/Element_[0-9]+/g, '')
            .replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-_>?@\#$&\\\=\(\'\"]/gi, '')
            .replace('Element', '')
            .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\0-9]/gi, '')
            .replace(/\s/gi, '')
            .substring(
                alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                    .replace(/Element_[0-9]+/g, '')
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
        return alignedData[idx].Tooltip.includes('상급 재련') ? (
            <>
                +
                {alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                    .replace(/Element_[0-9]+/g, '')
                    .replace(
                        /[\{\}\[\]\/?.,;:|\)*~`!^\-_>?@\#$&\\\=\(\'\"]/gi,
                        ''
                    )
                    .replace('Element', '')
                    .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\0-9]/gi, '')
                    .replace(/\s/gi, '')
                    .substring(
                        alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                            .replace(/Element_[0-9]+/g, '')
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
        return alignedData[idx].Tooltip.includes('[초월]')
            ? alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                  .replace(/Element_[0-9]+/g, '')
                  .replace(
                      /[\{\}\[\]\/?.,;:|\)*~`!^\-_>?@\#$&\\\=\(\'\"]/gi,
                      ''
                  )
                  .replace('Element', '')
                  .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\0-9]/gi, '')
                  .replace(/\s/gi, '')
                  .substring(
                      alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                          .replace(/Element_[0-9]+/g, '')
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
        return alignedData[idx].Tooltip.includes('[초월]') ? (
            <>
                <img
                    src={transcend}
                    style={{ width: '13px', height: '13px' }}
                />
                <span className="transcend-count">
                    {alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                        .replace(/Element_[0-9]+/g, '')
                        .replace(
                            /[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                            ''
                        )
                        .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi, '')
                        .replace(/:[0-9]+/gi, ' ')
                        .substring(
                            alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                                .replace(/Element_[0-9]+/g, '')
                                .replace(
                                    /[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                                    ''
                                )
                                .replace(
                                    /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi,
                                    ''
                                )
                                .replace(/:[0-9]+/gi, ' ')
                                .indexOf('슬롯 효과')
                        )
                        .split(':')[0]
                        .replace(/[^0-9]/gi, '')
                        .slice(1)}{' '}
                </span>
            </>
        ) : (
            ''
        )
    }

    function accfirststat(idx) {
        return alignedData[idx].Tooltip.includes('추가 효과') ? (
            <>
                {alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                    .replace(/Element_[0-9]+/g, '')
                    .replace(
                        /[\{\}\[\]\/?.,;:|\)*~`!^\-_>?@\#$&\\\=\(\'\"]/gi,
                        ''
                    )
                    .replace('Element', '')
                    .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\0-9]/gi, '')
                    .replace(/\s/gi, '')
                    .substring(
                        alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                            .replace(/Element_[0-9]+/g, '')
                            .replace(
                                /[\{\}\[\]\/?.,;:|\)*~`!^\-_>?@\#$&\\\=\(\'\"]/gi,
                                ''
                            )
                            .replace('Element', '')
                            .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\0-9]/gi, '')
                            .replace(/\s/gi, '')
                            .indexOf('추가효과')
                    )
                    .slice(4, 10)}
            </>
        ) : (
            ''
        )
    }
    function accsecondstat(idx) {
        return alignedData[idx].Tooltip.includes('추가 효과') ? (
            <>
                {alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                    .replace(/Element_[0-9]+/g, '')
                    .replace(
                        /[\{\}\[\]\/?.,;:|\)*~`!^\-_>?@\#$&\\\=\(\'\"]/gi,
                        ''
                    )
                    .replace('Element', '')
                    .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\0-9]/gi, '')
                    .replace(/\s/gi, '')
                    .substring(
                        alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                            .replace(/Element_[0-9]+/g, '')
                            .replace(
                                /[\{\}\[\]\/?.,;:|\)*~`!^\-_>?@\#$&\\\=\(\'\"]/gi,
                                ''
                            )
                            .replace('Element', '')
                            .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\0-9]/gi, '')
                            .replace(/\s/gi, '')
                            .indexOf('추가효과')
                    )
                    .slice(10, 16)
                    .replace(/[^0-9]/gi, '') == 0
                    ? ''
                    : alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                          .replace(/Element_[0-9]+/g, '')
                          .replace(
                              /[\{\}\[\]\/?.,;:|\)*~`!^\-_>?@\#$&\\\=\(\'\"]/gi,
                              ''
                          )
                          .replace('Element', '')
                          .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\0-9]/gi, '')
                          .replace(/\s/gi, '')
                          .substring(
                              alignedData[idx].Tooltip.replace(
                                  /(<([^>]+)>)/g,
                                  ''
                              )
                                  .replace(/Element_[0-9]+/g, '')
                                  .replace(
                                      /[\{\}\[\]\/?.,;:|\)*~`!^\-_>?@\#$&\\\=\(\'\"]/gi,
                                      ''
                                  )
                                  .replace('Element', '')
                                  .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\0-9]/gi, '')
                                  .replace(/\s/gi, '')
                                  .indexOf('추가효과')
                          )
                          .slice(10, 16)}
            </>
        ) : (
            ''
        )
    }

    function accengravingeffect(idx) {
        return alignedData[idx].Tooltip ? (
            <>
                <div className="effect-info-inner">
                    <span className="effect-info">
                        {
                            alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                                .replace(/Element_[0-9]+/g, '')
                                .replace(/\s/gi, '')
                                .replace(
                                    /[\{\}\[\]\/?.,;|\)*~`!^\-_>?@\#$&\\\=\(\'\"]/gi,
                                    ''
                                )
                                .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\0-9]/gi, '')
                                .replace(/:[0-9]+/gi, ' ')
                                .replace(/:/gi, '')
                                .substring(
                                    alignedData[idx].Tooltip.replace(
                                        /(<([^>]+)>)/g,
                                        ''
                                    )
                                        .replace(/Element_[0-9]+/g, '')
                                        .replace(/\s/gi, '')
                                        .replace(
                                            /[\{\}\[\]\/?.,;|\)*~`!^\-_>?@\#$&\\\=\(\'\"]/gi,
                                            ''
                                        )
                                        .replace(
                                            /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\0-9]/gi,
                                            ''
                                        )
                                        .replace(/:[0-9]+/gi, ' ')
                                        .replace(/:/gi, '')
                                        .indexOf('추가효과')
                                )
                                .replace(
                                    /(특화\+[0-9]|치명\+[0-9]|신속\+[0-9]|제압\+[0-9]|숙련\+[0-9]|인내\+[0-9])/,
                                    ''
                                )
                                .replace(/추가효과[0-9]/gi, '')
                                .replace(/[0-9]+/, '')
                                .replace(/활성도/gi, '')
                                .replace(/무작위각인효과.*$/gi, '')
                                .split(' ')[1]
                        }
                    </span>
                    <span className="effect-info">
                        {alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                            .replace(/Element_[0-9]+/g, '')
                            .replace(/\s/gi, '')
                            .replace(
                                /[\{\}\[\]\/?.,;|\)*~`!^\-_>?@\#$&\\\=\(\'\"]/gi,
                                ''
                            )
                            .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\0-9]/gi, '')
                            .replace(/:[0-9]+/gi, ' ')
                            .replace(/:/gi, '')
                            .substring(
                                alignedData[idx].Tooltip.replace(
                                    /(<([^>]+)>)/g,
                                    ''
                                )
                                    .replace(/Element_[0-9]+/g, '')
                                    .replace(/\s/gi, '')
                                    .replace(
                                        /[\{\}\[\]\/?.,;|\)*~`!^\-_>?@\#$&\\\=\(\'\"]/gi,
                                        ''
                                    )
                                    .replace(
                                        /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\0-9]/gi,
                                        ''
                                    )
                                    .replace(/:[0-9]+/gi, ' ')
                                    .replace(/:/gi, '')
                                    .indexOf('추가효과')
                            )
                            .replace(
                                /(특화\+[0-9]|치명\+[0-9]|신속\+[0-9]|제압\+[0-9]|숙련\+[0-9]|인내\+[0-9])/,
                                ''
                            )
                            .replace(/추가효과[0-9]/gi, '')
                            .replace(/[0-9]+/, '')
                            .replace(/활성도/gi, '')
                            .replace(/무작위각인효과.*$/gi, '')
                            .split(' ')[3] == null && undefined
                            ? ''
                            : alignedData[idx].Tooltip.replace(
                                  /(<([^>]+)>)/g,
                                  ''
                              )
                                  .replace(/Element_[0-9]+/g, '')
                                  .replace(/\s/gi, '')
                                  .replace(
                                      /[\{\}\[\]\/?.,;|\)*~`!^\-_>?@\#$&\\\=\(\'\"]/gi,
                                      ''
                                  )
                                  .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\0-9]/gi, '')
                                  .replace(/:[0-9]+/gi, ' ')
                                  .replace(/:/gi, '')
                                  .substring(
                                      alignedData[idx].Tooltip.replace(
                                          /(<([^>]+)>)/g,
                                          ''
                                      )
                                          .replace(/Element_[0-9]+/g, '')
                                          .replace(/\s/gi, '')
                                          .replace(
                                              /[\{\}\[\]\/?.,;|\)*~`!^\-_>?@\#$&\\\=\(\'\"]/gi,
                                              ''
                                          )
                                          .replace(
                                              /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\0-9]/gi,
                                              ''
                                          )
                                          .replace(/:[0-9]+/gi, ' ')
                                          .replace(/:/gi, '')
                                          .indexOf('추가효과')
                                  )
                                  .replace(
                                      /(특화\+[0-9]|치명\+[0-9]|신속\+[0-9]|제압\+[0-9]|숙련\+[0-9]|인내\+[0-9])/,
                                      ''
                                  )
                                  .replace(/추가효과[0-9]/gi, '')
                                  .replace(/[0-9]+/, '')
                                  .replace(/활성도/gi, '')
                                  .replace(/무작위각인효과.*$/gi, '')
                                  .split(' ')[3]}
                    </span>
                    <span className="effect-info-reduction">
                        {alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                            .replace(/Element_[0-9]+/g, '')
                            .replace(/\s/gi, '')
                            .replace(
                                /[\{\}\[\]\/?.,;|\)*~`!^\-_>?@\#$&\\\=\(\'\"]/gi,
                                ''
                            )
                            .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\0-9]/gi, '')
                            .replace(/:[0-9]+/gi, ' ')
                            .replace(/:/gi, '')
                            .substring(
                                alignedData[idx].Tooltip.replace(
                                    /(<([^>]+)>)/g,
                                    ''
                                )
                                    .replace(/Element_[0-9]+/g, '')
                                    .replace(/\s/gi, '')
                                    .replace(
                                        /[\{\}\[\]\/?.,;|\)*~`!^\-_>?@\#$&\\\=\(\'\"]/gi,
                                        ''
                                    )
                                    .replace(
                                        /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\0-9]/gi,
                                        ''
                                    )
                                    .replace(/:[0-9]+/gi, ' ')
                                    .replace(/:/gi, '')
                                    .indexOf('추가효과')
                            )
                            .replace(
                                /(특화\+[0-9]|치명\+[0-9]|신속\+[0-9]|제압\+[0-9]|숙련\+[0-9]|인내\+[0-9])/,
                                ''
                            )
                            .replace(/추가효과[0-9]/gi, '')
                            .replace(/[0-9]+/, '')
                            .replace(/활성도/gi, '')
                            .replace(/무작위각인효과.*$/gi, '')
                            .split(' ')[5] == null && undefined
                            ? ''
                            : alignedData[idx].Tooltip.replace(
                                  /(<([^>]+)>)/g,
                                  ''
                              )
                                  .replace(/Element_[0-9]+/g, '')
                                  .replace(/\s/gi, '')
                                  .replace(
                                      /[\{\}\[\]\/?.,;|\)*~`!^\-_>?@\#$&\\\=\(\'\"]/gi,
                                      ''
                                  )
                                  .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\0-9]/gi, '')
                                  .replace(/:[0-9]+/gi, ' ')
                                  .replace(/:/gi, '')
                                  .substring(
                                      alignedData[idx].Tooltip.replace(
                                          /(<([^>]+)>)/g,
                                          ''
                                      )
                                          .replace(/Element_[0-9]+/g, '')
                                          .replace(/\s/gi, '')
                                          .replace(
                                              /[\{\}\[\]\/?.,;|\)*~`!^\-_>?@\#$&\\\=\(\'\"]/gi,
                                              ''
                                          )
                                          .replace(
                                              /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\0-9]/gi,
                                              ''
                                          )
                                          .replace(/:[0-9]+/gi, ' ')
                                          .replace(/:/gi, '')
                                          .indexOf('추가효과')
                                  )
                                  .replace(
                                      /(특화\+[0-9]|치명\+[0-9]|신속\+[0-9]|제압\+[0-9]|숙련\+[0-9]|인내\+[0-9])/,
                                      ''
                                  )
                                  .replace(/추가효과[0-9]/gi, '')
                                  .replace(/[0-9]+/, '')
                                  .replace(/활성도/gi, '')
                                  .replace(/무작위각인효과.*$/gi, '')
                                  .split(' ')[5]}
                    </span>
                </div>
            </>
        ) : (
            ''
        )
    }

    function stonestat(idx) {
        return alignedData[idx].Grade == '영웅' ? (
            <>
                <div className="stone-inner">
                    <span>
                        +
                        {
                            alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                                .replace(/Element_[0-9]+/g, '')
                                .replace(/\s/gi, '')
                                .replace(
                                    /[\{\}\[\]\/?.,;|\)*~`!^\-_>?@\#$&\\\=\(\'\"]/gi,
                                    ''
                                )
                                .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\0-9]/gi, '')
                                .replace(/:[0-9]+/gi, ' ')
                                .replace(/:/gi, '')
                                .substring(
                                    alignedData[idx].Tooltip.replace(
                                        /(<([^>]+)>)/g,
                                        ''
                                    )
                                        .replace(/Element_[0-9]+/g, '')
                                        .replace(/\s/gi, '')
                                        .replace(
                                            /[\{\}\[\]\/?.,;|\)*~`!^\-_>?@\#$&\\\=\(\'\"]/gi,
                                            ''
                                        )
                                        .replace(
                                            /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\0-9]/gi,
                                            ''
                                        )
                                        .replace(/:[0-9]+/gi, ' ')
                                        .replace(/:/gi, '')
                                        .indexOf('기본효과체력')
                                )
                                .replace(/기본효과체력\+/gi, '')
                                .replace(/[0-9]+/, '')
                                .replace(/활성도/gi, '+')
                                .replace(/무작위각인효과.*$/gi, '')
                                .split(' ')[1]
                        }
                    </span>
                    <span>
                        +
                        {
                            alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                                .replace(/Element_[0-9]+/g, '')
                                .replace(/\s/gi, '')
                                .replace(
                                    /[\{\}\[\]\/?.,;|\)*~`!^\-_>?@\#$&\\\=\(\'\"]/gi,
                                    ''
                                )
                                .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\0-9]/gi, '')
                                .replace(/:[0-9]+/gi, ' ')
                                .replace(/:/gi, '')
                                .substring(
                                    alignedData[idx].Tooltip.replace(
                                        /(<([^>]+)>)/g,
                                        ''
                                    )
                                        .replace(/Element_[0-9]+/g, '')
                                        .replace(/\s/gi, '')
                                        .replace(
                                            /[\{\}\[\]\/?.,;|\)*~`!^\-_>?@\#$&\\\=\(\'\"]/gi,
                                            ''
                                        )
                                        .replace(
                                            /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\0-9]/gi,
                                            ''
                                        )
                                        .replace(/:[0-9]+/gi, ' ')
                                        .replace(/:/gi, '')
                                        .indexOf('기본효과체력')
                                )
                                .replace(/기본효과체력\+/gi, '')
                                .replace(/[0-9]+/, '')
                                .replace(/활성도/gi, '+')
                                .replace(/무작위각인효과.*$/gi, '')
                                .split(' ')[3]
                        }
                    </span>
                    <span className="stone-info-reduction">
                        +
                        {
                            alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                                .replace(/Element_[0-9]+/g, '')
                                .replace(/\s/gi, '')
                                .replace(
                                    /[\{\}\[\]\/?.,;|\)*~`!^\-_>?@\#$&\\\=\(\'\"]/gi,
                                    ''
                                )
                                .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\0-9]/gi, '')
                                .replace(/:[0-9]+/gi, ' ')
                                .replace(/:/gi, '')
                                .substring(
                                    alignedData[idx].Tooltip.replace(
                                        /(<([^>]+)>)/g,
                                        ''
                                    )
                                        .replace(/Element_[0-9]+/g, '')
                                        .replace(/\s/gi, '')
                                        .replace(
                                            /[\{\}\[\]\/?.,;|\)*~`!^\-_>?@\#$&\\\=\(\'\"]/gi,
                                            ''
                                        )
                                        .replace(
                                            /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\0-9]/gi,
                                            ''
                                        )
                                        .replace(/:[0-9]+/gi, ' ')
                                        .replace(/:/gi, '')
                                        .indexOf('기본효과체력')
                                )
                                .replace(/기본효과체력\+/gi, '')
                                .replace(/[0-9]+/, '')
                                .replace(/활성도/gi, '+')
                                .replace(/무작위각인효과.*$/gi, '')
                                .split(' ')[5]
                        }
                    </span>
                </div>
            </>
        ) : alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
              .replace(/Element_[0-9]+/g, '')
              // .replace(/\s/gi, '')
              .replace(/[\{\}\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi, '')
              .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\[\]\0-9]/gi, '')
              .replace(/\s/gi, ':')
              .match(/\[(\D{2,8})\]:활성도:\d{1,2}/g) !== null ? (
            <>
                <div className="stone-inner">
                    <span>
                        {alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                            .replace(/Element_[0-9]+/g, '')
                            // .replace(/\s/gi, '')
                            .replace(
                                /[\{\}\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                                ''
                            )
                            .replace(
                                /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\[\]\0-9]/gi,
                                ''
                            )
                            .replace(/\s/gi, ':')
                            .match(/\[(\D{2,8})\]:활성도:\d{1,2}/g)[0]
                            .replace(/\:/gi, '')
                            .replace(/활성도/g, '')
                            .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, '')}{' '}
                        +
                        {alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                            .replace(/Element_[0-9]+/g, '')
                            // .replace(/\s/gi, '')
                            .replace(
                                /[\{\}\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                                ''
                            )
                            .replace(
                                /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\[\]\0-9]/gi,
                                ''
                            )
                            .replace(/\s/gi, ':')
                            .match(/\[(\D{2,8})\]:활성도:\d{1,2}/g)[0]
                            .replace(/\:/gi, '')
                            .replace(/활성도/g, '')
                            .replace(/[^0-9]/g, '')}
                    </span>{' '}
                    <span>
                        {alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                            .replace(/Element_[0-9]+/g, '')
                            // .replace(/\s/gi, '')
                            .replace(
                                /[\{\}\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                                ''
                            )
                            .replace(
                                /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\[\]\0-9]/gi,
                                ''
                            )
                            .replace(/\s/gi, ':')
                            .match(/\[(\D{2,8})\]:활성도:\d{1,2}/g)[1]
                            .replace(/\:/gi, '')
                            .replace(/활성도/g, '')
                            .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, '')}{' '}
                        +
                        {alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                            .replace(/Element_[0-9]+/g, '')
                            // .replace(/\s/gi, '')
                            .replace(
                                /[\{\}\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                                ''
                            )
                            .replace(
                                /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\[\]\0-9]/gi,
                                ''
                            )
                            .replace(/\s/gi, ':')
                            .match(/\[(\D{2,8})\]:활성도:\d{1,2}/g)[1]
                            .replace(/\:/gi, '')
                            .replace(/활성도/g, '')
                            .replace(/[^0-9]/g, '')}
                    </span>{' '}
                    <span className="stone-info-reduction">
                        {alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                            .replace(/Element_[0-9]+/g, '')
                            // .replace(/\s/gi, '')
                            .replace(
                                /[\{\}\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                                ''
                            )
                            .replace(
                                /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\[\]\0-9]/gi,
                                ''
                            )
                            .replace(/\s/gi, ':')
                            .match(/\[(\D{2,8})\]:활성도:\d{1,2}/g)[2]
                            .replace(/\:/gi, '')
                            .replace(/활성도/g, '')
                            .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, '')}{' '}
                        +
                        {alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                            .replace(/Element_[0-9]+/g, '')
                            // .replace(/\s/gi, '')
                            .replace(
                                /[\{\}\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                                ''
                            )
                            .replace(
                                /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\[\]\0-9]/gi,
                                ''
                            )
                            .replace(/\s/gi, ':')
                            .match(/\[(\D{2,8})\]:활성도:\d{1,2}/g)[2]
                            .replace(/\:/gi, '')
                            .replace(/활성도/g, '')
                            .replace(/[^0-9]/g, '')}
                    </span>
                </div>
            </>
        ) : (
            <>
                <div className="stone-inner">
                    <span>이벤트 어빌리티 스톤</span>
                </div>
            </>
        )
    }

    function elixirfirststat(idx) {
        return (
            <>
                {alignedData[idx].Tooltip.includes('[엘릭서]') ? (
                    <span>
                        {alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                            .replace(/Element_[0-9]+/g, '')
                            // .replace(/\s/gi, '')
                            .replace(
                                /[\{\}\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                                ''
                            )
                            .replace(
                                /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\[\]\0-9]/gi,
                                ''
                            )
                            .replace(/\s/gi, ':')
                            .match(
                                /\[(투구|어깨|상의|하의|장갑|공용)]\D{1,7}\(?\D{2}\)?/g
                            )[0]
                            .replace(/\:/gi, '')
                            .replace(
                                /\[(투구|어깨|상의|하의|장갑|공용)]/g,
                                ''
                            )}{' '}
                        Lv.
                        {alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                            .replace(/Element_[0-9]+/g, '')
                            // .replace(/\s/gi, '')
                            .replace(
                                /[\{\}\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                                ''
                            )
                            .replace(
                                /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\[\]\0-9]/gi,
                                ''
                            )
                            .replace(/\s/gi, ':')
                            .match(
                                /\[(투구|어깨|상의|하의|장갑|공용)]\D{1,7}\(?\D{2}\)?:\d{1}/g
                            )[0]
                            .replace(/\:/gi, '')
                            .replace(/[^0-9]/g, '')}
                    </span>
                ) : (
                    ''
                )}
            </>
        )
    }

    function elixirsecondstat(idx) {
        return (
            <>
                {alignedData[idx].Tooltip.includes('[엘릭서]') ? (
                    <span>
                        {alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                            .replace(/Element_[0-9]+/g, '')
                            // .replace(/\s/gi, '')
                            .replace(
                                /[\{\}\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                                ''
                            )
                            .replace(
                                /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\[\]\0-9]/gi,
                                ''
                            )
                            .replace(/\s/gi, ':')
                            .match(
                                /\[(투구|어깨|상의|하의|장갑|공용)]\D{1,7}\(?\D{2}\)?/g
                            )[1]
                            .replace(/\:/gi, '')
                            .replace(
                                /\[(투구|어깨|상의|하의|장갑|공용)]/g,
                                ''
                            )}{' '}
                        Lv.
                        {alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                            .replace(/Element_[0-9]+/g, '')
                            // .replace(/\s/gi, '')
                            .replace(
                                /[\{\}\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                                ''
                            )
                            .replace(
                                /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\[\]\0-9]/gi,
                                ''
                            )
                            .replace(/\s/gi, ':')
                            .match(
                                /\[(투구|어깨|상의|하의|장갑|공용)]\D{0,8}\(?\D{2}?\)?:\d{1}/g
                            )[1]
                            .replace(/\:/gi, '')
                            .replace(/[^0-9]/g, '')}
                    </span>
                ) : (
                    ''
                )}
            </>
        )
    }

    function braceletstat(idx) {
        return (
            <div>
                {alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                    .replace(/Element_[0-9]+/g, '')
                    // .replace(/\s/gi, '')
                    .replace(/[\{\}\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi, '')
                    .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\[\]\0-9]/gi, '')
                    .substring(
                        alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                            .replace(/Element_[0-9]+/g, '')
                            // .replace(/\s/gi, '')
                            .replace(
                                /[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                                ''
                            )
                            .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi, '')
                            .replace(/:[0-9]+/gi, ' ')
                            .indexOf('팔찌 효과')
                    )
                    .replace(/\s/gi, ':')
                    .match(/(치명|특화|신속|제압|인내|숙련):\+\d{2,3}/g)[0] ==
                null ? (
                    ''
                ) : (
                    <span>
                        {alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                            .replace(/Element_[0-9]+/g, '')
                            // .replace(/\s/gi, '')
                            .replace(
                                /[\{\}\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                                ''
                            )
                            .replace(
                                /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\[\]\0-9]/gi,
                                ''
                            )
                            .substring(
                                alignedData[idx].Tooltip.replace(
                                    /(<([^>]+)>)/g,
                                    ''
                                )
                                    .replace(/Element_[0-9]+/g, '')
                                    // .replace(/\s/gi, '')
                                    .replace(
                                        /[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                                        ''
                                    )
                                    .replace(
                                        /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi,
                                        ''
                                    )
                                    .replace(/:[0-9]+/gi, ' ')
                                    .indexOf('팔찌 효과')
                            )
                            .replace(/\s/gi, ':')
                            .match(
                                /(치명|특화|신속|제압|인내|숙련):\+\d{2,3}/g
                            )[0]
                            .replace(/\:\+/gi, ' ')}
                    </span>
                )}
                {alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                    .replace(/Element_[0-9]+/g, '')
                    // .replace(/\s/gi, '')
                    .replace(/[\{\}\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi, '')
                    .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\[\]\0-9]/gi, '')
                    .substring(
                        alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                            .replace(/Element_[0-9]+/g, '')
                            // .replace(/\s/gi, '')
                            .replace(
                                /[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                                ''
                            )
                            .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi, '')
                            .replace(/:[0-9]+/gi, ' ')
                            .indexOf('팔찌 효과')
                    )
                    .replace(/\s/gi, ':')
                    .match(/(치명|특화|신속|제압|인내|숙련):\+\d{2,3}/g)[1] ==
                null ? (
                    ''
                ) : (
                    <span>
                        {alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                            .replace(/Element_[0-9]+/g, '')
                            // .replace(/\s/gi, '')
                            .replace(
                                /[\{\}\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                                ''
                            )
                            .replace(
                                /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\[\]\0-9]/gi,
                                ''
                            )
                            .substring(
                                alignedData[idx].Tooltip.replace(
                                    /(<([^>]+)>)/g,
                                    ''
                                )
                                    .replace(/Element_[0-9]+/g, '')
                                    // .replace(/\s/gi, '')
                                    .replace(
                                        /[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                                        ''
                                    )
                                    .replace(
                                        /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi,
                                        ''
                                    )
                                    .replace(/:[0-9]+/gi, ' ')
                                    .indexOf('팔찌 효과')
                            )
                            .replace(/\s/gi, ':')
                            .match(
                                /(치명|특화|신속|제압|인내|숙련):\+\d{2,3}/g
                            )[1]
                            .replace(/\:\+/gi, ' ')}
                    </span>
                )}
            </div>
        )
    }

    function braceleteffectstat(idx) {
        return (
            <div>
                {alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                    .replace(/Element_[0-9]+/g, '')
                    // .replace(/\s/gi, '')
                    .replace(/[\{\}\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi, '')
                    .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\[\]\0-9]/gi, '')
                    .substring(
                        alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                            .replace(/Element_[0-9]+/g, '')
                            // .replace(/\s/gi, '')
                            .replace(
                                /[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                                ''
                            )
                            .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi, '')
                            .replace(/:[0-9]+/gi, ' ')
                            .indexOf('팔찌 효과')
                    )
                    .replace(/\s/gi, ':')
                    .match(
                        /(힘|민첩|지능|체력|최대:생명력|최대:마나|물리:방어력|마법:방어력|전투:중:생명력:회복량):\+\d{2,5}/g
                    ) == null ? (
                    ''
                ) : alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                      .replace(/Element_[0-9]+/g, '')
                      // .replace(/\s/gi, '')
                      .replace(/[\{\}\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi, '')
                      .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\[\]\0-9]/gi, '')
                      .substring(
                          alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                              .replace(/Element_[0-9]+/g, '')
                              // .replace(/\s/gi, '')
                              .replace(
                                  /[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                                  ''
                              )
                              .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi, '')
                              .replace(/:[0-9]+/gi, ' ')
                              .indexOf('팔찌 효과')
                      )
                      .replace(/\s/gi, ':')
                      .match(
                          /(힘|민첩|지능|체력|최대:생명력|최대:마나|물리:방어력|마법:방어력|전투:중:생명력:회복량):\+\d{2,5}/g
                      )[0] == null ? (
                    ''
                ) : (
                    <span>
                        {alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                            .replace(/Element_[0-9]+/g, '')
                            // .replace(/\s/gi, '')
                            .replace(
                                /[\{\}\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                                ''
                            )
                            .replace(
                                /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\[\]\0-9]/gi,
                                ''
                            )
                            .substring(
                                alignedData[idx].Tooltip.replace(
                                    /(<([^>]+)>)/g,
                                    ''
                                )
                                    .replace(/Element_[0-9]+/g, '')
                                    // .replace(/\s/gi, '')
                                    .replace(
                                        /[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                                        ''
                                    )
                                    .replace(
                                        /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi,
                                        ''
                                    )
                                    .replace(/:[0-9]+/gi, ' ')
                                    .indexOf('팔찌 효과')
                            )
                            .replace(/\s/gi, ':')
                            .match(
                                /(힘|민첩|지능|체력|최대:생명력|최대:마나|물리:방어력|마법:방어력|전투:중:생명력:회복량):\+\d{2,5}/g
                            )[0]
                            .toString()
                            .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, '')}
                    </span>
                )}{' '}
                {alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                    .replace(/Element_[0-9]+/g, '')
                    // .replace(/\s/gi, '')
                    .replace(/[\{\}\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi, '')
                    .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\[\]\0-9]/gi, '')
                    .substring(
                        alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                            .replace(/Element_[0-9]+/g, '')
                            // .replace(/\s/gi, '')
                            .replace(
                                /[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                                ''
                            )
                            .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi, '')
                            .replace(/:[0-9]+/gi, ' ')
                            .indexOf('팔찌 효과')
                    )
                    .replace(/\s/gi, ':')
                    .match(
                        /(힘|민첩|지능|체력|최대:생명력|최대:마나|물리:방어력|마법:방어력|전투:중:생명력:회복량):\+\d{2,5}/g
                    ) == null ? (
                    ''
                ) : alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                      .replace(/Element_[0-9]+/g, '')
                      // .replace(/\s/gi, '')
                      .replace(/[\{\}\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi, '')
                      .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\[\]\0-9]/gi, '')
                      .substring(
                          alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                              .replace(/Element_[0-9]+/g, '')
                              // .replace(/\s/gi, '')
                              .replace(
                                  /[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                                  ''
                              )
                              .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi, '')
                              .replace(/:[0-9]+/gi, ' ')
                              .indexOf('팔찌 효과')
                      )
                      .replace(/\s/gi, ':')
                      .match(
                          /(힘|민첩|지능|체력|최대:생명력|최대:마나|물리:방어력|마법:방어력|전투:중:생명력:회복량):\+\d{2,5}/g
                      )[1] == null ? (
                    ''
                ) : (
                    <span>
                        {alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                            .replace(/Element_[0-9]+/g, '')
                            // .replace(/\s/gi, '')
                            .replace(
                                /[\{\}\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                                ''
                            )
                            .replace(
                                /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\[\]\0-9]/gi,
                                ''
                            )
                            .substring(
                                alignedData[idx].Tooltip.replace(
                                    /(<([^>]+)>)/g,
                                    ''
                                )
                                    .replace(/Element_[0-9]+/g, '')
                                    // .replace(/\s/gi, '')
                                    .replace(
                                        /[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                                        ''
                                    )
                                    .replace(
                                        /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi,
                                        ''
                                    )
                                    .replace(/:[0-9]+/gi, ' ')
                                    .indexOf('팔찌 효과')
                            )
                            .replace(/\s/gi, ':')
                            .match(
                                /(힘|민첩|지능|체력|최대:생명력|최대:마나|물리:방어력|마법:방어력|전투:중:생명력:회복량):\+\d{2,5}/g
                            )[1]
                            .toString()
                            .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, '')}
                    </span>
                )}
                {alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                    .replace(/Element_[0-9]+/g, '')
                    // .replace(/\s/gi, '')
                    .replace(/[\{\}\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi, '')
                    .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\[\]\0-9]/gi, '')
                    .substring(
                        alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                            .replace(/Element_[0-9]+/g, '')
                            // .replace(/\s/gi, '')
                            .replace(
                                /[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                                ''
                            )
                            .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi, '')
                            .replace(/:[0-9]+/gi, ' ')
                            .indexOf('팔찌 효과')
                    )
                    .replace(/\s/gi, ':')
                    .match(
                        /(힘|민첩|지능|체력|최대:생명력|최대:마나|물리:방어력|마법:방어력|전투:중:생명력:회복량):\+\d{2,5}/g
                    ) == null ? (
                    ''
                ) : alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                      .replace(/Element_[0-9]+/g, '')
                      // .replace(/\s/gi, '')
                      .replace(/[\{\}\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi, '')
                      .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\[\]\0-9]/gi, '')
                      .substring(
                          alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                              .replace(/Element_[0-9]+/g, '')
                              // .replace(/\s/gi, '')
                              .replace(
                                  /[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                                  ''
                              )
                              .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi, '')
                              .replace(/:[0-9]+/gi, ' ')
                              .indexOf('팔찌 효과')
                      )
                      .replace(/\s/gi, ':')
                      .match(
                          /(힘|민첩|지능|체력|최대:생명력|최대:마나|물리:방어력|마법:방어력|전투:중:생명력:회복량):\+\d{2,5}/g
                      )[1] == null ? (
                    ''
                ) : (
                    <span>
                        {alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                            .replace(/Element_[0-9]+/g, '')
                            // .replace(/\s/gi, '')
                            .replace(
                                /[\{\}\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                                ''
                            )
                            .replace(
                                /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\[\]\0-9]/gi,
                                ''
                            )
                            .substring(
                                alignedData[idx].Tooltip.replace(
                                    /(<([^>]+)>)/g,
                                    ''
                                )
                                    .replace(/Element_[0-9]+/g, '')
                                    // .replace(/\s/gi, '')
                                    .replace(
                                        /[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                                        ''
                                    )
                                    .replace(
                                        /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi,
                                        ''
                                    )
                                    .replace(/:[0-9]+/gi, ' ')
                                    .indexOf('팔찌 효과')
                            )
                            .replace(/\s/gi, ':')
                            .match(
                                /(힘|민첩|지능|체력|최대:생명력|최대:마나|물리:방어력|마법:방어력|전투:중:생명력:회복량):\+\d{2,5}/g
                            )[1]
                            .toString()
                            .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, '')}
                    </span>
                )}{' '}
                {alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                    .replace(/Element_[0-9]+/g, '')
                    // .replace(/\s/gi, '')
                    .replace(/[\{\}\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi, '')
                    .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\[\]\0-9]/gi, '')
                    .substring(
                        alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                            .replace(/Element_[0-9]+/g, '')
                            // .replace(/\s/gi, '')
                            .replace(
                                /[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                                ''
                            )
                            .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi, '')
                            .replace(/:[0-9]+/gi, ' ')
                            .indexOf('팔찌 효과')
                    )
                    .replace(/\s/gi, ':')
                    .match(
                        /(힘|민첩|지능|체력|최대:생명력|최대:마나|물리:방어력|마법:방어력|전투:중:생명력:회복량):\+\d{2,5}/g
                    ) == null ? (
                    ''
                ) : alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                      .replace(/Element_[0-9]+/g, '')
                      // .replace(/\s/gi, '')
                      .replace(/[\{\}\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi, '')
                      .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\[\]\0-9]/gi, '')
                      .substring(
                          alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                              .replace(/Element_[0-9]+/g, '')
                              // .replace(/\s/gi, '')
                              .replace(
                                  /[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                                  ''
                              )
                              .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi, '')
                              .replace(/:[0-9]+/gi, ' ')
                              .indexOf('팔찌 효과')
                      )
                      .replace(/\s/gi, ':')
                      .match(
                          /(힘|민첩|지능|체력|최대:생명력|최대:마나|물리:방어력|마법:방어력|전투:중:생명력:회복량):\+\d{2,5}/g
                      )[2] == null ? (
                    ''
                ) : (
                    <span>
                        {alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                            .replace(/Element_[0-9]+/g, '')
                            // .replace(/\s/gi, '')
                            .replace(
                                /[\{\}\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                                ''
                            )
                            .replace(
                                /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\[\]\0-9]/gi,
                                ''
                            )
                            .substring(
                                alignedData[idx].Tooltip.replace(
                                    /(<([^>]+)>)/g,
                                    ''
                                )
                                    .replace(/Element_[0-9]+/g, '')
                                    // .replace(/\s/gi, '')
                                    .replace(
                                        /[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                                        ''
                                    )
                                    .replace(
                                        /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi,
                                        ''
                                    )
                                    .replace(/:[0-9]+/gi, ' ')
                                    .indexOf('팔찌 효과')
                            )
                            .replace(/\s/gi, ':')
                            .match(
                                /(힘|민첩|지능|체력|최대:생명력|최대:마나|물리:방어력|마법:방어력|전투:중:생명력:회복량):\+\d{2,5}/g
                            )[2]
                            .toString()
                            .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, '')}
                    </span>
                )}{' '}
                {alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                    .replace(/Element_[0-9]+/g, '')
                    // .replace(/\s/gi, '')
                    .replace(/[\{\}\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi, '')
                    .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\[\]\0-9]/gi, '')
                    .substring(
                        alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                            .replace(/Element_[0-9]+/g, '')
                            // .replace(/\s/gi, '')
                            .replace(
                                /[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                                ''
                            )
                            .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi, '')
                            .replace(/:[0-9]+/gi, ' ')
                            .indexOf('팔찌 효과')
                    )
                    .replace(/\s/gi, ':')
                    .match(
                        /(힘|민첩|지능|체력|최대:생명력|최대:마나|물리:방어력|마법:방어력|전투:중:생명력:회복량):\+\d{2,5}/g
                    ) == null ? (
                    ''
                ) : alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                      .replace(/Element_[0-9]+/g, '')
                      // .replace(/\s/gi, '')
                      .replace(/[\{\}\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi, '')
                      .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\[\]\0-9]/gi, '')
                      .substring(
                          alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                              .replace(/Element_[0-9]+/g, '')
                              // .replace(/\s/gi, '')
                              .replace(
                                  /[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                                  ''
                              )
                              .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi, '')
                              .replace(/:[0-9]+/gi, ' ')
                              .indexOf('팔찌 효과')
                      )
                      .replace(/\s/gi, ':')
                      .match(
                          /(힘|민첩|지능|체력|최대:생명력|최대:마나|물리:방어력|마법:방어력|전투:중:생명력:회복량):\+\d{2,5}/g
                      )[3] == null ? (
                    ''
                ) : (
                    <span>
                        {alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                            .replace(/Element_[0-9]+/g, '')
                            // .replace(/\s/gi, '')
                            .replace(
                                /[\{\}\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                                ''
                            )
                            .replace(
                                /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\[\]\0-9]/gi,
                                ''
                            )
                            .substring(
                                alignedData[idx].Tooltip.replace(
                                    /(<([^>]+)>)/g,
                                    ''
                                )
                                    .replace(/Element_[0-9]+/g, '')
                                    // .replace(/\s/gi, '')
                                    .replace(
                                        /[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                                        ''
                                    )
                                    .replace(
                                        /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi,
                                        ''
                                    )
                                    .replace(/:[0-9]+/gi, ' ')
                                    .indexOf('팔찌 효과')
                            )
                            .replace(/\s/gi, ':')
                            .match(
                                /(힘|민첩|지능|체력|최대:생명력|최대:마나|물리:방어력|마법:방어력|전투:중:생명력:회복량):\+\d{2,5}/g
                            )[3]
                            .toString()
                            .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, '')}
                    </span>
                )}{' '}
                {alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                    .replace(/Element_[0-9]+/g, '')
                    // .replace(/\s/gi, '')
                    .replace(/[\{\}\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi, '')
                    .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\[\]\0-9]/gi, '')
                    .substring(
                        alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                            .replace(/Element_[0-9]+/g, '')
                            // .replace(/\s/gi, '')
                            .replace(
                                /[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                                ''
                            )
                            .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi, '')
                            .replace(/:[0-9]+/gi, ' ')
                            .indexOf('팔찌 효과')
                    )
                    .replace(/\s/gi, ':')
                    .match(
                        /(힘|민첩|지능|체력|최대:생명력|최대:마나|물리:방어력|마법:방어력|전투:중:생명력:회복량):\+\d{2,5}/g
                    ) == null ? (
                    ''
                ) : alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                      .replace(/Element_[0-9]+/g, '')
                      // .replace(/\s/gi, '')
                      .replace(/[\{\}\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi, '')
                      .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\[\]\0-9]/gi, '')
                      .substring(
                          alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                              .replace(/Element_[0-9]+/g, '')
                              // .replace(/\s/gi, '')
                              .replace(
                                  /[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                                  ''
                              )
                              .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi, '')
                              .replace(/:[0-9]+/gi, ' ')
                              .indexOf('팔찌 효과')
                      )
                      .replace(/\s/gi, ':')
                      .match(
                          /(힘|민첩|지능|체력|최대:생명력|최대:마나|물리:방어력|마법:방어력|전투:중:생명력:회복량):\+\d{2,5}/g
                      )[4] == null ? (
                    ''
                ) : (
                    <span>
                        {alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                            .replace(/Element_[0-9]+/g, '')
                            // .replace(/\s/gi, '')
                            .replace(
                                /[\{\}\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                                ''
                            )
                            .replace(
                                /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\[\]\0-9]/gi,
                                ''
                            )
                            .substring(
                                alignedData[idx].Tooltip.replace(
                                    /(<([^>]+)>)/g,
                                    ''
                                )
                                    .replace(/Element_[0-9]+/g, '')
                                    // .replace(/\s/gi, '')
                                    .replace(
                                        /[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                                        ''
                                    )
                                    .replace(
                                        /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi,
                                        ''
                                    )
                                    .replace(/:[0-9]+/gi, ' ')
                                    .indexOf('팔찌 효과')
                            )
                            .replace(/\s/gi, ':')
                            .match(
                                /(힘|민첩|지능|체력|최대:생명력|최대:마나|물리:방어력|마법:방어력|전투:중:생명력:회복량):\+\d{2,5}/g
                            )[4]
                            .toString()
                            .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, '')}
                    </span>
                )}{' '}
                {alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                    .replace(/Element_[0-9]+/g, '')
                    .replace(/\s/gi, '')
                    .replace(/[\{\}\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi, '')
                    .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\[\]\0-9]/gi, '')
                    .substring(
                        alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                            .replace(/Element_[0-9]+/g, '')
                            .replace(/\s/gi, '')
                            .replace(
                                /[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                                ''
                            )
                            .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi, '')
                            // .replace(/:[0-9]+/gi, ' ')
                            .indexOf('팔찌효과')
                    )
                    .substring(
                        alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                            .replace(/Element_[0-9]+/g, '')
                            .replace(/\s/gi, '')
                            .replace(
                                /[\{\}\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                                ''
                            )
                            .replace(
                                /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\[\]\0-9]/gi,
                                ''
                            )
                            .substring(
                                alignedData[idx].Tooltip.replace(
                                    /(<([^>]+)>)/g,
                                    ''
                                )
                                    .replace(/Element_[0-9]+/g, '')
                                    .replace(/\s/gi, '')
                                    .replace(
                                        /[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                                        ''
                                    )
                                    .replace(
                                        /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi,
                                        ''
                                    )
                                    // .replace(/:[0-9]+/gi, ' ')
                                    .indexOf('팔찌효과')
                            )
                            .indexOf('[')
                    )
                    .match(/\[(\D{2,4})\]/g) == null ? (
                    ''
                ) : alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                      .replace(/Element_[0-9]+/g, '')
                      .replace(/\s/gi, '')
                      .replace(/[\{\}\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi, '')
                      .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\[\]\0-9]/gi, '')
                      .substring(
                          alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                              .replace(/Element_[0-9]+/g, '')
                              .replace(/\s/gi, '')
                              .replace(
                                  /[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                                  ''
                              )
                              .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi, '')
                              // .replace(/:[0-9]+/gi, ' ')
                              .indexOf('팔찌효과')
                      )
                      .substring(
                          alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                              .replace(/Element_[0-9]+/g, '')
                              .replace(/\s/gi, '')
                              .replace(
                                  /[\{\}\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                                  ''
                              )
                              .replace(
                                  /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\[\]\0-9]/gi,
                                  ''
                              )
                              .substring(
                                  alignedData[idx].Tooltip.replace(
                                      /(<([^>]+)>)/g,
                                      ''
                                  )
                                      .replace(/Element_[0-9]+/g, '')
                                      .replace(/\s/gi, '')
                                      .replace(
                                          /[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                                          ''
                                      )
                                      .replace(
                                          /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi,
                                          ''
                                      )
                                      // .replace(/:[0-9]+/gi, ' ')
                                      .indexOf('팔찌효과')
                              )
                              .indexOf('[')
                      )
                      .match(/\[(\D{2,4})\]/g)[0] == null ? (
                    ''
                ) : (
                    <span>
                        {alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                            .replace(/Element_[0-9]+/g, '')
                            .replace(/\s/gi, '')
                            .replace(
                                /[\{\}\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                                ''
                            )
                            .replace(
                                /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\[\]\0-9]/gi,
                                ''
                            )
                            .substring(
                                alignedData[idx].Tooltip.replace(
                                    /(<([^>]+)>)/g,
                                    ''
                                )
                                    .replace(/Element_[0-9]+/g, '')
                                    .replace(/\s/gi, '')
                                    .replace(
                                        /[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                                        ''
                                    )
                                    .replace(
                                        /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi,
                                        ''
                                    )
                                    // .replace(/:[0-9]+/gi, ' ')
                                    .indexOf('팔찌효과')
                            )
                            .substring(
                                alignedData[idx].Tooltip.replace(
                                    /(<([^>]+)>)/g,
                                    ''
                                )
                                    .replace(/Element_[0-9]+/g, '')
                                    .replace(/\s/gi, '')
                                    .replace(
                                        /[\{\}\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                                        ''
                                    )
                                    .replace(
                                        /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\[\]\0-9]/gi,
                                        ''
                                    )
                                    .substring(
                                        alignedData[idx].Tooltip.replace(
                                            /(<([^>]+)>)/g,
                                            ''
                                        )
                                            .replace(/Element_[0-9]+/g, '')
                                            .replace(/\s/gi, '')
                                            .replace(
                                                /[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                                                ''
                                            )
                                            .replace(
                                                /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi,
                                                ''
                                            )
                                            // .replace(/:[0-9]+/gi, ' ')
                                            .indexOf('팔찌효과')
                                    )
                                    .indexOf('[')
                            )
                            .match(/\[(\D{2,4})\]/g)[0]
                            .toString()
                            .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, '')}
                    </span>
                )}{' '}
                {alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                    .replace(/Element_[0-9]+/g, '')
                    .replace(/\s/gi, '')
                    .replace(/[\{\}\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi, '')
                    .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\[\]\0-9]/gi, '')
                    .substring(
                        alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                            .replace(/Element_[0-9]+/g, '')
                            .replace(/\s/gi, '')
                            .replace(
                                /[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                                ''
                            )
                            .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi, '')
                            // .replace(/:[0-9]+/gi, ' ')
                            .indexOf('팔찌효과')
                    )
                    .substring(
                        alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                            .replace(/Element_[0-9]+/g, '')
                            .replace(/\s/gi, '')
                            .replace(
                                /[\{\}\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                                ''
                            )
                            .replace(
                                /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\[\]\0-9]/gi,
                                ''
                            )
                            .substring(
                                alignedData[idx].Tooltip.replace(
                                    /(<([^>]+)>)/g,
                                    ''
                                )
                                    .replace(/Element_[0-9]+/g, '')
                                    .replace(/\s/gi, '')
                                    .replace(
                                        /[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                                        ''
                                    )
                                    .replace(
                                        /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi,
                                        ''
                                    )
                                    // .replace(/:[0-9]+/gi, ' ')
                                    .indexOf('팔찌효과')
                            )
                            .indexOf('[')
                    )
                    .match(/\[(\D{2,4})\]/g) == null ? (
                    ''
                ) : alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                      .replace(/Element_[0-9]+/g, '')
                      .replace(/\s/gi, '')
                      .replace(/[\{\}\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi, '')
                      .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\[\]\0-9]/gi, '')
                      .substring(
                          alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                              .replace(/Element_[0-9]+/g, '')
                              .replace(/\s/gi, '')
                              .replace(
                                  /[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                                  ''
                              )
                              .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi, '')
                              // .replace(/:[0-9]+/gi, ' ')
                              .indexOf('팔찌효과')
                      )
                      .substring(
                          alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                              .replace(/Element_[0-9]+/g, '')
                              .replace(/\s/gi, '')
                              .replace(
                                  /[\{\}\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                                  ''
                              )
                              .replace(
                                  /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\[\]\0-9]/gi,
                                  ''
                              )
                              .substring(
                                  alignedData[idx].Tooltip.replace(
                                      /(<([^>]+)>)/g,
                                      ''
                                  )
                                      .replace(/Element_[0-9]+/g, '')
                                      .replace(/\s/gi, '')
                                      .replace(
                                          /[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                                          ''
                                      )
                                      .replace(
                                          /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi,
                                          ''
                                      )
                                      // .replace(/:[0-9]+/gi, ' ')
                                      .indexOf('팔찌효과')
                              )
                              .indexOf('[')
                      )
                      .match(/\[(\D{2,4})\]/g)[1] == null ? (
                    ''
                ) : (
                    <span>
                        {alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                            .replace(/Element_[0-9]+/g, '')
                            .replace(/\s/gi, '')
                            .replace(
                                /[\{\}\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                                ''
                            )
                            .replace(
                                /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\[\]\0-9]/gi,
                                ''
                            )
                            .substring(
                                alignedData[idx].Tooltip.replace(
                                    /(<([^>]+)>)/g,
                                    ''
                                )
                                    .replace(/Element_[0-9]+/g, '')
                                    .replace(/\s/gi, '')
                                    .replace(
                                        /[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                                        ''
                                    )
                                    .replace(
                                        /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi,
                                        ''
                                    )
                                    // .replace(/:[0-9]+/gi, ' ')
                                    .indexOf('팔찌효과')
                            )
                            .substring(
                                alignedData[idx].Tooltip.replace(
                                    /(<([^>]+)>)/g,
                                    ''
                                )
                                    .replace(/Element_[0-9]+/g, '')
                                    .replace(/\s/gi, '')
                                    .replace(
                                        /[\{\}\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                                        ''
                                    )
                                    .replace(
                                        /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\[\]\0-9]/gi,
                                        ''
                                    )
                                    .substring(
                                        alignedData[idx].Tooltip.replace(
                                            /(<([^>]+)>)/g,
                                            ''
                                        )
                                            .replace(/Element_[0-9]+/g, '')
                                            .replace(/\s/gi, '')
                                            .replace(
                                                /[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                                                ''
                                            )
                                            .replace(
                                                /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi,
                                                ''
                                            )
                                            // .replace(/:[0-9]+/gi, ' ')
                                            .indexOf('팔찌효과')
                                    )
                                    .indexOf('[')
                            )
                            .match(/\[(\D{2,4})\]/g)[1]
                            .toString()
                            .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, '')}
                    </span>
                )}{' '}
                {alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                    .replace(/Element_[0-9]+/g, '')
                    .replace(/\s/gi, '')
                    .replace(/[\{\}\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi, '')
                    .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\[\]\0-9]/gi, '')
                    .substring(
                        alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                            .replace(/Element_[0-9]+/g, '')
                            .replace(/\s/gi, '')
                            .replace(
                                /[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                                ''
                            )
                            .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi, '')
                            // .replace(/:[0-9]+/gi, ' ')
                            .indexOf('팔찌효과')
                    )
                    .substring(
                        alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                            .replace(/Element_[0-9]+/g, '')
                            .replace(/\s/gi, '')
                            .replace(
                                /[\{\}\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                                ''
                            )
                            .replace(
                                /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\[\]\0-9]/gi,
                                ''
                            )
                            .substring(
                                alignedData[idx].Tooltip.replace(
                                    /(<([^>]+)>)/g,
                                    ''
                                )
                                    .replace(/Element_[0-9]+/g, '')
                                    .replace(/\s/gi, '')
                                    .replace(
                                        /[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                                        ''
                                    )
                                    .replace(
                                        /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi,
                                        ''
                                    )
                                    // .replace(/:[0-9]+/gi, ' ')
                                    .indexOf('팔찌효과')
                            )
                            .indexOf('[')
                    )
                    .match(/\[(\D{2,4})\]/g) == null ? (
                    ''
                ) : alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                      .replace(/Element_[0-9]+/g, '')
                      .replace(/\s/gi, '')
                      .replace(/[\{\}\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi, '')
                      .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\[\]\0-9]/gi, '')
                      .substring(
                          alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                              .replace(/Element_[0-9]+/g, '')
                              .replace(/\s/gi, '')
                              .replace(
                                  /[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                                  ''
                              )
                              .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi, '')
                              // .replace(/:[0-9]+/gi, ' ')
                              .indexOf('팔찌효과')
                      )
                      .substring(
                          alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                              .replace(/Element_[0-9]+/g, '')
                              .replace(/\s/gi, '')
                              .replace(
                                  /[\{\}\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                                  ''
                              )
                              .replace(
                                  /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\[\]\0-9]/gi,
                                  ''
                              )
                              .substring(
                                  alignedData[idx].Tooltip.replace(
                                      /(<([^>]+)>)/g,
                                      ''
                                  )
                                      .replace(/Element_[0-9]+/g, '')
                                      .replace(/\s/gi, '')
                                      .replace(
                                          /[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                                          ''
                                      )
                                      .replace(
                                          /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi,
                                          ''
                                      )
                                      // .replace(/:[0-9]+/gi, ' ')
                                      .indexOf('팔찌효과')
                              )
                              .indexOf('[')
                      )
                      .match(/\[(\D{2,4})\]/g)[2] == null ? (
                    ''
                ) : (
                    <span>
                        {alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                            .replace(/Element_[0-9]+/g, '')
                            .replace(/\s/gi, '')
                            .replace(
                                /[\{\}\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                                ''
                            )
                            .replace(
                                /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\[\]\0-9]/gi,
                                ''
                            )
                            .substring(
                                alignedData[idx].Tooltip.replace(
                                    /(<([^>]+)>)/g,
                                    ''
                                )
                                    .replace(/Element_[0-9]+/g, '')
                                    .replace(/\s/gi, '')
                                    .replace(
                                        /[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                                        ''
                                    )
                                    .replace(
                                        /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi,
                                        ''
                                    )
                                    // .replace(/:[0-9]+/gi, ' ')
                                    .indexOf('팔찌효과')
                            )
                            .substring(
                                alignedData[idx].Tooltip.replace(
                                    /(<([^>]+)>)/g,
                                    ''
                                )
                                    .replace(/Element_[0-9]+/g, '')
                                    .replace(/\s/gi, '')
                                    .replace(
                                        /[\{\}\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                                        ''
                                    )
                                    .replace(
                                        /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\[\]\0-9]/gi,
                                        ''
                                    )
                                    .substring(
                                        alignedData[idx].Tooltip.replace(
                                            /(<([^>]+)>)/g,
                                            ''
                                        )
                                            .replace(/Element_[0-9]+/g, '')
                                            .replace(/\s/gi, '')
                                            .replace(
                                                /[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                                                ''
                                            )
                                            .replace(
                                                /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi,
                                                ''
                                            )
                                            // .replace(/:[0-9]+/gi, ' ')
                                            .indexOf('팔찌효과')
                                    )
                                    .indexOf('[')
                            )
                            .match(/\[(\D{2,4})\]/g)[2]
                            .toString()
                            .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, '')}
                    </span>
                )}
                {alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                    .replace(/Element_[0-9]+/g, '')
                    .replace(/\s/gi, '')
                    .replace(/[\{\}\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi, '')
                    .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\[\]\0-9]/gi, '')
                    .substring(
                        alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                            .replace(/Element_[0-9]+/g, '')
                            .replace(/\s/gi, '')
                            .replace(
                                /[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                                ''
                            )
                            .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi, '')
                            // .replace(/:[0-9]+/gi, ' ')
                            .indexOf('팔찌효과')
                    )
                    .substring(
                        alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                            .replace(/Element_[0-9]+/g, '')
                            .replace(/\s/gi, '')
                            .replace(
                                /[\{\}\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                                ''
                            )
                            .replace(
                                /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\[\]\0-9]/gi,
                                ''
                            )
                            .substring(
                                alignedData[idx].Tooltip.replace(
                                    /(<([^>]+)>)/g,
                                    ''
                                )
                                    .replace(/Element_[0-9]+/g, '')
                                    .replace(/\s/gi, '')
                                    .replace(
                                        /[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                                        ''
                                    )
                                    .replace(
                                        /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi,
                                        ''
                                    )
                                    // .replace(/:[0-9]+/gi, ' ')
                                    .indexOf('팔찌효과')
                            )
                            .indexOf('[')
                    )
                    .match(/\[(\D{2,4})\]/g) == null ? (
                    ''
                ) : alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                      .replace(/Element_[0-9]+/g, '')
                      .replace(/\s/gi, '')
                      .replace(/[\{\}\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi, '')
                      .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\[\]\0-9]/gi, '')
                      .substring(
                          alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                              .replace(/Element_[0-9]+/g, '')
                              .replace(/\s/gi, '')
                              .replace(
                                  /[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                                  ''
                              )
                              .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi, '')
                              // .replace(/:[0-9]+/gi, ' ')
                              .indexOf('팔찌효과')
                      )
                      .substring(
                          alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                              .replace(/Element_[0-9]+/g, '')
                              .replace(/\s/gi, '')
                              .replace(
                                  /[\{\}\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                                  ''
                              )
                              .replace(
                                  /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\[\]\0-9]/gi,
                                  ''
                              )
                              .substring(
                                  alignedData[idx].Tooltip.replace(
                                      /(<([^>]+)>)/g,
                                      ''
                                  )
                                      .replace(/Element_[0-9]+/g, '')
                                      .replace(/\s/gi, '')
                                      .replace(
                                          /[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                                          ''
                                      )
                                      .replace(
                                          /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi,
                                          ''
                                      )
                                      // .replace(/:[0-9]+/gi, ' ')
                                      .indexOf('팔찌효과')
                              )
                              .indexOf('[')
                      )
                      .match(/\[(\D{2,4})\]/g)[3] == null ? (
                    ''
                ) : (
                    <span>
                        {alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                            .replace(/Element_[0-9]+/g, '')
                            .replace(/\s/gi, '')
                            .replace(
                                /[\{\}\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                                ''
                            )
                            .replace(
                                /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\[\]\0-9]/gi,
                                ''
                            )
                            .substring(
                                alignedData[idx].Tooltip.replace(
                                    /(<([^>]+)>)/g,
                                    ''
                                )
                                    .replace(/Element_[0-9]+/g, '')
                                    .replace(/\s/gi, '')
                                    .replace(
                                        /[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                                        ''
                                    )
                                    .replace(
                                        /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi,
                                        ''
                                    )
                                    // .replace(/:[0-9]+/gi, ' ')
                                    .indexOf('팔찌효과')
                            )
                            .substring(
                                alignedData[idx].Tooltip.replace(
                                    /(<([^>]+)>)/g,
                                    ''
                                )
                                    .replace(/Element_[0-9]+/g, '')
                                    .replace(/\s/gi, '')
                                    .replace(
                                        /[\{\}\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                                        ''
                                    )
                                    .replace(
                                        /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\[\]\0-9]/gi,
                                        ''
                                    )
                                    .substring(
                                        alignedData[idx].Tooltip.replace(
                                            /(<([^>]+)>)/g,
                                            ''
                                        )
                                            .replace(/Element_[0-9]+/g, '')
                                            .replace(/\s/gi, '')
                                            .replace(
                                                /[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                                                ''
                                            )
                                            .replace(
                                                /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi,
                                                ''
                                            )
                                            // .replace(/:[0-9]+/gi, ' ')
                                            .indexOf('팔찌효과')
                                    )
                                    .indexOf('[')
                            )
                            .match(/\[(\D{2,4})\]/g)[3]
                            .toString()
                            .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, '')}
                    </span>
                )}
                {alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                    .replace(/Element_[0-9]+/g, '')
                    .replace(/\s/gi, '')
                    .replace(/[\{\}\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi, '')
                    .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\[\]\0-9]/gi, '')
                    .substring(
                        alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                            .replace(/Element_[0-9]+/g, '')
                            .replace(/\s/gi, '')
                            .replace(
                                /[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                                ''
                            )
                            .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi, '')
                            // .replace(/:[0-9]+/gi, ' ')
                            .indexOf('팔찌효과')
                    )
                    .substring(
                        alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                            .replace(/Element_[0-9]+/g, '')
                            .replace(/\s/gi, '')
                            .replace(
                                /[\{\}\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                                ''
                            )
                            .replace(
                                /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\[\]\0-9]/gi,
                                ''
                            )
                            .substring(
                                alignedData[idx].Tooltip.replace(
                                    /(<([^>]+)>)/g,
                                    ''
                                )
                                    .replace(/Element_[0-9]+/g, '')
                                    .replace(/\s/gi, '')
                                    .replace(
                                        /[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                                        ''
                                    )
                                    .replace(
                                        /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi,
                                        ''
                                    )
                                    // .replace(/:[0-9]+/gi, ' ')
                                    .indexOf('팔찌효과')
                            )
                            .indexOf('[')
                    )
                    .match(/\[(\D{2,4})\]/g) == null ? (
                    ''
                ) : alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                      .replace(/Element_[0-9]+/g, '')
                      .replace(/\s/gi, '')
                      .replace(/[\{\}\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi, '')
                      .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\[\]\0-9]/gi, '')
                      .substring(
                          alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                              .replace(/Element_[0-9]+/g, '')
                              .replace(/\s/gi, '')
                              .replace(
                                  /[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                                  ''
                              )
                              .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi, '')
                              // .replace(/:[0-9]+/gi, ' ')
                              .indexOf('팔찌효과')
                      )
                      .substring(
                          alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                              .replace(/Element_[0-9]+/g, '')
                              .replace(/\s/gi, '')
                              .replace(
                                  /[\{\}\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                                  ''
                              )
                              .replace(
                                  /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\[\]\0-9]/gi,
                                  ''
                              )
                              .substring(
                                  alignedData[idx].Tooltip.replace(
                                      /(<([^>]+)>)/g,
                                      ''
                                  )
                                      .replace(/Element_[0-9]+/g, '')
                                      .replace(/\s/gi, '')
                                      .replace(
                                          /[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                                          ''
                                      )
                                      .replace(
                                          /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi,
                                          ''
                                      )
                                      // .replace(/:[0-9]+/gi, ' ')
                                      .indexOf('팔찌효과')
                              )
                              .indexOf('[')
                      )
                      .match(/\[(\D{2,4})\]/g)[4] == null ? (
                    ''
                ) : (
                    <span>
                        {alignedData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                            .replace(/Element_[0-9]+/g, '')
                            .replace(/\s/gi, '')
                            .replace(
                                /[\{\}\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                                ''
                            )
                            .replace(
                                /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\[\]\0-9]/gi,
                                ''
                            )
                            .substring(
                                alignedData[idx].Tooltip.replace(
                                    /(<([^>]+)>)/g,
                                    ''
                                )
                                    .replace(/Element_[0-9]+/g, '')
                                    .replace(/\s/gi, '')
                                    .replace(
                                        /[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                                        ''
                                    )
                                    .replace(
                                        /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi,
                                        ''
                                    )
                                    // .replace(/:[0-9]+/gi, ' ')
                                    .indexOf('팔찌효과')
                            )
                            .substring(
                                alignedData[idx].Tooltip.replace(
                                    /(<([^>]+)>)/g,
                                    ''
                                )
                                    .replace(/Element_[0-9]+/g, '')
                                    .replace(/\s/gi, '')
                                    .replace(
                                        /[\{\}\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                                        ''
                                    )
                                    .replace(
                                        /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\[\]\0-9]/gi,
                                        ''
                                    )
                                    .substring(
                                        alignedData[idx].Tooltip.replace(
                                            /(<([^>]+)>)/g,
                                            ''
                                        )
                                            .replace(/Element_[0-9]+/g, '')
                                            .replace(/\s/gi, '')
                                            .replace(
                                                /[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                                                ''
                                            )
                                            .replace(
                                                /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi,
                                                ''
                                            )
                                            // .replace(/:[0-9]+/gi, ' ')
                                            .indexOf('팔찌효과')
                                    )
                                    .indexOf('[')
                            )
                            .match(/\[(\D{2,4})\]/g)[4]
                            .toString()
                            .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, '')}
                    </span>
                )}
            </div>
        )
    }

    const randomColor = () => {
        let r = Math.floor(Math.random() * 256)
        let g = Math.floor(Math.random() * 256)
        let b = Math.floor(Math.random() * 256)

        return `rgba(${r}, ${g}, ${b}, 0.6)`
    }

    function gemTooltip(idx) {
        return sortedGemData[idx] ? (
            <>
                {sortedGemData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                    .replace(/Element_[0-9]+/g, '')
                    // .replace(/\s/gi, '')
                    .replace(/[\{\}\/?,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi, '')
                    .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\[\]\.\0-9]/gi, '')
                    .match(/\[\D{2,6}\]\s\D{2,12}\s(피해|재사용)/g)[0]
                    .replace(/\s/gi, '')
                    .replace(/\[\D{2,6}\]/g, '')
                    .replace(/(피해|재사용)/g, '')}
            </>
        ) : (
            ''
        )
    }

    function gemLevel(idx) {
        // Tooltip에서 HTML 태그 제거 후 정제 작업
        let tooltipText = sortedGemData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
            .replace(/Element_[0-9]+/g, '')
            .replace(/[\{\}\/?,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi, '')
            .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\[\]\.\0-9]/gi, '')

        // '피해'와 '재사용'의 위치를 찾음
        let damageIndex = tooltipText.indexOf('피해')
        let cooldownIndex = tooltipText.indexOf('재사용')
        let adenIndex1 = tooltipText.indexOf('신성의 오라')
        let adenIndex2 = tooltipText.indexOf('음양 스킬')
        let adenIndex3 = tooltipText.indexOf('세레나데 스킬')

        if (damageIndex !== -1 && sortedGemData[idx].Tooltip.includes('멸화')) {
            // '피해'가 포함된 경우 해당 위치부터 끝까지의 문자열을 추출
            return tooltipText
                .substring(damageIndex)
                .replace(/\s/gi, '=')
                .replace(/==.*$/gi, '')
                .replace(/\=/g, ' ')
                .replace(/추가 효과.*$/g, '')
        } else if (
            cooldownIndex !== -1 &&
            sortedGemData[idx].Tooltip.includes('홍염')
        ) {
            // '재사용'이 포함된 경우 해당 위치부터 끝까지의 문자열을 추출
            return tooltipText
                .substring(cooldownIndex)
                .replace(/\s/gi, '=')
                .replace(/==.*$/gi, '')
                .replace(/\=/g, ' ')
            // .replace(/추가 효과.*$/g, '')
        } else if (
            damageIndex !== -1 &&
            sortedGemData[idx].Tooltip.includes('겁화')
        ) {
            // '재사용'이 포함된 경우 해당 위치부터 끝까지의 문자열을 추출
            return (
                <>
                    {tooltipText
                        .substring(damageIndex)
                        .replace(/\s/gi, '=')
                        .replace(/==.*$/gi, '')
                        .replace(/\=/g, ' ')
                        .substring(
                            tooltipText
                                .substring(damageIndex)
                                .replace(/\s/gi, '=')
                                .replace(/==.*$/gi, '')
                                .replace(/\=/g, ' ')
                                .indexOf('[')
                        ) ? (
                        <>
                            {tooltipText
                                .substring(damageIndex)
                                .replace(/\s/gi, '=')
                                .replace(/==.*$/gi, '')
                                .replace(/\=/g, ' ')
                                .substring(
                                    tooltipText
                                        .substring(damageIndex)
                                        .replace(/\s/gi, '=')
                                        .replace(/==.*$/gi, '')
                                        .replace(/\=/g, ' ')
                                        .indexOf('[')
                                )
                                .match(/지원\s*효과\s*\d+\.\d+\s*%?\s*증가/g)}
                            <div>
                                {tooltipText
                                    .substring(damageIndex)
                                    .replace(/\s/gi, '=')
                                    .replace(/==.*$/gi, '')
                                    .replace(/\=/g, ' ')
                                    .substring(
                                        tooltipText
                                            .substring(damageIndex)
                                            .replace(/\s/gi, '=')
                                            .replace(/==.*$/gi, '')
                                            .replace(/\=/g, ' ')
                                            .indexOf('[')
                                    )
                                    .match(/기본 공격력.*?증가/g, '')}
                            </div>
                        </>
                    ) : (
                        ''
                    )}
                </>
            )
        } else if (
            cooldownIndex !== -1 &&
            sortedGemData[idx].Tooltip.includes('작열')
        ) {
            // '재사용'이 포함된 경우 해당 위치부터 끝까지의 문자열을 추출
            return (
                <>
                    {tooltipText
                        .substring(cooldownIndex)
                        .replace(/\s/gi, '=')
                        .replace(/==.*$/gi, '')
                        .replace(/\=/g, ' ')
                        .replace(/추가 효과.*$/g, '')}
                    <div>
                        {tooltipText
                            .substring(cooldownIndex)
                            .replace(/\s/gi, '=')
                            .replace(/==.*$/gi, '')
                            .replace(/\=/g, ' ')
                            .match(/기본 공격력.*?증가/g, '')}
                    </div>
                </>
            )
        } else if (
            (adenIndex1 !== -1 || adenIndex2 !== -1 || adenIndex3 !== -1) &&
            sortedGemData[idx].Tooltip.includes('겁화')
        ) {
            return (
                <>
                    {tooltipText
                        .replace(/\s/gi, ' ')
                        .substring(
                            tooltipText.replace(/\s/gi, '=').indexOf('[')
                        )
                        .match(/지원\s*효과\s*\d+\.\d+\s*%?\s*증가/g)}
                    <div>
                        {tooltipText
                            .replace(/\s/gi, ' ')
                            .substring(
                                tooltipText.replace(/\s/gi, '=').indexOf('[')
                            )
                            .match(/기본 공격력.*?증가/g, '')}
                    </div>
                </>
            )
        } else {
            return ''
        }
    }

    function skillDetail(idx) {
        return sortskillA[idx].Tooltip.includes('부위 파괴') ||
            sortskillA[idx].Tooltip.includes('무력화') ? (
            sortskillA[idx].Tooltip.includes('부위 파괴') &&
            !sortskillA[idx].Tooltip.includes('무력화') ? (
                <div>
                    {sortskillA[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                        .replace(/Element_[0-9]+/g, '')
                        // .replace(/\s/gi, '')
                        .replace(/[\{\}\/?,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi, '')
                        .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\[\]\.\0-9]/gi, '')
                        .match(/(부위 파괴)\s:\s\레벨\s\d/g)[0]
                        .replace(/\:/g, '')
                        .replace(/레벨/g, 'Lv.')}
                </div>
            ) : sortskillA[idx].Tooltip.includes('무력화') &&
              !sortskillA[idx].Tooltip.includes('부위 파괴') ? (
                <div>
                    {sortskillA[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                        .replace(/Element_[0-9]+/g, '')
                        // .replace(/\s/gi, '')
                        .replace(/[\{\}\/?,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi, '')
                        .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\[\]\.\0-9]/gi, '')
                        .match(/(무력화)\s:\s(상|중|하|중상|최상)/g)[0]
                        .replace(/\:/g, '')}
                </div>
            ) : sortskillA[idx].Tooltip.includes('무력화') &&
              sortskillA[idx].Tooltip.includes('부위 파괴') ? (
                <>
                    <div>
                        {sortskillA[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                            .replace(/Element_[0-9]+/g, '')
                            // .replace(/\s/gi, '')
                            .replace(
                                /[\{\}\/?,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                                ''
                            )
                            .replace(
                                /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\[\]\.\0-9]/gi,
                                ''
                            )
                            .match(/(부위 파괴)\s:\s\레벨\s\d/g)[0]
                            .replace(/\:/g, '')
                            .replace(/레벨/g, 'Lv.')}
                    </div>
                    <div>
                        {sortskillA[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                            .replace(/Element_[0-9]+/g, '')
                            // .replace(/\s/gi, '')
                            .replace(
                                /[\{\}\/?,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                                ''
                            )
                            .replace(
                                /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\[\]\.\0-9]/gi,
                                ''
                            )
                            .match(/(무력화)\s:\s(상|중|하|중상|최상)/g)[0]
                            .replace(/\:/g, '')}
                    </div>
                </>
            ) : (
                ''
            )
        ) : (
            ''
        )
    }

    return (
        <article className="profile" style={{ width: '100%' }}>
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
                        <p className="title">
                            {profileData.Title !== null
                                ? profileData.Title
                                : ''}
                        </p>
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
                                                ? 'blue'
                                                : a == middle
                                                ? 'purple'
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
                                                ? 'blue'
                                                : b == middle
                                                ? 'purple'
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
                                                ? 'blue'
                                                : c == middle
                                                ? 'purple'
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
                                    {arkpassiveData.Points[0] &&
                                    avgLevel >= '1600'
                                        ? arkpassiveData.Points[0].Value
                                        : '0'}
                                </div>
                            </p>
                            <p>
                                깨달음{' '}
                                <div className="value">
                                    {arkpassiveData.Points[1] &&
                                    avgLevel >= '1600'
                                        ? arkpassiveData.Points[1].Value
                                        : '0'}
                                </div>
                            </p>
                            <p>
                                도약{' '}
                                <div className="value">
                                    {arkpassiveData.Points[2] &&
                                    avgLevel >= '1600'
                                        ? arkpassiveData.Points[2].Value
                                        : '0'}
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
                    <div className="engrav">
                        {engravData.Engravings !== null &&
                        engravData.ArkPassiveEffects == null ? (
                            engravData.Effects.map((item, index) => (
                                <div key={index} className="engrav-item">
                                    <img
                                        src={item.Icon}
                                        className="engravimg"
                                    />
                                    <span className="engravname">
                                        {item.Name}
                                    </span>
                                </div>
                            ))
                        ) : engravData.Engravings == null &&
                          engravData.ArkPassiveEffects !== null ? (
                            engravData.ArkPassiveEffects.map((item, index) => (
                                <div key={index} className="engrav-item">
                                    <img
                                        src={imageMap[item.Name]}
                                        alt={item.Name}
                                        className="engravimg"
                                    />
                                    <span className="engravname">
                                        {item.Name} Lv. {item.Level}{' '}
                                        <span>
                                            {item.AbilityStoneLevel !== null ? (
                                                <>X {item.AbilityStoneLevel}</>
                                            ) : (
                                                <></>
                                            )}
                                        </span>
                                    </span>
                                </div>
                            ))
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
                <div className="equip">
                    <div className="equip-inner">
                        <div className="equipment">
                            <p>
                                {alignedData[0] &&
                                alignedData[0].Type == '무기' &&
                                alignedData[0].Name !== '' ? (
                                    <>
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
                                                src={alignedData[0].Icon}
                                                value={alignedData[0].Grade}
                                                style={{
                                                    backgroundImage:
                                                        alignedData[0].Grade ===
                                                        '유물'
                                                            ? 'linear-gradient(135deg, #341a09, #a24006)'
                                                            : 'linear-gradient(135deg, #3d3325, #dcc999)',
                                                }}
                                            />
                                            <div
                                                className="qualityValue"
                                                style={{
                                                    // width: '48px',
                                                    backgroundColor:
                                                        qualityValue(0) == 100
                                                            ? 'rgb(255, 106, 0)'
                                                            : qualityValue(0) >=
                                                                  90 &&
                                                              qualityValue(0) <
                                                                  100
                                                            ? 'rgb(138, 43, 226)'
                                                            : qualityValue(0) >=
                                                                  70 &&
                                                              qualityValue(0) <
                                                                  90
                                                            ? 'rgb(81, 162, 254)'
                                                            : qualityValue(0) >=
                                                                  30 &&
                                                              qualityValue(0) <
                                                                  70
                                                            ? 'rgb(36, 157, 46)'
                                                            : qualityValue(0) >=
                                                                  10 &&
                                                              qualityValue(0) <
                                                                  30
                                                            ? 'rgb(214, 214, 0)'
                                                            : 'rgb(216, 38, 38)',
                                                    color: 'white',
                                                    fontWeight: '600',
                                                    fontSize: '12px',
                                                    textAlign: 'center',
                                                }}
                                            >
                                                {qualityValue(0)}
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
                                                {alignedData[0].Name}
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div
                                        style={{
                                            width: '4.8rem',
                                            height: '56px',
                                            borderRadius: '8px',
                                            backgroundColor: '#cccfe0',
                                        }}
                                    />
                                )}
                            </p>
                            <p>
                                {alignedData[1] &&
                                alignedData[1].Type == '투구' &&
                                alignedData[1].Name !== '' ? (
                                    <>
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
                                                src={alignedData[1].Icon}
                                                value={alignedData[1].Grade}
                                                style={{
                                                    backgroundImage:
                                                        alignedData[1].Grade ===
                                                        '유물'
                                                            ? 'linear-gradient(135deg, #341a09, #a24006)'
                                                            : 'linear-gradient(135deg, #3d3325, #dcc999)',
                                                }}
                                            />
                                            <div
                                                className="qualityValue"
                                                style={{
                                                    // width: '48px',
                                                    backgroundColor:
                                                        qualityValue(1) == 100
                                                            ? 'rgb(255, 106, 0)'
                                                            : qualityValue(1) >=
                                                                  90 &&
                                                              qualityValue(1) <
                                                                  100
                                                            ? 'rgb(138, 43, 226)'
                                                            : qualityValue(1) >=
                                                                  70 &&
                                                              qualityValue(1) <
                                                                  90
                                                            ? 'rgb(81, 162, 254)'
                                                            : qualityValue(1) >=
                                                                  30 &&
                                                              qualityValue(1) <
                                                                  70
                                                            ? 'rgb(36, 157, 46)'
                                                            : qualityValue(1) >=
                                                                  10 &&
                                                              qualityValue(1) <
                                                                  30
                                                            ? 'rgb(214, 214, 0)'
                                                            : 'rgb(216, 38, 38)',
                                                    fontSize: '12px',
                                                    fontWeight: '600',
                                                    color: 'white',
                                                    textAlign: 'center',
                                                }}
                                            >
                                                {alignedData[1].Tooltip.substring(
                                                    alignedData[1].Tooltip.indexOf(
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
                                                {alignedData[1].Name}
                                            </div>
                                            <div className="elixir-tap">
                                                {elixirfirststat(1)}{' '}
                                                {elixirsecondstat(1)}
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div
                                        style={{
                                            width: '4.8rem',
                                            height: '56px',
                                            borderRadius: '8px',
                                            backgroundColor: '#cccfe0',
                                        }}
                                    />
                                )}
                            </p>
                            <p>
                                {alignedData[2] &&
                                alignedData[2].Type == '상의' &&
                                alignedData[2].Name !== '' ? (
                                    <>
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
                                                src={alignedData[2].Icon}
                                                value={alignedData[2].Grade}
                                                style={{
                                                    backgroundImage:
                                                        alignedData[2].Grade ===
                                                        '유물'
                                                            ? 'linear-gradient(135deg, #341a09, #a24006)'
                                                            : 'linear-gradient(135deg, #3d3325, #dcc999)',
                                                }}
                                            />
                                            <div
                                                className="qualityValue"
                                                style={{
                                                    // width: '48px',
                                                    backgroundColor:
                                                        qualityValue(2) == 100
                                                            ? 'rgb(255, 106, 0)'
                                                            : qualityValue(2) >=
                                                                  90 &&
                                                              qualityValue(2) <
                                                                  100
                                                            ? 'rgb(138, 43, 226)'
                                                            : qualityValue(2) >=
                                                                  70 &&
                                                              qualityValue(2) <
                                                                  90
                                                            ? 'rgb(81, 162, 254)'
                                                            : qualityValue(2) >=
                                                                  30 &&
                                                              qualityValue(2) <
                                                                  70
                                                            ? 'rgb(36, 157, 46)'
                                                            : qualityValue(2) >=
                                                                  10 &&
                                                              qualityValue(2) <
                                                                  30
                                                            ? 'rgb(214, 214, 0)'
                                                            : 'rgb(216, 38, 38)',
                                                    color: 'white',
                                                    fontWeight: '600',
                                                    fontSize: '12px',
                                                    textAlign: 'center',
                                                }}
                                            >
                                                {qualityValue(2)}
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
                                                {alignedData[2].Name}
                                            </div>
                                            <div className="elixir-tap">
                                                {elixirfirststat(2)}{' '}
                                                {elixirsecondstat(2)}
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div
                                        style={{
                                            width: '4.8rem',
                                            height: '56px',
                                            borderRadius: '8px',
                                            backgroundColor: '#cccfe0',
                                        }}
                                    />
                                )}
                            </p>
                            <p>
                                {alignedData[3] &&
                                alignedData[3].Type == '하의' &&
                                alignedData[3].Name !== '' ? (
                                    <>
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
                                                src={alignedData[3].Icon}
                                                value={alignedData[3].Grade}
                                                style={{
                                                    backgroundImage:
                                                        alignedData[3].Grade ===
                                                        '유물'
                                                            ? 'linear-gradient(135deg, #341a09, #a24006)'
                                                            : 'linear-gradient(135deg, #3d3325, #dcc999)',
                                                }}
                                            />
                                            <div
                                                className="qualityValue"
                                                style={{
                                                    // width: '48px',
                                                    backgroundColor:
                                                        qualityValue(3) == 100
                                                            ? 'rgb(255, 106, 0)'
                                                            : qualityValue(3) >=
                                                                  90 &&
                                                              qualityValue(3) <
                                                                  100
                                                            ? 'rgb(138, 43, 226)'
                                                            : qualityValue(3) >=
                                                                  70 &&
                                                              qualityValue(3) <
                                                                  90
                                                            ? 'rgb(81, 162, 254)'
                                                            : qualityValue(3) >=
                                                                  30 &&
                                                              qualityValue(3) <
                                                                  70
                                                            ? 'rgb(36, 157, 46)'
                                                            : qualityValue(3) >=
                                                                  10 &&
                                                              qualityValue(3) <
                                                                  30
                                                            ? 'rgb(214, 214, 0)'
                                                            : 'rgb(216, 38, 38)',
                                                    color: 'white',
                                                    fontWeight: '600',
                                                    fontSize: '12px',
                                                    textAlign: 'center',
                                                }}
                                            >
                                                {qualityValue(3)}
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
                                                {alignedData[3].Name}
                                            </div>
                                            <div className="elixir-tap">
                                                {elixirfirststat(3)}{' '}
                                                {elixirsecondstat(3)}
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div
                                        style={{
                                            width: '4.8rem',
                                            height: '56px',
                                            borderRadius: '8px',
                                            backgroundColor: '#cccfe0',
                                        }}
                                    />
                                )}
                            </p>
                            <p>
                                {alignedData[4] &&
                                alignedData[4].Type == '장갑' &&
                                alignedData[4].Name !== '' ? (
                                    <>
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
                                                src={alignedData[4].Icon}
                                                value={alignedData[4].Grade}
                                                style={{
                                                    backgroundImage:
                                                        alignedData[4].Grade ===
                                                        '유물'
                                                            ? 'linear-gradient(135deg, #341a09, #a24006)'
                                                            : 'linear-gradient(135deg, #3d3325, #dcc999)',
                                                }}
                                            />
                                            <div
                                                className="qualityValue"
                                                style={{
                                                    // width: '48px',
                                                    backgroundColor:
                                                        qualityValue(4) == 100
                                                            ? 'rgb(255, 106, 0)'
                                                            : qualityValue(4) >=
                                                                  90 &&
                                                              qualityValue(4) <
                                                                  100
                                                            ? 'rgb(138, 43, 226)'
                                                            : qualityValue(4) >=
                                                                  70 &&
                                                              qualityValue(4) <
                                                                  90
                                                            ? 'rgb(81, 162, 254)'
                                                            : qualityValue(4) >=
                                                                  30 &&
                                                              qualityValue(4) <
                                                                  70
                                                            ? 'rgb(36, 157, 46)'
                                                            : qualityValue(4) >=
                                                                  10 &&
                                                              qualityValue(4) <
                                                                  30
                                                            ? 'rgb(214, 214, 0)'
                                                            : 'rgb(216, 38, 38)',
                                                    color: 'white',
                                                    fontWeight: '600',
                                                    fontSize: '12px',
                                                    textAlign: 'center',
                                                }}
                                            >
                                                {qualityValue(4)}
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
                                                {alignedData[4].Name}
                                            </div>
                                            <div className="elixir-tap">
                                                {elixirfirststat(4)}{' '}
                                                {elixirsecondstat(4)}
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div
                                        style={{
                                            width: '4.8rem',
                                            height: '56px',
                                            borderRadius: '8px',
                                            backgroundColor: '#cccfe0',
                                        }}
                                    />
                                )}
                            </p>
                            <p>
                                {alignedData[5] &&
                                alignedData[5].Type == '어깨' &&
                                alignedData[5].Name !== '' ? (
                                    <>
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
                                                src={alignedData[5].Icon}
                                                value={alignedData[5].Grade}
                                                style={{
                                                    backgroundImage:
                                                        alignedData[5].Grade ===
                                                        '유물'
                                                            ? 'linear-gradient(135deg, #341a09, #a24006)'
                                                            : 'linear-gradient(135deg, #3d3325, #dcc999)',
                                                }}
                                            />
                                            <div
                                                className="qualityValue"
                                                style={{
                                                    // width: '48px',
                                                    backgroundColor:
                                                        qualityValue(5) == 100
                                                            ? 'rgb(255, 106, 0)'
                                                            : qualityValue(5) >=
                                                                  90 &&
                                                              qualityValue(5) <
                                                                  100
                                                            ? 'rgb(138, 43, 226)'
                                                            : qualityValue(5) >=
                                                                  70 &&
                                                              qualityValue(5) <
                                                                  90
                                                            ? 'rgb(81, 162, 254)'
                                                            : qualityValue(5) >=
                                                                  30 &&
                                                              qualityValue(5) <
                                                                  70
                                                            ? 'rgb(36, 157, 46)'
                                                            : qualityValue(5) >=
                                                                  10 &&
                                                              qualityValue(5) <
                                                                  30
                                                            ? 'rgb(214, 214, 0)'
                                                            : 'rgb(216, 38, 38)',
                                                    color: 'white',
                                                    fontWeight: '600',
                                                    fontSize: '12px',
                                                    textAlign: 'center',
                                                }}
                                            >
                                                {qualityValue(5)}
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
                                                {alignedData[5].Name}
                                            </div>
                                            <div className="elixir-tap">
                                                {elixirfirststat(5)}{' '}
                                                {elixirsecondstat(5)}
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div
                                        style={{
                                            width: '4.8rem',
                                            height: '56px',
                                            borderRadius: '8px',
                                            backgroundColor: '#cccfe0',
                                        }}
                                    />
                                )}
                            </p>
                        </div>
                        <div className="acc-inner">
                            <p>
                                {alignedData[6] &&
                                alignedData[6].Type == '목걸이' &&
                                alignedData[6].Name !== '' ? (
                                    <>
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
                                                src={alignedData[6].Icon}
                                                value={alignedData[6].Grade}
                                                style={{
                                                    backgroundImage:
                                                        alignedData[6].Grade ===
                                                        '유물'
                                                            ? 'linear-gradient(135deg, #341a09, #a24006)'
                                                            : 'linear-gradient(135deg, #3d3325, #dcc999)',
                                                }}
                                            />
                                            <div
                                                className="qualityValue"
                                                style={{
                                                    // width: '48px',
                                                    backgroundColor:
                                                        qualityValue(6) == 100
                                                            ? 'rgb(255, 106, 0)'
                                                            : qualityValue(6) >=
                                                                  90 &&
                                                              qualityValue(6) <
                                                                  100
                                                            ? 'rgb(138, 43, 226)'
                                                            : qualityValue(6) >=
                                                                  70 &&
                                                              qualityValue(6) <
                                                                  90
                                                            ? 'rgb(81, 162, 254)'
                                                            : qualityValue(6) >=
                                                                  30 &&
                                                              qualityValue(6) <
                                                                  70
                                                            ? 'rgb(36, 157, 46)'
                                                            : qualityValue(6) >=
                                                                  10 &&
                                                              qualityValue(6) <
                                                                  30
                                                            ? 'rgb(214, 214, 0)'
                                                            : 'rgb(216, 38, 38)',
                                                    color: 'white',
                                                    fontWeight: '600',
                                                    fontSize: '12px',
                                                    textAlign: 'center',
                                                }}
                                            >
                                                {alignedData[6].Tooltip.substring(
                                                    alignedData[6].Tooltip.indexOf(
                                                        'qualityValue'
                                                    )
                                                )
                                                    .slice(14, 18)
                                                    .replace(',', '')}
                                            </div>
                                        </div>
                                        <div className="nametag">
                                            <div className="equip-name">
                                                {alignedData[6].Name}
                                            </div>
                                            <div className="stat-info">
                                                <span className="accstat">
                                                    {accfirststat(6)}
                                                </span>{' '}
                                                <span className="accstat">
                                                    {accsecondstat(6)}
                                                </span>
                                            </div>
                                            <div className="engraving-info">
                                                {accengravingeffect(6)}
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div
                                        style={{
                                            width: '4.8rem',
                                            height: '56px',
                                            borderRadius: '8px',
                                            backgroundColor: '#cccfe0',
                                        }}
                                    />
                                )}
                            </p>
                            <p>
                                {alignedData[7] &&
                                alignedData[7].Type == '귀걸이' &&
                                alignedData[7].Name !== '' ? (
                                    <>
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
                                                src={alignedData[7].Icon}
                                                value={alignedData[7].Grade}
                                                style={{
                                                    backgroundImage:
                                                        alignedData[7].Grade ===
                                                        '유물'
                                                            ? 'linear-gradient(135deg, #341a09, #a24006)'
                                                            : 'linear-gradient(135deg, #3d3325, #dcc999)',
                                                }}
                                            />
                                            <div
                                                className="qualityValue"
                                                style={{
                                                    // width: '48px',
                                                    backgroundColor:
                                                        qualityValue(7) == 100
                                                            ? 'rgb(255, 106, 0)'
                                                            : qualityValue(7) >=
                                                                  90 &&
                                                              qualityValue(7) <
                                                                  100
                                                            ? 'rgb(138, 43, 226)'
                                                            : qualityValue(7) >=
                                                                  70 &&
                                                              qualityValue(7) <
                                                                  90
                                                            ? 'rgb(81, 162, 254)'
                                                            : qualityValue(7) >=
                                                                  30 &&
                                                              qualityValue(7) <
                                                                  70
                                                            ? 'rgb(36, 157, 46)'
                                                            : qualityValue(7) >=
                                                                  10 &&
                                                              qualityValue(7) <
                                                                  30
                                                            ? 'rgb(214, 214, 0)'
                                                            : 'rgb(216, 38, 38)',
                                                    color: 'white',
                                                    fontWeight: '600',
                                                    fontSize: '12px',
                                                    textAlign: 'center',
                                                }}
                                            >
                                                {alignedData[7].Tooltip.substring(
                                                    alignedData[7].Tooltip.indexOf(
                                                        'qualityValue'
                                                    )
                                                )
                                                    .slice(14, 18)
                                                    .replace(',', '')}
                                            </div>
                                        </div>
                                        <div className="nametag">
                                            <div className="equip-name">
                                                {alignedData[7].Name}
                                            </div>
                                            <div className="stat-info">
                                                <span className="accstat">
                                                    {accfirststat(7)}
                                                </span>{' '}
                                                <span className="accstat">
                                                    {accsecondstat(7)}
                                                </span>
                                            </div>
                                            <div className="engraving-info">
                                                {accengravingeffect(7)}
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div
                                        style={{
                                            width: '4.8rem',
                                            height: '56px',
                                            borderRadius: '8px',
                                            backgroundColor: '#cccfe0',
                                        }}
                                    />
                                )}
                            </p>
                            <p>
                                {alignedData[8] &&
                                alignedData[8].Type == '귀걸이' &&
                                alignedData[8].Name !== '' ? (
                                    <>
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
                                                src={alignedData[8].Icon}
                                                value={alignedData[8].Grade}
                                                style={{
                                                    backgroundImage:
                                                        alignedData[8].Grade ===
                                                        '유물'
                                                            ? 'linear-gradient(135deg, #341a09, #a24006)'
                                                            : 'linear-gradient(135deg, #3d3325, #dcc999)',
                                                }}
                                            />
                                            <div
                                                className="qualityValue"
                                                style={{
                                                    // width: '48px',
                                                    backgroundColor:
                                                        qualityValue(8) == 100
                                                            ? 'rgb(255, 106, 0)'
                                                            : qualityValue(8) >=
                                                                  90 &&
                                                              qualityValue(8) <
                                                                  100
                                                            ? 'rgb(138, 43, 226)'
                                                            : qualityValue(8) >=
                                                                  70 &&
                                                              qualityValue(8) <
                                                                  90
                                                            ? 'rgb(81, 162, 254)'
                                                            : qualityValue(8) >=
                                                                  30 &&
                                                              qualityValue(8) <
                                                                  70
                                                            ? 'rgb(36, 157, 46)'
                                                            : qualityValue(8) >=
                                                                  10 &&
                                                              qualityValue(8) <
                                                                  30
                                                            ? 'rgb(214, 214, 0)'
                                                            : 'rgb(216, 38, 38)',
                                                    color: 'white',
                                                    fontWeight: '600',
                                                    fontSize: '12px',
                                                    textAlign: 'center',
                                                }}
                                            >
                                                {alignedData[8].Tooltip.substring(
                                                    alignedData[8].Tooltip.indexOf(
                                                        'qualityValue'
                                                    )
                                                )
                                                    .slice(14, 18)
                                                    .replace(',', '')}
                                            </div>
                                        </div>
                                        <div className="nametag">
                                            <div className="equip-name">
                                                {alignedData[8].Name}
                                            </div>
                                            <div className="stat-info">
                                                <span className="accstat">
                                                    {accfirststat(8)}
                                                </span>{' '}
                                                <span className="accstat">
                                                    {accsecondstat(8)}
                                                </span>
                                            </div>
                                            <div className="engraving-info">
                                                {accengravingeffect(8)}
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div
                                        style={{
                                            width: '4.8rem',
                                            height: '56px',
                                            borderRadius: '8px',
                                            backgroundColor: '#cccfe0',
                                        }}
                                    />
                                )}
                            </p>
                            <p>
                                {alignedData[9] &&
                                alignedData[9].Type == '반지' &&
                                alignedData[9].Name !== '' ? (
                                    <>
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
                                                src={alignedData[9].Icon}
                                                value={alignedData[9].Grade}
                                                style={{
                                                    backgroundImage:
                                                        alignedData[9].Grade ===
                                                        '유물'
                                                            ? 'linear-gradient(135deg, #341a09, #a24006)'
                                                            : 'linear-gradient(135deg, #3d3325, #dcc999)',
                                                }}
                                            />
                                            <div
                                                className="qualityValue"
                                                style={{
                                                    // width: '48px',
                                                    backgroundColor:
                                                        qualityValue(9) == 100
                                                            ? 'rgb(255, 106, 0)'
                                                            : qualityValue(9) >=
                                                                  90 &&
                                                              qualityValue(9) <
                                                                  100
                                                            ? 'rgb(138, 43, 226)'
                                                            : qualityValue(9) >=
                                                                  70 &&
                                                              qualityValue(9) <
                                                                  90
                                                            ? 'rgb(81, 162, 254)'
                                                            : qualityValue(9) >=
                                                                  30 &&
                                                              qualityValue(9) <
                                                                  70
                                                            ? 'rgb(36, 157, 46)'
                                                            : qualityValue(9) >=
                                                                  10 &&
                                                              qualityValue(9) <
                                                                  30
                                                            ? 'rgb(214, 214, 0)'
                                                            : 'rgb(216, 38, 38)',
                                                    color: 'white',
                                                    fontWeight: '600',
                                                    fontSize: '12px',
                                                    textAlign: 'center',
                                                }}
                                            >
                                                {alignedData[9].Tooltip.substring(
                                                    alignedData[9].Tooltip.indexOf(
                                                        'qualityValue'
                                                    )
                                                )
                                                    .slice(14, 18)
                                                    .replace(',', '')}
                                            </div>
                                        </div>
                                        <div className="nametag">
                                            <div className="equip-name">
                                                {alignedData[9].Name}
                                            </div>
                                            <div className="stat-info">
                                                <span className="accstat">
                                                    {accfirststat(9)}
                                                </span>{' '}
                                                <span className="accstat">
                                                    {accsecondstat(9)}
                                                </span>
                                            </div>
                                            <div className="engraving-info">
                                                {accengravingeffect(9)}
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div
                                        style={{
                                            width: '4.8rem',
                                            height: '56px',
                                            borderRadius: '8px',
                                            backgroundColor: '#cccfe0',
                                        }}
                                    />
                                )}
                            </p>
                            <p>
                                {alignedData[10] &&
                                alignedData[10].Type == '반지' &&
                                alignedData[10].Name !== '' ? (
                                    <>
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
                                                src={alignedData[10].Icon}
                                                value={alignedData[10].Grade}
                                                style={{
                                                    backgroundImage:
                                                        alignedData[10]
                                                            .Grade === '유물'
                                                            ? 'linear-gradient(135deg, #341a09, #a24006)'
                                                            : 'linear-gradient(135deg, #3d3325, #dcc999)',
                                                }}
                                            />
                                            <div
                                                className="qualityValue"
                                                style={{
                                                    // width: '48px',
                                                    backgroundColor:
                                                        qualityValue(10) == 100
                                                            ? 'rgb(255, 106, 0)'
                                                            : qualityValue(
                                                                  10
                                                              ) >= 90 &&
                                                              qualityValue(10) <
                                                                  100
                                                            ? 'rgb(138, 43, 226)'
                                                            : qualityValue(
                                                                  10
                                                              ) >= 70 &&
                                                              qualityValue(10) <
                                                                  90
                                                            ? 'rgb(81, 162, 254)'
                                                            : qualityValue(
                                                                  10
                                                              ) >= 30 &&
                                                              qualityValue(10) <
                                                                  70
                                                            ? 'rgb(36, 157, 46)'
                                                            : qualityValue(
                                                                  10
                                                              ) >= 10 &&
                                                              qualityValue(10) <
                                                                  30
                                                            ? 'rgb(214, 214, 0)'
                                                            : 'rgb(216, 38, 38)',
                                                    color: 'white',
                                                    fontWeight: '600',
                                                    fontSize: '12px',
                                                    textAlign: 'center',
                                                }}
                                            >
                                                {alignedData[10].Tooltip.substring(
                                                    alignedData[10].Tooltip.indexOf(
                                                        'qualityValue'
                                                    )
                                                )
                                                    .slice(14, 18)
                                                    .replace(',', '')}
                                            </div>
                                        </div>
                                        <div className="nametag">
                                            <div className="equip-name">
                                                {alignedData[10].Name}
                                            </div>
                                            <div className="stat-info">
                                                <span className="accstat">
                                                    {accfirststat(10)}
                                                </span>{' '}
                                                <span className="accstat">
                                                    {accsecondstat(10)}
                                                </span>
                                            </div>
                                            <div className="engraving-info">
                                                {accengravingeffect(10)}
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div
                                        style={{
                                            width: '4.8rem',
                                            height: '56px',
                                            borderRadius: '8px',
                                            backgroundColor: '#cccfe0',
                                        }}
                                    />
                                )}
                            </p>
                            <p>
                                {alignedData[11] &&
                                alignedData[11].Type == '어빌리티 스톤' &&
                                alignedData[11].Name !== '' ? (
                                    <>
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
                                                src={alignedData[11].Icon}
                                                value={alignedData[11].Grade}
                                                style={{
                                                    backgroundImage:
                                                        alignedData[11]
                                                            .Grade === '유물'
                                                            ? 'linear-gradient(135deg, #341a09, #a24006)'
                                                            : 'linear-gradient(135deg, #3d3325, #dcc999)',
                                                    borderBottomLeftRadius:
                                                        alignedData[11]
                                                            .Grade === '고대'
                                                            ? '0px'
                                                            : '8px',
                                                    borderBottomRightRadius:
                                                        alignedData[11]
                                                            .Grade === '고대'
                                                            ? '0px'
                                                            : '8px',
                                                }}
                                            />
                                            <div
                                                className="qualityValue"
                                                style={{
                                                    // width: '48px',
                                                    backgroundColor:
                                                        'rgb(255, 255, 0)',
                                                    fontWeight: '600',
                                                    fontSize: '12px',
                                                    textAlign: 'center',
                                                }}
                                            >
                                                {alignedData[11].Tooltip.replace(
                                                    /(<([^>]+)>)/g,
                                                    ''
                                                )
                                                    .replace(
                                                        /Element_[0-9]+/g,
                                                        ''
                                                    )
                                                    .replace(/\s/gi, '')
                                                    .replace(
                                                        /[\{\}\[\]\/?.,;:|\)*~`!^\-_>?@\#$&\\\=\(\'\"]/gi,
                                                        ''
                                                    )
                                                    .replace(/[^\w]/gi, '')
                                                    // .replace(/:[0-9]+/gi, '')
                                                    // .replace(/:/gi, '')
                                                    .substring(
                                                        alignedData[11].Tooltip.replace(
                                                            /(<([^>]+)>)/g,
                                                            ''
                                                        )
                                                            .replace(
                                                                /Element_[0-9]+/g,
                                                                ''
                                                            )
                                                            .replace(/\s/gi, '')
                                                            .replace(
                                                                /[\{\}\[\]\/?.,;:|\)*~`!^\-_>?@\#$&\\\=\(\'\"]/gi,
                                                                ''
                                                            )
                                                            .indexOf('value')
                                                    )
                                                    .slice(0, 8)
                                                    .replace(/[a-z]*/g, '') ==
                                                'I' ? (
                                                    <>LV. 1</>
                                                ) : alignedData[11].Tooltip.replace(
                                                      /(<([^>]+)>)/g,
                                                      ''
                                                  )
                                                      .replace(
                                                          /Element_[0-9]+/g,
                                                          ''
                                                      )
                                                      .replace(/\s/gi, '')
                                                      .replace(
                                                          /[\{\}\[\]\/?.,;:|\)*~`!^\-_>?@\#$&\\\=\(\'\"]/gi,
                                                          ''
                                                      )
                                                      .replace(/[^\w]/gi, '')
                                                      .substring(
                                                          alignedData[11].Tooltip.replace(
                                                              /(<([^>]+)>)/g,
                                                              ''
                                                          )
                                                              .replace(
                                                                  /Element_[0-9]+/g,
                                                                  ''
                                                              )
                                                              .replace(
                                                                  /\s/gi,
                                                                  ''
                                                              )
                                                              .replace(
                                                                  /[\{\}\[\]\/?.,;:|\)*~`!^\-_>?@\#$&\\\=\(\'\"]/gi,
                                                                  ''
                                                              )
                                                              .indexOf('value')
                                                      )
                                                      .slice(0, 8)
                                                      .replace(/[a-z]*/g, '') ==
                                                  'II' ? (
                                                    <>Lv. 2</>
                                                ) : alignedData[11].Tooltip.replace(
                                                      /(<([^>]+)>)/g,
                                                      ''
                                                  )
                                                      .replace(
                                                          /Element_[0-9]+/g,
                                                          ''
                                                      )
                                                      .replace(/\s/gi, '')
                                                      .replace(
                                                          /[\{\}\[\]\/?.,;:|\)*~`!^\-_>?@\#$&\\\=\(\'\"]/gi,
                                                          ''
                                                      )
                                                      .replace(/[^\w]/gi, '')
                                                      .substring(
                                                          alignedData[11].Tooltip.replace(
                                                              /(<([^>]+)>)/g,
                                                              ''
                                                          )
                                                              .replace(
                                                                  /Element_[0-9]+/g,
                                                                  ''
                                                              )
                                                              .replace(
                                                                  /\s/gi,
                                                                  ''
                                                              )
                                                              .replace(
                                                                  /[\{\}\[\]\/?.,;:|\)*~`!^\-_>?@\#$&\\\=\(\'\"]/gi,
                                                                  ''
                                                              )
                                                              .indexOf('value')
                                                      )
                                                      .slice(0, 8)
                                                      .replace(/[a-z]*/g, '') ==
                                                  'III' ? (
                                                    <>Lv. 3</>
                                                ) : alignedData[11].Tooltip.replace(
                                                      /(<([^>]+)>)/g,
                                                      ''
                                                  )
                                                      .replace(
                                                          /Element_[0-9]+/g,
                                                          ''
                                                      )
                                                      .replace(/\s/gi, '')
                                                      .replace(
                                                          /[\{\}\[\]\/?.,;:|\)*~`!^\-_>?@\#$&\\\=\(\'\"]/gi,
                                                          ''
                                                      )
                                                      .replace(/[^\w]/gi, '')
                                                      // .replace(/:[0-9]+/gi, '')
                                                      // .replace(/:/gi, '')
                                                      .substring(
                                                          alignedData[11].Tooltip.replace(
                                                              /(<([^>]+)>)/g,
                                                              ''
                                                          )
                                                              .replace(
                                                                  /Element_[0-9]+/g,
                                                                  ''
                                                              )
                                                              .replace(
                                                                  /\s/gi,
                                                                  ''
                                                              )
                                                              .replace(
                                                                  /[\{\}\[\]\/?.,;:|\)*~`!^\-_>?@\#$&\\\=\(\'\"]/gi,
                                                                  ''
                                                              )
                                                              .indexOf('value')
                                                      )
                                                      .slice(0, 8)
                                                      .replace(/[a-z]*/g, '') ==
                                                  'IV' ? (
                                                    <>Lv. 4</>
                                                ) : (
                                                    ''
                                                )}
                                            </div>
                                        </div>
                                        <div className="nametag">
                                            <div className="equip-name">
                                                {alignedData[11].Name}
                                            </div>
                                            <div className="stone-info">
                                                {stonestat(11)}
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div
                                        style={{
                                            width: '4.8rem',
                                            height: '56px',
                                            borderRadius: '8px',
                                            backgroundColor: '#cccfe0',
                                        }}
                                    />
                                )}
                            </p>
                        </div>
                        <div className="bracelet-inner">
                            <p>
                                {alignedData[12] &&
                                alignedData[12].Type == '팔찌' &&
                                alignedData[12].Name !== '' ? (
                                    <>
                                        <div
                                            className="img-quality"
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                            }}
                                        >
                                            <img
                                                src={alignedData[12].Icon}
                                                value={alignedData[12].Grade}
                                                style={{
                                                    backgroundImage:
                                                        alignedData[12]
                                                            .Grade === '유물'
                                                            ? 'linear-gradient(135deg, #341a09, #a24006)'
                                                            : 'linear-gradient(135deg, #3d3325, #dcc999)',
                                                    width: '40px',
                                                    height: '40px',
                                                }}
                                            />
                                            <div className="nametag">
                                                <div className="braceletstat">
                                                    {braceletstat(12)}
                                                </div>
                                                {braceleteffectstat(12)}
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    ''
                                )}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section
                // style={{
                //     marginTop: '10px',
                //     width: '70%',
                //     marginLeft: '30%',
                //     display: 'flex',
                //     flex: 'row',
                //     gap: '5px',
                //     padding: '10px 0px',
                //     background: '#fff',
                //     boxShadow: '0 0 15px 2px rgba(0, 0, 0,0.2)',
                //     borderRadius: '8px',
                //     flexWrap: 'wrap',
                //     justifyContent: 'flex-start',
                // }}
                className="gem-set"
            >
                {gemData ? (
                    sortedGemData.map((item, index) => (
                        <div className="gem" key={index}>
                            <div className="gem-inner">
                                <div className="gem-info">
                                    <img
                                        src={item.Icon}
                                        style={{
                                            // width: '37px',
                                            // height: '37px',
                                            backgroundImage:
                                                item.Grade === '유물'
                                                    ? 'linear-gradient(135deg, #341a09, #a24006)'
                                                    : item.Grade === '고대'
                                                    ? 'linear-gradient(135deg, #3d3325, #dcc999)'
                                                    : 'linear-gradient(#3c2201,#a86200)',
                                            borderRadius: '5px',
                                        }}
                                        className="gem-img"
                                    />
                                    <div className="gem-text">
                                        <div
                                            style={{
                                                fontWeight: '600',
                                                fontSize: '11px',
                                            }}
                                        >
                                            {gemTooltip(index)}
                                        </div>
                                        <div>{gemLevel(index)}</div>
                                    </div>
                                </div>
                                <div className="gem-name">
                                    {item.Name.replace(/(<([^>]+)>)/g, '')
                                        .replace(/의.*$/g, '')
                                        .replace(/레벨/g, '')}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <>
                        <div className="gem">
                            <div className="gem-inner">
                                <div className="no-gem">
                                    장착된 보석이 없습니다.
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </section>
            <section
                // style={{
                //     marginTop: '10px',
                //     position: 'relative',
                //     width: '70%',
                //     marginLeft: '30%',
                //     display: 'grid',
                //     gap: '3px',
                //     padding: '10px 0px',
                //     background: '#fff',
                //     boxShadow: '0 0 15px 2px rgba(0, 0, 0,0.2)',
                //     borderRadius: '8px',
                //     gridTemplateColumns: 'repeat(6,minmax(0,1fr))',
                // }}
                className="card-set"
            >
                <div
                    className="card-setname"
                    onClick={() => handleAccordionClick(0)}
                >
                    {cardEffectsData.length - 1 == 0 ? (
                        <div>
                            {cardEffectsData[0].Items[
                                cardEffectsData[0].Items.length - 1
                            ].Name.match(/(.*?\d+세트)\s*\((\d+각)/)
                                ? cardEffectsData[0].Items[
                                      cardEffectsData[0].Items.length - 1
                                  ].Name.match(
                                      /^(.+?)\s\d+세트\s\(\d+각성합계\)$/
                                  )[1] +
                                  ' ' +
                                  cardEffectsData[0].Items[
                                      cardEffectsData[0].Items.length - 1
                                  ].Name.match(/(.*?\d+세트)\s*\((\d+각)/)[2]
                                : cardEffectsData[0].Items[
                                      cardEffectsData[0].Items.length - 1
                                  ].Name.match(/(.*?\d+세트)/)[1]}
                        </div>
                    ) : cardEffectsData.length - 1 == 1 ? (
                        <div>
                            {cardEffectsData[1].Items[
                                cardEffectsData[1].Items.length - 1
                            ].Name.match(/(.*?\d+세트)\s*\((\d+각)/)
                                ? cardEffectsData[1].Items[
                                      cardEffectsData[1].Items.length - 1
                                  ].Name.match(
                                      /^(.+?)\s\d+세트\s\(\d+각성합계\)$/
                                  )[1] +
                                  ' ' +
                                  cardEffectsData[1].Items[
                                      cardEffectsData[1].Items.length - 1
                                  ].Name.match(/(.*?\d+세트)\s*\((\d+각)/)[2]
                                : cardEffectsData[1].Items[
                                      cardEffectsData[1].Items.length - 1
                                  ].Name.match(/(.*?\d+세트)/)[1]}
                            {'  '}
                            {cardEffectsData[0].Items[
                                cardEffectsData[0].Items.length - 1
                            ].Name.match(/(.*?\d+세트)\s*\((\d+각)/)
                                ? cardEffectsData[0].Items[
                                      cardEffectsData[0].Items.length - 1
                                  ].Name.match(
                                      /^(.+?)\s\d+세트\s\(\d+각성합계\)$/
                                  )[1] +
                                  ' ' +
                                  cardEffectsData[0].Items[
                                      cardEffectsData[0].Items.length - 1
                                  ].Name.match(/(.*?\d+세트)\s*\((\d+각)/)[2]
                                : cardEffectsData[0].Items[
                                      cardEffectsData[0].Items.length - 1
                                  ].Name.match(/(.*?\d+세트)/)[1]}
                        </div>
                    ) : (
                        ''
                    )}
                    <img
                        src={arrowup}
                        alt="arrow icon"
                        style={{
                            transition: 'transform 0.3s ease-in-out',
                            transform: `rotate(${
                                openIndex !== null ? 180 : 0
                            }deg)`,
                        }}
                        onClick={() => handleAccordionClick(0)}
                        className="arrow"
                    />
                </div>
                {cardData
                    ? cardData.map((item, index) => (
                          <div
                              style={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  marginTop: '10px',
                              }}
                              key={index}
                              onClick={() => handleAccordionClick(index)}
                              className="card"
                          >
                              <div className="card-inner">
                                  <div className="card-img">
                                      <img
                                          src={item.Icon}
                                          //   style={{
                                          //       width: '70px',
                                          //       height: '100px',
                                          //   }}
                                      />
                                      <img
                                          src={cardborders[item.Grade]}
                                          alt={`${item.Grade} border`}
                                          className="cardborders"
                                      />
                                  </div>
                                  <div className="card-name">{item.Name}</div>
                              </div>
                          </div>
                      ))
                    : ''}
                {openIndex !== null && (
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px',
                            marginTop: '20px',
                            marginLeft: '10px',
                        }}
                        className="card-setinfo"
                    >
                        {cardEffectsData.length - 1 == 0 ? (
                            cardEffectsData[0].Items.map((item, index) => (
                                <div
                                    onClick={() => handleAccordionClick(index)}
                                    key={index}
                                    className="card-setinfo-inner"
                                >
                                    {item.Name.includes('각성합계') ? (
                                        <div className="card-setinfo-name">
                                            {item.Name.match(/(\d+각성)/)[0]}
                                        </div>
                                    ) : (
                                        <div
                                            style={{ marginRight: '5px' }}
                                            className="card-setinfo-name"
                                        >
                                            {item.Name.match(/(\d+세트)/)[0]}
                                        </div>
                                    )}

                                    <div
                                        style={{ width: '500px' }}
                                        className="card-setinfo-des"
                                    >
                                        {item.Description}
                                    </div>
                                </div>
                            ))
                        ) : cardEffectsData.length - 1 == 1 ? (
                            <>
                                {cardEffectsData[0].Items.map((item, index) => (
                                    <div
                                        onClick={() =>
                                            handleAccordionClick(index)
                                        }
                                        key={index}
                                        className="card-setinfo-inner"
                                    >
                                        <div>
                                            {item.Name.includes('각성합계') ? (
                                                <div className="card-setinfo-name">
                                                    {
                                                        item.Name.match(
                                                            /^(.+?)\s\d+세트\s\(\d+각성합계\)$/
                                                        )[1]
                                                    }{' '}
                                                    {
                                                        item.Name.match(
                                                            /(\d+각성)/
                                                        )[0]
                                                    }
                                                </div>
                                            ) : (
                                                <div
                                                    style={{
                                                        marginRight: '5px',
                                                    }}
                                                    className="card-setinfo-name"
                                                >
                                                    {
                                                        item.Name.match(
                                                            /^(.+?)\s\d+세트$/
                                                        )[1]
                                                    }{' '}
                                                    {
                                                        item.Name.match(
                                                            /(\d+세트)/
                                                        )[0]
                                                    }
                                                </div>
                                            )}
                                        </div>
                                        <div
                                            style={{ width: '500px' }}
                                            className="card-setinfo-des"
                                        >
                                            {item.Description}
                                        </div>
                                    </div>
                                ))}
                                {cardEffectsData[1].Items.map((item, index) => (
                                    <div
                                        onClick={() =>
                                            handleAccordionClick(index)
                                        }
                                        key={index}
                                        className="card-setinfo-inner"
                                    >
                                        <div>
                                            {item.Name.includes('각성합계') ? (
                                                <div className="card-setinfo-name">
                                                    {
                                                        item.Name.match(
                                                            /^(.+?)\s\d+세트\s\(\d+각성합계\)$/
                                                        )[1]
                                                    }{' '}
                                                    {
                                                        item.Name.match(
                                                            /(\d+각성)/
                                                        )[0]
                                                    }
                                                </div>
                                            ) : (
                                                <div className="card-setinfo-name">
                                                    {
                                                        item.Name.match(
                                                            /^(.+?)\s\d+세트$/
                                                        )[1]
                                                    }{' '}
                                                    {
                                                        item.Name.match(
                                                            /(\d+세트)/
                                                        )[0]
                                                    }
                                                </div>
                                            )}
                                        </div>
                                        <div
                                            style={{ width: '500px' }}
                                            className="card-setinfo-des"
                                        >
                                            {item.Description}
                                        </div>
                                    </div>
                                ))}
                            </>
                        ) : (
                            ''
                        )}
                    </div>
                )}
            </section>
            <section
                style={
                    {
                        // border: '1px solid green',
                        // marginTop: '10px',
                        // width: '70%',
                        // marginLeft: '30%',
                        // display: 'flex',
                        // flexDirection: 'column',
                        // gap: '3px',
                        // padding: '10px 0px',
                        // background: '#fff',
                        // boxShadow: '0 0 15px 2px rgba(0, 0, 0,0.2)',
                        // borderRadius: '8px',
                        // gridTemplateColumns: 'repeat(6,minmax(0,1fr))',
                    }
                }
                className="skill-set"
            >
                <div onClick={() => handleSkillClick(0)} className="skill-main">
                    <div className="skill-main-set">
                        <div className="skill-main-set-title">
                            <span className="skill-main-set-title-name">
                                스킬트리
                            </span>
                            <span className="skill-main-set-title-point">
                                {profileData.UsingSkillPoint}/
                                {profileData.TotalSkillPoint}
                            </span>
                        </div>
                        <img
                            src={arrowup}
                            alt="arrow icon"
                            style={{
                                transition: 'transform 0.3s ease-in-out',
                                transform: `rotate(${
                                    openSkill !== null ? 180 : 0
                                }deg)`,
                            }}
                            onClick={() => handleSkillClick(0)}
                        />
                    </div>
                    {openSkill == null && (
                        <div className="skill-main-inner">
                            {sortedgemskill.map((item, index) => (
                                <div
                                    key={index}
                                    className="mainskill"
                                    onClick={() => handleSkillClick(index)}
                                >
                                    <div className="mainskill-info">
                                        <img
                                            // style={{ width: '20px', height: '20px' }}
                                            src={item.Icon}
                                            className="mainskill-info-img"
                                        />
                                        <span className="mainskill-info-name">
                                            {item.Name} Lv.{item.Level}
                                        </span>
                                        {item.Rune !== null ? (
                                            <>
                                                <img
                                                    className="mainskill-info-rune"
                                                    src={item.Rune?.Icon}
                                                    style={{
                                                        background:
                                                            item.Rune?.Grade ==
                                                            '전설'
                                                                ? 'linear-gradient(#362003,#9e5f04)'
                                                                : item.Rune
                                                                      ?.Grade ==
                                                                  '영웅'
                                                                ? 'linear-gradient(#261331,#480d5d)'
                                                                : 'linear-gradient(135deg, #341a09, #a24006)',
                                                    }}
                                                />
                                            </>
                                        ) : (
                                            ''
                                        )}
                                    </div>
                                    <div className="mainskill-tripod">
                                        {item.Tripods.map((item) => (
                                            <>
                                                {item.IsSelected == true ? (
                                                    <div className="mainskill-tripod-inner">
                                                        <div className="mainskill-tripod-inner-level">
                                                            {item.Level}
                                                        </div>
                                                        <div className="mainskill-tripod-inner-name">
                                                            {item.Name}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    ''
                                                )}
                                            </>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                {openSkill !== null &&
                    sortedgemskill.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => handleSkillClick(index)}
                            className="skill-sub"
                        >
                            <div className="skill-sub-info">
                                <img
                                    src={item.Icon}
                                    className="skill-sub-info-img"
                                />
                                <div className="skill-sub-info-text">
                                    <div className="skill-sub-info-text-level">
                                        <span>Lv.</span>
                                        {item.Level}
                                    </div>
                                    <div className="skill-sub-info-text-name">
                                        {item.Name}
                                    </div>
                                </div>
                                <div className="skill-sub-info-detail">
                                    {skillDetail(index)}
                                </div>
                            </div>
                            <div className="skill-sub-tripods">
                                {item.Tripods.map((item) => (
                                    <>
                                        {item.IsSelected == true ? (
                                            <div className="skill-sub-tripods-inner">
                                                <img
                                                    src={item.Icon}
                                                    className="skill-sub-tripods-inner-img"
                                                />
                                                <span className="skill-sub-tripods-inner-info">
                                                    <div className="skill-sub-tripods-inner-info-level">
                                                        <span>Lv.</span>
                                                        {item.Level}
                                                    </div>
                                                    <div className="skill-sub-tripods-inner-info-name">
                                                        {item.Name}
                                                    </div>
                                                </span>
                                            </div>
                                        ) : (
                                            ''
                                        )}
                                    </>
                                ))}
                            </div>
                            <div className="skill-sub-subinfo">
                                <div className="skill-sub-subinfo-gem">
                                    {item.AttackGemIcon && item.CoolGemIcon ? (
                                        <>
                                            <img
                                                style={{
                                                    backgroundImage:
                                                        item.Grade === '유물'
                                                            ? 'linear-gradient(135deg, #341a09, #a24006)'
                                                            : item.Grade ===
                                                              '고대'
                                                            ? 'linear-gradient(135deg, #3d3325, #dcc999)'
                                                            : 'linear-gradient(#3c2201,#a86200)',
                                                }}
                                                src={item.AttackGemIcon}
                                            />
                                            <img
                                                style={{
                                                    backgroundImage:
                                                        item.Grade === '유물'
                                                            ? 'linear-gradient(135deg, #341a09, #a24006)'
                                                            : item.Grade ===
                                                              '고대'
                                                            ? 'linear-gradient(135deg, #3d3325, #dcc999)'
                                                            : 'linear-gradient(#3c2201,#a86200)',
                                                }}
                                                src={item.CoolGemIcon}
                                            />
                                        </>
                                    ) : item.AttackGemIcon &&
                                      !item.CoolGemIcon ? (
                                        <>
                                            <img
                                                style={{
                                                    backgroundImage:
                                                        item.Grade === '유물'
                                                            ? 'linear-gradient(135deg, #341a09, #a24006)'
                                                            : item.Grade ===
                                                              '고대'
                                                            ? 'linear-gradient(135deg, #3d3325, #dcc999)'
                                                            : 'linear-gradient(#3c2201,#a86200)',
                                                }}
                                                src={item.AttackGemIcon}
                                            />
                                            <div className="empty"></div>
                                        </>
                                    ) : !item.AttackGemIcon &&
                                      item.CoolGemIcon ? (
                                        <>
                                            <div className="empty"></div>
                                            <img
                                                style={{
                                                    backgroundImage:
                                                        item.Grade === '유물'
                                                            ? 'linear-gradient(135deg, #341a09, #a24006)'
                                                            : item.Grade ===
                                                              '고대'
                                                            ? 'linear-gradient(135deg, #3d3325, #dcc999)'
                                                            : 'linear-gradient(#3c2201,#a86200)',
                                                }}
                                                src={item.CoolGemIcon}
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <div className="empty"></div>
                                            <div className="empty"></div>
                                        </>
                                    )}
                                </div>
                                <div className="skill-sub-subinfo-rune">
                                    {item.Rune !== null ? (
                                        <>
                                            <img
                                                style={{
                                                    background:
                                                        item.Rune?.Grade ==
                                                        '전설'
                                                            ? 'linear-gradient(#362003,#9e5f04)'
                                                            : item.Rune
                                                                  ?.Grade ==
                                                              '영웅'
                                                            ? 'linear-gradient(#261331,#480d5d)'
                                                            : 'linear-gradient(135deg, #341a09, #a24006)',
                                                }}
                                                src={item.Rune.Icon}
                                                className="skill-sub-subinfo-rune-img"
                                            />
                                            <div className="skill-sub-subinfo-rune-name">
                                                {item.Rune?.Name}
                                            </div>
                                        </>
                                    ) : (
                                        <div className="empty"></div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
            </section>
        </article>
    )
}

export default Profile
