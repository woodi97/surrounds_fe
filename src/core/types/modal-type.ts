export type SignInModal = 'SIGNIN';
export type RoomCreateModal = 'ROOMCREATE';

export type ModalType = SignInModal | RoomCreateModal;

export type ModalInfoType = {
  type: ModalType | null;
  title: string | null;
  option?: unknown;
};
