import React from 'react'
import { TabBar } from 'antd-mobile'
import ProductList from '../components/productList'
import './home.css'

class page extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedTab: 'home',
      hidden: false
    }
  }

  render () {
    return (
      <div className='home-page'>
        <TabBar hidden={this.state.hidden} prerenderingSiblingsNumber={0}>
          <TabBar.Item
            title='首页'
            key='Home'
            icon={<i className='iconfont icon-home' />}
            selectedIcon={<i className='iconfont icon-homefill' />}
            selected={this.state.selectedTab === 'home'}
            onPress={() => { this.setState({ selectedTab: 'home' }) }}
          >
            <ProductList />
          </TabBar.Item>
          <TabBar.Item
            title='分类'
            key='Class'
            icon={<i className='iconfont icon-home' />}
            selectedIcon={<i className='iconfont icon-homefill' />}
            selected={this.state.selectedTab === 'class'}
            onPress={() => { this.setState({ selectedTab: 'class' }) }}
          />
          <TabBar.Item
            title='购物车'
            key='Cart'
            icon={<i className='iconfont icon-home' />}
            selectedIcon={<i className='iconfont icon-homefill' />}
            selected={this.state.selectedTab === 'cart'}
            onPress={() => { this.setState({ selectedTab: 'cart' }) }}
          />
          <TabBar.Item
            title='订单'
            key='Order'
            icon={<i className='iconfont icon-home' />}
            selectedIcon={<i className='iconfont icon-homefill' />}
            selected={this.state.selectedTab === 'order'}
            onPress={() => { this.setState({ selectedTab: 'order' }) }}
          />
          <TabBar.Item
            title='我的'
            key='User'
            icon={<i className='iconfont icon-home' />}
            selectedIcon={<i className='iconfont icon-homefill' />}
            selected={this.state.selectedTab === 'user'}
            onPress={() => { this.setState({ selectedTab: 'user' }) }}
          />
        </TabBar>
      </div>
    )
  }
}

export default page
