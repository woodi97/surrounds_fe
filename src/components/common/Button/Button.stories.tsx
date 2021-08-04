import React from "react";
import { action } from "@storybook/addon-actions";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Button from "./Button";

export default {
	title: "Components/Button",
	component: Button,
	argTypes: {
		backgroundColor: { control: "color" },
		onClick: { action: "clicked" },
	},
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
	primary: true,
	children: "Button",
};

export const Secondary = Template.bind({});
Secondary.args = {
	children: "Button",
};

export const Large = Template.bind({});
Large.args = {
	primary: true,
	size: "large",
	// backgroundColor: "rgb(172, 75, 104)",
	children: "Button",
};

export const Small = Template.bind({});
Small.args = {
	primary: true,
	size: "small",
	// backgroundColor: "skyblue",
	children: "Price",
};
