import React from "react";
import { DownOutlined } from "@ant-design/icons"
import { Dropdown, Space } from 'antd';
import type { MenuProps } from 'antd';

interface CustomDropdownProps{
    items: MenuProps['items'];
    onClick: MenuProps['onClick'];
    label?: React.ReactNode;
    color?: string
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({items, onClick, label = 'Menu', color = 'black'}) =>{
    return(
        <Dropdown menu={{ items, onClick }} overlayClassName="custom-dropdown-menu">
            <a onClick={(e) => e.preventDefault()}>
                <Space style={{ color }}>
                    {label}
                    <DownOutlined />
                </Space>
            </a>
        </Dropdown>
    )
}

export default CustomDropdown
