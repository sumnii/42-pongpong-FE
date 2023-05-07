import * as S from "./style";

type AchivementProp = {
  achivements?: string[];
};

export default function AchievementBadge({ achivements }: AchivementProp) {
  return (
    <>
      <S.InfoLabel>업적</S.InfoLabel>
      {achivements?.map((achive) => {
        return <S.InfoValue key={achive}>{achive}</S.InfoValue>;
      })}
    </>
  );
}
