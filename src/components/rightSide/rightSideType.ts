export type UserInfoProps = {
  listOf: string;
  username: string;
  subLine: string;
  userStatus?: TargetStatusType;
};

export type ModalLayoutProps = {
  children: React.ReactNode;
};

export type TargetStatusType = {
  status?: string;
  oper?: string;
  muted?: boolean;
  blocked?: boolean;
};

export type DropMenuProps = {
  onClose: () => void;
  onDmOpen: () => void;
  onInviteGameOpen: () => void;
  menuFor: string;
  targetUser: string;
  targetStatus?: TargetStatusType;
};
