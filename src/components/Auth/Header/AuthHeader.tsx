import logo from "~/assets/franq-logo.svg";
import styles from "./AuthHeader.module.scss";

interface Props {
  title: string;
  subtitle?: string;
}

const AuthHeader = ({ title, subtitle }: Props) => (
  <>
    <img src={logo} alt='Franq' className={styles.logo} />
    <h2 className={styles.title}>{title}</h2>
    {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
  </>
);

export default AuthHeader;
