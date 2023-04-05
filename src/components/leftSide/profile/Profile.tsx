import { useQuery } from "@tanstack/react-query";
import { getProfile } from "api/user";
import { ProfileData } from "./ProfileData";

export default function Profile(props: { userId?: number; username: string }) {
  // 임시 데이터, 쿼리 연동되면 삭제
  const tmpUser = [
    {
      id: 0,
      nickname: "숨송",
      status: "온라인",
      record: {
        win: 3,
        lose: 1,
      },
      gameHistory: [
        {
          id: 1,
          player1: "숨송",
          player2: "아무개",
          player1score: 4,
          player2score: 6,
        },
      ],
    },
    {
      id: 1,
      nickname: "아무개",
      status: "온라인",
      record: {
        win: 2,
        lose: 2,
      },
      gameHistory: [
        {
          id: 1,
          player1: "숨송",
          player2: "아무개",
          player1score: 4,
          player2score: 6,
        },
      ],
    },
    {
      id: 2,
      nickname: "아무개개",
      status: "오프라인",
      record: {
        win: 0,
        lose: 0,
      },
      gameHistory: [],
    },
  ];
  const user = tmpUser.filter((user) => user.id === props.userId)[0];

  const profileQuery = useQuery({
    queryKey: ["profile", `${props.username}`],
    queryFn: () => {
      return getProfile(props.username);
    },
  });

  if (profileQuery.isLoading) return <ProfileData />;

  return <ProfileData user={profileQuery.data} />;
}
