import { FiEye, FiEyeOff } from "react-icons/fi";
import styles from "./Input.module.scss";

interface Props {
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showToggle?: boolean;
  showValue?: boolean;
  onToggle?: () => void;
}

const Input = ({
  label,
  type = "text",
  value,
  onChange,
  showToggle = false,
  showValue = false,
  onToggle,
}: Props) => {
  const inputType =
    showToggle && !showValue && type === "password" ? "password" : "text";

  return (
    <>
      <label className={styles.label}>{label}</label>
      <div className={styles.inputWrapper}>
        <input
          className={styles.input}
          type={inputType}
          value={value}
          onChange={(e) => onChange(e)}
          autoComplete={type === "password" ? "new-password" : "off"}
        />
        {showToggle && onToggle && (
          <span onClick={onToggle}>
            {showValue ? (
              <FiEye className={styles.icon} />
            ) : (
              <FiEyeOff className={styles.icon} />
            )}
          </span>
        )}
      </div>
    </>
  );
};

export default Input;
