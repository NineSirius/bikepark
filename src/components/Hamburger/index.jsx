import hamburgerCss from './hamburger.module.css'

import clsx from 'clsx'

export const Hamburger = ({ onClick, isActive }) => {
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
