import React from 'react'
import { Menu, Icon } from 'antd'
import { Link } from 'react-router'

const renderMenuItem =
    ({ key, title, icon, link, ...props }) =>
      <Menu.Item
        key={key}
        {...props}
        >
        <Link to={link}>
          {icon && <Icon type={icon} />}
          <span className='nav-text'>{title}</span>
        </Link>
      </Menu.Item>

const renderSubMenu =
    ({ key, title, icon, link, sub, ...props }) =>
      <Menu.SubMenu
        key={key}
        title={
          <span>
            {icon && <Icon type={icon} />}
            <span className='nav-text'>{title}</span>
          </span>
        }
        {...props}
        >
        {sub && sub.map(item => renderMenuItem(item))}
      </Menu.SubMenu>

export default ({ menus, ...props }) => <Menu {...props}>
  {menus && menus.map(
        item => item.sub && item.sub.length
            ? renderSubMenu(item) : renderMenuItem(item)
    )}
</Menu>
