import React from 'react'
import { Modal, List, Button, Flex, TextareaItem } from 'antd-mobile'
import './product.css'
import { Random } from 'mockjs'

class page extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false,
      product: {
        image: Random.image('200x200', '#a9a9a9', 'test'),
        name: Random.ctitle(),
        describe: Random.csentence(),
        price: Random.float(0, 9999, 2, 2),
        sales: Random.natural(0, 9999),
        id: Random.guid()
      }
    }
  }

  render () {
    const showModal = key => (e) => {
      e.preventDefault() // 修复 Android 上点击穿透
      this.setState({
        [key]: true
      })
    }
    const onClose = key => () => {
      this.setState({
        [key]: false
      })
    }

    return (
      <div className='product-page'>
        <Flex className='product-card' align='start'>
          <Flex.Item className='product-img'>
            <img src={this.state.product.image} alt='' />
          </Flex.Item>
          <Flex.Item className='product-info'>
            <div>123123</div>
          </Flex.Item>
        </Flex>
        <div>当前输入5条</div>
        <TextareaItem
          placeholder={'qweqwe......'}
          autoHeight
        />
        <Button type='primary' onClick={showModal('modal2')}>qweqwe </Button>
        <Modal popup visible={this.state.modal2} onClose={onClose('modal2')} animationType='slide-up'>
          <List renderHeader={() => <div> 委托买入 </div>} className='popup-list'>
            {['股票名称', '股票代码', '买入价格'].map((i, index) => (<List.Item key={index}>{i}</List.Item>))}
            <List.Item>
              <Button type='primary' onClick={onClose('modal2')}>买入 </Button>
            </List.Item>
          </List>
        </Modal>
      </div>
    )
  }
}

export default page
