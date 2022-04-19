import styles from "../styles/Home.module.css"
import Meta from "./Meta"

const Layout = ({ children }) => {

    return (
        <>  
            <Meta />
            <div className={styles.container}>
                <div className={styles.main}>
                    { children }
                </div>
            </div>
        </>
    )
}

export default Layout

