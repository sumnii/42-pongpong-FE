import { useQuery } from "@tanstack/react-query";
import { getAvatar, getProfile } from "api/user";
import { ProfileData } from "./ProfileData";

export default function Profile(props: { username?: string }) {
  const profileQuery = useQuery({
    queryKey: ["profile", `${props.username}`],
    queryFn: () => {
      if (props.username) return getProfile(props.username);
    },
  });

  if (profileQuery.isLoading) return <ProfileData />;

  return <ProfileData user={profileQuery.data} />;
}
