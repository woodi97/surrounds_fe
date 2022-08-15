import React, { FC, memo } from 'react';
import { AiOutlineMessage, AiOutlinePlusCircle } from 'react-icons/ai';
import { BiVideo } from 'react-icons/bi';
import { BsApple, BsCamera, BsGoogle, BsHouseDoor, BsPlus } from 'react-icons/bs';
import { CgClose, CgProfile } from 'react-icons/cg';
import { FaSearch } from 'react-icons/fa';
import { FiSend, FiSettings } from 'react-icons/fi';
import { GiHamburgerMenu } from 'react-icons/gi';
import {
  IoIosArrowBack,
  IoIosArrowDropleftCircle,
  IoIosArrowForward,
  IoIosArrowRoundDown,
} from 'react-icons/io';
import { IoAlbumsOutline, IoEllipsisVertical, IoPeopleOutline } from 'react-icons/io5';
import { MdEmail } from 'react-icons/md';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { SiNaver } from 'react-icons/si';

export type SVGTypes =
  | 'close'
  | 'house'
  | 'setting'
  | 'plus'
  | 'plusCircle'
  | 'profile'
  | 'album'
  | 'camera'
  | 'video'
  | 'hamburger'
  | 'search'
  | 'leftArrow'
  | 'rightArrow'
  | 'downArrow'
  | 'leftDropArrow'
  | 'ellipsisVertical'
  | 'people'
  | 'google'
  | 'apple'
  | 'kakao'
  | 'naver'
  | 'email'
  | 'send'
  | 'message';

type IconProps = {
  name: SVGTypes;
  size?: number;
  className?: string;
};

const _Selector: { [key in SVGTypes]: FC<IconProps> } = {
  close: CgClose,
  house: BsHouseDoor,
  setting: FiSettings,
  plus: BsPlus,
  plusCircle: AiOutlinePlusCircle,
  profile: CgProfile,
  album: IoAlbumsOutline,
  camera: BsCamera,
  video: BiVideo,
  hamburger: GiHamburgerMenu,
  search: FaSearch,
  leftArrow: IoIosArrowBack,
  rightArrow: IoIosArrowForward,
  downArrow: IoIosArrowRoundDown,
  leftDropArrow: IoIosArrowDropleftCircle,
  ellipsisVertical: IoEllipsisVertical,
  people: IoPeopleOutline,
  google: BsGoogle,
  apple: BsApple,
  kakao: RiKakaoTalkFill,
  naver: SiNaver,
  email: MdEmail,
  send: FiSend,
  message: AiOutlineMessage,
};

const Icon: FC<IconProps> = ({ name, ...props }) => {
  const IconComponent = _Selector[name];
  return <IconComponent className="pointer-events-none" name={name} {...props} />;
};

export default memo(Icon);
