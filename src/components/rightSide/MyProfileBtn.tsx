import { getUsername } from "userAuth";

export default function MyProfileBtn(props: { setProfileUser: (userId: string) => void }) {
  const username = getUsername();
  return (
    <button
      onClick={() => {
        props.setProfileUser(username);
      }}
    >
      내 프로필
    </button>
  );
}
