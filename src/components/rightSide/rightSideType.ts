export type ModalLayoutProps = {
  children: React.ReactNode;
};

export type TargetStatusType = {
  oper?: string;
  muted?: boolean;
  blocked?: boolean;
};

export type DropMenuProps = {
  onClose: () => void;
  onDmOpen: () => void;
  menuFor: string;
  targetUser: string;
  targetStatus?: TargetStatusType;
  subline: string;
};
