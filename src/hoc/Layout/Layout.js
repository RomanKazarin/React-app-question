import React from 'react';
import Drawer from '../../components/Navigation/Drawer/Drawer';
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle';
import classes from './Layuot.module.css'

class Layout extends React.Component {
  state = {
    menu: false
  }

  toggleMenuHandler = () => {
    this.setState({
      menu: !this.state.menu
    })
  }

  menuCloseHandler = () => {
    this.setState({
      menu: false
    })
  }

  render() {
    return (
      <div className={classes.Layout}>

        <Drawer
          isOpen={this.state.menu}
          onClose={this.menuCloseHandler}
        ></Drawer>

        <MenuToggle
          onToggle={this.toggleMenuHandler}
          isOpen={this.state.menu}
        >
        </MenuToggle>

        <main>
          {this.props.children}
        </main>
      </div>
    )
  }
}

export default Layout