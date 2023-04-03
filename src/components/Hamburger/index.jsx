import hamburgerCss from './hamburger.module.css'

import clsx from 'clsx'

export const Hamburger = ({ onClick, isActive }) => {
    // if (document) {
    //     isActive
    //         ? document.body.classList.add('fixed')
    //         : document.body.classList.remove('fixed')
    // }
    return (
        <div
            className={clsx(
                hamburgerCss.hamburger,
                hamburgerCss['hamburger--slider'],
                isActive && hamburgerCss['is-active'],
            )}
            onClick={onClick}
        >
            <div className={hamburgerCss['hamburger-box']}>
                <div className={hamburgerCss['hamburger-inner']}></div>
            </div>
        </div>
    )
}
