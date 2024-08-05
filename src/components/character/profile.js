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

    function qualityValue(idx) {
        return equipData[idx].Tooltip.substring(
            equipData[idx].Tooltip.indexOf('qualityValue')
        )
            .slice(14, 18)
            .replace(',', '')
    }

    function equipLevel(idx) {
        return equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
            .replace(/Element_[0-9]+/g, '')
            .replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-_>?@\#$&\\\=\(\'\"]/gi, '')
            .replace('Element', '')
            .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\0-9]/gi, '')
            .replace(/\s/gi, '')
            .substring(
                equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
        return equipData[idx].Tooltip.includes('상급 재련') ? (
            <>
                +
                {equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                    .replace(/Element_[0-9]+/g, '')
                    .replace(
                        /[\{\}\[\]\/?.,;:|\)*~`!^\-_>?@\#$&\\\=\(\'\"]/gi,
                        ''
                    )
                    .replace('Element', '')
                    .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\0-9]/gi, '')
                    .replace(/\s/gi, '')
                    .substring(
                        equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
        return equipData[idx].Tooltip.includes('[초월]')
            ? equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                  .replace(/Element_[0-9]+/g, '')
                  .replace(
                      /[\{\}\[\]\/?.,;:|\)*~`!^\-_>?@\#$&\\\=\(\'\"]/gi,
                      ''
                  )
                  .replace('Element', '')
                  .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\0-9]/gi, '')
                  .replace(/\s/gi, '')
                  .substring(
                      equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
        return equipData[idx].Tooltip.includes('[초월]') ? (
            <>
                <img
                    src={transcend}
                    style={{ width: '13px', height: '13px' }}
                />
                <span className="transcend-count">
                    {equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                        .replace(/Element_[0-9]+/g, '')
                        .replace(
                            /[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                            ''
                        )
                        .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi, '')
                        .replace(/:[0-9]+/gi, ' ')
                        .substring(
                            equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
        return equipData[idx].Tooltip.includes('추가 효과') ? (
            <>
                {equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                    .replace(/Element_[0-9]+/g, '')
                    .replace(
                        /[\{\}\[\]\/?.,;:|\)*~`!^\-_>?@\#$&\\\=\(\'\"]/gi,
                        ''
                    )
                    .replace('Element', '')
                    .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\0-9]/gi, '')
                    .replace(/\s/gi, '')
                    .substring(
                        equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
        return equipData[idx].Tooltip.includes('추가 효과') ? (
            <>
                {equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                    .replace(/Element_[0-9]+/g, '')
                    .replace(
                        /[\{\}\[\]\/?.,;:|\)*~`!^\-_>?@\#$&\\\=\(\'\"]/gi,
                        ''
                    )
                    .replace('Element', '')
                    .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\0-9]/gi, '')
                    .replace(/\s/gi, '')
                    .substring(
                        equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
                    : equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                          .replace(/Element_[0-9]+/g, '')
                          .replace(
                              /[\{\}\[\]\/?.,;:|\)*~`!^\-_>?@\#$&\\\=\(\'\"]/gi,
                              ''
                          )
                          .replace('Element', '')
                          .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\0-9]/gi, '')
                          .replace(/\s/gi, '')
                          .substring(
                              equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
        return equipData[idx].Tooltip ? (
            <>
                <div className="effect-info-inner">
                    <span className="effect-info">
                        {
                            equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
                                    equipData[idx].Tooltip.replace(
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
                        {equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
                                equipData[idx].Tooltip.replace(
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
                            : equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
                                      equipData[idx].Tooltip.replace(
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
                        {equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
                                equipData[idx].Tooltip.replace(
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
                            : equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
                                      equipData[idx].Tooltip.replace(
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
        return equipData[idx].Grade == '영웅' ? (
            <>
                <div className="stone-inner">
                    <span>
                        {
                            equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
                                    equipData[idx].Tooltip.replace(
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
                        {
                            equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
                                    equipData[idx].Tooltip.replace(
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
                        {
                            equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
                                    equipData[idx].Tooltip.replace(
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
        ) : (
            <>
                <div className="stone-inner">
                    <span>
                        {equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
                                equipData[idx].Tooltip.replace(
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
                                    .indexOf('보너스체력')
                            )
                            .replace(/보너스체력\+/gi, '')
                            .replace(/활성도/gi, '+')
                            .replace(/[0-9]+/, '')
                            .replace(/무작위각인효과.*$/gi, '')
                            .split(' ')[1]
                            .toString()}
                    </span>{' '}
                    <span>
                        {equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
                                equipData[idx].Tooltip.replace(
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
                                    .indexOf('보너스체력')
                            )
                            .replace(/보너스체력\+/gi, '')
                            .replace(/활성도/gi, '+')
                            .replace(/[0-9]+/, '')
                            .replace(/무작위각인효과.*$/gi, '')
                            .split(' ')[3]
                            .toString()}
                    </span>{' '}
                    <span className="stone-info-reduction">
                        {equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
                                equipData[idx].Tooltip.replace(
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
                                    .indexOf('보너스체력')
                            )
                            .replace(/보너스체력\+/gi, '')
                            .replace(/활성도/gi, '+')
                            .replace(/[0-9]+/, '')
                            .replace(/무작위각인효과.*$/gi, '')
                            .split(' ')[5]
                            .toString()}
                    </span>
                </div>
            </>
        )
    }

    function elixirfirststat(idx) {
        return equipData[idx].Tooltip.includes('[초월]') &&
            equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                .replace(/Element_[0-9]+/g, '')
                .replace(/\s/gi, '')
                .replace(/[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi, '')
                .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi, '')
                .replace(/:[0-9]+/gi, ' ')
                .replace(/:/gi, '')
                .replace(/[0-9]/gi, '')
                .substring(
                    equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                        .replace(/Element_[0-9]+/g, '')
                        .replace(/\s/gi, '')
                        .replace(
                            /[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                            ''
                        )
                        .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi, '')
                        .replace(/:[0-9]+/gi, ' ')
                        .replace(/:/gi, '')
                        .replace(/[0-9]/gi, '')
                        .indexOf('초월단계')
                )
                .slice(0, 6)
                .replace(/초월단계/, '') == '투구' ? (
            <>
                <span>
                    {equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                        .replace(/Element_[0-9]+/g, '')
                        .replace(/\s/gi, '')
                        .replace(
                            /[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                            ''
                        )
                        .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi, '')
                        .replace(/:[0-9]+/gi, ' ')
                        .replace(/:/gi, '')
                        .substring(
                            equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
                                .replace(/:[0-9]+/gi, ' ')
                                .replace(/:/gi, '')
                                .indexOf('투구')
                        )
                        .replace(/투구/gi, '')
                        .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\(\)].*$/, '')}{' '}
                    Lv.
                    {equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                        .replace(/Element_[0-9]+/g, '')
                        .replace(/\s/gi, '')
                        .replace(
                            /[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                            ''
                        )
                        .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi, '')
                        .replace(/:[0-9]+/gi, ' ')
                        .replace(/:/gi, '')
                        .substring(
                            equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
                                .replace(/:[0-9]+/gi, ' ')
                                .replace(/:/gi, '')
                                .indexOf('투구')
                        )
                        .replace(/투구/gi, '')
                        .replace(/[^0-9]/g, '')
                        .charAt(0)}
                </span>
            </>
        ) : equipData[idx].Tooltip.includes('[초월]') &&
          equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
              .replace(/Element_[0-9]+/g, '')
              .replace(/\s/gi, '')
              .replace(/[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi, '')
              .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi, '')
              .replace(/:[0-9]+/gi, ' ')
              .replace(/:/gi, '')
              .replace(/[0-9]/gi, '')
              .substring(
                  equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                      .replace(/Element_[0-9]+/g, '')
                      .replace(/\s/gi, '')
                      .replace(/[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi, '')
                      .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi, '')
                      .replace(/:[0-9]+/gi, ' ')
                      .replace(/:/gi, '')
                      .replace(/[0-9]/gi, '')
                      .indexOf('초월단계')
              )
              .slice(0, 6)
              .replace(/초월단계/, '') == '상의' ? (
            <>
                <span>
                    {equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                        .replace(/Element_[0-9]+/g, '')
                        .replace(/\s/gi, '')
                        .replace(
                            /[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                            ''
                        )
                        .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi, '')
                        .replace(/:[0-9]+/gi, ' ')
                        .replace(/:/gi, '')
                        .substring(
                            equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
                                .replace(/:[0-9]+/gi, ' ')
                                .replace(/:/gi, '')
                                .indexOf('상의')
                        )
                        .replace(/상의/gi, '')
                        .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\(\)].*$/, '')}{' '}
                    Lv.
                    {equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                        .replace(/Element_[0-9]+/g, '')
                        .replace(/\s/gi, '')
                        .replace(
                            /[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                            ''
                        )
                        .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi, '')
                        .replace(/:[0-9]+/gi, ' ')
                        .replace(/:/gi, '')
                        .substring(
                            equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
                                .replace(/:[0-9]+/gi, ' ')
                                .replace(/:/gi, '')
                                .indexOf('상의')
                        )
                        .replace(/상의/gi, '')
                        .replace(/[^0-9]/g, '')
                        .charAt(0)}
                </span>
            </>
        ) : equipData[idx].Tooltip.includes('[초월]') &&
          equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
              .replace(/Element_[0-9]+/g, '')
              .replace(/\s/gi, '')
              .replace(/[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi, '')
              .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi, '')
              .replace(/:[0-9]+/gi, ' ')
              .replace(/:/gi, '')
              .replace(/[0-9]/gi, '')
              .substring(
                  equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                      .replace(/Element_[0-9]+/g, '')
                      .replace(/\s/gi, '')
                      .replace(/[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi, '')
                      .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi, '')
                      .replace(/:[0-9]+/gi, ' ')
                      .replace(/:/gi, '')
                      .replace(/[0-9]/gi, '')
                      .indexOf('초월단계')
              )
              .slice(0, 6)
              .replace(/초월단계/, '') == '하의' ? (
            <>
                <span>
                    {
                        equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                            .replace(/Element_[0-9]+/g, '')
                            .replace(/\s/gi, '')
                            .replace(
                                /[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                                ''
                            )
                            .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi, '')
                            .replace(/:[0-9]+/gi, ' ')
                            .replace(/:/gi, '')
                            .replace(/\s/gi, '')
                            .substring(
                                equipData[idx].Tooltip.replace(
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
                                    .replace(/:[0-9]+/gi, ' ')
                                    .replace(/:/gi, '')
                                    .replace(/\s/gi, '')
                                    .indexOf('초월')
                            )
                            .slice(5)
                            .replace(/[0-9]/g, ' ')
                            .split(' ')[2]
                            .replace(/하의/gi, '')
                        // .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\(\)].*$/, '')
                    }{' '}
                    Lv.
                    {equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                        .replace(/Element_[0-9]+/g, '')
                        .replace(/\s/gi, '')
                        .replace(
                            /[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                            ''
                        )
                        .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi, '')
                        .replace(/:[0-9]+/gi, ' ')
                        .replace(/:/gi, '')
                        .replace(/\s/gi, '')
                        .substring(
                            equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
                                .replace(/:[0-9]+/gi, ' ')
                                .replace(/:/gi, '')
                                .replace(/\s/gi, '')
                                .indexOf('초월')
                        )
                        .slice(5)
                        .replace(/[0-9]/, ' ')
                        .slice(3)
                        .match(/[0-9]/)}
                </span>
            </>
        ) : equipData[idx].Tooltip.includes('[초월]') &&
          equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
              .replace(/Element_[0-9]+/g, '')
              .replace(/\s/gi, '')
              .replace(/[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi, '')
              .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi, '')
              .replace(/:[0-9]+/gi, ' ')
              .replace(/:/gi, '')
              .replace(/[0-9]/gi, '')
              .substring(
                  equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                      .replace(/Element_[0-9]+/g, '')
                      .replace(/\s/gi, '')
                      .replace(/[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi, '')
                      .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi, '')
                      .replace(/:[0-9]+/gi, ' ')
                      .replace(/:/gi, '')
                      .replace(/[0-9]/gi, '')
                      .indexOf('초월단계')
              )
              .slice(0, 6)
              .replace(/초월단계/, '') == '어깨' ? (
            <>
                <span>
                    {equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                        .replace(/Element_[0-9]+/g, '')
                        .replace(/\s/gi, '')
                        .replace(
                            /[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                            ''
                        )
                        .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi, '')
                        .replace(/:[0-9]+/gi, ' ')

                        .substring(
                            equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
                                .replace(/:[0-9]+/gi, ' ')

                                .indexOf('초월')
                        )
                        .replace(/\s/gi, '')
                        .replace(/\:{4}/g, ' ')
                        .split(' ')[2]
                        .replace(/어깨/gi, '')
                        .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\(\)].*$/, '')}{' '}
                    Lv.
                    {equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                        .replace(/Element_[0-9]+/g, '')
                        .replace(/\s/gi, '')
                        .replace(
                            /[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                            ''
                        )
                        .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi, '')
                        .replace(/:[0-9]+/gi, ' ')
                        .replace(/:/gi, '')
                        .replace(/\s/gi, '')
                        .substring(
                            equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
                                .replace(/:[0-9]+/gi, ' ')
                                .replace(/:/gi, '')
                                .replace(/\s/gi, '')
                                .indexOf('초월')
                        )
                        .slice(5)
                        .replace(/[0-9]/, ' ')
                        .slice(3)
                        .match(/[0-9]/)}
                </span>
            </>
        ) : equipData[idx].Tooltip.includes('[초월]') &&
          equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
              .replace(/Element_[0-9]+/g, '')
              .replace(/\s/gi, '')
              .replace(/[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi, '')
              .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi, '')
              .replace(/:[0-9]+/gi, ' ')
              .replace(/:/gi, '')
              .replace(/[0-9]/gi, '')
              .substring(
                  equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                      .replace(/Element_[0-9]+/g, '')
                      .replace(/\s/gi, '')
                      .replace(/[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi, '')
                      .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi, '')
                      .replace(/:[0-9]+/gi, ' ')
                      .replace(/:/gi, '')
                      .replace(/[0-9]/gi, '')
                      .indexOf('초월단계')
              )
              .slice(0, 6)
              .replace(/초월단계/, '') == '장갑' ? (
            <>
                <span>
                    {equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                        .replace(/Element_[0-9]+/g, '')
                        .replace(/\s/gi, '')
                        .replace(
                            /[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                            ''
                        )
                        .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi, '')
                        .replace(/:[0-9]+/gi, ' ')
                        .replace(/:/gi, '')
                        .substring(
                            equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
                                .replace(/:[0-9]+/gi, ' ')
                                .replace(/:/gi, '')
                                .indexOf('장갑')
                        )
                        .replace(/장갑/gi, '')
                        .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\(\)].*$/, '')}{' '}
                    Lv.
                    {equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                        .replace(/Element_[0-9]+/g, '')
                        .replace(/\s/gi, '')
                        .replace(
                            /[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                            ''
                        )
                        .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi, '')
                        .replace(/:[0-9]+/gi, ' ')
                        .replace(/:/gi, '')
                        .substring(
                            equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
                                .replace(/:[0-9]+/gi, ' ')
                                .replace(/:/gi, '')
                                .indexOf('장갑')
                        )
                        .replace(/장갑/gi, '')
                        .replace(/[^0-9]/g, '')
                        .charAt(0)}
                </span>
            </>
        ) : equipData[idx].Tooltip.includes('[초월]') &&
          equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
              .replace(/Element_[0-9]+/g, '')
              .replace(/\s/gi, '')
              .replace(/[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi, '')
              .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi, '')
              .replace(/:[0-9]+/gi, ' ')
              .replace(/:/gi, '')
              .replace(/[0-9]/gi, '')
              .substring(
                  equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                      .replace(/Element_[0-9]+/g, '')
                      .replace(/\s/gi, '')
                      .replace(/[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi, '')
                      .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi, '')
                      .replace(/:[0-9]+/gi, ' ')
                      .replace(/:/gi, '')
                      .replace(/[0-9]/gi, '')
                      .indexOf('초월단계')
              )
              .slice(0, 6)
              .replace(/초월단계/, '') == '공용' ? (
            <>
                <span>
                    {equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                        .replace(/Element_[0-9]+/g, '')
                        .replace(/\s/gi, '')
                        .replace(
                            /[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                            ''
                        )
                        .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi, '')
                        .replace(/:[0-9]+/gi, ' ')
                        .replace(/:/gi, '')
                        .substring(
                            equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
                                .replace(/:[0-9]+/gi, ' ')
                                .replace(/:/gi, '')
                                .indexOf('공용')
                        )
                        .replace(/공용/gi, '')
                        .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\(\)].*$/, '')}{' '}
                    Lv.
                    {equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                        .replace(/Element_[0-9]+/g, '')
                        .replace(/\s/gi, '')
                        .replace(
                            /[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                            ''
                        )
                        .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi, '')
                        .replace(/:[0-9]+/gi, ' ')
                        .replace(/:/gi, '')
                        .substring(
                            equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
                                .replace(/:[0-9]+/gi, ' ')
                                .replace(/:/gi, '')
                                .indexOf('공용')
                        )
                        .replace(/공용/gi, '')
                        .replace(/[^0-9]/g, '')
                        .charAt(0)}
                </span>
            </>
        ) : (
            ''
        )
    }

    function elixirsecondstat(idx) {
        return equipData[idx].Tooltip.includes('[초월]') ? (
            <>
                <span>
                    {equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                        .replace(/Element_[0-9]+/g, '')
                        .replace(/\s/gi, '')
                        .replace(
                            /[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                            ''
                        )
                        .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi, '')
                        .replace(/:[0-9]+/gi, ' ')
                        // .replace(/:/gi, '')
                        .substring(
                            equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
                                .replace(/:[0-9]+/gi, ' ')
                                // .replace(/:/gi, '')
                                .indexOf('단계')
                        )
                        .substring(
                            equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
                                .replace(/:[0-9]+/gi, ' ')
                                // .replace(/:/gi, '')
                                .substring(
                                    equipData[idx].Tooltip.replace(
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
                                        .replace(/:[0-9]+/gi, ' ')
                                        // .replace(/:/gi, '')
                                        .indexOf('단계')
                                )
                                .indexOf('슬롯효과')
                        )
                        .replace(/\s/gi, '')
                        .replace(/\:{4}/g, '')
                        .split(':::')[1]
                        .slice(2)
                        .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\(\)].*$/, '')}{' '}
                    Lv.
                    {equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                        .replace(/Element_[0-9]+/g, '')
                        .replace(/\s/gi, '')
                        .replace(
                            /[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                            ''
                        )
                        .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi, '')
                        .replace(/:[0-9]+/gi, ' ')
                        // .replace(/:/gi, '')
                        .substring(
                            equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
                                .replace(/:[0-9]+/gi, ' ')
                                // .replace(/:/gi, '')
                                .indexOf('단계')
                        )
                        .substring(
                            equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
                                .replace(/:[0-9]+/gi, ' ')
                                // .replace(/:/gi, '')
                                .substring(
                                    equipData[idx].Tooltip.replace(
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
                                        .replace(/:[0-9]+/gi, ' ')
                                        // .replace(/:/gi, '')
                                        .indexOf('단계')
                                )
                                .indexOf('슬롯효과')
                        )
                        .replace(/\s/gi, '')
                        .replace(/\:{4}/g, '')
                        .split(':::')[1]
                        .slice(2)
                        .replace(/[^0-9]/g, '')
                        .charAt(0)}
                </span>
            </>
        ) : (
            ''
        )
    }

    function elixirNotransstat(idx) {
        return equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
            .replace(/Element_[0-9]+/g, '')
            .replace(/\s/gi, '')
            .replace(/[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi, '')
            .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi, '')
            .replace(/:[0-9]+/gi, ' ')
            .replace(/:/gi, '')
            .substring(
                equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                    .replace(/Element_[0-9]+/g, '')
                    .replace(/\s/gi, '')
                    .replace(/[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi, '')
                    .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi, '')
                    .replace(/:[0-9]+/gi, ' ')
                    .replace(/:/gi, '')
                    .indexOf('재련경험치')
            )
            .replace(/\s/gi, '')
            .replace(/재련경험치/gi, '')
            .slice(0, 2) == '공용' ? (
            <>
                <span>
                    {equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                        .replace(/Element_[0-9]+/g, '')
                        .replace(/\s/gi, '')
                        .replace(
                            /[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                            ''
                        )
                        .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi, '')
                        .replace(/:[0-9]+/gi, ' ')
                        .replace(/:/gi, '')
                        .substring(
                            equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
                                .replace(/:[0-9]+/gi, ' ')
                                .replace(/:/gi, '')
                                .indexOf('재련경험치')
                        )
                        .replace(/\s/gi, '')
                        .replace(/재련경험치/gi, '')
                        .replace(/공용/, '')
                        .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\(\)].*$/, '')}{' '}
                    Lv.
                    {equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                        .replace(/Element_[0-9]+/g, '')
                        .replace(/\s/gi, '')
                        .replace(
                            /[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                            ''
                        )
                        .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi, '')
                        .replace(/:[0-9]+/gi, ' ')
                        .replace(/:/gi, '')
                        .substring(
                            equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
                                .replace(/:[0-9]+/gi, ' ')
                                .replace(/:/gi, '')
                                .indexOf('재련경험치')
                        )

                        .replace(/재련경험치/gi, '')
                        .replace(/공용/, '')
                        .replace(/[^0-9]/g, '')
                        .charAt(0)}
                </span>
            </>
        ) : equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
              .replace(/Element_[0-9]+/g, '')
              .replace(/\s/gi, '')
              .replace(/[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi, '')
              .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi, '')
              .replace(/:[0-9]+/gi, ' ')
              .replace(/:/gi, '')
              .substring(
                  equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                      .replace(/Element_[0-9]+/g, '')
                      .replace(/\s/gi, '')
                      .replace(/[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi, '')
                      .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi, '')
                      .replace(/:[0-9]+/gi, ' ')
                      .replace(/:/gi, '')
                      .indexOf('재련경험치')
              )
              .replace(/\s/gi, '')
              .replace(/재련경험치/gi, '')
              .slice(0, 2) == '투구' ? (
            <>
                <span>
                    {equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                        .replace(/Element_[0-9]+/g, '')
                        .replace(/\s/gi, '')
                        .replace(
                            /[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                            ''
                        )
                        .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi, '')
                        .replace(/:[0-9]+/gi, ' ')
                        .replace(/:/gi, '')
                        .substring(
                            equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
                                .replace(/:[0-9]+/gi, ' ')
                                .replace(/:/gi, '')
                                .indexOf('재련경험치')
                        )
                        .replace(/\s/gi, '')
                        .replace(/재련경험치/gi, '')
                        .replace(/투구/, '')
                        .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\(\)].*$/, '')}{' '}
                    Lv.
                    {equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                        .replace(/Element_[0-9]+/g, '')
                        .replace(/\s/gi, '')
                        .replace(
                            /[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                            ''
                        )
                        .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi, '')
                        .replace(/:[0-9]+/gi, ' ')
                        .replace(/:/gi, '')
                        .substring(
                            equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
                                .replace(/:[0-9]+/gi, ' ')
                                .replace(/:/gi, '')
                                .indexOf('재련경험치')
                        )

                        .replace(/재련경험치/gi, '')
                        .replace(/투구/, '')
                        .replace(/[^0-9]/g, '')
                        .charAt(0)}
                </span>
            </>
        ) : equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
              .replace(/Element_[0-9]+/g, '')
              .replace(/\s/gi, '')
              .replace(/[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi, '')
              .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi, '')
              .replace(/:[0-9]+/gi, ' ')
              .replace(/:/gi, '')
              .substring(
                  equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                      .replace(/Element_[0-9]+/g, '')
                      .replace(/\s/gi, '')
                      .replace(/[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi, '')
                      .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi, '')
                      .replace(/:[0-9]+/gi, ' ')
                      .replace(/:/gi, '')
                      .indexOf('재련경험치')
              )
              .replace(/\s/gi, '')
              .replace(/재련경험치/gi, '')
              .slice(0, 2) == '상의' ? (
            <>
                <span>
                    {equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                        .replace(/Element_[0-9]+/g, '')
                        .replace(/\s/gi, '')
                        .replace(
                            /[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                            ''
                        )
                        .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi, '')
                        .replace(/:[0-9]+/gi, ' ')
                        .replace(/:/gi, '')
                        .substring(
                            equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
                                .replace(/:[0-9]+/gi, ' ')
                                .replace(/:/gi, '')
                                .indexOf('재련경험치')
                        )
                        .replace(/\s/gi, '')
                        .replace(/재련경험치/gi, '')
                        .replace(/상의/, '')
                        .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\(\)].*$/, '')}{' '}
                    Lv.
                    {equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                        .replace(/Element_[0-9]+/g, '')
                        .replace(/\s/gi, '')
                        .replace(
                            /[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                            ''
                        )
                        .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi, '')
                        .replace(/:[0-9]+/gi, ' ')
                        .replace(/:/gi, '')
                        .substring(
                            equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
                                .replace(/:[0-9]+/gi, ' ')
                                .replace(/:/gi, '')
                                .indexOf('재련경험치')
                        )

                        .replace(/재련경험치/gi, '')
                        .replace(/상의/, '')
                        .replace(/[^0-9]/g, '')
                        .charAt(0)}
                </span>
            </>
        ) : equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
              .replace(/Element_[0-9]+/g, '')
              .replace(/\s/gi, '')
              .replace(/[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi, '')
              .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi, '')
              .replace(/:[0-9]+/gi, ' ')
              .replace(/:/gi, '')
              .substring(
                  equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                      .replace(/Element_[0-9]+/g, '')
                      .replace(/\s/gi, '')
                      .replace(/[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi, '')
                      .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi, '')
                      .replace(/:[0-9]+/gi, ' ')
                      .replace(/:/gi, '')
                      .indexOf('재련경험치')
              )
              .replace(/\s/gi, '')
              .replace(/재련경험치/gi, '')
              .slice(0, 2) == '하의' ? (
            <>
                <span>
                    {equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                        .replace(/Element_[0-9]+/g, '')
                        .replace(/\s/gi, '')
                        .replace(
                            /[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                            ''
                        )
                        .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi, '')
                        .replace(/:[0-9]+/gi, ' ')
                        .replace(/:/gi, '')
                        .substring(
                            equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
                                .replace(/:[0-9]+/gi, ' ')
                                .replace(/:/gi, '')
                                .indexOf('재련경험치')
                        )
                        .replace(/\s/gi, '')
                        .replace(/재련경험치/gi, '')
                        .replace(/하의/, '')
                        .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\(\)].*$/, '')}{' '}
                    Lv.
                    {equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                        .replace(/Element_[0-9]+/g, '')
                        .replace(/\s/gi, '')
                        .replace(
                            /[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                            ''
                        )
                        .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi, '')
                        .replace(/:[0-9]+/gi, ' ')
                        .replace(/:/gi, '')
                        .substring(
                            equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
                                .replace(/:[0-9]+/gi, ' ')
                                .replace(/:/gi, '')
                                .indexOf('재련경험치')
                        )

                        .replace(/재련경험치/gi, '')
                        .replace(/하의/, '')
                        .replace(/[^0-9]/g, '')
                        .charAt(0)}
                </span>
            </>
        ) : equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
              .replace(/Element_[0-9]+/g, '')
              .replace(/\s/gi, '')
              .replace(/[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi, '')
              .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi, '')
              .replace(/:[0-9]+/gi, ' ')
              .replace(/:/gi, '')
              .substring(
                  equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                      .replace(/Element_[0-9]+/g, '')
                      .replace(/\s/gi, '')
                      .replace(/[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi, '')
                      .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi, '')
                      .replace(/:[0-9]+/gi, ' ')
                      .replace(/:/gi, '')
                      .indexOf('재련경험치')
              )
              .replace(/\s/gi, '')
              .replace(/재련경험치/gi, '')
              .slice(0, 2) == '어깨' ? (
            <>
                <span>
                    {equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                        .replace(/Element_[0-9]+/g, '')
                        .replace(/\s/gi, '')
                        .replace(
                            /[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                            ''
                        )
                        .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi, '')
                        .replace(/:[0-9]+/gi, ' ')
                        .replace(/:/gi, '')
                        .substring(
                            equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
                                .replace(/:[0-9]+/gi, ' ')
                                .replace(/:/gi, '')
                                .indexOf('재련경험치')
                        )
                        .replace(/\s/gi, '')
                        .replace(/재련경험치/gi, '')
                        .replace(/어깨/, '')
                        .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\(\)].*$/, '')}{' '}
                    Lv.
                    {equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                        .replace(/Element_[0-9]+/g, '')
                        .replace(/\s/gi, '')
                        .replace(
                            /[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                            ''
                        )
                        .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi, '')
                        .replace(/:[0-9]+/gi, ' ')
                        .replace(/:/gi, '')
                        .substring(
                            equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
                                .replace(/:[0-9]+/gi, ' ')
                                .replace(/:/gi, '')
                                .indexOf('재련경험치')
                        )

                        .replace(/재련경험치/gi, '')
                        .replace(/어깨/, '')
                        .replace(/[^0-9]/g, '')
                        .charAt(0)}
                </span>
            </>
        ) : equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
              .replace(/Element_[0-9]+/g, '')
              .replace(/\s/gi, '')
              .replace(/[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi, '')
              .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi, '')
              .replace(/:[0-9]+/gi, ' ')
              .replace(/:/gi, '')
              .substring(
                  equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                      .replace(/Element_[0-9]+/g, '')
                      .replace(/\s/gi, '')
                      .replace(/[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi, '')
                      .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi, '')
                      .replace(/:[0-9]+/gi, ' ')
                      .replace(/:/gi, '')
                      .indexOf('재련경험치')
              )
              .replace(/\s/gi, '')
              .replace(/재련경험치/gi, '')
              .slice(0, 2) == '장갑' ? (
            <>
                <span>
                    {equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                        .replace(/Element_[0-9]+/g, '')
                        .replace(/\s/gi, '')
                        .replace(
                            /[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                            ''
                        )
                        .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi, '')
                        .replace(/:[0-9]+/gi, ' ')
                        .replace(/:/gi, '')
                        .substring(
                            equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
                                .replace(/:[0-9]+/gi, ' ')
                                .replace(/:/gi, '')
                                .indexOf('재련경험치')
                        )
                        .replace(/\s/gi, '')
                        .replace(/재련경험치/gi, '')
                        .replace(/장갑/, '')
                        .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\(\)].*$/, '')}{' '}
                    Lv.
                    {equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                        .replace(/Element_[0-9]+/g, '')
                        .replace(/\s/gi, '')
                        .replace(
                            /[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                            ''
                        )
                        .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi, '')
                        .replace(/:[0-9]+/gi, ' ')
                        .replace(/:/gi, '')
                        .substring(
                            equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
                                .replace(/:[0-9]+/gi, ' ')
                                .replace(/:/gi, '')
                                .indexOf('재련경험치')
                        )

                        .replace(/재련경험치/gi, '')
                        .replace(/장갑/, '')
                        .replace(/[^0-9]/g, '')
                        .charAt(0)}
                </span>
            </>
        ) : (
            ''
        )
    }
    function elixirNotranssecondstat(idx) {
        return (
            <>
                <span>
                    {equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                        .replace(/Element_[0-9]+/g, '')
                        .replace(/\s/gi, '')
                        .replace(
                            /[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                            ''
                        )
                        .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi, '')
                        .replace(/:[0-9]+/gi, ' ')

                        .substring(
                            equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
                                .replace(/:[0-9]+/gi, ' ')

                                .indexOf('단계')
                        )

                        .replace(/\s/gi, '')
                        .replace(/\:{4}/g, '')
                        .split(':::')[1]
                        .slice(2)
                        .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\(\)].*$/, '')}{' '}
                    Lv.
                    {equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                        .replace(/Element_[0-9]+/g, '')
                        .replace(/\s/gi, '')
                        .replace(
                            /[\{\}\[\]\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi,
                            ''
                        )
                        .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\0-9]/gi, '')
                        .replace(/:[0-9]+/gi, ' ')
                        // .replace(/:/gi, '')
                        .substring(
                            equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
                                .replace(/:[0-9]+/gi, ' ')
                                // .replace(/:/gi, '')
                                .indexOf('단계')
                        )
                        .replace(/\s/gi, '')
                        .replace(/\:{4}/g, '')
                        .split(':::')[1]
                        .slice(2)
                        .replace(/[^0-9]/g, '')
                        .charAt(0)}
                </span>
            </>
        )
    }

    function braceletstat(idx) {
        return (
            <div>
                {equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                    .replace(/Element_[0-9]+/g, '')
                    // .replace(/\s/gi, '')
                    .replace(/[\{\}\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi, '')
                    .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\[\]\0-9]/gi, '')
                    .substring(
                        equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
                        {equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
                                equipData[idx].Tooltip.replace(
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
                {equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                    .replace(/Element_[0-9]+/g, '')
                    // .replace(/\s/gi, '')
                    .replace(/[\{\}\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi, '')
                    .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\[\]\0-9]/gi, '')
                    .substring(
                        equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
                        {equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
                                equipData[idx].Tooltip.replace(
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
                {equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                    .replace(/Element_[0-9]+/g, '')
                    // .replace(/\s/gi, '')
                    .replace(/[\{\}\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi, '')
                    .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\[\]\0-9]/gi, '')
                    .substring(
                        equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
                ) : equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                      .replace(/Element_[0-9]+/g, '')
                      // .replace(/\s/gi, '')
                      .replace(/[\{\}\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi, '')
                      .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\[\]\0-9]/gi, '')
                      .substring(
                          equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
                        {equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
                                equipData[idx].Tooltip.replace(
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
                {equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                    .replace(/Element_[0-9]+/g, '')
                    // .replace(/\s/gi, '')
                    .replace(/[\{\}\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi, '')
                    .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\[\]\0-9]/gi, '')
                    .substring(
                        equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
                ) : equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                      .replace(/Element_[0-9]+/g, '')
                      // .replace(/\s/gi, '')
                      .replace(/[\{\}\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi, '')
                      .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\[\]\0-9]/gi, '')
                      .substring(
                          equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
                        {equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
                                equipData[idx].Tooltip.replace(
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
                {equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                    .replace(/Element_[0-9]+/g, '')
                    // .replace(/\s/gi, '')
                    .replace(/[\{\}\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi, '')
                    .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\[\]\0-9]/gi, '')
                    .substring(
                        equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
                ) : equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                      .replace(/Element_[0-9]+/g, '')
                      // .replace(/\s/gi, '')
                      .replace(/[\{\}\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi, '')
                      .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\[\]\0-9]/gi, '')
                      .substring(
                          equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
                        {equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
                                equipData[idx].Tooltip.replace(
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
                {equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                    .replace(/Element_[0-9]+/g, '')
                    // .replace(/\s/gi, '')
                    .replace(/[\{\}\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi, '')
                    .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\[\]\0-9]/gi, '')
                    .substring(
                        equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
                ) : equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                      .replace(/Element_[0-9]+/g, '')
                      // .replace(/\s/gi, '')
                      .replace(/[\{\}\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi, '')
                      .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\[\]\0-9]/gi, '')
                      .substring(
                          equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
                        {equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
                                equipData[idx].Tooltip.replace(
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
                {equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                    .replace(/Element_[0-9]+/g, '')
                    // .replace(/\s/gi, '')
                    .replace(/[\{\}\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi, '')
                    .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\[\]\0-9]/gi, '')
                    .substring(
                        equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
                ) : equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                      .replace(/Element_[0-9]+/g, '')
                      // .replace(/\s/gi, '')
                      .replace(/[\{\}\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi, '')
                      .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\[\]\0-9]/gi, '')
                      .substring(
                          equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
                        {equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
                                equipData[idx].Tooltip.replace(
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
                {equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                    .replace(/Element_[0-9]+/g, '')
                    // .replace(/\s/gi, '')
                    .replace(/[\{\}\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi, '')
                    .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\[\]\0-9]/gi, '')
                    .substring(
                        equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
                ) : equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                      .replace(/Element_[0-9]+/g, '')
                      // .replace(/\s/gi, '')
                      .replace(/[\{\}\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi, '')
                      .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\[\]\0-9]/gi, '')
                      .substring(
                          equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
                        {equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
                                equipData[idx].Tooltip.replace(
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
                {equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                    .replace(/Element_[0-9]+/g, '')
                    .replace(/\s/gi, '')
                    .replace(/[\{\}\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi, '')
                    .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\[\]\0-9]/gi, '')
                    .substring(
                        equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
                        equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
                                equipData[idx].Tooltip.replace(
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
                ) : equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                      .replace(/Element_[0-9]+/g, '')
                      .replace(/\s/gi, '')
                      .replace(/[\{\}\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi, '')
                      .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\[\]\0-9]/gi, '')
                      .substring(
                          equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
                          equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
                                  equipData[idx].Tooltip.replace(
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
                        {equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
                                equipData[idx].Tooltip.replace(
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
                                equipData[idx].Tooltip.replace(
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
                                        equipData[idx].Tooltip.replace(
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
                {equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                    .replace(/Element_[0-9]+/g, '')
                    .replace(/\s/gi, '')
                    .replace(/[\{\}\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi, '')
                    .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\[\]\0-9]/gi, '')
                    .substring(
                        equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
                        equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
                                equipData[idx].Tooltip.replace(
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
                ) : equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                      .replace(/Element_[0-9]+/g, '')
                      .replace(/\s/gi, '')
                      .replace(/[\{\}\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi, '')
                      .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\[\]\0-9]/gi, '')
                      .substring(
                          equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
                          equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
                                  equipData[idx].Tooltip.replace(
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
                        {equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
                                equipData[idx].Tooltip.replace(
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
                                equipData[idx].Tooltip.replace(
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
                                        equipData[idx].Tooltip.replace(
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
                {equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                    .replace(/Element_[0-9]+/g, '')
                    .replace(/\s/gi, '')
                    .replace(/[\{\}\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi, '')
                    .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\[\]\0-9]/gi, '')
                    .substring(
                        equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
                        equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
                                equipData[idx].Tooltip.replace(
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
                ) : equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                      .replace(/Element_[0-9]+/g, '')
                      .replace(/\s/gi, '')
                      .replace(/[\{\}\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi, '')
                      .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\[\]\0-9]/gi, '')
                      .substring(
                          equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
                          equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
                                  equipData[idx].Tooltip.replace(
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
                        {equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
                                equipData[idx].Tooltip.replace(
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
                                equipData[idx].Tooltip.replace(
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
                                        equipData[idx].Tooltip.replace(
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
                {equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                    .replace(/Element_[0-9]+/g, '')
                    .replace(/\s/gi, '')
                    .replace(/[\{\}\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi, '')
                    .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\[\]\0-9]/gi, '')
                    .substring(
                        equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
                        equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
                                equipData[idx].Tooltip.replace(
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
                ) : equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                      .replace(/Element_[0-9]+/g, '')
                      .replace(/\s/gi, '')
                      .replace(/[\{\}\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi, '')
                      .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\[\]\0-9]/gi, '')
                      .substring(
                          equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
                          equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
                                  equipData[idx].Tooltip.replace(
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
                        {equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
                                equipData[idx].Tooltip.replace(
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
                                equipData[idx].Tooltip.replace(
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
                                        equipData[idx].Tooltip.replace(
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
                {equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                    .replace(/Element_[0-9]+/g, '')
                    .replace(/\s/gi, '')
                    .replace(/[\{\}\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi, '')
                    .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\[\]\0-9]/gi, '')
                    .substring(
                        equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
                        equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
                                equipData[idx].Tooltip.replace(
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
                ) : equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
                      .replace(/Element_[0-9]+/g, '')
                      .replace(/\s/gi, '')
                      .replace(/[\{\}\/?.,;|*~`!^\-_>?@\#$&\\\=\'\"]/gi, '')
                      .replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\+\:\(\)\[\]\0-9]/gi, '')
                      .substring(
                          equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
                          equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
                                  equipData[idx].Tooltip.replace(
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
                        {equipData[idx].Tooltip.replace(/(<([^>]+)>)/g, '')
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
                                equipData[idx].Tooltip.replace(
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
                                equipData[idx].Tooltip.replace(
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
                                        equipData[idx].Tooltip.replace(
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
                                    {profileData.ArkPassive.Points[0]
                                        ? profileData.ArkPassive.Points[0].Value
                                        : '0'}
                                </div>
                            </p>
                            <p>
                                깨달음{' '}
                                <div className="value">
                                    {profileData.ArkPassive.Points[1]
                                        ? profileData.ArkPassive.Points[1].Value
                                        : '0'}
                                </div>
                            </p>
                            <p>
                                도약{' '}
                                <div className="value">
                                    {profileData.ArkPassive.Points[2]
                                        ? profileData.ArkPassive.Points[2].Value
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
                                            backgroundColor:
                                                qualityValue(0) == 100
                                                    ? 'rgb(255, 106, 0)'
                                                    : qualityValue(0) >= 90 &&
                                                      qualityValue(0) < 100
                                                    ? 'rgb(138, 43, 226)'
                                                    : qualityValue(0) >= 70 &&
                                                      qualityValue(0) < 90
                                                    ? 'rgb(81, 162, 254)'
                                                    : qualityValue(0) >= 30 &&
                                                      qualityValue(0) < 70
                                                    ? 'rgb(36, 157, 46)'
                                                    : qualityValue(0) >= 10 &&
                                                      qualityValue(0) < 30
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
                                            backgroundColor:
                                                qualityValue(1) == 100
                                                    ? 'rgb(255, 106, 0)'
                                                    : qualityValue(1) >= 90 &&
                                                      qualityValue(1) < 100
                                                    ? 'rgb(138, 43, 226)'
                                                    : qualityValue(1) >= 70 &&
                                                      qualityValue(1) < 90
                                                    ? 'rgb(81, 162, 254)'
                                                    : qualityValue(1) >= 30 &&
                                                      qualityValue(1) < 70
                                                    ? 'rgb(36, 157, 46)'
                                                    : qualityValue(1) >= 10 &&
                                                      qualityValue(1) < 30
                                                    ? 'rgb(214, 214, 0)'
                                                    : 'rgb(216, 38, 38)',
                                            fontSize: '12px',
                                            fontWeight: '600',
                                            color: 'white',
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
                                    <div className="elixir-tap">
                                        {equipData[1].Tooltip.includes(
                                            '[초월]'
                                        ) ? (
                                            <>
                                                {elixirfirststat(1)}{' '}
                                                {elixirsecondstat(1)}
                                            </>
                                        ) : (
                                            <>
                                                {elixirNotransstat(1)}{' '}
                                                {elixirNotranssecondstat(1)}
                                            </>
                                        )}
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
                                            backgroundColor:
                                                qualityValue(2) == 100
                                                    ? 'rgb(255, 106, 0)'
                                                    : qualityValue(2) >= 90 &&
                                                      qualityValue(2) < 100
                                                    ? 'rgb(138, 43, 226)'
                                                    : qualityValue(2) >= 70 &&
                                                      qualityValue(2) < 90
                                                    ? 'rgb(81, 162, 254)'
                                                    : qualityValue(2) >= 30 &&
                                                      qualityValue(2) < 70
                                                    ? 'rgb(36, 157, 46)'
                                                    : qualityValue(2) >= 10 &&
                                                      qualityValue(2) < 30
                                                    ? 'rgb(214, 214, 0)'
                                                    : 'rgb(216, 38, 38)',
                                            color: 'white',
                                            fontWeight: '600',
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
                                    <div className="elixir-tap">
                                        {equipData[2].Tooltip.includes(
                                            '[초월]'
                                        ) ? (
                                            <>
                                                {elixirfirststat(2)}{' '}
                                                {elixirsecondstat(2)}
                                            </>
                                        ) : (
                                            <>
                                                {elixirNotransstat(2)}{' '}
                                                {elixirNotranssecondstat(2)}
                                            </>
                                        )}
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
                                            backgroundColor:
                                                qualityValue(3) == 100
                                                    ? 'rgb(255, 106, 0)'
                                                    : qualityValue(3) >= 90 &&
                                                      qualityValue(3) < 100
                                                    ? 'rgb(138, 43, 226)'
                                                    : qualityValue(3) >= 70 &&
                                                      qualityValue(3) < 90
                                                    ? 'rgb(81, 162, 254)'
                                                    : qualityValue(3) >= 30 &&
                                                      qualityValue(3) < 70
                                                    ? 'rgb(36, 157, 46)'
                                                    : qualityValue(3) >= 10 &&
                                                      qualityValue(3) < 30
                                                    ? 'rgb(214, 214, 0)'
                                                    : 'rgb(216, 38, 38)',
                                            color: 'white',
                                            fontWeight: '600',
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
                                    <div className="elixir-tap">
                                        {equipData[3].Tooltip.includes(
                                            '[초월]'
                                        ) ? (
                                            <>
                                                {elixirfirststat(3)}{' '}
                                                {elixirsecondstat(3)}
                                            </>
                                        ) : (
                                            <>
                                                {elixirNotransstat(3)}{' '}
                                                {elixirNotranssecondstat(3)}
                                            </>
                                        )}
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
                                            backgroundColor:
                                                qualityValue(4) == 100
                                                    ? 'rgb(255, 106, 0)'
                                                    : qualityValue(4) >= 90 &&
                                                      qualityValue(4) < 100
                                                    ? 'rgb(138, 43, 226)'
                                                    : qualityValue(4) >= 70 &&
                                                      qualityValue(4) < 90
                                                    ? 'rgb(81, 162, 254)'
                                                    : qualityValue(4) >= 30 &&
                                                      qualityValue(4) < 70
                                                    ? 'rgb(36, 157, 46)'
                                                    : qualityValue(4) >= 10 &&
                                                      qualityValue(4) < 30
                                                    ? 'rgb(214, 214, 0)'
                                                    : 'rgb(216, 38, 38)',
                                            color: 'white',
                                            fontWeight: '600',
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
                                    <div className="elixir-tap">
                                        {equipData[4].Tooltip.includes(
                                            '[초월]'
                                        ) ? (
                                            <>
                                                {elixirfirststat(4)}{' '}
                                                {elixirsecondstat(4)}
                                            </>
                                        ) : (
                                            <>
                                                {elixirNotransstat(4)}{' '}
                                                {elixirNotranssecondstat(4)}
                                            </>
                                        )}
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
                                            backgroundColor:
                                                qualityValue(5) == 100
                                                    ? 'rgb(255, 106, 0)'
                                                    : qualityValue(5) >= 90 &&
                                                      qualityValue(5) < 100
                                                    ? 'rgb(138, 43, 226)'
                                                    : qualityValue(5) >= 70 &&
                                                      qualityValue(5) < 90
                                                    ? 'rgb(81, 162, 254)'
                                                    : qualityValue(5) >= 30 &&
                                                      qualityValue(5) < 70
                                                    ? 'rgb(36, 157, 46)'
                                                    : qualityValue(5) >= 10 &&
                                                      qualityValue(5) < 30
                                                    ? 'rgb(214, 214, 0)'
                                                    : 'rgb(216, 38, 38)',
                                            color: 'white',
                                            fontWeight: '600',
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
                                    <div className="elixir-tap">
                                        {equipData[5].Tooltip.includes(
                                            '[초월]'
                                        ) ? (
                                            <>
                                                {elixirfirststat(5)}{' '}
                                                {elixirsecondstat(5)}
                                            </>
                                        ) : (
                                            <>
                                                {elixirNotransstat(5)}{' '}
                                                {elixirNotranssecondstat(5)}
                                            </>
                                        )}
                                    </div>
                                </div>
                            </p>
                        </div>

                        <div className="acc-inner">
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
                                                equipData[6].Grade === '유물'
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
                                                    : qualityValue(6) >= 90 &&
                                                      qualityValue(6) < 100
                                                    ? 'rgb(138, 43, 226)'
                                                    : qualityValue(6) >= 70 &&
                                                      qualityValue(6) < 90
                                                    ? 'rgb(81, 162, 254)'
                                                    : qualityValue(6) >= 30 &&
                                                      qualityValue(6) < 70
                                                    ? 'rgb(36, 157, 46)'
                                                    : qualityValue(6) >= 10 &&
                                                      qualityValue(6) < 30
                                                    ? 'rgb(214, 214, 0)'
                                                    : 'rgb(216, 38, 38)',
                                            color: 'white',
                                            fontWeight: '600',
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
                                                equipData[7].Grade === '유물'
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
                                                    : qualityValue(7) >= 90 &&
                                                      qualityValue(7) < 100
                                                    ? 'rgb(138, 43, 226)'
                                                    : qualityValue(7) >= 70 &&
                                                      qualityValue(7) < 90
                                                    ? 'rgb(81, 162, 254)'
                                                    : qualityValue(7) >= 30 &&
                                                      qualityValue(7) < 70
                                                    ? 'rgb(36, 157, 46)'
                                                    : qualityValue(7) >= 10 &&
                                                      qualityValue(7) < 30
                                                    ? 'rgb(214, 214, 0)'
                                                    : 'rgb(216, 38, 38)',
                                            color: 'white',
                                            fontWeight: '600',
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
                                                equipData[8].Grade === '유물'
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
                                                    : qualityValue(8) >= 90 &&
                                                      qualityValue(8) < 100
                                                    ? 'rgb(138, 43, 226)'
                                                    : qualityValue(8) >= 70 &&
                                                      qualityValue(8) < 90
                                                    ? 'rgb(49, 49, 252)'
                                                    : qualityValue(8) >= 30 &&
                                                      qualityValue(8) < 70
                                                    ? 'rgb(36, 157, 46)'
                                                    : qualityValue(8) >= 10 &&
                                                      qualityValue(8) < 30
                                                    ? 'rgb(214, 214, 0)'
                                                    : 'rgb(216, 38, 38)',
                                            color: 'white',
                                            fontWeight: '600',
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
                                                equipData[9].Grade === '유물'
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
                                                    : qualityValue(9) >= 90 &&
                                                      qualityValue(9) < 100
                                                    ? 'rgb(138, 43, 226)'
                                                    : qualityValue(9) >= 70 &&
                                                      qualityValue(9) < 90
                                                    ? 'rgb(81, 162, 254)'
                                                    : qualityValue(9) >= 30 &&
                                                      qualityValue(9) < 70
                                                    ? 'rgb(36, 157, 46)'
                                                    : qualityValue(9) >= 10 &&
                                                      qualityValue(9) < 30
                                                    ? 'rgb(214, 214, 0)'
                                                    : 'rgb(216, 38, 38)',
                                            color: 'white',
                                            fontWeight: '600',
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
                                                equipData[10].Grade === '유물'
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
                                                    : qualityValue(10) >= 90 &&
                                                      qualityValue(10) < 100
                                                    ? 'rgb(138, 43, 226)'
                                                    : qualityValue(10) >= 70 &&
                                                      qualityValue(10) < 90
                                                    ? 'rgb(81, 162, 254)'
                                                    : qualityValue(10) >= 30 &&
                                                      qualityValue(10) < 70
                                                    ? 'rgb(36, 157, 46)'
                                                    : qualityValue(10) >= 10 &&
                                                      qualityValue(10) < 30
                                                    ? 'rgb(214, 214, 0)'
                                                    : 'rgb(216, 38, 38)',
                                            color: 'white',
                                            fontWeight: '600',
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
                                                equipData[11].Grade === '유물'
                                                    ? 'linear-gradient(135deg, #341a09, #a24006)'
                                                    : 'linear-gradient(135deg, #3d3325, #dcc999)',
                                            borderBottomLeftRadius:
                                                equipData[11].Grade === '고대'
                                                    ? '0px'
                                                    : '8px',
                                            borderBottomRightRadius:
                                                equipData[11].Grade === '고대'
                                                    ? '0px'
                                                    : '8px',
                                        }}
                                    />
                                    <div
                                        className="qualityValue"
                                        style={{
                                            // width: '48px',
                                            backgroundColor: 'rgb(255, 255, 0)',
                                            fontWeight: '600',
                                            fontSize: '12px',
                                            textAlign: 'center',
                                        }}
                                    >
                                        {equipData[11].Tooltip.replace(
                                            /(<([^>]+)>)/g,
                                            ''
                                        )
                                            .replace(/Element_[0-9]+/g, '')
                                            .replace(/\s/gi, '')
                                            .replace(
                                                /[\{\}\[\]\/?.,;:|\)*~`!^\-_>?@\#$&\\\=\(\'\"]/gi,
                                                ''
                                            )
                                            .replace(/[^\w]/gi, '')
                                            // .replace(/:[0-9]+/gi, '')
                                            // .replace(/:/gi, '')
                                            .substring(
                                                equipData[11].Tooltip.replace(
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
                                            .replace(/[a-z]*/g, '') == 'I' ? (
                                            <>LV. 1</>
                                        ) : equipData[11].Tooltip.replace(
                                              /(<([^>]+)>)/g,
                                              ''
                                          )
                                              .replace(/Element_[0-9]+/g, '')
                                              .replace(/\s/gi, '')
                                              .replace(
                                                  /[\{\}\[\]\/?.,;:|\)*~`!^\-_>?@\#$&\\\=\(\'\"]/gi,
                                                  ''
                                              )
                                              .replace(/[^\w]/gi, '')
                                              .substring(
                                                  equipData[11].Tooltip.replace(
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
                                          'II' ? (
                                            <>Lv. 2</>
                                        ) : equipData[11].Tooltip.replace(
                                              /(<([^>]+)>)/g,
                                              ''
                                          )
                                              .replace(/Element_[0-9]+/g, '')
                                              .replace(/\s/gi, '')
                                              .replace(
                                                  /[\{\}\[\]\/?.,;:|\)*~`!^\-_>?@\#$&\\\=\(\'\"]/gi,
                                                  ''
                                              )
                                              .replace(/[^\w]/gi, '')
                                              .substring(
                                                  equipData[11].Tooltip.replace(
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
                                          'III' ? (
                                            <>Lv. 3</>
                                        ) : equipData[11].Tooltip.replace(
                                              /(<([^>]+)>)/g,
                                              ''
                                          )
                                              .replace(/Element_[0-9]+/g, '')
                                              .replace(/\s/gi, '')
                                              .replace(
                                                  /[\{\}\[\]\/?.,;:|\)*~`!^\-_>?@\#$&\\\=\(\'\"]/gi,
                                                  ''
                                              )
                                              .replace(/[^\w]/gi, '')
                                              // .replace(/:[0-9]+/gi, '')
                                              // .replace(/:/gi, '')
                                              .substring(
                                                  equipData[11].Tooltip.replace(
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
                                          'IV' ? (
                                            <>Lv. 4</>
                                        ) : (
                                            ''
                                        )}
                                    </div>
                                </div>
                                <div className="nametag">
                                    <div className="equip-name">
                                        {equipData[11].Name}
                                    </div>
                                    <div className="stone-info">
                                        {stonestat(11)}
                                    </div>
                                </div>
                            </p>
                        </div>
                        <div className="bracelet-inner">
                            <p>
                                <div
                                    className="img-quality"
                                    style={{
                                        display: 'flex',

                                        flexDirection: 'row',
                                    }}
                                >
                                    <img
                                        src={equipData[12].Icon}
                                        value={equipData[12].Grade}
                                        style={{
                                            backgroundImage:
                                                equipData[12].Grade === '유물'
                                                    ? 'linear-gradient(135deg, #341a09, #a24006)'
                                                    : 'linear-gradient(135deg, #3d3325, #dcc999)',
                                            width: '40px',
                                            height: '40px',
                                        }}
                                    />
                                    <div className="nametag">
                                        {/* <div className="equip-name">
                                        {equipData[12].Name}
                                    </div> */}
                                        <div className="braceletstat">
                                            {braceletstat(12)}
                                        </div>
                                        {braceleteffectstat(12)}
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
