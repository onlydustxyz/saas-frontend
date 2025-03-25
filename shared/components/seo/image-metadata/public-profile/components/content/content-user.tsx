interface Props {
  login: string;
  title: string;
  image: string;
  rank: number;
  rankPercentile: number;
}

function getOrdinalSuffix(position?: number): string {
  if (position === undefined) {
    return "";
  }
  // Check the last two digits to handle special cases like 11th, 12th, 13th, etc.
  const lastTwoDigits = position % 100;
  if (lastTwoDigits >= 10 && lastTwoDigits <= 19) {
    return `${position}th`;
  }

  // Check the last digit to determine the correct suffix
  switch (position % 10) {
    case 1:
      return `${position}st`;
    case 2:
      return `${position}nd`;
    case 3:
      return `${position}rd`;
    default:
      return `${position}th`;
  }
}

export function ContentUser({ login, title, image, rank, rankPercentile }: Props) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: "20px",
      }}
    >
      {image && (
        <img
          src={image}
          alt="user-image"
          width="196"
          height="196"
          style={{
            objectFit: "cover",
            border: "6px solid #232338",
            borderRadius: 100,
          }}
        />
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          gap: "20px",
        }}
      >
        <div
          style={{
            fontSize: "48px",
            fontFamily: "Belwe",
            color: "#F3F0EE",
          }}
        >
          {login?.slice(0, 20)}
        </div>
        <div
          style={{
            fontSize: "36px",
            fontFamily: "Walsheim",
            color: "#F3F0EE",
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: "36px",
            fontFamily: "Walsheim",
            color: "#F3F0EE",
            padding: "12px 24px",
            borderRadius: 100,
            display: "flex",
            alignItems: "center",
            border: "2px solid #F3F0EE33",
            backgroundColor: "#FFFFFF0D",
          }}
        >
          {getOrdinalSuffix(rank)} • Top {rankPercentile}%
        </div>
      </div>
    </div>
  );
}
