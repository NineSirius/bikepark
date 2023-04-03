import styles from './error.module.css'
import Button from '@/components/UI/Button'
import { useRouter } from 'next/router'

export const NotFoundPage = () => {
    const router = useRouter()

    return (
        <div className="container">
            <div className={styles.error}>
                <div>
                    <h3 className={styles.error_text}>404</h3>
                    <p>The page does not exist or has not created yet</p>
                </div>
                <Button type="default" onClick={() => router.push('/')}>
                    Back to main page
                </Button>
            </div>
        </div>
    )
}
