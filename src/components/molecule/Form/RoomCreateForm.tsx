import { Button, InputBox } from '@src/components/atom';
import React, { FC, SyntheticEvent, useState } from 'react';

const RoomCreateForm: FC<{
  onSubmit: (title: string, description: string) => void;
}> = ({ onSubmit }) => {
  const [{ title, description }, setCreateInfo] = useState<{
    title: string;
    description: string;
  }>({
    title: '',
    description: '',
  });

  const handleChange = (e: SyntheticEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setCreateInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(title, description);
  };

  return (
    <form className="w-full space-y-4" onSubmit={handleSubmit}>
      <InputBox
        fullWidth
        classNames="bg-white/50"
        type="id"
        name="title"
        label="title"
        value={title}
        onChange={handleChange}
      />
      <InputBox
        fullWidth
        classNames="bg-white/50"
        type="id"
        name="description"
        label="description"
        value={description}
        onChange={handleChange}
      />
      <Button type="submit" fullWidth className="text-white text-xl">
        Create
      </Button>
    </form>
  );
};

export default RoomCreateForm;
