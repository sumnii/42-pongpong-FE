import { useQuery } from "@tanstack/react-query";
import { getBadge } from "api/user";
import { AchivementProps, BadgeProps } from "profile-types";
import * as S from "./style";

function BadgeSet({ achivement, username }: BadgeProps) {
  const BadgeQuery = useQuery({
    queryKey: ["badge", `${achivement}`, `${username}`],
    queryFn: () => {
      return getBadge(`${achivement}`);
    },
  });

  return (
    <S.BadgeSet>
      <S.BadgeImg src={BadgeQuery?.data as string} alt={`${achivement}배지`} />
      <span>{achivement}</span>
    </S.BadgeSet>
  );
}

export default function AchievementBadge({ achivements, username }: AchivementProps) {
  return (
    <S.InfoWrapper>
      <S.InfoLabel>업적</S.InfoLabel>
      <S.BadgeBox>
        {achivements?.map((achivement) => {
          return <BadgeSet key={achivement} achivement={achivement} username={username} />;
        })}
      </S.BadgeBox>
    </S.InfoWrapper>
  );
}
