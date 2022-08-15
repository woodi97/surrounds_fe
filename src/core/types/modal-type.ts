export type SignInModal = 'SIGNIN';
export type RoomCreateModal = 'ROOMCREATE';
export type RoomJoinModal = 'ROOMJOIN';

export type ModalType = SignInModal | RoomCreateModal | RoomJoinModal;

export type ModalInfoType = {
  type: ModalType | null;
  title: string | null;
  fullScreen?: boolean;
  option?: unknown;
};

export type ModalContentType = {
  option?: unknown;
};

export type RoomJoinModalContentOption = {
  roomId: string;
};
