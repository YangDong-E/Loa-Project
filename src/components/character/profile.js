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

    function accfirststat(idx) {
        return equipData[idx].Tooltip.includes('추가 효과') ? (
            <>
                {
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
                                .indexOf('추가효과')
                        )
                        .slice(4, 10)
                    // .replace(/[^0-9]/gi, '')}
                }
            </>
        ) : (
            ''
        )
    }
    function accsecondstat(idx) {
        return equipData[idx].Tooltip.includes('추가 효과') ? (
            <>
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
                            .indexOf('추가효과')
                    )
                    .slice(10, 16)
                    .replace(/[^0-9]/gi, '') == 0
                    ? ''
                    : equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
                                  .indexOf('추가효과')
                          )
                          .slice(10, 16)}
            </>
        ) : (
            ''
        )
    }

    function accengravingeffect(idx) {
        return equipData[idx].Tooltip ? (
            <>
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
                            .indexOf('추가효과')
                    )
                    .slice(10, 16)
                    .replace(/[^0-9]/gi, '') == 0
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
                                  .indexOf('추가효과')
                          )
                          .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/gi, '')
                          .slice(6)
                          .split('활성도', 1)
                    : equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
                                  .indexOf('추가효과')
                          )
                          .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/gi, '')
                          .slice(8)
                          .split('활성도', 1)}
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
                            .indexOf('활성도')
                    )
                    .replace(/[활성도]/gi, '')
                    .slice(0, 2)}
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
                            .indexOf('추가효과')
                    )
                    .slice(10, 16)
                    .replace(/[^0-9]/gi, '') == 0
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
                                  .indexOf('추가효과')
                          )
                          .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/gi, '')
                          .split('활성도', 2)
                          .pop()
                    : equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
                                  .indexOf('추가효과')
                          )
                          .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/gi, '')
                          .split('활성도', 2)
                          .pop()}
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
                            .indexOf('활성도')
                    )
                    .split('활성도', 3)
                    .pop()
                    .toString()
                    .replace(/[활성도]/gi, '')
                    .slice(0, 2)}
            </>
        ) : (
            ''
        )
    }

    function stonestat(idx) {
        return equipData[idx].Tooltip ? (
            <>
                {equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                    .replace(/Element_[0-9]+/g, '')
                    .replace(
                        /[\{\}\[\]\/?.,;:|\)*~`!^\-_>?@\#$&\\\=\(\'\"]/gi,
                        ''
                    )
                    .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\0-9]/gi, '')
                    .replace(/\s/gi, '')
                    .slice(0, 8)
                    .replace(/[0-9]/gi, '')}
                {equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                    .replace(/Element_[0-9]+/g, '')
                    .replace(/\s/gi, '')
                    .replace(
                        /[\{\}\[\]\/?.,;|\)*~`!^\-_>?@\#$&\\\=\(\'\"]/gi,
                        ''
                    )
                    .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\0-9]/gi, '')
                    .replace(/:[0-9]+/gi, '')
                    .replace(/:/gi, '')
                    .substring(
                        equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                            .replace(/Element_[0-9]+/g, '')
                            .replace(/Element_[0-9]+/g, '')
                            .replace(/\s/gi, '')
                            .replace(
                                /[\{\}\[\]\/?.,;|\)*~`!^\-_>?@\#$&\\\=\(\'\"]/gi,
                                ''
                            )
                            .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\0-9]/gi, '')
                            .replace(/:[0-9]+/gi, '')
                            .replace(/:/gi, '')
                            .indexOf('보너스체력')
                    )
                    .replace(/보너스체력\+/gi, '')
                    .replace(/[0-9]+/, '')
                    .replace(/활성도/gi, '+')
                    .replace(/무작위각인효과.*$/gi, '')}
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

                        <div className="acc-inner">
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
                                            src={equipData[6].Icon}
                                            value={equipData[6].Grade}
                                            style={{
                                                backgroundImage:
                                                    equipData[6].Grade ===
                                                    '유물'
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
                                            {equipData[6].Tooltip.substring(
                                                equipData[6].Tooltip.indexOf(
                                                    'qualityValue'
                                                )
                                            )
                                                .slice(14, 18)
                                                .replace(',', '')}
                                        </div>
                                    </div>
                                    <div className="nametag">
                                        <div className="equip-name">
                                            {equipData[6].Name}
                                        </div>
                                        <div className="stat-info">
                                            <span>{accfirststat(6)}</span>{' '}
                                            <span>{accsecondstat(6)}</span>
                                        </div>
                                        <div className="engraving-info">
                                            {accengravingeffect(6)}
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
                                            src={equipData[7].Icon}
                                            value={equipData[7].Grade}
                                            style={{
                                                backgroundImage:
                                                    equipData[7].Grade ===
                                                    '유물'
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
                                            {equipData[7].Tooltip.substring(
                                                equipData[7].Tooltip.indexOf(
                                                    'qualityValue'
                                                )
                                            )
                                                .slice(14, 18)
                                                .replace(',', '')}
                                        </div>
                                    </div>
                                    <div className="nametag">
                                        <div className="equip-name">
                                            {equipData[7].Name}
                                        </div>
                                        <div className="stat-info">
                                            <span>{accfirststat(7)}</span>{' '}
                                            <span>{accsecondstat(7)}</span>
                                        </div>
                                        <div className="engraving-info">
                                            {accengravingeffect(7)}
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
                                            src={equipData[8].Icon}
                                            value={equipData[8].Grade}
                                            style={{
                                                backgroundImage:
                                                    equipData[8].Grade ===
                                                    '유물'
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
                                            {equipData[8].Tooltip.substring(
                                                equipData[8].Tooltip.indexOf(
                                                    'qualityValue'
                                                )
                                            )
                                                .slice(14, 18)
                                                .replace(',', '')}
                                        </div>
                                    </div>
                                    <div className="nametag">
                                        <div className="equip-name">
                                            {equipData[8].Name}
                                        </div>
                                        <div className="stat-info">
                                            <span>{accfirststat(8)}</span>{' '}
                                            <span>{accsecondstat(8)}</span>
                                        </div>
                                        <div className="engraving-info">
                                            {accengravingeffect(8)}
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
                                            src={equipData[9].Icon}
                                            value={equipData[9].Grade}
                                            style={{
                                                backgroundImage:
                                                    equipData[9].Grade ===
                                                    '유물'
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
                                            {equipData[9].Tooltip.substring(
                                                equipData[9].Tooltip.indexOf(
                                                    'qualityValue'
                                                )
                                            )
                                                .slice(14, 18)
                                                .replace(',', '')}
                                        </div>
                                    </div>
                                    <div className="nametag">
                                        <div className="equip-name">
                                            {equipData[9].Name}
                                        </div>
                                        <div className="stat-info">
                                            <span>{accfirststat(9)}</span>{' '}
                                            <span>{accsecondstat(9)}</span>
                                        </div>
                                        <div className="engraving-info">
                                            {accengravingeffect(9)}
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
                                            src={equipData[10].Icon}
                                            value={equipData[10].Grade}
                                            style={{
                                                backgroundImage:
                                                    equipData[10].Grade ===
                                                    '유물'
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
                                            {equipData[10].Tooltip.substring(
                                                equipData[10].Tooltip.indexOf(
                                                    'qualityValue'
                                                )
                                            )
                                                .slice(14, 18)
                                                .replace(',', '')}
                                        </div>
                                    </div>
                                    <div className="nametag">
                                        <div className="equip-name">
                                            {equipData[10].Name}
                                        </div>
                                        <div className="stat-info">
                                            <span>{accfirststat(10)}</span>{' '}
                                            <span>{accsecondstat(10)}</span>
                                        </div>
                                        <div className="engraving-info">
                                            {accengravingeffect(10)}
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
                                            src={equipData[11].Icon}
                                            value={equipData[11].Grade}
                                            style={{
                                                backgroundImage:
                                                    equipData[11].Grade ===
                                                    '유물'
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
                                            {equipData[11].Tooltip.substring(
                                                equipData[11].Tooltip.indexOf(
                                                    'qualityValue'
                                                )
                                            )
                                                .slice(14, 18)
                                                .replace(',', '')}
                                        </div>
                                    </div>
                                    <div>{stonestat(11)}</div>
                                    {/* <div className="nametag">
                                        <div className="equip-name">
                                            {equipData[11].Name}
                                        </div>
                                        <div className="stat-info">
                                            <span>{accfirststat(11)}</span>{' '}
                                            <span>{accsecondstat(11)}</span>
                                        </div>
                                        <div className="engraving-info">
                                            {accengravingeffect(11)}
                                        </div>
                                    </div> */}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </article>
    )
}

export default Profile
