import React from 'react'
import { Flex, ListView, Card, WingBlank } from 'antd-mobile'
import { Link } from 'react-router-dom'
import { Random } from 'mockjs'

import './productList.css'

const data = []
for (let i = 0; i < 10; i++) {
  data.push({
    image: Random.image('200x200', '#a9a9a9', 'test' + i),
    name: Random.ctitle(),
    describe: Random.csentence(),
    price: Random.float(0, 9999, 2, 2),
    sales: Random.natural(0, 9999),
    id: Random.guid()
  })
}
const numRows = data.length
let pageIndex = 0

function getData (pIndex = 0) {
  const dataBlob = {}
  for (let i = 0; i < numRows; i++) {
    const ii = (pIndex * numRows) + i
    dataBlob[`${ii}`] = `row - ${ii}`
  }
  return dataBlob
}

class component extends React.Component {
  constructor (props) {
    super(props)
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    })
    this.state = {
      dataSource,
      isLoading: true
    }
  }

  componentDidMount () {
    // you can scroll to the specified position
    // setTimeout(() => this.lv.scrollTo(0, 120), 800);

    // simulate initial Ajax
    setTimeout(() => {
      this.rData = getData()
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.rData),
        isLoading: false
      })
    }, 600)
  }

  // If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.dataSource !== this.props.dataSource) {
  //     this.setState({
  //       dataSource: this.state.dataSource.cloneWithRows(nextProps.dataSource),
  //     });
  //   }
  // }

  render () {
    const onEndReached = (event) => {
      // load new data
      // hasMore: from backend data, indicates whether it is the last page, here is false
      // if (this.state.isLoading && !this.state.hasMore) {
      //   return
      // }
      console.log('reach end', event)
      this.setState({ isLoading: true })
      setTimeout(() => {
        this.rData = { ...this.rData, ...getData(++pageIndex) }
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(this.rData),
          isLoading: false
        })
      }, 1000)
    }
    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        style={{ height: 8 }}
      />
    )
    let index = 0
    const row = (rowData, sectionID, rowID) => {
      if (index >= data.length) {
        index = 0
      }
      const obj = [data[index++], data[index++]]
      return (
        <Flex key={rowID}>
          {obj.map(e => (
            <Flex.Item key={rowID + e.id}>
              <Link to={'/product/' + e.id}>
                <Card>
                  <Card.Body>
                    <div className='img'>
                      <img src={e.image} alt={e.name} />
                    </div>
                    <div className='name'>{e.name}</div>
                    <div className='describe'>{e.describe}</div>
                  </Card.Body>
                  <Card.Footer content={'价格：' + e.price} extra={<div>销量：{e.sales}</div>} />
                </Card>
              </Link>
            </Flex.Item>
          ))}
        </Flex>
      )
    }
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderHeader={() => <span>header</span>}
        renderBodyComponent={() => <WingBlank></WingBlank>}
        renderFooter={() => (
          <div
            style={{ padding: 10, marginBottom: 50, textAlign: 'center' }}
          >{this.state.isLoading ? '加载中...' : '没有更多了'}</div>)}
        renderRow={row}
        renderSeparator={separator}
        contentContainerStyle={{ width: '100%' }}
        className='product-list'
        pageSize={4}
        onScroll={() => { console.log('scroll') }}
        scrollRenderAheadDistance={200}
        onEndReached={onEndReached}
        onEndReachedThreshold={10}
      />
    )
  }
}

export default component
