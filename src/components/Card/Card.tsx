import styles from "./Card.module.scss";

interface CardProps {
  title: string;
  value: string | number;
  variation: number;
  buy?: number;
  sell?: number;
  isCurrency?: boolean;
  cdi?: number;
  selic?: number;
  onClick?: () => void;
}

const Card = ({
  title,
  value,
  variation,
  isCurrency,
  buy,
  sell,
  cdi,
  selic,
  onClick,
}: CardProps) => {
  const isTaxCard = title === "Taxas";

  return (
    <div className={styles.card} onClick={onClick}>
      <h2 className={styles.cardTitle}>{title}</h2>

      {isCurrency ? (
        <>
          <p>Compra: R$ {buy?.toFixed(2) ?? "--"}</p>
          <p>Venda: R$ {sell?.toFixed(2) ?? "--"}</p>
        </>
      ) : isTaxCard ? (
        <>
          <p>CDI: {cdi ?? "--"}</p> <p>Selic: {selic ?? "--"}</p>{" "}
        </>
      ) : (
        <p>
          Índice:{" "}
          {value.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
      )}

      {!isTaxCard && (
        <p
          className={
            variation > 0 ? styles.pricePositive : styles.priceNegative
          }
        >
          Variação: {variation?.toFixed(2)}%
        </p>
      )}
    </div>
  );
};

export default Card;
