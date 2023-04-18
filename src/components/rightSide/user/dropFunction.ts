export function onProfile(
  user: string,
  setProfileUser: React.Dispatch<React.SetStateAction<string>>,
  onClose: () => void,
) {
  setProfileUser(user);
  onClose();
}
