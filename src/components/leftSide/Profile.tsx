import { useQuery } from "@tanstack/react-query";
import { getAvatar, getProfile } from "api/user";
import { ProfileData } from "./ProfileData";
import { useEffect, useState } from "react";

export default function Profile(props: { username?: string }) {
  const [img, setImg] = useState("");

  useEffect(() => {
    const getAvatarHandler = async () => {
      if (props.username) {
        const res = await getAvatar(props.username);
        const file = new File([res?.data], "avatar");
        const reader = new FileReader();
        reader.onload = (ev) => {
          const previewImage = String(ev.target?.result);
          setImg(previewImage);
        };
        reader.readAsDataURL(file);
      }
    };
    getAvatarHandler();
  }, []);

  const profileQuery = useQuery({
    queryKey: ["profile", `${props.username}`],
    queryFn: () => {
      if (props.username) return getProfile(props.username);
    },
  });

  if (profileQuery.isLoading) return <ProfileData />;

  return <ProfileData user={profileQuery.data} image={img} />;
}
